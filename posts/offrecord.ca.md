---
title: "offrecord.ca: private chat"
date: 2024-10-02
---

Started a new project last night: [offrecord.ca](https://offrecord.ca), a private chat service.

Not much to say about it. Needed off-the-record communication one day, built the simplest solution offering privacy and confidentiality. Usage is trivial: pick a channel name (we offer random ones, with 64 bits of entropy), share it as you want (we offer a QR code and native sharing UI), chat away.

Messages and their authors' pseudonyms are encrypted with a [TweetNaCl](https://tweetnacl.js.org/#/) keypair derived from the channel name, whose public key is used as the channel identifier with the service. The service keeps the last 10 messages and their timestamps only in memory and unless the channel is wiped. A presence counter per channel could reveal somebody dropped in unexpected. No IP or effective identifier is ever logged. I track which user agents load the site's codebase, but not where they connect; user agents do not identify individuals.

And as often with my personal projects, [it's open source (0BSD-licensed)](https://github.com/pcarrier/offrecord.ca).
