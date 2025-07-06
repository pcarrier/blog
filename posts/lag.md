---
title: "toys/lag: Jerk Monitor"
date: 2025-07-06
prism: true
---

Since upgrading to 240 Hz monitors, I feel a lot better when interacting with my computer, finding I am quite sensitive to latency.

Switching USB ports for my wireless mouse dongle introduced delays of around 10 ms every few seconds. I knew it. I had to prove it.

Unfortunately I couldn't find online tools to study those finer delays. So I made one, [found.as/l](https://found.as/l).

It shows the delay between individual frames rendered by the browser, and between individual pointer movements reported to the webpage. Also reports about the batching of pointer events and their offsets.

To get access to high precision timers, I needed to add to my `xmit.toml`:

```toml
[[headers]]
name = "Cross-Origin-Opener-Policy"
value = "same-origin"

[[headers]]
name = "Cross-Origin-Embedder-Policy"
value = "credentialless"
```

My observation is confirmed. I'll avoid the port. I've also learnt I do benefit from the 8 kHz setting of my mouse, as even at 3200 DPI with fast & smooth motion, some frames still miss a pointer update.
