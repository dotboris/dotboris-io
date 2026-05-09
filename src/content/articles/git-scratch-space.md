---
pubDate: 2026-05-09
title: Simple scratch space for git repos
description: >
  When working in a git repo, I often need a scratch space where I can store
  temporary files or other work files. If you drop files in your repo root, you
  risk accidentally committing some of them. Here's a simple setup that gives
  you a scratch space across all your checked out git repos without accidental
  file commits.
descriptionAsFirstParagraph: true
---

We'll be setting up this scratch space by adding a custom directory to git's
global excludes file. Here's how:

## Choose a directory

First, we'll need to pick a directory for our scratch space. You can pick
whatever you want but I usually go with `__scratch`. The double underscore
(`__`) is nice for a few reasons:

1. It's a fairly common pattern in programming indicating that something is
   "super private".
1. The directory usually shows up as the first item in directory listings and
   file pickers.
1. It's not hidden by default.

## Find the excludes file

Then, we need to find out where this global excludes file lives. This varies per
operating system and depending on your git configuration.

Let's first check if you already have a global excludes file configured:

```sh
git config get --global core.excludesFile
```

If this command prints a path to a file, then that's your global excludes path.
You can move on to the next section.

If it doesn't print anything, then you don't have such a file configured. You
have two options:

- Create your own: `git config set --global core.excludesFile path/to/ignore`
- Use the default: `~/.config/git/ignore`.

## Add your folder to the excludes file

Finally, open your global excludes file with a text editor and add the name of
your scratch directory on its own line. Just write the directory name without
any trailing or leading slashes.

Note that you may need to create this file and its parent directories.

## Test it out

With this in place, you should now be able to test this out in any of your
checked out git repos:

1. Open an existing git repo on your system.
1. Create the scratch directory: `mkdir -p __scratch`
1. Add a test file in there: `touch __scratch/test.txt`
1. Run `git status` and see that your scratch space is completely ignored.
