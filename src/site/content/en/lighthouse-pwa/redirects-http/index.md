---
layout: post
title: Does not redirect HTTP traffic to HTTPS
description: |
  Learn how to make your site more secure by redirecting all pages to HTTPS.
web_lighthouse:
  - redirects-http
date: 2019-05-04
updated: 2019-09-19
---

All sites should be protected with HTTPS.
See the [Does not use HTTPS](/is-on-https) post to learn why
and how to set up HTTPS on your server.

## How the Lighthouse HTTP redirection audit fails

[Lighthouse](https://developers.google.com/web/tools/lighthouse/)
flags pages that aren't redirected to HTTPS:

<figure class="w-figure">
  <img class="w-screenshot" src="redirects-http.png" alt="Lighthouse audit showing that HTTP traffic isn't redirected to HTTPS">
</figure>

Lighthouse changes the page's URL to HTTP, loads the page,
and then waits for the event from the [Chrome Remote Debugging Protocol](https://github.com/ChromeDevTools/devtools-protocol)
that indicates that the page is secure.
If Lighthouse doesn't receive the event within 10&nbsp;seconds, the audit fails.

## How to redirect HTTP traffic to HTTPS

Once you've set up HTTPS,
make sure that all unsecure HTTP traffic to your site is redirected to HTTPS:

- Use [canonical links](https://web.dev/canonical) in the head of your HTML page
  to help search engines figure out the best way to get to the page.
- Configure your server to redirect HTTP traffic to HTTPS.
  See your server's documentation to figure out the best way to do this.

## Resources
- [Source code for **Does not redirect HTTP traffic to HTTPS** audit](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/redirects-http.js)
- [Does not use HTTPS](/is-on-https)
- [Document does not have a valid `rel=canonical`](/canonical)
