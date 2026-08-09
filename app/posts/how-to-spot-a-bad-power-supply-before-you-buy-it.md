---
title: How to Spot a Bad Power Supply Before You Buy It
meta_description: >-
  A practical checklist for evaluating power supplies by efficiency, protection
  features, and build quality rather than brand hype. I've killed a GPU.
date: 2026-06-30T00:00:00.000Z
category: Power
tags:
  - Power Supply
  - PSU
  - Hardware
  - Buying Guide
author: daniel-osei
keywords:
  - power supply
  - psu
  - hardware
  - buying guide
  - power
---

![Hero Image](/images/default-hero.jpg)
I've killed a GPU. Not through overclocking, not through a bad driver — through a cheap power supply that had no business being inside a PC. It was a white-label 650W unit I grabbed from an [Amazon](https://www.amazon.com) storefront that no longer exists, and it took a mid-range graphics card with it when it finally gave out. That experience changed how I approach every single PSU purchase. I now read spec sheets the way lawyers read contracts, and I want to walk you through that process in full detail.

The PSU is the only component in your system that has the physical capacity to destroy everything else. A bad CPU cooler gives you thermal throttling. A bad RAM stick gives you BSODs. A bad power supply can fry your motherboard, your GPU, your storage drives, and anything else connected to it in a single event. So let's talk about how to identify the dangerous units before you hand over your money.

## Why the 80 Plus Certification Is Your First Filter

The fastest quality filter you can apply to any PSU is checking for 80 Plus certification. This third-party program measures how efficiently a supply converts AC wall power into DC power. 

The tiers range from White (80% efficiency at 50% load) to Bronze (85%), Silver (89%), Gold (92%), Platinum (94%), and Titanium (96%). For most gaming desktops, 80 Plus Gold is the perfect sweet spot. It runs cool, it's priced fairly, and reputable OEMs make great Gold units. Platinum and Titanium are really only worth the money for home servers or rendering rigs running 24/7.

The massive red flag is a PSU with zero certification. Many Amazon listings shout about "gaming grade efficiency" but lack an 80 Plus badge. That means it either failed testing or was never submitted. I've seen uncertified "700W" units buckle under a 450W load. If it doesn't have an 80 Plus badge, don't buy it.

## Price-to-Wattage Red Flags

Real power supplies cost real money to build. High-quality transformers, MOSFETs, and capacitors are expensive. 

If you see a 600W to 800W PSU selling for $25 to $35, walk away immediately. It is physically impossible to build a safe unit at that cost. Even an $50 "1000W" unit is likely just a 400W unit masquerading under peak-wattage marketing. Real budget PSUs (650W Gold) start around $70 to $90. Good 850W Gold units sit between $100 and $130, while 1000W units belong in the $150+ range. Extreme discounts equal extreme danger.

## Continuous Wattage vs. Peak Wattage

This is the biggest lie in PSU marketing. Continuous wattage is what the PSU can deliver indefinitely under normal operating temperatures. Peak wattage is a theoretical burst it can hold for milliseconds before failing. 

Shady brands print peak wattage in massive letters on the box, hiding the continuous rating in fine print. Worse, they rate that continuous output at 25°C (room temperature). A legitimate PSU, like a Seasonic Focus GX, rates its continuous output at 40°C or 50°C, because that's how hot the inside of a gaming PC actually gets. If the temperature rating is missing, you are being lied to.

## Protection Features Checklist

Check the spec sheet for protection features. A quality unit will list Over-Voltage Protection (OVP), Over-Current Protection (OCP), Over-Power Protection (OPP), Short-Circuit Protection (SCP), and Over-Temperature Protection (OTP). Under-Voltage Protection (UVP) is also great to have.

The absence of OCP or OTP is terrifying. Without OCP, a short in your GPU will cause the PSU to keep pumping current into the fire rather than shutting off safely. The Corsair RM850x and be quiet! Straight Power 12 list all of these protections. That is your baseline.

## Japanese Capacitors and Why They Matter

Capacitors determine long-term electrical stability. Cheap electrolytic capacitors degrade rapidly under heat, causing voltage ripple and system crashes. 

The gold standard is Japanese capacitors from brands like Nippon Chemi-Con, Nichicon, and Rubycon. They are rated for high heat and last forever. Taiwanese brands like Teapo are acceptable for budget units. Unnamed Chinese capacitors are a disaster waiting to happen. You won't find this on the Amazon listing; you have to read teardown reviews from TechPowerUp or Cybenetics to verify the internals.

## PSU OEM Platforms Explained

Most PSU brands don't manufacture their own units. They contract Original Equipment Manufacturers (OEMs). 

Seasonic builds phenomenal units for themselves and Corsair. Channel Well Technology (CWT) builds excellent platforms for be quiet!, Cooler Master, and Antec. Great Wall builds decent mid-tier platforms. However, OEMs like HEC, Compucase, and Sirtec often pump out mediocre or outright poor platforms for white-label storefront brands. A $90 Corsair built by Great Wall is materially worse than a $105 be quiet! built by CWT. Always check the Cultists Network PSU Tier List to trace the OEM platform.

## Real-World Comparison: Safe vs. Dangerous

Let's look at a Seasonic Focus GX-750 versus a generic Amazon "750W Gaming PSU" that costs $38.

The Seasonic has an 80 Plus Gold rating, delivers 750W continuous at 50°C, features Japanese capacitors, includes every protection (OCP, OTP, OPP), runs a fluid dynamic bearing fan, and carries a 10-year warranty. 

The generic unit has no certification, is likely rated at 25°C, uses unknown Chinese capacitors, only lists SCP and OVP for protection, uses a cheap sleeve bearing fan, and has no warranty. The Seasonic costs about $65 more. When it's protecting a $1500 PC for the next decade, that $65 is the best money you will ever spend.

## Amazon Review Pattern Analysis

You can spot trash PSUs by reading Amazon reviews properly. Look out for clusters of 5-star reviews posted in the same week, or 5-star reviews with no verified purchase badge. The biggest red flag is a pattern of 1-star reviews popping up 12 months after launch complaining about burning smells or dead systems. 

I always search the review section for the words "fire," "smoke," or "burning smell." If more than one person mentions a burning smell, the unit is disqualified immediately.

## Step-by-Step Buying Checklist and Brands to Avoid

Calculate your wattage on PC Part Picker and add 20% headroom. Filter your store search for 80 Plus Gold units only. If the price is suspiciously low, avoid it. Identify the OEM platform and cross-reference it on the Cultists Network Tier List — aim for Tier B or higher. Check the spec sheet for OCP and OTP. Scan the Amazon reviews for burning smell reports. Always buy from a retailer with a solid return policy.

As a general rule, actively avoid brands like APEVIA, Diablotek, Raidmax, and Logisys. They have documented histories of missing protections, catastrophic failures, and terrible OEM platforms. Stick to reliable lines from Seasonic, Corsair, EVGA, be quiet!, and FSP. Don't cheap out on the heart of your system.


---

## Related Guides

- [How to Choose the Right PSU for Your Build](/posts/how-to-choose-the-right-psu-for-your-build)
- [How to Test a Power Supply Without Expensive Tools](/posts/how-to-test-a-psu-without-expensive-tools)
- [When to Replace a Power Supply Instead of Troubleshooting It](/posts/when-to-replace-a-power-supply-instead-of-troubleshooting-it)
