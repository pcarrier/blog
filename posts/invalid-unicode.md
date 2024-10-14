---
titlehtml: Exploring <code>atob(null)</code>
title: Exploring atob(null)
date: 2024-10-14
prism: true
---

`atob(null)` is a valid JavaScript expression returning a valid JavaScript string, `'\x9Eée'`.

What's happening here is, I think, interesting. First things first, `atob(null)` is, thanks to type coersion, `atob("null")`.

Given JS strings are UTF-16, those 4 codepoints really take 8 bytes, but decode to 3 bytes:

```js
[...atob(null)].map((i)=>i.charCodeAt(0))
[158, 233, 101]
```

`\x9E` appears because `U+009E` is the non-printable Private Message.

Everything works out great for latin languages as Unicode codepoints `0x80-0xFF` are the Latin-1 Supplement block.

What of encoding characters outside the first 2 blocks then, given `btoa` is the reciprocal of `atob`?

```js
> btoa('π')
Uncaught InvalidCharacterError: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.
```

I found this surprising. My intuition would have been that `btoa` works with arbitrary strings.

If and when [armor64](https://armor64.org) gets a web implementation, I hope it offers UTF-8 encoding for JS strings, and only exposes the equivalent of `btoa` on `Uint8Array`, `atob` to `Uint8Array`.
