---
titlehtml: <code>errnos</code>
title: errnos
date: 2011-05-21
prism: true
---

As a Technical Support Engineer at Red Hat, I got to read a lot of logs, error messages and code. One of my pain points was errnos.

They rely on [magic numbers](<http://en.wikipedia.org/wiki/Magic_number_(programming)>), which is perfectly understandable given their use cases (eg return values for system calls). But obviously, we're not going to be using magic numbers everywhere, hence they are defined as [constants](<http://en.wikipedia.org/wiki/Constant_(programming)>) for the C preprocessor.

Numbers are not very user-friendly, so why not display them in a human-readable format when a human might want to read it? `strerror` comes to the rescue! Unfortunately, not every piece of code presenting errors to the user or administrator uses it. There are various reasons for that:

- It is a libc function, and the Linux kernel didn't implement something similar (or most of us aren't aware of its existence);
- The length of the (hexa)decimal representation of an integer is bound, whereas the strings it returns are not, which can make memory allocation for log messages trickier.

`strerror` strings are very readable; for example, it will turn `ENOMEM` into Cannot allocate memory under OSX. I will not lose too much of your time on the annoyances caused by weird usages of errnos, though I encountered quite a few already: they usually do not delay troubleshooting too much if you're not too trusting. For example `ENOTDIR`, represented by glibc's `strerror` as Not a directory, indicates when returned by `keyctl_search(3)` that one of the keyrings is a valid key that isn't a keyring.

The tricky part now? From a number or an `strerror` description in logs or an output, there is no trivial way to establish which constant to look for. What's more, C preprocessor constants are not available at runtime, you'd need the headers at hand, `cpp`, and your own list to go through as there isn't a standard one! For example, if you see 44, 0x2c or `Channel number out of range`, what should you `git grep` for in the affected software, libc and/or kernel? `ECHRNG`, of course!

I'd love to give you a simple table listing each errno constant, its representation in decimal and hexadecimal and its `strerror` description, but there are a few reasons why I can't:

- Probably mostly for historical reasons, the association between constants and integer values is not common between operating systems; worse, they can also change between hardware architectures.
- The `strerror` representation varies between systems, in particular depending on the libc being used.
- Some operating systems use the same value for multiple constants. This is not a bug _per se_ as long as no standard function can return those different constants for different reasons. On my systems, those are `EDEADLK` and `EDEADLOCK` under Linux, `EAGAIN` and `EWOULDBLOCK` under OSX.

However, this led to the creation of a simple command-line utility, [`errnos`](https://github.com/pcarrier/stuff/blob/master/sys/errnos.c). Build and run it on the system you investigate, or a similar one (same operating system, same libc, same CPU architecture), and you will get something you can store and `grep` at will. It could also make an ironic wallpaper for your child's room, but don't blame me if they have nightmares of production systems going down.

For once, I used glib as I needed a hashtable of lists and couldn't be bothered implementing those for the millionth time in history (comp. sci. students who have to do so tonight, I share your frustration). There's a limited amount of magic involved in the build process, so please just clone the repository and stick to the [build instructions](https://github.com/pcarrier/stuff/blob/master/INSTALL) unless you have time to lose.

The first column gives the number in its decimal representation, the second in hexadecimal. The third is either its `strerror` representation between double quotes or a preprocessor constant.

To close this post, here is the end of its output on my Mac:

```shell
$ errnos | tail
Stopped looking at 1128
99    0x63    "Not a STREAM"
99    0x63    ENOSTR
100   0x64    "Protocol error"
100   0x64    EPROTO
101   0x65    "STREAM ioctl timeout"
101   0x65    ETIME
102   0x66    "Operation not supported on socket"
102   0x66    EOPNOTSUPP
103   0x67    "Policy not found"
103   0x67    ENOPOLICY
```
