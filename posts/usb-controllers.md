---
title: "USB controllers matter"
date: 2025-07-12
---

I wrote [a post about WinJerkMon](/posts/lag/) yesterday. I have since built a small command-line client to generate latency graphs for extended periods of mouse updates. Here are the first results.

In my quest for the best latency possible, it was suggested to me that I try another USB controller.

I was using a rear port connected to an AMD xHCI controller connected to my CPU, used no other port during tests. The thought that the difference would be measurable amused me. Now equipped with a U3142C board, I've checked. Turns out, it is.

Those measurements were reproduced multiple times, going back and forth between controllers. They were taken seconds apart, only moving the cable between controllers.

Data was captured for 10 seconds of very fast circles each time, using a Razer DeathAdder V4 Pro at 45,000 DPI and 8 kHz polling.

## Onboard USB (ASUS ProArt X670E-CREATOR WIFI)

<a href="/assets/usb-controllers/b.svg">
<img alt="ASM USB" src="/assets/usb-controllers/b.svg" style="background-color: white;"/>
</a>

The longest intervals get close to 2 milliseconds. Depending on when & how the game engine captures input data, jerk is possible at 500 Hz.

## PCI-e expansion card (GLOTRENDS U3142C)

<a href="/assets/usb-controllers/a.svg">
<img alt="AMD USB" src="/assets/usb-controllers/a.svg" style="background-color: white;"/>
</a>

More entries are captured, and that the intervals are a lot more consistent. They peak at about 1 millisecond, or half a frame for a 500 Hz display. Each frame gets a fair chance at observing your mouse movements, jerk should be low.

## Bonus 1: PCI-e expansion card + UGREEN 10Gbps Hub

<a href="/assets/usb-controllers/c.svg">
<img alt="AMD USB" src="/assets/usb-controllers/c.svg" style="background-color: white;"/>
</a>

Adding an otherwise empty hub destroyed performance, seemingly limiting updates to 1 kHz. Enough said.

## Bonus 2: Onboard USB with 5€ mouse

<a href="/assets/usb-controllers/d.svg">
<img alt="AMD USB" src="/assets/usb-controllers/d.svg" style="background-color: white;"/>
</a>

Even 125 Hz polling shows outliers near 9 ms instead of 8 ms. 120 Hz displays miss updates.
