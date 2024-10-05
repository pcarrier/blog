---
title: Form to mail
date: 2024-10-05
prism: true
---

I suspect a lot of static sites want a single dynamic feature: submitting a form to an E-mail address.

I dove into building a service to make that easy, only to realize that it would be a lot easier and elegant to add it directly to my free static hosting platform, [xmit.co](https://xmit.co).

Here is today's design; I welcome feedback and suggestions.

In my site's HTML, I can add a form like:

```html
<form action="/contact" method="POST" enctype="multipart/form-data">
  <input type="text" name="name" placeholder="Name" required />
  <input type="email" placeholder="E-mail" name="email" required />
  <input type="subject" placeholder="Subject (optional)" name="subject" />
  <textarea name="message" placeholder="Message" required></textarea>
  <select name="domain">
    <option value="personal">personal</option>
    <option value="work">work</option>
    <option value="hobby">hobby</option>
  </select>
  <input type="file" name="files" multiple />
  <button type="submit">Send</button>
</form>
```

for this (now working) example:

<form action="/contact" method="POST" enctype="multipart/form-data" style="display: flex; flex-direction: column; align-items: start; gap: .2em">
  <input type="text" name="name" placeholder="Name" required>
  <input type="email" placeholder="E-mail" name="email" required>
  <input type="subject" placeholder="Subject (optional)" name="subject">
  <textarea name="message" placeholder="Message" required></textarea>
  <select name="domain">
    <option value="personal">personal</option>
    <option value="work">work</option>
    <option value="hobby">hobby</option>
  </select>
  <input type="file" name="files" multiple>
  <button type="submit">Send</button>
</form>

To activate it, I add to my site's [`xmit.toml`](https://xmit.co/docs):

```toml
[[forms]]
from = "/contact"
to = "pc@rrier.fr"
then = "/posts/form2mail/"
```

I can then receive an E-mail like:

```text
From: "John Doe" &lt;john.doe.gmail.com@forms.xmit.co&gt;
Reply-To: "John Doe" &lt;john.doe@gmail.com&gt;
Subject: [nothing.pcarrier.com] Hello

---
domain = 'personal'
---

How are you?
```

`enctype` is only required for file uploads, and all fields are optional. If I POST nothing (`curl -d '' https://nothing.pcarrier.com/contact`), I receive:

```text
From: "nothing.pcarrier.com" &lt;noreply@forms.xmit.co&gt;
Reply-To: "nothing.pcarrier.com" &lt;noreply@forms.xmit.co&gt;
Subject: [nothing.pcarrier.com] Form submission
```

`then` is a URL to redirect to after the form is submitted. When absent, we serve whatever resource is at the requested URL.

I can't quite think of anything important missing in this design; can you?
Are there other such small features you'd like to receive from your static hosting provider?
I appreciate all feedback!
