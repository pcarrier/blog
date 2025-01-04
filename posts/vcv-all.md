---
title: Installing all modules in VCV Rack 2
date: 2025-01-04
prism: true
---

To get literally all modules besides the ones you haven't paid for in VCV Rack 2, head to [the plugin page](https://library.vcvrack.com/plugins), open the DevTools (<kbd>cmd</kbd>+<kbd>alt</kbd>+<kbd>i</kbd> on Chrome Mac), and in the console, enter the line:

```js
document.querySelectorAll('.library-subscribe').forEach((e)=>e.click())
```

Then in VCV Rack, click <cite>Update all</cite> in the <cite>Library</cite> menu.

Repeat those steps whenever new collections of modules appear.