---
title: "Intech Studio Grid: 14-bit MIDI CC"
date: 2025-01-05
prism: true
---

I got myself a [PBF4](https://intech.studio/shop/pbf4) from Intech Studio to control my DAWs & VSTs. An immediate goal was to increase the resolution of knobs and faders to leverage 14-bit CC values (between 0 and 16383) rather than the more traditional 7-bit values (between 0 and 127). When you have access to 12 bits of resolution, it's a shame to let 5 of them go to waste… We'll use 11 bits to avoid noise.

Grid Editor let me share the profile with community members, but I figured a walkthrough could be helpful to folks who want to make similar tweaks.

Without further ado, here's the overall process:
- First, select any knob or fader and configure it.
- Then, copy the configuration to all other knobs and faders.
- Then, store the profile in your device.
- Finally, to affect all pages, save the module configuration, switch to each page to load it and store it on-device.

## Configuration

In the <cite>Setup</cite> tab:

- In the locals section, edit `val` to be:

	```lua
	math.floor(math.min(self:potmeter_value()/16,127))
	```

- Hit <cite>Add action block…</cite> then select <cite>Code Block</cite>. Enter the following code:

	```lua
	self:potmeter_resolution(11)
	self:potmeter_max(2048)
	```

<cite>Commit</cite>, <cite>Close</cite>, and move the block above the locals.

In the <cite>Potmeter</cite> tab:

- In the locals section, edit `val` to be:

	```lua
	math.floor(math.min(self:potmeter_value()/16,127))
	```

- In the locals section, hit <cite>Add local variable…</cite> and enter <cite>val14</cite> with the expression:

	```lua
	math.min(self:potmeter_value()*8,16383)
	```

- In the MIDI section, switch to <cite>14 bit MIDI</cite>, adopt CC number `num+20` (the range starting at 20 is unassigned and is unlikely to collide with other controllers), and controller value `val14`.

## Copying to all pots

You can <kbd>cmd+c</kbd> the selected element, then select every other knob and fader one by one hitting <kbd>cmd+v</kbd>.

## Storing the config

At the top-center of the window, hit <kbd>Store</kbd>.

Ready to test! Switch to the <cite>MIDI Monitor</cite> pane in the bottom-left and play with your pots to see the events sent over the MIDI bus.

## Applying to all pages

Switch to the <cite>Configuration</cite> pane in the top-left, hit <cite>+</cite>, select <cite>PBF4 Module</cite>, <cite>Next</cite>, name your config. Then in the page selector below your module, switch to every page, each time selecting your profile on the left, clicking <cite>Load Profile</cite>, then <cite>Store</cite>.