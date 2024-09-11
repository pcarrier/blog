---
title: "Fediverse identity ownership falls short"
date: 2024-09-06
---

I enjoy using my own domains — though I rent a few too many! One of them, `rrier.fr` was originally purchased solely so I could use [pc@rrier.fr](mailto:pc@rrier.fr) as my E-mail address.

Naturally, I wanted to also be known as [@pc@rrier.fr](https://rrier.fr/@pc) on the Fediverse, as part of owning my online identity. Unfortunately, this turned out more challenging that I expected. Here are a few approaches I tried and what I learned along the way.

## Forwarding WebFinger

My first approach, documented during [my migration to xmit.co](https://xmit.dev/posts/pcarrier-com/), was to set up a WebFinger redirect. [https://rrier.fr/.well-known/webfinger](https://rrier.fr/.well-known/webfinger) redirected to [https://mastodon.social/.well-known/webfinger?resource=acct%3Apcarrier%40mastodon.social](https://mastodon.social/.well-known/webfinger?resource=acct%3Apcarrier%40mastodon.social), the WebFinger URL for [@pcarrier@mastodon.social](https://mastodon.social/@pcarrier).

This let people search for `@pc@rrier.fr` and find an account. Unfortunately, that indirection would be resolved right there and then: they would then see and follow the [mastodon.social](https://mastodon.social) account. I couldn't move providers smoothly, as the process to relocate an account disappears all previous content.

I wanted more control over where my content is hosted and stored authoritatively. Onto what seemed like the natural solution.

## Running [Mastodon](https://joinmastodon.org/)

In my opinion, for a single customer, a server requires too much setup and maintenance work, and too many resources. I gave up a few steps into an installation when I realized the amount of memory my VPS would probably need, so I can't say much more.

I looked around, and found what I think is a better solution for my needs:

## Running [GoToSocial](https://gotosocial.org/)

Setup was a breeze. Everything is lightweight and fast. I have minor complaints, notably lack of edit capability (already on the [roadmap](https://github.com/superseriousbusiness/gotosocial/blob/main/ROADMAP.md)), but it's a fantastic piece of software.

It does, however, suffer from what appears to be limitations inherent to the design of the Fediverse:

- ~~My instance is federated with over 2000 other instances, but I don't see their content when looking up or following a hashtag. It only finds stuff that already appeared in the timeline of my lone user… Makes following hashtags pointless, something that I found super valuable when I was on a big instance.~~ **Edit:** Unfortunately [not supported by GoToSocial](https://github.com/superseriousbusiness/gotosocial/issues/1123), [relays](https://relay.fedi.buzz) are a solution to this problem. A tad cumbersome (either hashtag-specific and I need to administer their list whenever (un)following hashtags, or extreme overhead). Thanks [Fedi Jedi](https://mstdn.cool/@fedijedi) for [the tip](https://mstdn.cool/@fedijedi/113087513438881596)!

- ~~I can't boost or reply to toots of people I don't already follow, unless they were boosted by the accounts my instance follows… Following them doesn't backfill their history on my instance, so the existing toot remains out of reach.~~ **Edit:** Search the toot by URL in your client to reach it. Not intuitive to me, but simple. Thanks [Aaron Parecki](https://aaronparecki.com/) for the tip!

~~I'd love to learn that those issues can be addressed without protocol changes, or that such protocol changes are underway. In the meantime, I've learnt to live with those grievances.~~ **Edit:** Not a great UX, but everything seems workable in the end.
