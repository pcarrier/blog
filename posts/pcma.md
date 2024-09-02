---
title: Page Cache My Assets
date: 2012-05-01
---

Many services rely on a dataset stored on disk.

If accesses are frequent and non-linear, performance remains reasonable as long as they are cached in memory. Then suddenly, some background job is triggered, a backup for example, and the data gets evicted from the page cache. Performance drops.

In many cases this is acceptable. The service throughput drops. In a request-reply model, requests get queued. But if latency is not critical, remains below the client timeout, and if the machine is dimensioned properly, data will be cached again, the service will catch up. The temporary slowdown was acceptable.

In other cases, this is catastrophic. Think high-frequency trading.

Here comes `pcmad`, the “Page Cache My Assets” daemon. It simply locks and unlocks files in memory as requested. When a file is locked, it won’t be evicted, whatever happens on the server. If the system runs out of memory, the `oom-killer` would be likely to kill this daemon first, so the `upstart` job and `systemd` unit indicate that killing `pcmad` should be avoided at all costs.

A simple and documented protocol, based on ØMQ and MessagePack, makes `pcma` easy to integrate with your existing services. For scripts, we also ship a client.

[The project](https://github.com/pcarrier/pcma) reached 0.2.0. It isn’t stabilized yet, so the protocol might not remain backward-compatible. However the code is simple and passed reviews, so feel free to give it a go!
