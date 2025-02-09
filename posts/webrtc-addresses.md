---
title: WebRTC addresses
date: 2025-02-09
---

Browsers can be so smart.

You connect to peers over WebRTC by discovering their address from a list of announcements they volunteer.

If we're on the same network it's highly desirable that eg my laptop would connect to my phone through 192.168.0.123. But 192.168.0.123 is dozens of millions of different machines across different networks, and it'd be inconsiderate to attempt connecting to the wrong one. So how do you announce an address unique to this local network?

mDNS! On all desktop OSes + iOS, all browsers announce a randomly generated address like `8daed4b0-14b8-4460-89d0-7139ceefe5d9.local` that is easily made discoverable on the local network through mDNS.

This leaves some room for optimization (eg your 10.x.x.x-like corporate network where mDNS won't cross many boundaries), but corporate is happy that their network topology isn't exposed on the Internet, so everybody wins.

I found Android an outlier where browsers don't seem to do this (at least not Chrome on my particular phone from Google). Check "WebRTC addresses" on [ident.me](https://www.ident.me) to see what your browser does!
