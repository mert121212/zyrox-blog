---
title: What to Check When a PC Won't Boot
meta_description: "Troubleshoot what to check when a PC won't boot: resolve no-POST errors, black screens, memory seating issues, and motherboard debug LED codes."
date: 2026-07-04T00:00:00.000Z
category: Troubleshooting
tags:
  - Boot
  - Troubleshooting
  - Hardware
  - Diagnostics
author: rachel-kim
keywords:
  - "what to check when a pc won't boot"
  - "computer no display fix"
  - "pc not booting troubleshooting"
  - "no POST black screen fix"
  - "pc power on but no display"
image: "/images/posts/what-to-check-first-when-a-pc-wont-boot.jpg"
---

![Hero Image](/images/posts/what-to-check-first-when-a-pc-wont-boot.jpg)

Knowing **what to check when a pc won't boot** prevents unnecessary panic and saves you from replacing components that are perfectly healthy. I have been there: staring at a cold, unresponsive monitor at midnight, assuming the motherboard has fried or the processor has died. In reality, nine times out of ten the culprit is something far simpler: an unseated RAM stick, an untoggled PSU switch, or a loose front panel header wire.

This step-by-step diagnostic guide outlines exactly what to check when a pc won't boot, moving methodically from easy physical checks to internal hardware isolation.

---

## Table of Contents
- [No Display vs. No POST: Identifying the Failure Mode](#no-display-vs-no-post-identifying-the-failure-mode)
- [The Motherboard Video Cable Trap](#the-motherboard-video-cable-trap)
- [Power Delivery and the Screwdriver Jumper Test](#power-delivery-and-the-screwdriver-jumper-test)
- [Motherboard Debug LEDs and Beep Codes](#motherboard-debug-leds-and-beep-codes)
- [RAM Reseating and Single-Stick Isolation](#ram-reseating-and-single-stick-isolation)
- [GPU Power Connectors and PCIe Retention](#gpu-power-connectors-and-pcie-retention)
- [Clearing the CMOS to Restore Factory Defaults](#clearing-the-cmos-to-restore-factory-defaults)
- [Bare-Minimum Bench Testing](#bare-minimum-bench-testing)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Related Guides](#related-guides)

---

## No Display vs. No POST: Identifying the Failure Mode

Before disassembling parts, distinguish between the two primary failure behaviors:

- **No POST (Power-On Self-Test Failure):** The computer shows no signs of life, or fans spin for half a second and stop immediately. Motherboard diagnostic LEDs do not progress. This indicates an electrical short, missing power lead, or core initialization failure.
- **No Display (POST Success but Black Screen):** Cooling fans spin steadily and stay illuminated, but your monitor displays "No Signal." This usually points to display cable routing errors, monitor input source mismatch, or graphics card detection issues.

---

## The Motherboard Video Cable Trap

Before opening your chassis, inspect the rear cable connections:

**Is your HDMI or DisplayPort cable plugged into the motherboard or the dedicated graphics card?**

Many modern processors (such as Intel Core chips ending in "F" or AMD Ryzen chips without onboard graphics) lack integrated GPU silicon. The video ports on your motherboard I/O plate are inactive.

If you plug your monitor into the motherboard plate, your screen remains completely black even though Windows boots normally in the background. Connect your display cable directly to the horizontal video ports located on your dedicated graphics card further down the back of the case.

---

## Power Delivery and the Screwdriver Jumper Test

Begin by confirming the external power circuit:

1. **PSU Rocker Switch:** Ensure the power supply switch is flipped to the line (**"I"**) position rather than the circle (**"O"**).
2. **Motherboard Front-Panel Pins:** The two-pin `POWER SW` lead on the motherboard header can easily slip loose. To bypass a faulty case power button, pull off the power switch connector and gently touch both bare motherboard header pins simultaneously with the tip of a flathead screwdriver for one second. If the system starts, your case switch is defective.
3. **Internal Power Cables:** Firmly reseat the 24-pin ATX main motherboard harness and the 8-pin (4+4) EPS CPU power connector located at the top-left of the board. A missing CPU power lead will allow fans to spin while completely preventing boot initialization.

---

## Motherboard Debug LEDs and Beep Codes

Most modern motherboards include four diagnostic LEDs labeled CPU, DRAM, VGA, and BOOT:

- **CPU LED Lit:** The processor is not detected, lacks power, or has bent socket pins.
- **DRAM LED Lit:** Memory initialization failed. Reseat modules or test one stick individually.
- **VGA LED Lit:** The graphics card is unseated or auxiliary PCIe power cables are disconnected.
- **BOOT LED Lit:** Hardware initialized successfully, but the motherboard cannot find a bootable operating system on your SSD.

If your board includes an audio buzzer, listen for beep codes. Continuous short beeps typically signal a memory issue, while one long beep followed by two short beeps indicates a video card initialization failure.

---

## RAM Reseating and Single-Stick Isolation

Improperly seated memory modules represent the most frequent cause of boot failures.

Turn off the power supply and remove all memory modules. Inspect the gold contact pins for dust or debris. Reinstall a single RAM stick into slot two (the recommended primary slot on most four-slot boards). Press down firmly until both retention latches snap inward with an audible click.

If the computer fails to POST, swap that stick with your second RAM module in the same slot. Testing modules individually identifies whether you are dealing with a defective memory stick or a faulty motherboard channel.

---

## GPU Power Connectors and PCIe Retention

A graphics card without fully seated power connectors will fail POST or output a persistent black screen:

- Verify that your PCIe power cables click firmly into the graphics card. For [NVIDIA](https://www.nvidia.com) 16-pin 12VHPWR connectors, push the plug straight in until no gap remains visible between the connector faces.
- Ensure the graphics card is locked securely into the primary PCIe x16 slot. A sagging or partially dislodged graphics card prevents essential signal contact across PCIe data lanes.

---

## Clearing the CMOS to Restore Factory Defaults

Clearing the CMOS resets the motherboard BIOS back to default factory parameters. This clears unstable memory overclocks, corrupted voltage settings, or incorrect boot flags.

To perform a clean reset:

1. Unplug the power supply from the wall outlet.
2. Locate the two-pin **JBAT1** or **CLRTC** header on your motherboard. Touch a metal screwdriver across both pins for ten seconds to discharge the circuit.
3. Alternatively, remove the silver CR2032 coin-cell battery from the motherboard for five minutes before reinstalling it.

Once the system boots, enter BIOS to re-enable memory XMP or EXPO profiles and verify Secure Boot settings for [Microsoft Windows 11](https://www.microsoft.com/windows/windows-11).

---

## Bare-Minimum Bench Testing

If troubleshooting inside the chassis proves unsuccessful, isolate hardware outside the enclosure:

1. Place the motherboard on top of its non-conductive cardboard packaging. Never place electrical circuit boards directly on conductive antistatic bags, as the exterior metallized film can cause short circuits across solder joints.
2. Connect only the CPU, CPU cooler, a single stick of RAM, the power supply, and your monitor. Ensure thermal paste is applied between the cooler base and processor integrated heat spreader.
3. Power the system on using the screwdriver jumper technique. Check whether the motherboard progresses through all diagnostic LED checkpoints cleanly.

Testing outside the case immediately rules out electrical short circuits caused by misplaced chassis standoffs. Following this systematic plan ensures you know what to check when a pc won't boot before investing in replacement hardware.

---

## Frequently Asked Questions

### Why do PC fans spin but nothing displays on screen?
This typically indicates either an unseated RAM module, a display cable plugged into the motherboard instead of a dedicated graphics card, or a missing 8-pin CPU power cable.

### How do I know if my motherboard or power supply is dead?
If fans never spin and no motherboard standby LEDs illuminate when connected to a verified wall outlet, the power supply or motherboard power delivery circuit has failed.

### Does resetting the CMOS erase my personal files?
No, clearing CMOS only resets BIOS hardware settings back to factory defaults. Your personal files, photos, and game installations on your SSD or HDD remain completely untouched.

### What should I do if the DRAM debug light stays on?
Turn off the power supply, remove all memory sticks, and test each stick one by one in the second slot away from the CPU until the system successfully passes initialization.

---

## Related Guides

- [Signs Your Motherboard Is Failing](/posts/signs-your-motherboard-is-failing/)
- [How to Diagnose a Random PC Reboot Without Losing Your Mind](/posts/how-to-diagnose-a-random-reboot/)
- [What to Do When Your PC Overheats](/posts/what-to-do-when-your-pc-overheats/)
- [When to Replace a Power Supply Instead of Troubleshooting It](/posts/when-to-replace-a-power-supply-instead-of-troubleshooting-it/)
- [How to Fix No Bootable Device Found on NVMe SSD](/posts/no-bootable-device-found-nvme/)
