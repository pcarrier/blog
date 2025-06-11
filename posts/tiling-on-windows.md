---
title: "Tiling on Windows: oh so happy"
date: 2025-06-10
---

I spend most of my days on Windows machines now.

Thanks to WSL, there isn't much I miss from my Linux days. The lack of tiling window management was a major drawback though.

That's now solved thanks to [GlazeWM](https://github.com/glzr-io/glazewm). There are alternatives, but it's the best I found in the style of i3 & sway. I figured I'd document how I made it work for me.

As you might already know from my [desk setup article](/posts/desk/), I use a HHKB. There aren't a ton of modifier keys available: Ctrl, left and right Alt, left and right Meta. Ctrl and left Alt are essential for me to leave to applications as they're heavily used there. The right Alt key is already used by [WinCompose](https://wincompose.info/). The left Meta is useful for Windows shortcuts, I wouldn't want to lose it. This only leaves the right Meta, so I replaced initially replaced `alt` with `rwin` in [GlazeWM](https://github.com/glzr-io/glazewm)'s default config. Unfortunately Windows intercepts a lot of those shortcuts.

I found a solution: using [KeyTweak](https://keytweak.en.softonic.com/) I remapped the right Meta to be a right Ctrl. I now use `rctrl` as a replacement for `alt` in [GlazeWM](https://github.com/glzr-io/glazewm) and everything runs perfectly. It also works out of the box with my laptop's keyboard, which doesn't have a right Meta but does have a right Ctrl I wasn't using either.
