---
title: "toys/rand: pseudorandom pixels"
date: 2025-07-05
---

Twin Labs streams browsers in your browser.

We wanted to stress-test the process of encoding and streaming on-screen content.  
The worst case for us is pure digital noise.

So I made [found.as/r](https://found.as/r): pseudo-random pixels refreshed as fast as possible.  
We've used it a fair bit of the last few months.

Recently, I started displaying it on 240 Hz displays, and have observed stalling.  
So I added frame duration stats.

Want to check that WebGL runs smoothly? Give it a spin.
