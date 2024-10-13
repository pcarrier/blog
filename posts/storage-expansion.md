---
title: Storage expansion
date: 2024-10-11
---

`rabbit`, the NAS+media server+… described in my [desk setup post](/posts/desk/), has been running out of storage space. A 4TB NVMe SSD hosts the operating system and a big cache for the zfs pool, a `raidz` on 4×8TB of SATA SSD storage attached through the [ThunderBay 4 mini](https://www.owc.com/solutions/thunderbay-4-mini-thunderbolt-3).

I figure, given its growth rate keeps increasing, that I should invest in a solution that'll remain viable for many years.

So I'm adding a `raidz` of 8×18TB SATA HDDs to the pool, attached through the [ThunderBay 8](https://www.owc.com/solutions/thunderbay-8).

[![The new storage setup](/assets/storage-expansion.avif)](/assets/storage-expansion.avif)

The difference in size between 4×2.5” and 8×3.5” is a bit more intimidating than I expected. I relocated `rabbit` to the corner next to my desk, freeing some space on it.

That's 126TB of usable storage added to the 24TB I already have, for a nifty total of 150TB or 136TiB.

All this to announce: time to set up good offsite backup solutions for friends and family!
