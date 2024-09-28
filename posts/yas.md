---
title: yas please
date: 2024-10-01
---

I started prototyping [yas](https://yas.tools) through its website, with the idea of making a small, fast, and cross-platform execution environment for scripts exposed online.

I'd like it to come bundled with a few libraries to make it useful:

- A smart, caching HTTP client, also used to fetch scripts and their dependencies;
- System bindings for processes and filesystems;
- Archive manipulation and extraction (tarballs compressed with gzip or xz, zip, 7zip at a minimum).

Unfortunately an abundance of questions and tradeoffs demotivates me.

- Scripting what? Do I want to invest mostly in configuration management, software installation, notably wrapping other runtimes to simplify tools' deployment and execution?

- Should the installation modify `PATH` automatically? Are there elegant solutions for this? I can manipulate the registry on Windows, but what about Mac and Linux? Should I just focus on configuring the shell that invoked the installer?

- Should the binary self-update, if so what does that require on each platform?

- Should I cut scope down by forgoing a scripting runtime, focus on a descriptive format for deploying and running other tools?

- If not, should I use [lua](https://www.lua.org/), [quickjs](https://bellard.org/quickjs/), or [starlark](https://bazel.build/rules/language)?

- What should be the host language? For lua and quickjs, I tried putting together a bunch of C libraries, which took a really long time (partly because of cross-compilation) and left me with a host of issues. [Go](https://go.dev) would be a breeze with [starlark-go](https://github.com/google/starlark-go), but binaries quickly get very large.

If anybody feels inclined to participate, that could give me a perspective on what's wanted and the push I need to move forward. I'm not necessarily looking for a team, but I'd love to see ideas bouncing around. I made [a Discord channel](https://discord.gg/5s6HBPhYEA).
