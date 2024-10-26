---
titlehtml: <code>mpv</code> discovery
title: mpv discovery
date: 2024-10-17
prism: true
---

[`mpv`](https://mpv.io/), fork of `mplayer2`, fork of `MPlayer`, is a fantastic media player.

I just discovered by accident that it binds `ga` and `gs` to switch audio track and subtitles interactively. What a game changer for me! Good opportunity to point to [the default key bindings](https://github.com/mpv-player/mpv/blob/master/etc/input.conf).

I cannot resist sharing my config, which requires `brew install molten-vk` on Mac, and is ready for [SmoothVideo](https://www.svp-team.com/).

## `mpv.conf`

```ini
vo=gpu-next
hwdec=auto-copy
hwdec-codecs=all
profile=gpu-hq
save-position-on-quit=yes
alang=eng,en,enUS,en-US,fr,frFR,fr-FR
slang=eng,en,enUS,en-US,fr,frFR,fr-FR
cache-secs=60
embeddedfonts=yes
hr-seek-framedrop=no
icc-profile-auto=yes
target-colorspace-hint=yes
input-ipc-server=/tmp/mpvsocket
screenshot-format=webp
screenshot-webp-lossless=yes
screenshot-tag-colorspace=yes
screenshot-template="%f-%P-%n"
sub-auto=fuzzy
sub-blur=1
sub-color=1.0/1.0/0.0
sub-shadow-color=0.0/0.0/0.0
sub-font-size=16
sub-font=PragmataPro
osd-font-size=16
osd-font=PragmataPro
```

## `input.conf`

```text
[ add speed -0.05
] add speed 0.05
{ sub-step -1
} sub-step +1
v cycle sub-visibility
V cycle secondary-sub-visibility
```
