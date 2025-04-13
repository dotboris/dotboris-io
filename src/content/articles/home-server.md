---
pubDate: 2025-04-05 # TODO
title: Running your own "Cloud" at home
description: For a while now, I've been tired of having the likes of Google, Microsoft and Facebook in my life. First, they lure you in with free storage and useful apps like office suites, calendars, photos, todos and so on. Then they lock your in their ecosystem, steal your data, serve you ads and exploit you as much as possible.  I built my own server at home to own my data, run these apps myself and take back control of my digital life.
descriptionAsFirstParagraph: true
---

In this article, I'll be showing off the end result of all my work. I won't go into the details of how I implemented this. Instead, I'll focus on the high level pieces and how they fit together. Truth be told, I took the turbo-nerd / niche approach to building this home server and I don't think that it's appropriate for most folks including the tech savvy ones.

There's a a lot of pieces to this. We'll be looking at:

- [Hardware](#hardware)
- [Application and Features](#applications-and-features)
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

## Applications and Features

Now that we've got some hardware, it's time to run some applications. This is where we turn this old clunker into something useful. Here, I'll cover the applications that I personally use on my home server. I'll talk about why they're useful to me and how they can be useful to you. Of course, I'll also include some important lessons I've learned from using those applications.

If you're looking for more applications, I recommend that you check out the excellent [awesome-selfhosted](https://awesome-selfhosted.net/) project. It compiles a huge list of applications and services that you can host yourself. They're organized into helpful categories and include some useful stats: GitHub stars, latest release date, technology stack and license.

Some of you might have noticed that I skipped a step here. What about the operating system? Don't you need to install on operating system before you can install applications? Yes you do, but I'm leaving that for later. My goal is to show you the high level pieces that make a home server. I believe that the specific operating system you choose and how you install it is not that important. On a similar note, we'll need to pick a way to deploy and install these applications. All of this will be covered in the [Operating System and Deployment](#operating-system-and-deployment) section.

### Files, Photos, Calendars, Todos, etc.

Woah, that's a lot of features. Luckily for us there's an application that does all of it for us. In my case, I've opted to use the excellent [Nextcloud](https://nextcloud.com/) which handles all of these features for me and potentially more. Nextcloud is hard to describe because of how much it does. It's not just a simple app but rather a platform that you install additional apps into to gain functionality.

When you install Nextcloud you get a few base apps like [files](https://nextcloud.com/files/) and photos as well as some core platform features like settings, users, etc. If you want anything else, you need to install some apps. Here's an overview of the apps that I personally have installed:

- [Calendar](https://apps.nextcloud.com/apps/calendar): Straight forward calendar that you can use in the browser or sync with your devices.
- [Contact](https://apps.nextcloud.com/apps/contacts): Lets you store your contacts information and sync them with your devices.
- [Deck](https://apps.nextcloud.com/apps/deck): Trello-like [Kanban board](https://en.wikipedia.org/wiki/Kanban_board) application. I use this to organize my projects and ideas and to keep track of what I'm working on.
- [Notes](https://apps.nextcloud.com/apps/notes): Lets you write simple notes as [Markdown files](https://en.wikipedia.org/wiki/Markdown). They're stored as simple files making them easy to sync.
- [Tasks](https://apps.nextcloud.com/apps/tasks): Todo app that can be used in the browser or synced with devices. I use this to keep track of simple tasks and stuff like my grocery list.

This is only a small sampling of what's on offer here. Nextcloud has a whole [app store](https://apps.nextcloud.com/) with a ton of useful apps. I've kept things simple on my end to match my needs. You can pack way more feature into Nextcloud if you want to.

#### Synchronization

I've mentioned how some of these Nextcloud apps can be synchronized with other devices. This is all possible through the WebDAV, CardDAV and CalDAV standards. The specifics of synchronization vary on the device and the apps used on that device. What's nice is that since WebDAV, CardDAV and CalDAV are standards, they tend to be supported by most things.

On my desktop, I use linux. Specifically, I run the Gnome desktop environment. Gnome has [built-in support for Nextcloud](https://docs.nextcloud.com/server/latest/user_manual/en/groupware/sync_gnome.html) which allows me to sync calendars and contacts. It also lets me mount my NextCloud files like a normal share and access it through my file manager. On top of this, I also run the [Nextcloud desktop client](https://github.com/nextcloud/desktop). This client allows me to synchronize files between my desktop and Nextcloud.

You'll notice that I have two separate ways of accessing Nextcloud files from my desktop. Why is that? I use the Nextcloud desktop client to synchronize files that I want to have access to even when my server or network might be down. That's mostly critical stuff like my password vault and my notes. I use the mount for everything else. This means that I have added safety around critical files without having to keep copy of all my Nextcloud files on my desktop.

On mobile, I use Android. One thing I learned is that Android doesn't really support WebDAV, CardDAV or CalDAV natively. This is an unfortunately common scenario when it comes to Google. They seem to love inventing their own internal protocols for things that have widely accepted standards. The community has had to fill the gap by building third party apps that handle the synchronization.

I use [DAVx5](https://www.davx5.com/) to synchronize my calendar and contacts. The app is open source. You can [buy it on Google Play](https://play.google.com/store/apps/details?id=at.bitfire.davdroid) or a few dollars or you can [get it for free on FDroid](https://f-droid.org/packages/at.bitfire.davdroid/). For contacts, I use the built-in Contacts app on my phone which handles my synchronized contact correctly. For my calendar, I switched to using [aCalendar](https://play.google.com/store/search?q=acalendar&c=apps) which also works great.

To access my files, I use the [Nextcloud Android app](https://play.google.com/store/apps/details?id=com.nextcloud.client&hl=en-US). It allows me to directly browse and access my files. It also allows me to pick certain folders to synchronize directly on my mobile devices. I use this sync feature to keep a copy of my password vault and notes in case I can no longer access my server. I also use this app to automatically upload photos and videos from my phone to Nextcloud. There's also a companion [Nextcloud Notes](https://play.google.com/store/search?q=nextcloud%20notes&c=apps&hl=en-US) that I use. It makes it easier to view and edit notes on my phone.

For the rest, I just use the Nextcloud interface in my browser. This is both true on desktop and mobile. The best example of this is tasks. While DAVx5 supports synchronizing them, all the todo apps I found on android that were supported just felt wrong to use in one way or another.

#### Quirks and Caveats

While I'm super satisfied with Nextcloud, there are a few quirks and caveats that I think are worth sharing. Those are specific to me and my use cases:

- Nextcloud Tasks doesn't support recurring tasks. There's a [long standing issue on GitHub on this subject](https://github.com/nextcloud/tasks/issues/34) (opened on Jan 2017). It seems like this is a non-trivial feature to implement and that the authors of Nextcloud (which are also the authors of the Tasks app) don't see this as a priority. I've been working around this by either using Google Tasks for those few repeating tasks or by setting them as repeating events in a calendar I call "Reminders".
- Sending calendar invites seems to be bugged. Somewhat recently, Nextcloud added a feature that allows calendar invite emails to be sent through the user's email account (using the Mail app). Previously, such emails would only get sent through the system email account. Unfortunately, this feature [doesn't seem to work correctly](https://help.nextcloud.com/t/cannot-send-calendar-invitation-throught-users-email-account/217347). I've worked around this by taking the `.ics` file for the event and sending it to people directly.
- The Nextcloud file mount through Gnome can sometimes lock up or corrupt files. I've experienced this with my password vault. I've had my password vault completely lock up when trying to save a few times and I've had it get corrupted once. Fortunately, Nextcloud saves older versions of files so I was able to go back. I stopped using the mount to access my password vault and switch to the Nextcloud desktop app.

These are not show stoppers for me. They're outliers in an otherwise pretty great experience.

#### Conclusion on Nextcloud

If you're looking at moving away from Google and Microsoft, one of the first thing you'll need is something like Nextcloud. It offers all the standard / boring applications and features that you just need to have in your digital life. If you're in that situation, Nextcloud is probably one of the first things that you should start using.

One lesson I've learned is that you want to be conservative with the apps you install. It's easy to go overboard and create a mess of applications. Think about the stuff you need and only install the apps for that. It's also worth looking around for other non-nextcloud apps that do what you need. Installing an app in Nextcloud can be convenient, but you might be missing out on better experiences from other apps that don't live in the Nextcloud ecosystem.

On a similar note, you don't need an app on your home server for everything. I found that you're often better off with using normal desktop / mobile apps that operate on files and then storing those files in Nextcloud. We'll see examples of that in the [Office Suite](#office-suite) and [Password Manager](#password-manager) sections below. The simplicity and interoperability of plain files is something that should be be overlooked. You can make copies to back them up and you can share them like any other files.

### Office Suite

This one's going to be a little strange because I only kind-of use my home server for this. I just use [LibreOffice](https://www.libreoffice.org/) on my desktop. For those who are unfamiliar, LibreOffice is an open source office suite that runs on desktop computers. It primarily handles [OpenDocument](https://en.wikipedia.org/wiki/OpenDocument) files (`.odt`, `.ods`, `.odp`, etc.) and is compatible with the Microsoft family of office files (`.docx`, `.xlsx`, `.pptx`, etc.)

You might be wondering: If this is a desktop app, where does the home server part? Isn't that what this article is about? Yes, but also no. So yes, I do use my home server to store those files. I access them on my desktop through my Nextcloud files mount. But also no, this isn't just about having a home server. When it comes to disconnecting yourself from the tech giants of today, there's perfectly good high quality desktop applications that you can use. They don't need to run on a server. That's how we used to do things back in the day and it worked pretty good. You have files on a computer and you used applications to view and edit those files. You can then share or sync those files. You can even have those files live on another computer and access them through a share or mount which is what I'm doing here.

It's worth noting that on mobile, there's a [LibreOffice Viewer](https://play.google.com/store/apps/details?id=org.documentfoundation.libreoffice) app that lets you view your documents. There's also the [Collabora Office](https://play.google.com/store/apps/details?id=com.collabora.libreoffice) app which lets you edit your documents. I've played around a bit with both but I've had the need for them. I don't really need to access office documents on my mobile devices.

I don't have a great need for an office suite. I primarily takes use spreadsheets and take notes. For the spreadsheets, I use LibreOffice but for the notes, I found that the [Nextcloud Notes](https://apps.nextcloud.com/apps/notes) app does the job for me. I also don't need to share these documents with people or work with multiple people on the same document, spreadsheet or presentation.

If you need better collaboration features, there are solutions that you can host yourself for that purpose. The two big players I found are [Collabora](https://www.collaboraonline.com/) and [ONLYOFFICE](https://www.onlyoffice.com/) (their branding is in all uppercase, hopefully you don't feel like I'm shouting at you). You can run those on your home server and they both have apps that let you integrate them directly into Nextcloud. I personally tried ONLYOFFICE which I gave up on after getting it to work. It's a pretty neat idea and it feels sleek but the complexity of running it didn't match my simple needs.

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

### Operating System and Deployment

## Remote Access
