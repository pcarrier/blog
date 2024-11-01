---
titlehtml: <code>cdproxy</code>
title: cdproxy
date: 2024-11-01
prism: true
---

I've wasted a lot of time with connectivity issues between Python and Chromium.

Turns out `playwright-python`'s WebSocket implementation is broken.

Released [cdproxy](https://github.com/pcarrier/cdproxy) to work around the issue. A Go binary that presents itself as a browser running with `--remote-debugging-pipe` proxying to a `ws://` or `wss://` URL chosen through the `URL` environment variable.

Install with:

```shell
GOBIN=/usr/local/bin go install github.com/pcarrier/cdproxy@latest
```

then replace:

```python
from playwright.async_api import async_playwright

async with async_playwright() as p:
  browser = await p.chromium.connect_over_cdp(url)
```

with:

```python
async with async_playwright() as p:
  browser = await p.chromium.launch(
    executable_path="/usr/local/bin/cdproxy",
    env={"URL": url}
  )
```

It's a hack, but it gets the job done.
