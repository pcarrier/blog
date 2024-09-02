---
title: "Finding the Fedora 15 installer"
date: 2011-05-25
---

On [fedoraproject.org](http://fedoraproject.org/), the new prominent installation media with Fedora 15 is the live desktop, eg. `Fedora-15-x86_64-Live-Desktop.iso`.

Download it, boot it in VirtualBox. Gnome 3 will use the fallback mode. How do you start the installer? Well, turns out it is normally made prominent by a Gnome Shell extension (`~/.local/share/gnome-shell/extensions/Installer@shell-extensions.fedoraproject.org/`).

Did I mention that in fallback mode, which you can enjoy with most virtualization technologies, Gnome Shell is not running? Instead the installer ends up in the menu. Somehow it took me over 15 minutes to find it. Most people would be ashamed, I blog about it.

In case you wonder how to start the Fedora 15 installer in your virtual machine (SEO)… You can find it in Applications → System Tools → Install to Hard Drive. Alternatively, Alt+F2, `liveinst`. My bad for not partaking in the testing effort…

It makes me feel old and nerdy, but I love console-based installation processes.
