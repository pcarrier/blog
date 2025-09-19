---
title: Reliable storage
date: 2025-09-19
---
I've been storing a lot of data somewhat reliably at home, but with my family now entrusting me with their photographs, it was time to up my game.

[![A photo of my storage elements](/assets/nas.avif)](/assets/nas.avif)

I'm setting up an HDD NAS for offsite backups. My home storage and media server was already running NixOS, ZFS, sanoid & syncoid (between a zpool of 4 SSDs and a zpool of 8 HDDs and 1 L2ARC SSD partition). A little bit of copy-pasting in my flake repository, <code>nixos-install --flake [github:pcarrier/sys](https://github.com/pcarrier/sys)#hare</code>, and I'm now mirroring the most critical data to this cheap device over tailscale.

It'll relocate to a family member this week end. At that point I'll have a fast raidz regularly snapshot, with snapshots mirrored to a local raidz and a remote RAID1.

If you're serious about self-hosting and would like a similar setup, I can help you get started. Feel free to [reach out](mailto:pc@rrier.fr)!
