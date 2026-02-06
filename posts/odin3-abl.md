---
title: "AYN Odin 3: Rocknix ABL"
date: 2026-01-25
prism: true
---

This assumes your Odin 3 can boot on EFI thanks to [my previous post](/posts/odin3-abl).

[ROCKNIX-ABL](https://github.com/pcarrier/rocknix-abl) describes itself as _a custom Qualcomm ABL created specifically for the emulation community and Qualcomm-based devices_.

It allows dual-booting betwen Android and an EFI loader like `systemd-boot`.

Before we switch bootloaders, let's back up the current one:

```fish
edl-ng --loader iqoo_13.melf read-part abl_a abl_backup.img
```

Then download [abl_signed-SM8650.elf](https://github.com/ROCKNIX/abl/raw/refs/heads/master/abl_signed-SM8650.elf) and flash it with:

```fish
edl-ng --loader iqoo_13.melf write-part abl_a abl_signed-SM8650.elf
```

You can now boot Android by holding volume up and pressing power.

In [the next installment](/posts/odin3-sd), we'll boot NixOS from a microSD card.
