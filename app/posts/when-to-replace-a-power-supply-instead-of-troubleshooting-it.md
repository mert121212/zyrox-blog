---
title: When to Replace a Power Supply Instead of Troubleshooting It
meta_description: >-
  Know when a failing PSU is better replaced than repaired or endlessly tested.
  I spent three weeks troubleshooting a system that would randomly restart under
  load.
date: 2026-07-21T00:00:00.000Z
category: Power
tags:
  - PSU
  - Power Supply
  - Hardware Failure
  - Replacement
author: daniel-osei
keywords:
  - psu
  - power supply
  - hardware failure
  - replacement
  - power
---

![Hero Image](/images/default-hero.jpg)
I spent three weeks troubleshooting a system that would randomly restart under load. I swapped RAM, reinstalled Windows, and reseated the GPU. Nothing worked. Then I finally pulled out a multimeter, ran a few tests, and discovered the 12V rail on the power supply was sagging from 12.0V to 11.3V under full GPU load. The PSU was a five-year-old unit from a brand I shouldn't have trusted in the first place. Three weeks of work, and the answer was a simple $90 Seasonic replacement.

That experience changed how I look at PSU troubleshooting. The question isn't always how to diagnose the power supply. Sometimes the better question is whether you should even bother trying.

## The Age and Usage Threshold

Power supplies degrade with use. The electrolytic capacitors inside, which smooth and regulate voltage output, have a rated service life. Quality capacitors are often rated for 5,000 to 10,000 hours at high temperatures. 

In a PC running eight hours a day, five days a week, you hit 10,000 hours in about five years. For a system that runs continuously — a home server or workstation — you hit that threshold in under two years. The general rule is simple: if a PSU in a heavily used system is five or more years old, it is a replacement candidate, even if it hasn't shown dramatic symptoms yet. Capacitor aging often manifests as subtle instability, like occasional freezes or voltage sag, before a hard failure occurs. 

Replacing an aging PSU isn't wasteful; it is risk management. A $100 replacement is cheap insurance against a failing unit sending a voltage spike that destroys a $600 GPU or a $300 CPU.

## Recognizing Protection Circuit Failures

Modern PSUs include protection circuits designed to shut the unit down before damage occurs. When these trip repeatedly, the PSU is usually failing.

Over Voltage Protection (OVP) trips when output voltage exceeds safe thresholds. If your system randomly shuts off under heavy GPU load and thermals are fine, OVP might be triggering because the aging voltage regulation can't hold the rails steady. Over Current Protection (OCP) triggers when current draw exceeds limits, which sometimes happens prematurely on cheap, degrading PSUs.

Coil whine isn't a protection failure, but it is a diagnostic signal. If a previously quiet PSU suddenly develops a loud, high-pitched whine that scales with load, the coil windings or components are degrading. 

And then there's capacitor bulge. If you look inside the PSU through the fan grille (never open a PSU unless you are a trained technician, as capacitors hold lethal charge), a healthy cylindrical capacitor has a flat top. A failing one has a domed or bubbling top. If you see a bulging capacitor, the PSU is done. Replace it immediately.

## The Paper Clip Test and Hard Failures

If a PC is completely unresponsive, you can test if the PSU can self-start using the paper clip test. Disconnect all cables from the PC components. Take the 24-pin motherboard connector, bend a paper clip, and connect the green wire pin to any black wire pin (ground). Plug the PSU into the wall and flip the switch. If the fan spins, it passes the basic self-start test. This doesn't mean the voltages are clean under load, but if it fails to even turn on, the unit is definitively dead.

There are certain situations where continuing to troubleshoot is actually dangerous. If you see burn marks on the PSU housing or motherboard connectors, an arc or overcurrent event occurred. If PCIe or CPU power cables are melted or discolored, the connection ran dangerously hot. Do not try to salvage these units. A PSU that fails catastrophically can take the rest of your system with it.

## When Troubleshooting Actually Makes Sense

Not every shutdown is a PSU failure. Sometimes the PSU is blamed unfairly. 

If random reboots started immediately after a graphics driver update, roll back the driver first. Faulty GPU drivers can produce symptoms nearly identical to a failing PSU. If the system only shuts down when you apply aggressive GPU or memory overclocks, the PSU might just be undersized for the new power draw. Try reducing the power limit in software first.

Also, make sure the coil whine you hear isn't coming from the graphics card. GPU coil whine is extremely common and completely harmless.

## The Reality of PSU Repair

For consumer-grade power supplies, repairing them at home is not a viable option. The capacitors hold lethal voltages even when unplugged. Servicing them requires specific replacement parts, soldering expertise, and post-repair load testing. The time, tools, and danger involved far exceed the cost of simply buying a new unit.

For any PSU under $150, repair never makes financial sense. The risk of a botched repair frying your entire system is too high when a new, high-quality 750W unit from Corsair, Seasonic, or be quiet! costs around $100 and comes with a fresh 7-to-10-year warranty. 

If you are replacing a PSU, always consult a reputable tier list (like the Cultists Network PSU Tier List) to ensure you are buying a quality platform. A 650W to 750W unit from a reputable brand will handle almost any modern single-GPU system effortlessly. Don't gamble your expensive hardware to save forty dollars on an unbranded power supply.


---

## Related Guides

- [How to Choose the Right PSU for Your Build](/posts/how-to-choose-the-right-psu-for-your-build)
- [How to Test a Power Supply Without Expensive Tools](/posts/how-to-test-a-psu-without-expensive-tools)
- [How to Spot a Bad Power Supply Before You Buy It](/posts/how-to-spot-a-bad-power-supply-before-you-buy-it)
