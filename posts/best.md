---
title: Barely Even Structured Text (BEST)
date: 2024-10-15
prism: true
---

When implementing a [toy programming runtime](https://formic.id), I tried to implement my “language” as a stack of simple layers.

Today, I'd like to describe the bottom of the stack, Barely Even Structured Text or BEST.

Intended as a lightweight (but not strictly minimal) layer, its design can be summarized in a few choices:

- Only produce a sequence, no structure yet as it can be built on top (token stream not abstract syntax tree);
- 2 types of tokens: strings and symbols, nothing more (specialization is made atop);
- Allow for arbitrary bytes everywhere in both, including invalid UTF-8;
- Quoting is exposed to upper layers, escaping is not;
- Keep it simple yet allow as short a representation as possible;
- Follow established conventions otherwise.

Here is the full description:

> Spaces are separators outside of double quotes and escape sequences.
>
> Strings are prefixed by `'` or delimited by `"`.
>
> The rest is symbols. They can be prefixed by `\'`, or delimited by `\"` and `"`.
>
> Quoting is preserved by parsers and printers, and meaningful in some circumstances (eg in STOR, `[` starts a vector but `\'[` does not).
>
> `\` can be used to escape:
>
> - `'` single quote
> - `"` double quote
> - ` ` space
> - `\` backslash
> - `n` newline
> - `r` carriage return
> - `t` tab
> - `f` form feed
> - `v` vertical tab
> - `b` backspace
> - `[0-9A-F][0-9A-F]` arbitrary byte in hex
> - `u[0-9A-F][0-9A-F][0-9A-F][0-9A-F]` unicode code point in hex (represented in UTF-8)

For example, in:

```text
A 'world \'of "dew"
```

`A` and `of` are symbols, the latter single-quoted. `world` and `dew` are strings, the latter double-quoted.

Here are 3 strings:

```text
'A\ single\ string
"On each line"
"This one\nis two lines"
```

Single-quoted strings end before any unescaped space, whereas double-quoted strings only end before an unescaped double-quote, so this is a fine string too:

```text
"A direct line
break works, so do
escaped quotes like \"!"
```

[The naïve, probably bug-ridden implementation of parsing and printing](https://github.com/pcarrier/forms/blob/main/src/best.nim) fits in 200 lines of Nim code.

Looking forward to describing the layers above:

- Simple Textual Object Representation (STOR), pretty much a textual [CBOR](https://cbor.io/) with explicitly sized integers;
- FORM Open Representation Model (FORM), an object model consisting of STOR with cycles;
- STORM, the STOR Machine, a virtual machine implementing a concatenative model through a data deque, a context deque, and a stream deque, all containing references to FORM values;
- STORK, the STOR Kernel, a document fed into the machine at startup to initialize its context stack with a base vocabulary for its primitives and commonplace constructs.
