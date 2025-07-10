---
title: "WinJerkMon: observe your mouse precisely"
date: 2025-07-11
---

I wrote [a post about JerkMon](/posts/lag/) a few days ago. I was already a tad obsessed with accurate observations of the behaviour of my pointer. My fixation has only gotten worse since, as I started playing at 480 Hz.

The latest result is a program which captures VSync frame timing, mouse events with the lowest-level available API in Microsoft Windows, and exposes the collected data over WebSocket.

Made [WinJerkMon](https://found.as/wl) to observe it in great detail. Unlike [JerkMon](https://found.as/l), its portable counterpart, it can afford to feature histograms.

What I've found is that there are at least 3 types of USB3 ports on my workstation:

- Some where pauses exceed 10ms every few seconds,
- Some where pauses exceed 2ms multiple times per second, and 4ms every few seconds;
- Some where pauses never exceed 1ms.

That's now been confirmed with 2 different mice, the same USB cable, and the same receiver placement. It looks to come down to the PCI-e topology behind the many USB controllers on my computer, something I feel shouldn't matter at those orders of magnitude for throughput and desired latency.

For frame-perfect inputs at high refresh rates, this seemingly innocuous choice appears critical.
