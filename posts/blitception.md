---
title: Blitception
date: 2026-08-02
---

I've been working on [blit](https://blit.sh), which streams terminals and graphical apps to your browser with very low latency. Naturally, I had to see how deep it goes.

[![blit connected to a remote server, with two nested views of the same music video in the bottom panes](/assets/blit/rick.avif)](/assets/blit/rick.avif)

This is blit in my browser in France, connected to a server on the US East Coast. The two bottom panes show the same video, arriving through two very different routes.

On the left, blit streams a remote Chromium. That Chromium loaded another blit instance, which shows yet another browser playing the video in fullscreen. Every frame is decoded and re-encoded at each hop before crossing the Atlantic.

On the right, that same inner blit instance is loaded in an iframe, with its networking tunneled through the outer blit. Same fullscreen browser at the bottom of the stack, one less video hop, one more layer of plumbing.

Both panes play smoothly, in sync, with subtitles. Blit all the way down, Rick all the way up.
