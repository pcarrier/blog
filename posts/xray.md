---
title: X-ray vision
date: 2024-10-16
---

When web agents wonder what to do on a page, the action space typically includes clicking on page elements listening for such events (links, buttons, etc.).

One way to expose those actions to models is to overlay labels on a screenshot of the page. Vimium offers this on the `f` key:

[![Yahoo JP with clickable elements overlaid](/assets/yahoojp.avif)](/assets/yahoojp.avif)

Overlays are not a great solution though, because they clutter the image, hiding parts of those elements and their neighborhood. It is possible to send screenshots with and without the overlays, but this drops information density, increasing computational costs.

We can also pass image coordinates in text. Models might evolve to understand them well, but as far as I understand, none does today.

The alternative approach I'm suggesting today would be to support extra channels besides the usual red, green, blue, sometimes alpha. This approach is already used on iOS to store depth maps. Here, we'd use them to introduce labels and other visual elements in the image purely additively. I propose calling those “X-ray channels”.

Unfortunately, no vision or multimodal model supports more than RGB images today.
