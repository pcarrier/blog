---
title: "AYN Odin 3: NixOS SD"
date: 2026-01-26
prism: true
---

This assumes your Odin 3 can boot on EFI thanks to [my previous post](/posts/odin3-abl).

We use Nix flakes to build an image. Everything is defined in `flake.nix` at [pcarrier/sys](https://github.com/pcarrier/sys). The most important part is in [hw/odin3.nix](https://github.com/pcarrier/sys/blob/main/hw/odin3.nix) as we need a custom kernel today.

Being careful to target the right device, we generate an ISO and write it to the microSD card:

```fish
nix build .#nixosConfigurations.odin3iso.config.system.build.isoImage
lsblk # find the SD card device for the next command
sudo dd if=result/iso/nixos-minimal-….iso of=/dev/sd… bs=4M
sync
```
