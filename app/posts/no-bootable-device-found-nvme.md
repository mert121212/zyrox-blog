---
title: "How to Fix 'No Bootable Device Found' After Installing a New NVMe SSD"
meta_description: "Fix 'No Bootable Device Found' after adding an NVMe SSD with BIOS, boot order, UEFI, and drive detection steps."
date: 2026-07-09
category: "Hardware Troubleshooting"
tags:
  - "NVMe SSD"
  - "BIOS"
  - "UEFI"
  - "Boot Error"
  - "Windows Troubleshooting"
author: sara-vance
---

I spent three hours last Tuesday chasing a dead boot sequence on a custom PC that had just gained a shiny new **NVMe SSD**. The system showed the exact message everyone dreads: **No Bootable Device Found**. The SSD was physically installed. The motherboard saw it. Windows still wouldn't boot. That kind of failure is maddening because the problem is rarely just one thing. It's usually a mix of **firmware settings**, **boot order confusion**, **missing boot files**, or a bad seat on the **M.2 slot**.

If you're seeing this after installing a new NVMe drive, this guide will help you fix it without wasting a day on guesswork. I'll walk you through the real reasons it happens, the checks that matter, and the exact steps I use when a machine refuses to boot after a drive swap.

## Why This Happens

A new **NVMe SSD** can trigger this error for a few very specific reasons:

- The motherboard doesn't detect the drive at all.
- The drive is detected, but the BIOS/UEFI boot order points at the wrong device.
- The new SSD has no working Windows bootloader, so the system has nothing valid to launch.
- The machine is set to **Legacy boot** while the Windows install is on **UEFI** or vice versa.
- The SSD is installed in the wrong **M.2 slot** or the slot is disabled in BIOS.
- The old drive still has a higher boot priority, and the system is trying to boot from the wrong disk.
- The SSD was cloned badly, or the EFI partition didn't copy correctly.

## Step-by-Step Fix Guide

### 1. Reset the firmware and power state

Shut the PC down completely, unplug the PSU, hold the power button for 10 seconds, and then reconnect power. If the board has a **clear CMOS** option, use it.

### 2. Check the physical installation

Make sure the **NVMe SSD** is fully seated in the **M.2 slot**. Tighten the retention screw carefully and verify the heatsink is not shifting the drive.

### 3. Make sure the board detects the SSD

Enter BIOS and inspect the storage section. If the drive doesn't appear, try another **M.2 slot** or update the BIOS.

### 4. Match the boot mode

If Windows was installed in **UEFI mode**, the board should boot in UEFI mode. If it was installed in **Legacy BIOS** mode, the board must match that mode.

### 5. Set the correct boot order

Move the SSD to the top of the boot priority list. If you still have the old drive installed, disconnect it temporarily to force the machine to use the new one.

### 6. Repair Windows boot files

If the SSD is detected but still not bootable, repair the boot files with Windows Recovery. Use the installation USB and run `bootrec /fixboot` and `bootrec /rebuildbcd` if needed.

## Final Thoughts

If the system says **No Bootable Device Found**, don't start with random software fixes. Start with the hardware path: check the **NVMe SSD** seating, confirm BIOS detection, match **UEFI/Legacy** mode to the install, and make sure the new drive is actually first in the boot order.
