---
title: "baze utilities: suc"
date: 2024-09-23
prism: true
---

I've written a lot of shell one-liners over the years, and packed a few most useful “missing” tiny utilities under a Ruby gem, `baze`.

To install it system-wide, make sure Ruby is installed, then run:

```sh
$ sudo gem install baze --no-user-install
```

I'll be introducing my favourite utilities over the next few days. Today, we're looking at `suc`.

It's quite frequent that I want to list all line counts. If `/var/log/xhttpd/access.log` contains:

```json
{"client": "1.2.3.4", "path": "/hello"}
{"client": "5.6.7.8", "path": "/favicon.ico"}
{"client": "8.7.6.5", "path": "/world"}
{"client": "4.3.2.1", "path": "/favicon.ico"}
```

I can produce a list of paths sorted by decreasing number of occurences with:

```sh
$ jq -r .path /var/log/xhttpd/access.log | sort | uniq -c | sort -nr
   2 /favicon.ico
   1 /world
   1 /hello
```

Unfortunately this is extremely inefficient at scale, taking for _n_ lines _O(n⋅ln(n))_ time and _O(n)_ space.

`suc -r` is a drop-in replacement leveraging a hash table, taking for _n_ lines of _k_ distinct values _O(n)_ time and _O(k)_ space.

```sh
$ jq -r .path /var/log/xhttpd/access.log | suc -r
      2 /favicon.ico
      1 /hello
      1 /world
```

You might have noticed `suc` differs in 2 other ways:

- It reserves 7 characters for the count. I like large and small numbers to remain aligned.
- It sorts values of the same count lexicographically.

The `-r` flag plays the same role in both commands: start with most rather than least frequent lines.

Like the rest of `baze`, the source code is a short script depending only on Ruby:

```ruby
#!/usr/bin/env ruby

require 'optparse'

reverse = false

optparse = OptionParser.new do |opts|
  opts.banner = "Usage: suc [-r] [file]\n" \
    "  Scale-friendlier equivalent of sort | uniq -c | sort -n"
  opts.on '-r', '--reverse', 'Sort from most to least frequent' do
    reverse = true
  end
end

optparse.parse!

counts = Hash.new 0

ARGF.each_line do |line|
  counts[line] += 1
end

if reverse
  sorted = counts.sort_by {|k,v| [-v, k]}
else
  sorted = counts.sort_by {|k,v| [v, k]}
end

sorted.each do |line, count|
  printf "%7i %s", count, line
end
```
