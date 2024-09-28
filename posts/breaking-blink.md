---
title: Breaking Blink
date: 2024-09-29
---

A few years back, I had written a simple page that made most browsers sluggish, [folks](https://pcarrier.com/toys/folks). It was intended as a benchmark, but I was still surprised at how hard some took it.

I can't exactly recall which performed how, but initial load and reflow on window resizing could take many seconds. Today, none of the 3 engines in widepread use (Safari's WebKit, Firefox's Gecko, Chrome's Blink) have any issue with it.

However, I once again find myself bringing Blink to a grinding halt. This time, visiting pages like [Mathematics](https://en.wikipedia.org/wiki/Mathematics) on Wikipedia, with [custom CSS](https://meta.wikimedia.org/wiki/User:PierreCarrier/global.css), in an 8K window. Sure, it's niche. Nice problem to have, I guess.

Safari, on the other hand, loads and reflows smoothly. Looks great, by the way (besides `sans-serif` not mapping to my favourite font, PragmataPro):

[![Mathematics on Safari](/assets/maths.avif)](/assets/maths.avif)
