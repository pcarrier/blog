---
title: "baze utilities: statistik"
date: 2024-09-24
prism: true
---

I covered how to install `baze` and introduced `suc` [yesterday](/posts/suc). Today, we're looking at `statistik`.

If you have a bunch of numbers and want a quick look at their distribution, `statistik` is the simple command for you.

For example, let's look at how many requests each IP made to ident.me. First, let's look at the first 5 requests of the last hour to confirm we're extracting the data correctly (I censored the results):

```sh
> doas head -n5 /var/log/nginx/access.log | jq -r .r
9.255.1.7
2600:40:4201:7a10::abc7
8.136.246.156
3.2.132.135
3.2.144.1
```

We wonder if some IPs make more requests than others, and what the distribution looks like. Let's find out by looking at the first 100,000 requests now, passing them through `suc` to get the number of requests per IP, then `statistik` for analysis:

```sh
> doas head -n100000 /var/log/nginx/access.log | jq -r .r | suc | statistik
size:  45157
sum:   100000.0
avg:   2.2144960914143987

min:   1.0
p10:   1.0
p20:   1.0
p25:   1.0
p30:   1.0
p40:   1.0
p50:   1.0
p60:   1.0
p70:   1.0
p75:   2.0
p80:   2.0
p90:   3.0
p99:   18.0
p999:  115.0
p9999: 277.0
max:   741.0
```

We see here that those 100,000 requests came from 45,157 unique IPs. A bit over 70% of IPs made only 1 request; at least 90% made 3 or fewer requests. The top 1% of IPs made 18 or more requests, with the top IP making 741.

I occasionally run [public analytics](https://api.ident.me/analytics) on one hour of service. For comparison, here is the latest graph of number of IPs per request count. In my opinion, much harder to interpret:

[![Graph of IPs per request count](https://api.ident.me/analytics/ips_per_req_count.png)](https://api.ident.me/analytics/ips_per_req_count.png)

You might not be surprised to learn that `statistik`'s implementation is trivial:

```ruby
#!/usr/bin/env ruby

s = []
sum = 0

ARGF.each_line do |l|
  n = l.to_f
  s << n
  sum += n
end

s = s.sort

cnt = s.length

print "size:  #{cnt}\n"
print "sum:   #{sum}\n"
print "avg:   #{sum/cnt}\n\n"

print "min:   #{s.first}\n"
[10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 99].each do |p|
  print "p#{p}:   #{s[s.length*p/100]}\n"
end

print "p999:  #{s[s.length*999/1000]}\n"
print "p9999: #{s[s.length*9999/10000]}\n"
print "max:   #{s.last}\n"
```
