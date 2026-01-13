---
layout: ../layouts/MarkdownPage.astro
title: Uses
description: Hardware, software, and gear that I use for work or fun.
---

# Stuff I use

For the curious, here's the hardware, software, and gear that I use for work and for fun. It's not an exhaustive list but it covers the stuff that matters to me and that you might like to know about. I try to keep a lot of this as reproducible as possible in my Nix based [config](https://github.com/dotboris/config). This mostly covers software. I don't think that Nix is super accessible for most people but you should be able to read the code and get an idea of how I configure certain things.

## Computers

**Desktop**: This is my primary workstation. I use this to work on personal project, for gaming and to browse the web. I've been upgrading this desktop for years now. I don't remember what it originally was anymore. [Is it even the same computer?](https://en.wikipedia.org/wiki/Ship_of_Theseus) Who knows?

The coolest thing I can say about this, is that I've been carrying over the same installation of Arch Linux for years now (I forget how many). It even survived a few disk migrations through the power of [LVM](https://wiki.archlinux.org/title/LVM).

- CPU: AMD Ryzen 7 3800X (8 cores, 16 threads, 3.9GHz)
- Memory: 32GB (DDR4 @ 3600MHz)
- Storage: 500GB NVMe SSD
- GPU: AMD Radeon RX 6700 XT 12GB
- OS: Arch Linux
- Desktop: KDE Plasma

**Laptop**: This is the computer that I carry around with me. I use it to work on personal projects and to browse the web. While it can do some gaming, I don't use it for that. I originally bought this because I was getting sick of only having my phone as a portable compute device. It was a great decision. If you can afford it, I recommend getting a laptop, it's wonderful.

I usually bring my laptop when I visit friends and family. When things quiet down and we don't have things to talk about anymore, I can pull out my laptop and do a little work. It lets me hang out with people even when do don't have an activity or things to talk about. It also lets us take a break and get back to hanging out.

My laptop's configuration is managed through NixOS and Home Manager. If you want to see exactly how things are setup, check the [files on GitHub](https://github.com/dotboris/config/tree/main/profiles/foxtrot). The Nix syntax and modules might not be accessible to everyone but you can get a good idea of how I've set things up.

- [Framework 13](https://frame.work/ca/en/laptop13)
- CPU: AMD Ryzen AI 5 350 (6 core, 12 threads, up to 4.6GHz)
- Memory: 48GB (DDR5 @ 5600MHz)
- Storage: 2TB NVMe SSD
- OS: NixOS
- Desktop: KDE Plasma

**Home Server**: This is an old computer that I use to host services that I find useful. See the [self-hosted services](#self-hosted-services) section below to get an idea of which services I run. This is an ancient media center PC that my buddy gave me. I bought a new power supply and gave it a new life. Despite its ancient and underpowered hardware, it does the job quite well.

The server's full configuration is managed though NixOS and configuration as code. See the [repo on GitHub](https://github.com/dotboris/homelab/) for the gory details.

- CPU: Intel Core2 Quad Q6600 (4 cores, 2.4GHz)
- Memory: 8GB (DDR2 @ 800MHz)
- Storage: 250GB SSD
- OS: NixOS

## Software

[Thunderbird]: https://www.thunderbird.net
[Nextcloud]: https://nextcloud.com/
[VSCodium]: https://vscodium.com/

- Editor / IDE: [VSCodium], VSCode without all the Microsoft crap. ([config](https://github.com/dotboris/config/blob/main/modules/home/vscode/default.nix))
- Terminal: [Ghostty](https://ghostty.org/) ([config](https://github.com/dotboris/config/blob/main/modules/home/ghostty.nix))
- Shell: [Fish](https://fishshell.com/) with nice CLI apps. ([config](https://github.com/dotboris/config/blob/main/modules/home/shell.nix))
- Search Engine: [SearXNG](https://searxng.org/), searches across multiple search engines and prevents them from tracking me.
- Browser: [Firefox](https://www.firefox.com/) and [Zen Browser](https://zen-browser.app/).
- Files: [Nextcloud] synced through their desktop and mobile apps.
- Photos: [Nextcloud] synced through the mobile app.
- Email: [Thunderbird] with Gmail. (I need to switch to something else.)
- Calendar: [Thunderbird] on desktop + [Fossify Calendar](https://github.com/FossifyOrg/Calendar) on mobile + [Nextcloud] as the backend.
- Todos: [Thunderbird] on desktop + [Tasks.org](https://tasks.org/) on mobile + [Nextcloud] as the backend.
- Notes: Markdown files edited in [VSCodium] and synced to [Nextcloud].
- Office suite: [Libreoffice](https://www.libreoffice.org/) with files synced to [Nextcloud].
- Password manager: KeePass files synced through [Nextcloud]. ([KeepPassXC](https://keepassxc.org/) on desktop, [Keepass2Android](https://github.com/PhilippC/keepass2android) on mobile)
- Feed Reader: [FreshRSS](https://freshrss.org/) in my browser.
- Gaming: [Steam](https://steampowered.com/) and [Lutris](https://lutris.net/). I try to buy most games from [GOG](https://www.gog.com/).
- Music: YouTube Music.

## Self-hosted services

I host a bunch of services on my home server. This lets me escape the clutches of big tech and lets me control my data. As big tech has been trying more and more to push junk down our throats and milk us for every penny, it's nice to have this oasis of freedom. When I'm at home, I can connect to the server directly. When I'm on the go (laptop, phone, tablet), I use [Tailscale](https://tailscale.com/) for remote access.

This server's configuration is all managed as code through NixOS. You can see the details in the [repo on GitHub](https://github.com/dotboris/homelab/). Here are the different services / features that I host on my home server:

- Network wide Ad-blocking. ([config](https://github.com/dotboris/homelab/blob/main/modules/dns/default.nix))
- [Nextcloud]: Files, calendar, contacts, todos, bookmarks. ([config](https://github.com/dotboris/homelab/blob/main/modules/nextcloud/default.nix))
- [Paperless-ngx](https://docs.paperless-ngx.com/): Document archive software. ([config](https://github.com/dotboris/homelab/blob/main/modules/documents-archive/default.nix))
- [SearXNG](https://searxng.org/): Search engine that searches across other search engines and prevents them from tracking me. ([config](https://github.com/dotboris/homelab/blob/main/modules/search/default.nix))
- [FreshRSS](https://freshrss.org/): Feed reader. ([config](https://github.com/dotboris/homelab/blob/main/modules/feeds/default.nix))
- Backups: [Standard Backups](https://github.com/dotboris/standard-backups) with [Restic](https://restic.net/). ([config](https://github.com/dotboris/homelab/blob/main/modules/backups/default.nix))

For those curious about the inner workings, here are some of the behind the scenes pieces:

- DNS Server: [CoreDNS](https://coredns.io/) ([config](https://github.com/dotboris/homelab/blob/main/modules/dns/default.nix))
- Reverse Proxy: [Traefik](https://traefik.io/) ([config](https://github.com/dotboris/homelab/blob/main/modules/reverse-proxy/default.nix))
- Monitoring: [Netdata](https://www.netdata.cloud/open-source/) ([config](https://github.com/dotboris/homelab/blob/main/modules/monitoring/netdata.nix))
- Alerting: [ntfy.sh](https://ntfy.sh/) ([config](https://github.com/dotboris/homelab/blob/main/modules/monitoring/ntfy.nix))
- Landing page / dashboard: [Homepage](https://gethomepage.dev/) ([config](https://github.com/dotboris/homelab/blob/main/modules/home-page/config.nix))
