---
title: xmit.it
date: 2024-10-08
---

Started working on a mailing list+log service, [xmit.it](https://xmit.it). If you have branding ideas, reach out!

The idea:

- E-mail [`claim@acme.xmit.it`](mailto:claim@acme.xmit.it) to make [`acme.xmit.it`](https://acme.xmit.it) yours;
- E-mail [`subscribe@acme.xmit.it`](mailto:subscribe@acme.xmit.it) to subscribe to the list;
- E-mail [`post@acme.xmit.it`](mailto:post@acme.xmit.it) to post to the list, either in HTML or markdown;
- Posts are forwarded aliased to subscribers, visible on [`acme.xmit.it`](https://acme.xmit.it) and in its Atom feed;
- Responses to posts are forwarded to the original poster;
- E-mail [`admin@acme.xmit.it`](mailto:admin@acme.xmit.it) to get a link to the admin interface, where you can:
  - Change your alias (eg `jdoe@acme.xmit.it`);
  - Customize the website's title, description, appearance (fully customizable CSS), etc.;
  - Delete posts;
  - (De-)authorize admins and posters.

Design goals:

- Set up in seconds, zero maintenance;
- Zero tracking, full privacy for both posters and readers;
- The most familiar and lighest interfaces possible;
- JavaScript for progressive enhancements at most.

I might, at some point, try to generate revenue.  
Eg bill for custom domains and/or managed dedicated instances and/or high subscriber counts.
