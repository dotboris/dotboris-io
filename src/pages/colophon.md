---
layout: ../layouts/MarkdownPage.astro
title: Colophon
description: >
  About this website. How does it work? What's the tech behind it? And so on.
---

## Colophon

A [colophon](<https://en.wikipedia.org/wiki/Colophon_(publishing)>) is a fancy
shmancy term from book publishing. In that context, it's a page that contains
information about the book itself. In the case of a website, it's a page that
talks about the website itself. How it's made? What tools are being used? Things
like that. It's sometimes also referred to as a "meta" page.

The code for this website is fully available on
[GitHub](https://github.com/dotboris/dotboris-io). If you want to deep dive and
look at the details, feel free to jump into that.

This website is built with [astro](https://astro.build/), a web framework /
static site generator. I picked astro because it generates static content but it
lets you easily sprinkle in more dynamic components when you need them. This is
great because you get the blazing fast performance of static HTML without
sacrificing dynamic components. For example, I use this feature for my little
avatar at the top left of the header. Try it for yourself. Give it a click.

Astro lets you choose a lot of stuff about the stack / tools you use. So here's
a rapid-fire list of what I use:

- Code and logic is in [TypeScript](https://www.typescriptlang.org/).
- Most components are made in [React](https://react.dev/) (`.tsx`) with a few
  made with [astro
  components](https://docs.astro.build/en/basics/astro-components/) (`.astro`).
  - I use [shadcn/ui](https://ui.shadcn.com/) as a starter for most components.
- Styling is done through [Tailwind](https://tailwindcss.com/).
  - Base styles for text content are done through the [Tailwind
    typography](https://github.com/tailwindlabs/tailwindcss-typography) plugin.
- Most pages and articles are written in markdown (`.md`). There are a few
  exceptions to that rule:
  - I use MDX (`.mdx`) for pages that are mostly text content but need a bit of
    fancy logic or components.
  - I use astro components (`.astro`) for pages with a more complex structure.
  - I use [astro endpoints](https://docs.astro.build/en/guides/endpoints/) to
    generate pages or files that aren't HTML (RSS feed, robots.txt, etc.)

I use [Netlify](https://www.netlify.com/) for hosting. It's a CDN that's pretty
great for hosting static content. So far, it hasn't cost me anything. It seems
like their free tier is pretty generous. We'll see how long that lasts.

My domain (`dotboris.io`) is registered through
[Cloudflare](https://www.cloudflare.com/products/registrar/). They sell domain
names at cost so it's probably one of the cheapest ways to get a domain. I also
use them as my [DNS
server](https://www.cloudflare.com/application-services/products/dns/). This
doesn't cost me anything since I fit in their free tier. What's nice with
Cloudflare is that they're a mature cloud provider with the kind of features
you've come to expect: MFA, API access, infra as code providers, etc. This is
important to me because I also use my domain for my home server. These features
come in handy for things like generating certificates.

I don't use any form of tracking or analytics service. While I think that it'd
be nice to have some stats on this website, I don't think that it's worth
tracking you over it. I don't like getting tracked so why should I track you. I
simply trust that people stumble on my website from time to time and enjoy
themselves.

I don't code or write using AI but I do sometimes use it to review my content.
I'm really bad with typos and it's helpful for spotting those. When I do use AI,
I always use a local model that I host through [Ollama](https://ollama.com/). I
usually interact with those self-hosted models through
[OpenCode](https://opencode.ai/).
