---
pubDate: 2025-04-05 # TODO
title: Running your own "Cloud" at home
description: For a while now, I've been tired of having the likes of Google, Microsoft and Facebook in my life. First, they lure you in with free storage and useful apps like office suites, calendars, photos, todos and so on. Then they lock your in their ecosystem, steal your data, serve you ads and exploit you as much as possible.  I built my own server at home to own my data, run these apps myself and take back control of my digital life.
descriptionAsFirstParagraph: true
---

In this article, I'll be showing off the end result of all my work. I won't go into the details of how I implemented this. Instead, I'll focus on the high level pieces and how they fit together. Truth be told, I took the turbo-nerd / niche approach to building this home server and I don't think that it's appropriate for most folks including the tech savvy ones.

There's a a lot of pieces to this. We'll be looking at:

- [Hardware](#hardware)
- [Core Application and Features](#core-applications-and-features)
- [Plumbing](#plumbing)
- [Remote Access](#remote-access)

For each of these sections, I'll go over the choices that I've made for myself as well as some alternatives. Most importantly, I'll highlight some of the important lessons that I learned.

## Hardware

To store all our data and run these applications, we need some equipment. In practice, That means building or buying a server.

The term "server" might be somewhat confusing or even spooky to some people. Let me reassure you. A server is just a computer. The word "server" is about describing what it does as opposed to what it is. Unlike a normal computer that you use through a mouse, keyboard and screen, a server is a computer that just runs in the background and that you access through web, mobile or desktop apps on another computer, smartphone or tablet.

In my case, I ended up with what I lovingly refer to as my "old clunker". A friend of mine, had an old [home theatre PC](https://en.wikipedia.org/wiki/Home_theater_PC) lying around that he let me use. The computer was missing a power supply so I bought that. I went with a [Corsair RM750e](https://www.corsair.com/us/en/p/psu/cp-9020262-na/rme-series-rm750e-fully-modular-low-noise-atx-power-supply-cp-9020262-na) (750w 80 plus gold). It's probably overkill for this but I figured that I might be able to use it for some other purpose if this didn't work out. For a nerd like me, a spare power supply is good thing to have.

With a nickname like "old clunker", my server has specs to match:

- Motherboard: Harvested from an old HP Pavilion desktop
- CPU: Intel Core 2 Quad Q6600 - 4 cores @ 2.4GHz
- Memory: 8GiB DDR 2 - 4 x 2GB @ 800 MHz
- Disk: 240GB Intel Sata SSD - An old one

For those who don't understand all this technobabble, all you need to know is that this hardware is 15+ years old and it's no where near performant for today's standards. The disk is a bit more recent I think but it's still old.

The lesson here is that for my use case, I didn't need good or fast hardware at all. I'm honestly surprised and impressed that I'm getting acceptable performance out of this ancient hardware. The only potential issue here is power efficiency. Old hardware like this is not very power efficient compared to today's hardware. This is probably costing me more electricity than it should.

If you're thinking about going down the path of running a server at home like I am, you should consider rescuing an old computer. It's the cheapest option and giving an old computer a new life always gives a nice warm feeling.

If you do this, you'll want to be mindful of the disk. If it's a mechanical disk (spinning platters), you should probably upgrade it to an SSD. Old mechanical disks are incredibly slow. You'll go from unbearable performance to acceptable performance. You'll also want to check this [disk's health](https://en.wikipedia.org/wiki/Self-Monitoring,_Analysis_and_Reporting_Technology). Disks eventually fail with time and use. You don't want to put your data on an disk that's about to fail.

Another thing to be mindful of is noise. Old computers can get pretty noisy. Since this will be running 24/7, you'll want to have a noise level that you can live with. This can be solved by cleaning out the computer, switching out the fans or locking it away in a closet.

There are alternatives to rescuing an old computer:

- You can buy a Mini PC. They're pretty cheap, low power and have a small form factor. Upgradability and storage is limited.
- You can buy a NAS. They're good at dealing with larger amounts of storage but they can be more pricey and they can limit you on the kind of operating system or software you can run.
- You can upgrade your current computer and use the leftover parts to cobble together a server. It's a good way to justify that upgrade you've been wanting for a while.
- You can build a whole new computer for this purpose. That takes some technical knowhow but some people are into that. 🤓

When it comes to hardware, what's important is finding something that matches your use-case and needs. I have very simple needs so my hardware requirements are low. If you want to do stuff like media streaming or running an AI assistant, you'll need more performant and maybe specialized hardware.

## Core Applications and Features

### Files, Photos, Calendars, Todos, etc.

### Office Suite

### Password Manager

### Feed Aggregator

### Documents Archive

### Dashboard and Landing Page

### Backups

### Network-Wide Ad-Blocking

## Plumbing

### Monitoring

### Alerting

### Reverse Proxy

### Operating System

## Remote Access
