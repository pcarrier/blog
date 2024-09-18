---
title: A little meta
date: 2024-09-10
---

This blog is powered by a static site generator and live previewer,
[11ty](https://www.11ty.dev/).

[direnv](https://direnv.net/)
[automates](https://github.com/pcarrier/blog/blob/main/.envrc) the
installation of [mise](https://mise.jdx.dev/), which
[automates](https://github.com/pcarrier/blog/blob/main/.mise.toml) the
installation of `node` and `pnpm`.

A `blog` command automates the installation of further dependencies and the
invokation of [`package.json`](https://github.com/pcarrier/blog/blob/main/package.json)
scripts.

It is deployed to [xmit](https://xmit.co/), my very own hosting platform, from a [public GitHub repository](https://github.com/pcarrier/blog).

GitHub Actions are available on the `deploy` branch, largely unused. Usually much faster to deploy locally.

Articles are written in Markdown, images are authored in high-res AVIF and made available in AVIF and JPEG in a variety of sizes.

An [index](/) lists all posts, its [JSON Feed](https://www.jsonfeed.org/) provides the last 10 posts to feed readers.

**Update (2024-09-18):** There is also a [newspaper view](/news) for that old-school feel now.
