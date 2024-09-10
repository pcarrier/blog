---
title: My fish shell
date: 2024-09-12
prism: true
---

After many years on an ever-growing [`zsh`](https://zsh.sourceforge.io/) configuration,
I switched to [`fish`](https://fishshell.com/) a few years ago.

While perfectly satisfied with my setup, I wanted something I could recommend to a beginner.
`fish`'s simplicity and modern defaults seem like a much better starting point if eschewing POSIX compatibility.

My configuration hasn't grown much since, but a few quality of life improvements have accumulated, so I figured it is worth sharing.

## Installs on Apple Silicon macOS

Let's assume you're starting from scratch and want to adopt all my suggestions. Open `Terminal.app` and run the following:

```shell
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
$ /opt/homebrew/bin/brew install aria2 bat delta direnv eza fish fzf keychain mise tig wezterm zoxide
$ chsh -s /opt/homebrew/bin/fish
```

## `~/.wezterm.lua`

Most likely, you'll need to choose another font on line 3.

Unless, of course, you're interested in purchasing [PragmataPro](https://www.fsd.it/shop/fonts/pragmatapro/), a most excellent project I use nearly everywhere (eg [my main site](https://pcarrier.com)).

```lua
local wezterm = require 'wezterm'
local config = wezterm.config_builder()
config.font = wezterm.font 'PragmataPro Liga'
config.font_size = 14
config.hide_tab_bar_if_only_one_tab = true
config.native_macos_fullscreen_mode = true
config.pane_focus_follows_mouse = true
config.use_fancy_tab_bar = false
config.window_decorations = 'RESIZE'
config.window_padding = { left = 0, right = 0, top = 0, bottom = 0 }
return config
```

## `~/.config/fish/config.fish`

I made it so it could be copied anywhere; none of the tools _need_ to be installed, but they will be enabled if they are.

```shell
if type -q /opt/homebrew/bin/brew; /opt/homebrew/bin/brew shellenv       | source; end
if type -q keychain;               keychain --eval --quiet --inherit any | source; end
if type -q direnv;                 direnv hook fish                      | source; end
if type -q fzf;                    fzf --fish                            | source; end
if type -q zoxide;                 zoxide init fish                      | source; end
if type -q mise;                   mise activate fish                    | source; end
if type -q caniuse;                caniuse --completion-fish             | source; end
```

1. The first line takes care of enabling [Homebrew](https://brew.sh/) on Apple Silicon macOS.
2. [`keychain`](https://www.funtoo.org/Funtoo:Keychain) starts SSH and GPG agents as needed.
3. [`direnv`](https://direnv.net/) automatically sets up environments per project.
4. [`fzf`](https://github.com/junegunn/fzf) is a fuzzy finder that can be used to search for files and commands.
5. [`zoxide`](https://github.com/ajeetdsouza/zoxide) speeds up file system navigation. I barely `cd` anymore.
6. [`mise`](https://github.com/mise-app/mise) manages versioned toolchains per project.
7. [`caniuse`](https://github.com/bramus/caniuse-cli) is [caniuse.com](https://caniuse.com/) for the command line.

We've reached the right step to switch from `Terminal.app` and `zsh` to `WezTerm` and `fish`.
Close `Terminal.app` and start `WezTerm` before we move along.

## Install `node` and `caniuse` through `mise`

```shell
> mise use -g node@latest
> npm install -g @bramus/caniuse-cli
```

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

## `~/.ssh/config` extracts

I like my keys to be added to the agent automatically on first use, for host keys to be automatically accepted for new hosts, and to minimize bandwidth consumption.

```ssh
AddKeysToAgent yes
Compression yes
StrictHostKeyChecking accept-new
```

## `~/.gitconfig` extracts

With this configuration in place, `git help config` should open a page in your browser. I won't describe every detail, but a few essentials.

Only including 2 aliases, `ss` and `sss`, as everyone should know how `status` offers a compact output with `-s` and `-b`, and is sped up by `-uno` to avoid looking at the working tree in large repositories.

You should try `tig` for a quick view of your repository's history. `lazygit` does a lot more.

You can and should sign your commits with `ssh` (unless you prefer PGP).

```ini
[core]
	autocrlf = false
	whitespace = blank-at-eol,blank-at-eof
	pager = delta
[gc]
	auto = 0
[user]
	signingKey = ~/.ssh/id_ed25519
[fetch]
	prune = true
[push]
	default = current
[rerere]
	enabled = true
	autoUpdate = true
[color]
	ui = true
[branch]
	autosetuprebase = always
[log]
	date = iso
[rebase]
	autosquash = true
	autostash = true
[alias]
	cm = commit -v
	ss = status -sbuno
	sss = status -sb
[tag]
	sort = version:refname
[tig]
	show-changes = true
	commit-order = topo
	line-graphics = utf-8
	mouse = true
	blame-options = -C -C -C
[difftool]
	prompt = false
[mergetool]
	prompt = false
[commit]
	gpgsign = true
[pull]
	rebase = true
[init]
	defaultBranch = main
[help]
	format = web
[gpg]
	format = ssh
[submodule]
	recurse = true
[interactive]
	diffFilter = delta --color-only
[delta]
	navigate = true
	side-by-side = true
[merge]
	conflictstyle = diff3
[diff]
	colorMoved = default
```
