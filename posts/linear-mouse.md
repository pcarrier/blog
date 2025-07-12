---
title: Linear mouse
date: 2025-06-29
---

Recently acquired an [8BitDo Retro R8 Mouse](https://www.8bitdo.com/retro-r8-mouse-n/) and I love it. Zero Bluetooth left on my workstation.

It's the first time I invest enough time into setting my pointer up correctly, and the resulting experience is shockingly better for me after just a few hours.

If my mouse is set to 3200 DPI, I want a movement of 1 inch to always translate my pointer 3200 pixels; no less, no more.

## What to tweak

There are two parameters in the way of my happiness: acceleration and scale.

### Acceleration

I like a flat response curve. That is to say, if I move a certain physical distance,
I want the pointer to move by a fixed number of pixels, regardless of the speed at which I move.
Makes it a lot easier for me to predict how much to move based on where I am and where I am headed on display,
so I don't overshoot or undershoot nearly as much.

Mainstream operating systems, however, offer <cite>acceleration</cite> by default. macOS doesn't even offer a native way to disable it.
The pointer speed is not proportional to the mouse speed. Slow movements move the pointer less than fast ones over the same distance.
To my brain, that's breaking the laws of physics.

### Scale

The default in both Microsoft Windows and macOS is to scale down: at 3200 DPI, moving an inch moves less than 3200 pixels. I guess most people use higher DPI mice than they'd want, so the software defaults adapted.

My mice and trackballs are configurable, and I want the OS to respect that configuration without interference.

## How to tweak

### Microsoft Windows

In the <cite>Settings</cite> app, open <cite>Bluetooth & devices</cite>, then <cite>Mouse</cite>, and select <cite>Additional mouse settings</cite>. In this window, switch to the <cite>Pointer options</cite> tab, make sure the speed is 6/11 and not to <cite>enhance pointer precision</cite>.

[![Windows configuration with the fastest pointer speed and no pointer precision enhancement](/assets/linear-mouse/windows.png)](/assets/linear-mouse/windows.png)

### macOS

Too bad it requires third-party software, but [LinearMouse.app](https://linearmouse.app) is perfect. I configure it like so:

[![LinearMouse.app settings, with Disable pointer acceleration and a Tracking speed of 1](/assets/linear-mouse/LinearMouse.png)](/assets/linear-mouse/LinearMouse.png)
