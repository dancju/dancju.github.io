---
layout: post
title: Across the Great Wall we can reach every corner in the world
---

## Abstract
Yes I'm talking about a low cost acrossing GFW method.

When I was using [Qujing](http://getqujing.com/)'s proxy service, I really appreciated the convenience of routing between WALLed websites through a proxy and un-WALLed sites directly. And all I have to config is copying a URL into OS X's system preference. Though Qujing's service takes a reasonable cost, yet it's a reducible expense for me, a poor student. Since I have a VPS outside the wall, I tried to find out a convenient accorsing-wall method just like Qujing.

Someone mentioned a OpvenVPN + Squid + PAC method in a forum. However, such method seems to be too simple for them to give a detailed explanation. As a novice who rarely know anything about computer network, I studied for days and successfully built an acrossing-wall system.

This post only describe the architecture of the system and contains no console command nor configuration file. For more technical details, you can refer to the documentations or google.

## Architecture

For terminals inside the wall, a PAC file routes the connection to WALLed websites through a proxy server and un-WALLed websites through direct connection. Differing from [Proxy SwitchySharp](https://chrome.google.com/webstore/detail/proxy-switchysharp/dpplabbmogkhghncfbfdeeokoefdjegm), PAC is platform-independent (Android requires a third-party app).

However, we can't accros the wall just through a proxy, even with SSL. As long as the domain name or server's IP address is exposed to the wall, we don't have a free Internet access.

VPN is the most popular and may be the simplest way to transfer data through the wall. But PAC can't control terminals switching between VPN and direct connection.

The following diagram gives an architecture of the OpvenVPN + Squid + PAC method which combines VPN and PAC. In this architecture, one server outside the wall and one server inside the is required.

![Deployment Diagram](/img/2014-07-15-gfw-deployment.png)

### Devices

In order to reduce cost, a VPS can be used as the VPN Server, and a single-chip (eg. OpenWRT router) as the proxy server. 

The terminal is only required to have a proxy client support, which indicates that almost any OS is available (OS X, Linux, Windows, iOS, Android).

### VPN
The VPN server and the proxy server make up a VPN. Usually both them are based on Linux, under which circumstance OpenVPN is the best VPN protocol to chose.

### Proxy
Squid is the most popular proxy server.

### PAC
We don't have to program in JavaScript for a PAC file. Flora PAC

## Read more
