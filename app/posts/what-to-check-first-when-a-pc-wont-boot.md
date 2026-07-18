---
title: "What to Check First When a PC Won't Boot"
meta_description: "A clear troubleshooting guide for boot failures that focuses on the most common causes before deeper diagnostics."
date: 2026-07-04
category: "Troubleshooting"
tags:
  - "Boot"
  - "Troubleshooting"
  - "Hardware"
  - "Diagnostics"
author: rachel-kim
---

A PC that won't boot is one of those problems that can send you spiraling into worst-case scenarios. I've been there — staring at a black screen at midnight, assuming the motherboard is dead or the CPU is fried. Nine times out of ten, it's something far more mundane. A loose RAM stick. A PSU switch left in the off position. A BIOS setting from a failed overclock attempt.

This guide walks through the diagnostic process in order — from the most common and fixable causes to the more serious ones. Work through it methodically and you'll resolve most boot failures without replacing a single component.

## No Display vs. No POST: Understanding the Difference

Before diving into steps, it's important to distinguish between two different failure modes, because they point to different root causes.

**No POST (no power-on self-test):**
- Fans don't spin, or they spin and immediately stop
- No beeps from the motherboard speaker
- No debug LEDs light up (or they cycle without completing)
- The system doesn't seem to "do" anything when you press power

**No Display (POST happens but no video output):**
- Fans spin and stay on
- Debug LEDs may progress normally or stop at a specific point
- You might hear a completed POST beep (one short beep on many boards)
- The monitor shows no signal or "no input"

No POST is a hardware initialization failure — something critical is preventing the system from starting at all. No Display means the system started but video output failed. These require different approaches.

## Step 1: Power Delivery Check

Start at the very beginning of the power chain. These checks take two minutes and catch a surprising number of failures.

**Check in this order:**

1. **The wall outlet** — plug something else into the same outlet to confirm it has power. A tripped breaker or dead outlet is more common than you'd think, especially on desk strips and surge protectors after a power event.

2. **The IEC power cable** — the kettle-plug style cable connecting the PSU to the wall. Check both ends are firmly seated. These can work loose, especially in setups where the case is moved frequently.

3. **The PSU rocker switch** — located on the back of the PSU, next to the power cable. It should be in the "I" position (on), not "O" (off). It's easy to accidentally switch this when cable managing or moving the PC.

4. **The 24-pin ATX connector** — the large connector going from the PSU to the motherboard. Press the latch and reseat it firmly. A partially seated 24-pin can pass some power but not enough for stable POST.

5. **The CPU power connector** — the 8-pin (or 4+4 pin) connector in the top corner of the motherboard. This is frequently forgotten on new builds and overlooked during re-assembly. A missing CPU power connector will prevent POST entirely.

If the system powers on, fans spin, but nothing else happens — check the CPU power connector first. It's the most commonly missed connection in new builds.

## Step 2: POST Beep Code Meanings

If your motherboard has a speaker (or a built-in piezo buzzer), POST beep codes are a direct communication from the BIOS about what failed. Beep code patterns vary by BIOS manufacturer.

### AMI BIOS Beep Codes (common on ASUS, MSI, Gigabyte boards)

| Beep Pattern | Meaning |
|---|---|
| 1 short beep | POST successful — no errors |
| 2 short beeps | Memory parity error |
| 3 short beeps | Base 64K memory failure |
| 4 short beeps | System timer failure |
| 5 short beeps | CPU failure |
| 6 short beeps | Keyboard controller failure |
| 7 short beeps | Virtual mode exception error |
| 8 short beeps | Display memory error (GPU VRAM) |
| 9 short beeps | ROM BIOS checksum error |
| 1 long, 2 short | Video adapter failure |
| 1 long, 3 short | Video memory failure |
| Continuous beeping | RAM or GPU not seated |

### Award BIOS Beep Codes (older systems)

| Beep Pattern | Meaning |
|---|---|
| 1 long, 2 short | GPU issue |
| 1 long, 3 short | Video memory issue |
| High-frequency repeating | CPU overheating or failure |
| Repeating short beeps | Power issue or RAM |

If you hear beeps, count them and look up the code for your specific motherboard's BIOS type. This is one of the fastest diagnostic paths available.

## Step 3: RAM Reseating Step by Step

Improperly seated RAM is the single most common cause of no-POST failures, both in new builds and after a system has been moved or worked on.

**Step 1: Power down and unplug the PC from the wall.**

**Step 2: Open the side panel and locate the RAM slots.**

**Step 3: Identify the correct RAM slots.**
- For most dual-channel motherboards, two sticks should go in slots 2 and 4 (not 1 and 2, which are adjacent)
- Check your motherboard manual for the recommended dual-channel configuration — it's usually printed directly on the board near the slots (e.g., "DIMMA2 / DIMMB2" on ASUS boards)

**Step 4: Remove all RAM sticks.**
- Press the retention clips at both ends of the slot outward to release each stick
- Pull the stick straight up — not at an angle

**Step 5: Inspect the sticks and slots.**
- Look for dust or debris in the slot
- Check the gold contacts on the RAM for any visible oxidation or damage

**Step 6: Reseat one stick in slot 2 (the second slot from the CPU).**
- Line up the notch on the stick with the notch in the slot
- Press down firmly and evenly on both ends until you hear two clicks
- Confirm both retention clips are locked

**Step 7: Try to boot with just one stick.**
- If it boots: the other stick or its slot may be faulty
- If it doesn't boot: try the other stick alone in the same slot
- If neither stick boots in slot 2 alone: try slot 1 with one stick
- If any combination boots: work backward to find the faulty stick or slot

This process of testing one stick at a time in different slots is the systematic way to isolate a bad stick or a bad slot.

## Step 4: GPU Power Connector Check

A GPU with an unplugged or improperly seated power connector will either fail to POST or produce a black screen with a POST error.

**Step 1: Identify the power connectors on the GPU.**
Modern GPUs use 8-pin PCIe connectors, 16-pin connectors (NVIDIA's 12VHPWR / 16-pin adapter), or combinations of these.

**Step 2: Check each connector is fully seated.**
The click on PCIe power connectors is firm — push until you hear it. A connector that's 80% of the way in will often pass power but intermittently.

**Step 3: For 16-pin (12VHPWR) connectors (RTX 4000 series):**
- These connectors have had documented issues with partial insertion causing connector damage and, in rare cases, fires
- Make sure the connector is fully inserted until both retention tabs click
- The cable should be able to support its own weight without the connector drooping downward

**Step 4: Check the GPU is seated in the PCIe slot.**
- The GPU should click into the PCIe retention clip at the end of the slot
- Partially seated GPUs are a boot failure cause — press the card down firmly along its full length

## Step 5: Debug LED Interpretation Guide

Most modern mid-range and high-end motherboards include a 4-LED debug indicator on the board. These are invaluable for diagnosing no-POST situations.

| LED Label | What It Indicates When Lit |
|---|---|
| CPU | CPU initialization failed or CPU not detected |
| DRAM | RAM initialization failed; try reseating or testing sticks |
| VGA | GPU not detected or GPU initialization failed |
| BOOT | Storage device (SSD/HDD) not found, or OS bootloader failed |

**How to read them:**

During a normal POST, these LEDs typically light up in sequence (CPU → DRAM → VGA → BOOT) and then turn off as each component initializes successfully. If the system stops with one LED on, that indicates the stage where POST failed.

- **CPU LED stays on:** CPU not properly seated, or damaged CPU. Also occurs when CPU power connector is missing.
- **DRAM LED stays on:** RAM issue — reseat, test one stick at a time
- **VGA LED stays on:** GPU issue — reseat the card, check power connectors, try integrated graphics if available
- **BOOT LED stays on:** OS or storage issue — check SATA/NVMe connections; may be a corrupted OS or failed drive

Some boards (particularly ASUS ROG/TUF and MSI MEG/MAG series) also have a two-digit POST code display (Q-Code or POST Code display), which provides even more specific information. Refer to your motherboard manual's POST code table.

## Step 6: CMOS Clear Procedure

A CMOS clear resets the BIOS to factory defaults. This fixes failed overclocks, corrupted BIOS settings, and situations where a BIOS update went wrong.

**Method 1: CMOS jumper (most reliable)**

1. Power down and unplug the PC
2. Locate the CMOS jumper on the motherboard — usually labeled "CLRTC," "JBAT1," or "CLR_CMOS" near the coin cell battery
3. Move the jumper from pins 1-2 to pins 2-3
4. Wait 10–15 seconds
5. Move the jumper back to pins 1-2
6. Reconnect power and boot

**Method 2: Remove the CMOS battery**

1. Power down and unplug
2. Locate the round coin cell battery (CR2032) on the motherboard
3. Pop it out — most have a small clip
4. Wait 30–60 seconds (allows capacitors to discharge fully)
5. Reinsert the battery
6. Power on — the BIOS will show default settings

**Method 3: CMOS button (on premium boards)**

Some boards (ASUS ROG, MSI MEG) have a dedicated CLR_CMOS button on the I/O panel. Press and hold it for 5 seconds with the system powered off but PSU plugged in.

After clearing CMOS, re-enter the BIOS and re-enable:
- XMP/EXPO (RAM speed profile)
- Secure Boot (if needed for Windows 11)
- Boot order (ensure the OS drive is first)

## Step 7: Minimum Boot Configuration

If the above steps haven't resolved the issue, strip the system to bare essentials to isolate the problem.

**Minimum boot config:**
- CPU (with cooler)
- One RAM stick (in slot 2 or the primary recommended slot)
- GPU (or use CPU integrated graphics if available)
- One boot drive (the OS SSD)
- PSU, power connections (24-pin + CPU 8-pin + GPU power)

**Remove from the system:**
- Additional RAM sticks
- Additional storage drives
- PCIe expansion cards (sound cards, capture cards, USB hubs)
- Front panel USB and audio headers
- Optical drives

Power on with just the minimum configuration. If it boots, add components back one at a time, rebooting after each addition. The first component that causes failure when added back is the culprit.

**Breadboarding:** If you want to go even further, you can boot the system outside the case — on a cardboard box or anti-static mat — with only the essentials. This eliminates the possibility of a grounding issue caused by a standoff touching the motherboard in the wrong place.

## New Build vs. Previously Working System: Different Approaches

The diagnostic strategy differs depending on whether this is a brand-new build or a system that was working before.

### New Build

- **Most common cause:** Missing connection or unseated component
- Start with: CPU power connector check → RAM seating → GPU seating
- Verify: CPU is in the correct orientation (look for the golden triangle on AMD CPUs, or the arrow mark on Intel CPUs for pin 1 alignment)
- Check: Standoffs installed in the right positions (a standoff in the wrong hole can short the motherboard)
- Consider: The system may need a BIOS update before accepting a new CPU — some boards ship with older BIOS versions that don't support current-generation CPUs

### Previously Working System

- **Most common causes:** Loose connection (especially after moving the PC), failed component, Windows update issue, software corruption
- Start with: Power chain check → RAM reseat → CMOS clear
- Check: Any recent changes (new hardware, driver update, BIOS update, Windows update)
- Look for: Dust accumulation causing thermal shutdown, or fans failing and triggering thermal protection

## BIOS Recovery Mode

If the BIOS itself is corrupted (from a failed update or power loss during an update), some boards have a recovery mechanism.

**ASUS BIOS Flashback:**
- Copy a BIOS file to a FAT32 USB drive (rename it as specified in the manual, usually something like `H670PLUS.CAP`)
- Insert into the BIOS Flashback USB port (usually labeled on the I/O panel)
- Hold the BIOS Flashback button for 3 seconds until the LED flashes
- Wait for the process to complete (10–15 minutes); don't remove the USB or power off

**MSI Flash BIOS Button:**
- Similar process — copy BIOS file to USB, insert in designated port, press Flash BIOS button

**Gigabyte Q-Flash Plus:**
- Copy BIOS to USB, insert in Q-Flash port, press button

This is a last resort for unresponsive systems where no other approach has worked. It re-flashes the BIOS chip directly from USB without needing the system to POST first — which is what makes it valuable when nothing else works.

---

## FAQ

**Q: My PC powers on but the monitor says "No Signal." What's the most likely cause?**
Check that the display cable is connected to the GPU, not the motherboard's video output (if your CPU has integrated graphics). If it is connected to the GPU, reseat the GPU in the PCIe slot and check its power connectors. If the problem persists, try a different cable and a different monitor input port.

**Q: How do I know if my PSU is dead?**
A completely dead PSU shows no fan movement, no LED activity, and no response to the power button. If the system powers on but shuts off under load, the PSU may be failing or underpowered. Use a PSU tester ($15–$20) or try a known-good PSU to confirm. The paperclip test (jumping the green wire to a black wire on the 24-pin) can confirm whether the PSU can at least start its fan.

**Q: The DRAM LED stays on. I've reseated the RAM but it still fails. What next?**
Try each stick individually in different slots. If one slot consistently fails with known-good RAM, that slot may be dead — use the remaining slots. If all slots fail with a stick that works in another slot, the RAM itself is faulty. Consider testing the RAM in another system if possible.

**Q: My PC won't boot after a Windows update. Is it a hardware problem?**
Probably not. A failed Windows update can corrupt the boot loader. Restart and press F8 (or hold Shift while clicking Restart from within Windows) to access recovery mode. Use "Startup Repair" or "System Restore" to a point before the update. If Windows won't start far enough to reach recovery, boot from a Windows 11 installation USB and use the repair options there.

**Q: I cleared CMOS and now Windows won't start. Did I break something?**
A CMOS clear resets the boot order in BIOS. Go back into the BIOS, ensure the correct drive is set as the first boot device under Boot Order, and save. Windows should start normally.

**Q: Can a faulty SATA cable cause a no-boot situation?**
Yes. A damaged SATA cable or a loose connection on either end can prevent the OS drive from being detected, causing the system to stop at the BOOT LED. Swap the SATA cable and try a different SATA port on the motherboard. Also check that the SATA port you're using isn't disabled in the BIOS.

**Q: My PC was working fine, then I added a new component and now it won't boot. What happened?**
Remove the new component and check if the system boots without it. Common issues: new RAM that isn't compatible or requires XMP to be enabled, a GPU that requires more PSU wattage than available, or a new NVMe SSD that changed the drive priority in BIOS. If the system boots without the new component, the issue is specific to that addition.
