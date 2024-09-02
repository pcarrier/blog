---
title: 7clock
date: 2011-05-23
---

I wanted a minimal, fullscreen clock I could run without X. In the longer
term, I am thinking about a locking console “screensaver”; (more
about that later). I ended up writing a small library (240 lines and counting)
to render a 7-segment display in monospaced text at any
“resolution”.

The end result adapts to the console size, instantaneously if resized. It
lacks any options, if I'm bored again I might come back to it. It should be
quite efficient, though more trivial optimizations are possible.

![](/assets/7seg/7clock.avif)

Older screenshots from various prototypes (the test program is available [alongside the clock](https://github.com/pcarrier/stuff/tree/master/fun/7seg); as usual, I recommend sticking to the instructions in `INSTALL` at the root of the repo):

![](/assets/7seg/multires.avif)
![](/assets/7seg/clock.avif)
![](/assets/7seg/fulldate.avif)
