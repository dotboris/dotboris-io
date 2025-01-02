---
pubDate: 2025-01-01
title: How to use Tailscale with a Reverse Proxy
description: >
  Tailscale is a great tool for exposing servers without having to open ports.
  If you have a DNS based reverse proxy where different apps and services are
  exposed through different domain names, you'll find that getting the reverse
  proxy to work can be quite tricky. This guide will walk you through how to
  setup a custom DNS server to get your reverse proxy working through Tailscale.
---

[Tailscale](https://tailscale.com/) is a great tool for exposing servers without
having to open ports. If you have a DNS based reverse proxy where different apps
and services are exposed through different domain names, you'll find that
getting the reverse proxy to work can be quite tricky. This is because of how
Tailscale handles IP addresses and DNS records.

Typically, for a DNS based reverse proxy to work, you need to setup the DNS
records for all apps and services that that they point to the reverse proxy's IP
address. In this example, our reverse proxy will have the `10.0.0.123` IP
address and we'll have two apps: `app1.example.com` and `app2.example.com`. In a
typical configuration, we would create DNS records pointing both our apps to the
reverse proxy's IP address.

By default, Tailscale enables it's
[MagicDNS](https://tailscale.com/kb/1081/magicdns) feature which automatically
registers DNS records for every host in your virtual network. For example, if
you have a server named `myserver`, its DNS record would be something like
`myserver.{...}.ts.net`. This works fine for exposing and accessing a single
server but falls short if you have a reverse proxy. Tailscale doesn't provide a
mechanism to register your own custom domain names or to register multiple
domain names for a single server.

Also, when a server is connected to a Tailscale virtual network, that server
effectively has two IP addresses. It has its normal local ip address
(`10.0.0.123` in our example) but it also has another IP address that Tailscale
assigns to it. We'll assume it's `100.32.12.212` for our example. The local IP
address is used when you connect to the server through its local network and the
Tailscale IP address is used when you connect to the server through Tailscale.

Not only can we not configure custom DNS records for our server but we also have
to juggle two IP address for our reverse proxy. This is the challenge we'll be
overcoming in this guide.

## Custom DNS Server

To achieve this, we'll run our own DNS server and implement a technique called
[split-horizon DNS](https://en.wikipedia.org/wiki/Split-horizon_DNS). Running
our own DNS server allows us to define our own custom DNS records for our
server. Using split-horizon DNS allows us to return the right IP address
depending on where the request comes from. In other words, users on the local
network will get the local IP address and users on the Tailscale virtual network
will get the Tailscale IP address.

In this guide, we'll be using [CoreDNS](https://coredns.io). It's a simple and
extensible DNS server. It's a [CNCF](https://cncf.io/) graduated project and has
become the defacto standard DNS server for a lot of people and businesses.

First, you'll need to do some setup:

1. Create a [Tailscale account](https://login.tailscale.com/start).
1. [Add your server](https://tailscale.com/kb/1316/device-add) your Tailscale
   virtual network.
1. [Install CoreDNS](https://coredns.io/manual/toc/#installation) on your
   server. Make sure it's running on port 53.

In this example we're installing CoreDNS on the reverse proxy server for
simplicity. You can run CoreDNS on another server if you'd like. If you do so,
be sure to add both the reverse proxy and server running CoreDNS to your
Tailscale virtual network.

With all that, we can write our CoreDNS configuration (`Corefile`):

```hcl
# Server block for local network
. {
  view local {
    expr incidr(client_ip(), "127.0.0.0/24") || incidr(client_ip(), "10.0.0.0/24")
  }
  hosts {
    10.0.0.123 app1.example.com app2.example.com
    fallthrough
  }
  forward . 1.1.1.1
}

# Server block for tailscale network
. {
  view tailscale {
    expr incidr(client_ip(), "100.0.0.0/8")
  }
  hosts {
    100.32.12.212 app1.example.com app2.example.com
    fallthrough
  }
  forward . 1.1.1.1
}
```

There's a lot of stuff in there so let's break this down. At a high level,
you'll see that there are two [server
blocks](https://coredns.io/manual/toc/#server-blocks) that are very similar.
There's one server block for the local network and one for the Tailscale
network.

We use the [`view`](https://coredns.io/plugins/view/) plugin to route DNS
queries to the right server block based on the client IP address. When a DNS
query comes from the `127.0.0.0/24` or `10.0.0.0/24` IP ranges, we use the first
server block. When a DNS query comes from the `100.0.0.0/8` IP range, we use the
second server block. This lets us implement split-horizon DNS as described
above.

Note that we include the `127.0.0.0/24` IP range in the local server block to
allow the server that's running CoreDNS to query itself correctly. That way,
it'll resolve IP addresses in the local range.

After that, we use the [`hosts`](https://coredns.io/plugins/hosts/) plugin to
define our custom DNS records. This is where we map DNS names to IP addresses.
We use the local IP address in the local block and the Tailscale IP address in
the Tailscale block. We also use the `fallthrough` directive to ensure that
other plugins can handle the DNS query if the `hosts` plugin doesn't match it.

Finally, we use the [`forward`](https://coredns.io/plugins/forward/) plugin to
forward the DNS query to another DNS server. In my case, I use [CloudFlare's
`1.1.1.1`](https://one.one.one.one/dns/) public DNS server. This works in tandem
with the `fallthrough` directive in the `hosts` block above such that if we
can't match the request through the `hosts` plugin, it'll be forwarded through
the `forward` plugin. This ensures that DNS queries for the rest of the internet
sill work as expected.

## Network Integration

Running a custom DNS server doesn't fully solve our problem. We need to now
integrate this server in our local network and in Tailscale.

### Local Network

For our local network, we need to configure our DHCP server (usually the router)
to use our CoreDNS server as a DNS server. This varies from router to router so
I can't go in depth. The high level steps go something like this:

1. Login to your router's admin console.
1. Find the configuration page for the DHCP server.
1. Look for a "DNS Server" field.
1. Put in the local IP address of your server.
1. Apply, Save, etc.

On your devices, disconnect and reconnect from the network for them to see this
change.

### Tailscale Network

For Tailscale, we can configure everything through the admin console:

1. Login to the admin console.
1. Open the "DNS" section.
1. Disable Magic DNS.
1. Under "Nameservers", add a new custom name server and set its IP to the
   Tailscale IP of the server running CoreDNS.
1. Under "Nameservers", enable the "Override local DNS" option.

## Testing

From here, everything should be in place and we should be able to make sure that
our reverse proxy works as expected. You'll need another device connected to
your Tailscale virtual network to test things out. I usually use my phone.

First, we'll test with Tailscale. Connect to Tailscale on your device. To make
sure that I'm not accidentally using the local network, I like to disconnect
from the WiFi on my phone and use my mobile data connection. Try loading the
various apps that are behind your reverse proxy on that device. Opening them in
the browser should be enough.

Second, we'll test that local access works. Disconnect from Tailscale and
reconnect to the Wifi if you switched to mobile data in the previous step.
Again, try loading the various apps that are behind your reverse proxy. Using
your browser should do the trick.
