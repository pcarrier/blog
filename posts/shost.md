---
titlehtml: "<code>baze</code> utilities: <code>shost</code>"
title: "baze utilities: shost"
date: 2024-09-25
prism: true
---

I covered how to install `baze` and introduced `suc` [two days ago](/posts/suc/), then `statistik` [yesterday](/posts/statistik/). Today, we're looking at `shost`.

Looking to resolve DNS names? `bind` ships `host` and `dig`, `ldns` ships `drill`.

`shost` is quite terse in comparison:

```shell
> shost ident.me
2a01:4f8:c0c:bd0a::1
49.12.234.183
> host ident.me
ident.me has address 49.12.234.183
ident.me has IPv6 address 2a01:4f8:c0c:bd0a::1
> drill ident.me
;; ->>HEADER<<- opcode: QUERY, rcode: NOERROR, id: 15200
;; flags: qr rd ra ; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
;; QUESTION SECTION:
;; ident.me.    IN      A

;; ANSWER SECTION:
ident.me.       12      IN      A       49.12.234.183

;; AUTHORITY SECTION:

;; ADDITIONAL SECTION:

;; Query time: 4 msec
;; SERVER: 100.100.100.100
;; WHEN: Mon Sep 23 17:24:40 2024
;; MSG SIZE  rcvd: 42
> dig ident.me

; <<>> DiG 9.10.6 <<>> ident.me
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 28298
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4095
;; QUESTION SECTION:
;ident.me.                      IN      A

;; ANSWER SECTION:
ident.me.               11      IN      A       49.12.234.183

;; Query time: 4 msec
;; SERVER: 100.100.100.100#53(100.100.100.100)
;; WHEN: Mon Sep 23 17:24:41 CEST 2024
;; MSG SIZE  rcvd: 53

>
```

It has the benefit of letting you reverse lookup in one go:

```shell
> shost -r ident.me
v6.ident.me
v4.ident.me
```

`host`, `dig` and `drill` all resolve names through their respective DNS implementation.

`shost` doesn't compete but completes, relying on the system's resolver instead.

So, while a lot less information is available about what happens in DNS, what you get back is what most software uses. For example, `.local` names are looked up through mDNS/zeroconf if your operating system is configured to do so:

```shell
pcarrier@cat ~> shost cat.local
::1
fe80::1%lo0
127.0.0.1
192.168.1.21
192.168.42.142
fe80::1cfa:8a61:53e2:5324%en0
fe80::1ce2:3342:8435:7cd7%en3
2a01:e0a:250:7160:482:db55:6b74:b323
```

This makes it a valuable addition to a troubleshooter's toolbox.

As usual in `baze`, very little code:

```ruby
#!/usr/bin/env ruby

require 'socket'
require 'optparse'

reverse = false
soft = false

optparse = OptionParser.new do |opts|
  opts.banner = "Usage: shost [-r] host...\n" \
    "  Resolves names"

  opts.on '-r', '--reverse', 'Display reverse lookups' do
    reverse = true
  end
  opts.on '-s', '--softfail', 'Simply display failures instead of exiting' do
    soft = true
  end
end

optparse.parse!

raise 'host expected' if ARGV.empty?

ARGV.each do |host|
  begin
    infos = Socket.getaddrinfo(host, nil, Socket::AF_UNSPEC, Socket::SOCK_STREAM, nil, 0, reverse)

    if reverse
      infos.each {|r| puts r[2]}
    else
      infos.each {|r| puts r[3]}
    end
  rescue SocketError => e
    if soft
      STDERR.puts "#{host} FAILED"
    else
      raise e
    end
  end
end
```
