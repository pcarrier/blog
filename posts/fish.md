---
title: My fish shell
date: 2024-09-12
prism: true
---

After many years on an ever-growing [`zsh`](https://zsh.sourceforge.io/) configuration,
I switched to [`fish`](https://fishshell.com/).

While perfectly satisfied with my setup, I wanted something I could recommend to a beginner.
`fish`'s simplicity and modern defaults seem like a much better starting point if eschewing POSIX compatibility.

My configuration hasn't grown much since, but a few quality of life improvements have accumulated, so I figured it is worth sharing.

## `~/.config/fish/config.fish`

I made it so it could be copied anywhere; none of the tools _need_ to be installed, but they will be enabled if they are.

```shell
if type -q /opt/homebrew/bin/brew; /opt/homebrew/bin/brew shellenv       | source; end
if type -q keychain;               keychain --eval --quiet --inherit any | source; end
if type -q direnv;                 direnv hook fish                      | source; end
if type -q fzf;                    fzf --fish                            | source; end
if type -q zoxide;                 zoxide init fish                      | source; end
if type -q mise;                   mise activate fish                    | source; end
```

1. The first line takes care of enabling [Homebrew](https://brew.sh/) on Apple Silicon macOS.
2. [`keychain`](https://www.funtoo.org/Funtoo:Keychain) starts SSH and GPG agents as needed.
3. [`direnv`](https://direnv.net/) automatically sets up environments per project.
4. [`fzf`](https://github.com/junegunn/fzf) is a fuzzy finder that can be used to search for files and commands.
5. [`zoxide`](https://github.com/ajeetdsouza/zoxide) speeds up file system navigation. I barely `cd` anymore.
6. [`mise`](https://github.com/mise-app/mise) manages versioned toolchains per project.

## `~/.config/fish/functions/`

All my functions worth sharing are saved aliases, so I provide commands to recreate them.

### `c.fish`, `g.fish`

`clear` the shell, invoke `git` in one character.

```shell
> alias --save c clear
> alias --save g 'command git'
```

### `cat.fish`

Replace `cat` with [`bat`](https://github.com/sharkdp/bat). Use `/bin/cat` when you need the real thing.

```shell
> alias --save cat bat
```

### `dl.fish`

Download files with [`aria2`](https://aria2.github.io/).

```shell
> alias --save dl 'aria2c -x5 -j5'
```

### `ls.fish`

Use [`eza`](https://github.com/eza-community/eza) instead of `ls`.

```shell
> alias --save ls 'eza --color=always --icons=always --long --git'
```

## Leverage `eza` and `bat` in `fzf`

```shell
> set -U FZF_ALT_C_OPTS  "--preview 'eza --tree --color=always {}'"
> set -U FZF_CTRL_T_OPTS "--preview 'bat -n --color=always --line-range :500 {}'"
```

## Get rid of the greeting

I don't need to be welcomed and invited to type `help` every time.

```shell
> set -U fish_greeting
```
