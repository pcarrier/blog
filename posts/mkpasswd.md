---
titlehtml: <code>mkpasswd</code>
title: mkpasswd
date: 2011-04-18
---

You want passwords that are identical with AZERTY, QWERTY and QWERTZ keyboards? And easier to type on a mobile phone (no uppercase)? Alternatively, with the characters you list and just those?

You don’t want to choose a number of characters, how many digits and special characters should appear (or any nonsensical policy when you know what you are doing), but rather would rely solely on the number of bits of entropy you’ll get?

Generated from `/dev/random`, as it’s a good source of entropy (under a recent Linux kernel at least).

Check out [`mkpasswd`](https://github.com/pcarrier/stuff/blob/master/fun/mkpasswd.c).
