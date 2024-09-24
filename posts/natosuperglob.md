---
titlehtml: <code>nato</code>, <code>superglob</code>
title: nato, superglob
date: 2011-05-12
prism: true
---

When you end up having to dictate Unix commands over the phone, you quickly learn from your colleagues that optimism doesn’t compensate your French accent. Turns out cancelling your lovefilm subscription triggers a similar problem.

The most common answer is to involve the NATO phonetic alphabet. Looking up a table pinned to your desk is tedious, getting fluent takes time. That’s where [`nato`](https://github.com/pcarrier/stuff/blob/master/fun/nato.c) kicks in.X

Not much to say, really:

```shell
$ nato 'lspci|grep VGA'
lima, sierra, papa, charlie, india, pipe, golf, romeo, echo, papa, space, uppercase victor, uppercase golf, uppercase alpha,
$
```

After this very useful piece of software (at least to some), let’s have a look at something stupid and useless (I won’t even bother trying to explain the silly reason I needed it). If you ever have a good, real-life reason to run [`superglob`](https://github.com/pcarrier/stuff/blob/master/fun/superglob.c), please E-mail me right away, I’ll owe you the drink of your choice. The idea is to build a glob matching all the arguments provided, but as little more as possible (and we’re far from being clever here).

```shell
$ superglob Hello World
[HW][eo][lr]l[do]
$ superglob Foo 'Bar Mitzvah'
[BF][ao][or]*
$ superglob /lib64/libpamc.so.0 \
  /lib64/libpamc.so.0.81.0 /lib64/libpam_misc.so.0 \
  /lib64/libpam_misc.so.0.81.2 /lib64/libpam.so.0 \
  /lib64/libpam.so.0.81.5
/lib64/libpam[._c][.ms][ios][.os][.0c]*
```

A good example of a really silly behaviour (here, \*ahello would likely be the best choice):

```shell
$ ~/usr/bin/superglob ahello bahello cbahello
[abc][abh][aeh][ehl][el][lo]*
```
