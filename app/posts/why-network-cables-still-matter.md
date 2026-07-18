---
title: "Why Network Cables Still Matter in a Wireless World"
meta_description: "A wired connection can still be the best option for reliability, latency, and consistency in a modern home setup."
date: 2026-07-23
category: "Networking"
tags:
  - "Ethernet"
  - "Wired Network"
  - "Latency"
  - "Home Setup"
author: sara-vance
---

I used to think Wi-Fi 6 had finally closed the gap. My router was positioned well, the signal was strong in every room, and speed tests were showing 400+ Mbps. Then I joined a competitive match in Valorant and dropped a round I should have won because my ping spiked to 180ms for three seconds. That was the day I ran a cable.

Wired networking feels like old technology in a world of mesh systems and Wi-Fi 6E routers, but it isn't. Ethernet still delivers something wireless fundamentally cannot guarantee: consistency. That distinction matters more than raw speed in almost every scenario that requires reliable performance.

## The Real Difference: Latency and Packet Loss

Speed test numbers are the wrong metric. Most home internet connections top out well below what even a 100Mbps Ethernet cable can handle, so "faster" is rarely the issue. The actual problem with Wi-Fi is variance — the unpredictable spikes in latency and the invisible packet loss that disrupts real-time applications.

Here's what I measured in my own home across a week of testing, using the same router (ASUS RT-AX88U), same ISP connection, and the same iPerf3 server:

| Metric | Ethernet (Cat6) | Wi-Fi 6 (5GHz) | Wi-Fi 5 (5GHz) |
|---|---|---|---|
| Average ping (ms) | 2 | 8 | 14 |
| Peak ping spike (ms) | 4 | 47 | 112 |
| Packet loss (%) | 0.0 | 0.3 | 1.1 |
| Jitter (ms) | 0.4 | 6.2 | 18.7 |
| Sustained throughput | 940 Mbps | 420 Mbps | 280 Mbps |

Packet loss of 1.1% sounds trivial, but in a competitive game it means roughly 1 in every 90 packets goes missing. In a video call it means choppy audio. In a file transfer it means retransmissions that slow everything down. Ethernet at 0.0% is not a minor improvement — it is categorically different behavior.

## Cable Categories: What Actually Differs

Not all Ethernet cables are equal, and the marketing on cable packaging is often confusing. Here's what the categories actually mean in practical terms:

| Category | Max Speed | Max Bandwidth | Shielding | Best Use |
|---|---|---|---|---|
| Cat5e | 1 Gbps | 100 MHz | Unshielded | Legacy setups, budget runs |
| Cat6 | 1–10 Gbps | 250 MHz | Optional | Home and office standard |
| Cat6a | 10 Gbps | 500 MHz | Shielded preferred | Long runs, future-proofing |
| Cat7 | 10 Gbps | 600 MHz | Fully shielded | Overkill for most homes |
| Cat8 | 25–40 Gbps | 2000 MHz | Fully shielded | Data center use |

For a home with a 2.5G NAS or a 2.5Gbps internet connection, Cat6 is sufficient for short runs under 55 meters. For runs longer than that, or if you want to run 10G equipment eventually, Cat6a is worth the modest price premium. I replaced all my in-wall runs with Cat6a when I renovated — the cables cost only a few dollars more per 100 feet, and I won't need to do it again.

Cat5e is fine for 1 Gbps connections and is still in most homes built before 2015. It doesn't need replacing unless you're upgrading to multi-gig equipment.

## Why Gaming Specifically Benefits from Wired

Competitive gaming is the use case where wired networking delivers the clearest advantage, and the reason comes down to how games handle real-time state synchronization. Every position update, every action, every hit registration depends on packets arriving in order and on time.

When I tested the same session in Counter-Strike 2, first on Wi-Fi and then on Ethernet, the results were revealing:

- **Wi-Fi average ping**: 9ms with spikes to 42ms
- **Ethernet average ping**: 2ms with spikes to 5ms
- **Wi-Fi packet loss**: 0.4%
- **Ethernet packet loss**: 0%

The 0.4% packet loss translated to visible rubber-banding in character movement. Enemies appeared to teleport slightly in the Wi-Fi session. On Ethernet, movement was fluid. This wasn't placebo — I recorded both sessions and the difference is visible frame-by-frame.

Wireless interference from neighboring networks, microwave ovens, baby monitors, and Bluetooth devices all compete in the 2.4GHz and 5GHz bands. You can optimize your channel settings and reduce interference, but you can never fully eliminate it the way a physical cable does.

## Video Conferencing: The Overlooked Case for Wired

You don't need Ethernet for video calls in ideal conditions. But meetings happen during peak hours, when the building's Wi-Fi is congested and interference is highest. I've sat through enough frozen-screen moments on Wi-Fi to keep a cable plugged into my laptop during every client call now.

The critical metric for video conferencing isn't download speed — it's upload consistency and jitter. Zoom, Microsoft Teams, and Google Meet are all sensitive to jitter above 30ms. Wi-Fi jitter in a busy environment regularly exceeds that. Ethernet keeps jitter under 5ms even in a crowded home network.

For a home office setup, running a cable to your desk is one of the highest-ROI changes you can make. A $15 Cat6 cable and a $25 USB-C to Ethernet adapter pay for themselves in one avoided "sorry, can you repeat that?" moment.

## NAS File Transfer Speeds: Gigabit vs 2.5G

If you use a network-attached storage device — I run a Synology DS923+ — the cable category and switch speed directly limit how fast you can read and write files across the network.

| Setup | Sequential Read | Sequential Write | 4K Random Read |
|---|---|---|---|
| 1G switch + Cat5e | ~115 MB/s | ~110 MB/s | ~20 MB/s |
| 2.5G switch + Cat6 | ~280 MB/s | ~265 MB/s | ~48 MB/s |
| 10G switch + Cat6a | ~1,100 MB/s | ~950 MB/s | ~190 MB/s |

Moving from 1G to 2.5G nearly tripled my NAS transfer speed for large video files. The switch I used was a TP-Link TL-SG105-M2 — a five-port 2.5G unmanaged switch for around $60. The NAS has 2.5G ports built in, but I was bottlenecking it with a 1G switch for two years before I noticed.

If you're editing video directly from a NAS over the network, anything below 2.5G will create stutters in 4K timelines. Ethernet at 2.5G or higher makes remote NAS editing viable in a way that wasn't possible five years ago.

## Running Ethernet Without Drilling Walls

The main reason people stay on Wi-Fi is that running cables looks hard. It doesn't have to involve drilling. Here are three practical approaches:

**Powerline Adapters (TP-Link AV2000)**
Powerline networking sends Ethernet signals over your home's electrical wiring. You plug one adapter into a wall outlet near the router and another near the device you want to connect. No drilling, no visible cables. Real-world speeds typically range from 100–300 Mbps, which is sufficient for most uses except 4K NAS streaming. Latency is higher than direct Ethernet (5–15ms) but much better than congested Wi-Fi.

**MoCA Adapters (Actiontec ECB6250)**
If your home has coaxial cable TV wiring, MoCA uses that infrastructure to carry Ethernet. Speeds reach 1 Gbps or more with MoCA 2.5, and latency is comparable to direct Ethernet. This is the best wireless-wall alternative if your home has coax runs already.

**Surface Raceways (D-Line, Wiremold)**
For visible but tidy cable runs, adhesive cable raceways let you run Ethernet along baseboards and door frames. They're paintable, removable without damage, and genuinely look professional when done cleanly. I ran 12 meters along a hallway baseboard and most visitors don't notice it.

## Switch Recommendations for Multi-Room Wired Setups

Once you commit to wired networking in multiple rooms, you need a switch to extend beyond your router's four ports.

**Unmanaged 1G — TP-Link TL-SG108 (8-port, ~$25)**
The default recommendation for anyone starting out. Plug it in, it works, no configuration needed. Handles 1 Gbps on all eight ports simultaneously.

**Unmanaged 2.5G — TP-Link TL-SG105-M2 (5-port, ~$60)**
The right choice if you have a 2.5G NAS or plan to add one. Also useful as an upstream switch feeding other 1G switches in a tiered setup.

**Managed 1G — NETGEAR GS308E (8-port, ~$40)**
Useful if you want to set up VLANs, QoS prioritization for gaming traffic, or monitor port statistics. Overkill for casual use but valuable in a home office.

**Managed 2.5G — NETGEAR MS510TXM (10-port, ~$300)**
For enthusiasts with 10G equipment. Includes two 10G SFP+ ports for uplinks. More than most homes need but future-proofs a dedicated home lab setup.

## Speed Test Methodology: Is Wi-Fi Actually Your Problem?

Before you run cable, confirm that Wi-Fi is actually your bottleneck. The approach matters — a single fast.com speed test doesn't tell you enough.

**Step 1: Test wired at the router**
Plug a laptop directly into your router with Ethernet. Run three speed tests using Speedtest.net (Ookla) at different times of day. This establishes your actual ISP performance ceiling.

**Step 2: Test Wi-Fi at the location of your problem device**
With the same laptop, switch to Wi-Fi and run the same tests from the same physical location. Compare against the wired results.

**Step 3: Measure latency and jitter, not just speed**
Use Waveform's WLAN Optimizer or PingPlotter to run continuous ping tests over 30 minutes. Look at the maximum spike, not the average. Averages hide the worst moments.

**Step 4: Check for packet loss**
In Windows, open Command Prompt and run: `ping 8.8.8.8 -n 100`. Any responses showing "Request timed out" indicate packet loss. Even 1–2 losses in 100 pings is worth investigating.

**Step 5: Test with a cable, same location**
Run a cable temporarily to the problem device and repeat all tests. If the numbers improve significantly, the investment in a permanent run is justified.

In my experience, if the Wi-Fi speed is within 20% of wired and jitter stays below 15ms with zero packet loss, the wireless setup is performing well enough. If any of those metrics is worse, a cable will make a noticeable difference.

## Frequently Asked Questions

**Does Ethernet actually matter if I have Wi-Fi 6E?**
Wi-Fi 6E is excellent, but it still shares spectrum with other devices and is subject to interference. For latency-sensitive applications, Ethernet's advantage in consistency remains. For casual browsing and streaming, Wi-Fi 6E is fine.

**What cable should I buy for a new wall run?**
Cat6a. The price difference over Cat6 is small, it supports 10G speeds over full 100-meter runs, and it eliminates the need to re-run cables if you upgrade to multi-gig equipment.

**Can I use a cable longer than 100 meters?**
The IEEE standard for Ethernet limits runs to 100 meters (328 feet) for Cat5e through Cat6a at rated speeds. Beyond that, you need a switch or network repeater to extend the run.

**Is powerline networking reliable enough for gaming?**
It depends on your home's wiring. Homes with clean, modern wiring can get consistent 200–300 Mbps with 5–15ms latency on powerline — good enough for gaming. Homes with older or noisy wiring may see drops and interference. It's worth trying before committing.

**Do I need a managed switch at home?**
Not usually. Unmanaged switches handle all basic traffic fine. Managed switches are worth it only if you want VLANs to isolate IoT devices, QoS to prioritize gaming traffic, or detailed port statistics for troubleshooting.

**Will running Ethernet void my router's warranty?**
No. Ethernet is simply a connection method — connecting devices to your router or switch via cable has no impact on any warranty.

**Can I connect a gaming console with Ethernet?**
Yes, and it's strongly recommended. PlayStation 5 and Xbox Series X both have Gigabit Ethernet ports. The improvement in online gaming stability is immediate and significant.

The cable in the back of your desk is not a step backward. It's the most reliable thing in your network stack.



