---
title: Chromebook for devs
date: 2015-03-19
prism: true
---

_This post was migrated from [Medium](https://medium.com/@pcarrier/developer-chromebook-101-435e76d55d88)._

Those notes assume the reader is **very** familiar with Unix environments. Get out whilst you can.

Put your Chromebook in developer mode. [Read carefully about the procedure and its implications](https://www.chromium.org/chromium-os/poking-around-your-chrome-os-device#TOC-Putting-your-Chrome-OS-Device-into-Developer-Mode). Be ready to wipe your Chromebook again if things go South.

Use [Crosh Window](https://chrome.google.com/webstore/detail/crosh-window/nhbmpbdladcchdhkemlojfjdknjadhmh) so keyboard shortcuts won’t get swallowed.

## Install Ubuntu

Install [Crouton](https://github.com/dnschneid/crouton), get a chroot up and running:

```shell
crosh> shell
chronos@localhost ~ $ sudo sh -e ~/Downloads/crouton -r trusty -t xiwi -e
```

## Convenience launchers

### `/usr/local/bin/s`

Useful to quickly open a shell or run a command in the chroot.

```shell
crosh> shell
chronos@localhost ~ $ sudo tee /usr/local/bin/s <<EOF
#!/bin/sh
exec sudo enter-chroot -l "\\$@"
EOF
chronos@localhost ~ $ sudo chmod a+x /usr/local/bin/s
```

### `/usr/local/bin/x`

Starts your X environment.

```shell
crosh> shell
chronos@localhost ~ $ sudo tee /usr/local/bin/x <<EOF
#!/bin/sh
exec sudo enter-chroot xinit
EOF
chronos@localhost ~ $ sudo chmod a+x /usr/local/bin/x
```

## Configure apt

Make those changes before installing anything.

### `/etc/apt/apt.conf.d/90noextras`

Not much room on your average Chromebook, so let’s minimize disk utilization.

```apt
APT::Install-Recommends “false”;
APT::AutoRemove::RecommendsImportant “false”;
APT::AutoRemove::SuggestsImportant “false”;
Acquire::Languages “none”;
```

### `/etc/apt/preferences.d/backports`

Backports are a no-brainer for zsh users, as our favourite shell won’t have manpages otherwise. We enable them for all packages here.

```dpkg
Package: *
Pin: release a=trusty-backports
Pin-Priority: 500
```

### `/etc/apt/sources.list`

Pick and choose, I doubt you want them all…

```sources.list
deb http://us.archive.ubuntu.com/ubuntu/ trusty main restricted universe multiverse
deb http://us.archive.ubuntu.com/ubuntu/ trusty-updates main restricted universe multiverse
deb http://us.archive.ubuntu.com/ubuntu/ trusty-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu trusty-security main restricted universe multiverse
deb http://extras.ubuntu.com/ubuntu trusty main
deb http://archive.canonical.com/ubuntu/ trusty partner
deb http://repos.azulsystems.com/ubuntu stable main
deb http://dl.google.com/linux/chrome/deb/ stable main
deb http://dl.google.com/linux/chrome-remote-desktop/deb/ stable main
deb http://linux.dropbox.com/ubuntu trusty main
deb http://downloads.hipchat.com/linux/apt stable main
deb http://repository.spotify.com stable non-free
deb http://archive.getdeb.net/ubuntu trusty-getdeb apps games
deb https://get.docker.io/ubuntu docker main
deb http://debian.sur5r.net/i3/ trusty universe
deb http://winswitch.org/ trusty main
deb http://debrepos.franzoni.eu/atom squeeze main
deb http://ppa.launchpad.net/webupd8team/sublime-text-3/ubuntu trusty main
deb http://ppa.launchpad.net/git-core/ppa/ubuntu trusty main
deb http://ppa.launchpad.net/nowrep/qupzilla/ubuntu trusty main
deb http://ppa.launchpad.net/noobslab/indicators/ubuntu trusty main
deb http://ppa.launchpad.net/mc3man/trusty-media/ubuntu trusty main
deb http://ppa.launchpad.net/hugegreenbug/cmt2/ubuntu trusty main
deb http://ppa.launchpad.net/modriscoll/nzbget/ubuntu trusty main
```

### First `apt-get update`

`apt-get update` will complain about missing keys. To import them, use something like:

```shell
% sudo apt-key adv --keyserver pgp.mit.edu --recv
1234567890ABCDEF FEDCBA0987654321
```

You should be verifying those PGP keys. [insert thought-through security blah blah everybody will ignore]

## Configure the X session

As i3 maps quite a lot under its modifier, I use Mod4 (presented by i3 as “win” during the configuration assistant) but make it Right Alt instead of the Search key to avoid any conflicts. Sorry to users of non-US keyboards.

### `~/.xinitrc`

```shell
#!/bin/sh -e
xrdb -merge ~/.Xresources
xmodmap ~/.Xmodmap
exec zsh -lc 'exec i3'
```

### `~/.Xmodmap`

```xmodmap
remove mod1 = Alt_R
add mod4 = Alt_R
```

### `~/.Xresources`

Really a matter of taste…

```xresources
URxvt*foreground: white
URxvt*background: black
URxvt*cursorColor: red
```

## Running VPNs

Make sure the `resolvconf` package isn’t installed so `/etc/hosts` will be correctly written, both in the crouton chroot and on the host (as crouton ties them together).

TUN devices get automatically destroyed by the network manager, shill, which will break OpenConnect, vpnc and OpenVPN. To disable this behaviour until the next boot:

```shell
crosh> shell
chronos@localhost / $ sudo initctl stop shill && sudo shill --device-black-list=tun0,tun1
```

## What’s next?

I kept most of my personal configuration out of this document, but I’d be happy to explore more in future posts. Let me know what you’d like to see covered [on Twitter](https://twitter.com/pcarrier)!
