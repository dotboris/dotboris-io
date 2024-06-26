---
pubDate: 2023-01-10
title: Correct cURL
description: >
  Using cURL in a shell script should be easy right? Just call cURL with an URL
  and redirect the output to a file. Sadly, it's not that easy. You can't rely
  on cURL's default behaviour. It comes with many edge cases. This article
  describes the correct way to call cURL in a shell script or CI process to
  ensure that it behaves properly even in case of failure.
---

Let's say that you're writing a shell script or that you're working on some CI
process and you need to download a file from the internet. Should be easy right?
Just type `curl '{url}' > {output-file}` and you're done. That's not quite
correct. While it may work, it'll come bite you in the ass later. Here's how you
can call cURL to download a file without it blowing up in the future:

```sh
curl --fail --location --silent --show-error --output '{output-file}' '{url}'
```

You'll need to replace `{url}` with the url of the file you want to download and
`{output-file}` with the name of the file you want to write to. Keep the quotes,
they're important.

If all you want is a snippet to copy / paste, feel free to take this line and
roll with it. If you want to learn what's up with all those flags and why
they're here, keep reading.

## `--fail`

When cURL encounters an HTTP error it doesn't fail by default. By not failing, I
mean that it exits with an exit code of `0`. This means that your script, CI
process or whatever else calling cURL won't stop or report a failure if you get
an HTTP error.

Also, cURL will output the error message directly into your output file. This
means that you may get an error down the line because some other step gets
confused by the file you just downloaded being an error message instead of what
it should be. You'll end up with a really confusing error instead of the clear
HTTP error you could have gotten earlier.

Passing the `--fail` flag solves this issue. It tells cURL to stop and to exit
with a non-zero exit code when it encounters an HTTP error code. This is what
allows your script, CI, etc. to recognize that there was a failure. It also
prevents cURL from writing the error message to the output file.

Sadly this flag is not perfect. Some authentication errors may slip through such
as `401` and `407` HTTP codes.

## `--location`

By default cURL will not follow HTTP redirects. This means that if the file
behind that url ever changes and there's a redirect put in place, cURL won't
follow it.

To remediate that, you can use the `--location` flag which will tell cURL to
follow redirects.

If you're wondering where the name comes from, it's named after the `Location`
HTTP header. This header holds the location where the url is being redirected
to.

## `--silent` and `--show-error`

The `--silent` flag supresses cURL's normal output. This hides certain messages
and the progress bar. There's one catch with `--silent`. It suprresses too much
output. If something goes wrong, like a `404` error, it'll supress that output as
well. This is where the `--show-error` flag comes in. It'll ensure that cURL
still shows you error messages when it fails.

In the context of a script or CI process it's often a good idea to stop the
progress bar since that can be quite noisy. Also some CI systems can't handle
cURL's progress bar which uses special terminal commands to rewrite its own
output.

If you want the progress bar, you can ommit these flags.

## `--output <file>`

Normally cURL outputs the body of the HTTP response to `stdout`. You can
redirect that output to a file `>` or to another program using `|`. This is fine
when everything goes right. It can become a problem when things go wrong. Since
`stdout` is being redirected the error body and any errors or warnings from cURL
may be redirected as well.

When you use the `--output <file>` option, cURL will write the response body to
the given file. If something goes wrong in the process, `stdout` is still
available for use.

On top of that, when you use `--output <file>`, cURL is able to show a progress
bar for the download. This is helpful in cases where you have omitted the
`--silent` flag.

While, it's possible to use stream redirection with cURL and not experience any
problems. I find that using `--output <file>` is more reliable.

## Why the long flags?

I made a point to use the long form of all flags. I encourage you to do so as
well. This is because the long flags are fairly self evident. You can probably
understand what they do just by looking at them.

The short version of all the flags is `-sSfLo`. While this is definetely shorter
and may even make you feel clever, it makes sure that anyone who may be reading
your script, CI, etc. and who is not familiar with cURL's flags will be lost.
They'll either have to look them up or just blindly trust that they're right and
there for a good reason.

By using the long flags, you're trading in horizontal screen space which is
quite abundant in our modern world for clarity and readability. That's a good
trade in my book.
