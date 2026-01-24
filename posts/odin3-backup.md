---
title: "AYN Odin 3: backup"
date: 2026-01-24
prism: true
---

I acquired an [AYN Odin 3 Ultra](https://www.ayntec.com/products/ayn-odin-3) in the hopes to run a complete Linux environment on it.

This starts my explorations with a full backup of the stock Android storage.

I needed:

- [edl-ng](https://github.com/strongtz/edl-ng)
- [iqoo_13.melf](/assets/iqoo_13.melf) from AYN's Discord
- [A udev rule to let users access USB devices](https://github.com/pcarrier/sys/commit/33d14d62bdcc8784530fc836d3f7650a74bb4fb7)

After powering the device while pressing volume up and volume down at the same time (display goes black after flashing AYN's logo), I could examine the partition tables in my fish shell with:

```fish
for lun in (seq 0 5); echo === $lun ===; edl-ng --loader iqoo_13.melf printgpt --lun $lun; end
```

The full map is available [as a gist](https://gist.github.com/pcarrier/c6e4b60a13baecea7bb710e552593fce).

To back up, I ran:

```fish
for lun in (seq 0 5); edl-ng --loader iqoo_13.melf dump-rawprogram --lun $lun $lun/; end
```

From there I should be able to mess with the system as much as I want, able to restore it to stock Android whenever needed with:

```sh
for lun in (seq 0 5); edl-ng --loader iqoo_13.melf rawprogram --lun $lun $lun/rawprogram0.xml $lun/patch0.xml; end
```

Thanks to gio on the AYN and Rocknix Discord servers for all the help.
