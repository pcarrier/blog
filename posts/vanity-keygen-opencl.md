---
title: Vanity SSH keys at 300M/s on OpenCL
date: 2026-07-18
prism: true
---

A few years ago I published [vanity-keygen](https://github.com/pcarrier/vanity-keygen),
a small Go program that brute-forces ed25519 SSH keypairs until the public key matches a regex.
It did about 250k keys per second on my 32-core machine: a minute for `love$`,
days for `[pP][cC][aA][rR][rR][iI1][eE][rR]`.

This week an LLM rewrote it from scratch in Rust, with all of the cryptography
hand-rolled in a single OpenCL kernel. I provided direction, benchmarks on my hardware,
and an RTX 4090; every line of code, including the test suite, is its. Kudos Kimi K3!
It now does 300 million keys per second, 1200× faster, and my pattern lands in minutes.

## Everything on the device

Each work item derives candidates end-to-end in
[`kernels/vanity.cl`](https://github.com/pcarrier/vanity-keygen/blob/main/kernels/vanity.cl),
with no library code:

- SHA-512 of a 32-byte seed, specialized to a single block;
- clamping, then scalar multiplication against the ed25519 basepoint;
- field arithmetic mod 2^255−19, donna-style, 5 unsigned 64-bit limbs in radix 2^51;
- compressed-point encoding, SSH blob, base64;
- matching against a compiled filter.

A GPU can't run an arbitrary regex, so the host compiles the pattern
(through [`regex-syntax`](https://docs.rs/regex-syntax)'s HIR) into per-position
bitmasks over the base64 alphabet: literals become singleton masks, `[pP]` a 2-bit mask,
`love$` a suffix-anchored window. The kernel only uses that as a prefilter;
the host re-derives every survivor with `ed25519-dalek` and applies the real regex.
A kernel filter bug can cost speed, never correctness.

## Wrong in ways ref10 knew about

The first kernels produced plausible-looking but wrong public keys.
The trail (right scalar, wrong point, encoding off by exactly 19) led to two
transcription errors:

1. In `fe_mul`, it wrote the schoolbook product with a uniform `19·g_j` factor on
   wrap-around terms. The alternating 26/25-bit radix means products with both indices
   odd carry an extra factor of 2, so those wraps need 38, not 19. That's why ref10
   doubles the odd `f` limbs (`f1_2`, `f3_2`, …).

2. In `fe_tobytes`, it added a `h0 += 19 * carry9` that ref10 deliberately drops.
   The canonicalization already accounts for it, so outputs came out as `y − 19`.

Both were caught in minutes: the test suite it had written compares the kernel against
`ed25519-dalek` on scalars, public keys, and edge cases (`0·B`, `L·B`, `0xff…`).
I wouldn't let it hand-roll crypto without one.

## Making it fast

The naive kernel (double-and-add, generic square-and-multiply inversion) did 6.4M keys/s.
Classic tricks, applied one benchmark at a time, multiplied that by 47:

- A fixed-window table of precomputed basepoint multiples in `(y+x, y−x, 2d·xy)` form,
  generated on-device at startup, so no host-side bignum. 32 unsigned 8-bit windows:
  98.5M keys/s.
- ref10's `fe_sq` and an addition-chain inversion: 146M keys/s.
- Montgomery batch inversion, one field inversion shared across the 32 keys each
  work item derives (64 spills registers and halves throughput): 167M keys/s.
- Radix 2^51 limbs, 5×u64 with `mul_hi` for 128-bit products: 175M keys/s.
- Signed 12-bit windows, down to 22, negating table points by swapping `(y+x, y−x)`
  and flipping `2d·xy`: 230M keys/s.
- Signed 16-bit windows, down to 16 lookups, with a bug the tests caught immediately:
  16 windows cover exactly 256 bits, the recode's final carry escapes, and the computed
  point loses `2^256·B`. One more table slot adds that point back when the carry fires:
  300M keys/s.

Even pocl on CPU went from 117k to 3M keys/s, 12× the old Go version without a GPU.

## Fine print

Patterns must compile to the mask form: literals and character classes over the base64
alphabet, optional `^`/`$` anchors. I believe this covers everybody's needs; alternation and
repetitions get a clear error.

Build and run with the included flake (`nix build`, or `nix develop` for a shell with
cargo, clinfo and pocl). The binary picks your first GPU; `-device N` overrides.
`cargo test` runs the kernel comparisons on any available OpenCL device, pocl included,
so CI works too. The default launch is 1M candidates wide, 64k on CPU runtimes after
pocl choked on the private-memory footprint.

```text
$ vanity-keygen 'zz$'
2026/07/18 18:08:58Z Looking for a public key matching zz$ on NVIDIA GeForce RTX 4090
2026/07/18 18:08:58Z Public key:
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILV3mLbw7VC7VLOkTxGQkyogoGFTq4fbZpJbsRZv5hzz
```

The [code is on GitHub](https://github.com/pcarrier/vanity-keygen), ISC-licensed,
small enough to read in one sitting.
