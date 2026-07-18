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

## Why This Happens (And Why It's Normal)

A new NVMe SSD can trigger this error for a few very specific reasons, and most of them don't mean your drive is broken:

- **The motherboard doesn't detect the drive at all.** This is usually physical. The drive isn't pushed in far enough, or it's in a slot that shares bandwidth with a SATA port you're already using.
- **The drive is detected, but the BIOS/UEFI boot order points at the wrong device.** Your motherboard is trying to boot from a random USB stick or a blank hard drive instead of the one with Windows on it.
- **The new SSD has no working Windows bootloader.** If you just bought the drive and haven't installed Windows yet, of course it won't boot. But if you *cloned* the drive, the cloning software might have missed the hidden EFI partition.
- **The machine is set to Legacy boot while the Windows install is on UEFI (or vice versa).** This happens a lot when moving an older Windows installation to a newer NVMe drive.
- **The old drive still has a higher boot priority.** The system is trying to boot from the wrong disk because it's confused by having two bootable drives connected.

## Step-by-Step Fix Guide

Don't panic. Go through these steps in order. I've structured them from the most common and easiest fixes to the slightly more annoying ones.

### 1. Reset the firmware and power state

Before you start tearing the PC apart, do a hard power cycle. Shut the PC down completely, unplug the PSU from the wall, hold the power button for 10 seconds to drain the capacitors, and then reconnect power. 

If the board has a **Clear CMOS** button or pins, use them. Sometimes the BIOS just gets confused when a PCIe lane assignment changes (which happens when you add an NVMe drive). Clearing the CMOS forces the motherboard to re-evaluate all connected hardware from scratch.

### 2. Check the physical installation (The "Did you push it until it clicked?" check)

NVMe drives install at an angle. You have to push them into the M.2 slot at a 30-degree angle until the gold pins are almost entirely hidden, and *then* push the drive flat to screw it down. I've seen dozens of builds where the drive was screwed down but wasn't actually seated in the slot. 

Take the drive out. Reseat it. Make sure it goes in firmly. Also, check your motherboard manual â€” on some boards, using M.2 Slot 2 disables SATA ports 5 and 6. If your old boot drive was plugged into SATA port 5, installing the NVMe drive just disconnected your old boot drive.

### 3. Verify the motherboard actually sees the SSD

Turn on the PC and mash the **Delete** or **F2** key to enter the BIOS. 

Navigate to the **Storage**, **NVMe Configuration**, or **System Status** page. Do you see the name of your new SSD (e.g., "Samsung 990 Pro 2TB" or "WD_BLACK SN850X")? 
- **If yes:** Great, the hardware works. The problem is software or boot order. Move to step 4.
- **If no:** The motherboard doesn't know the drive exists. Try a different M.2 slot. If it still doesn't show up, you might need to update your BIOS, as older boards sometimes need firmware updates to recognize newer high-capacity NVMe drives.

### 4. Fix the UEFI / CSM / Legacy Boot mismatch

This is the culprit 80% of the time when you've cloned an old drive to a new NVMe.

Modern NVMe drives require **UEFI boot mode**. Older SATA drives often used **Legacy (CSM)** mode. If your motherboard is set to Legacy/CSM, it literally cannot boot from an NVMe drive.

In your BIOS, look for a menu called **Boot** or **Advanced Mode**. Find the setting for **CSM (Compatibility Support Module)**. 
- If it is enabled, disable it. 
- Ensure **Boot Mode** is set to **UEFI Only**.
Save and exit. See if it boots.

### 5. Correct the Boot Order

If you have multiple drives installed, your BIOS might just be looking at the wrong one. 

In the BIOS **Boot** menu, look for **Boot Option #1**. It should be set to **Windows Boot Manager (Your NVMe Drive Name)**. If it's just set to the drive name without "Windows Boot Manager", it might fail. Make sure "Windows Boot Manager" is at the very top of the priority list.

*Pro tip:* If you still have your old boot drive installed and you're trying to boot from the new one, shut down and physically unplug the SATA cable from the old drive. Force the motherboard to look *only* at the new NVMe drive. Once Windows boots successfully from the NVMe, you can plug the old drive back in and format it.

### 6. Repair the Windows Bootloader

If the SSD is detected, UEFI is enabled, and the boot order is correct, but you still get the error â€” your Windows boot files are likely corrupted or didn't clone properly. 

You need a Windows Installation USB for this.
1. Boot from the Windows USB.
2. Click "Next" on the language screen, then click **Repair your computer** in the bottom left.
3. Go to **Troubleshoot > Advanced Options > Command Prompt**.
4. Type these commands one by one, hitting Enter after each:
   - `bootrec /fixmbr`
   - `bootrec /fixboot` (If this says "Access Denied", that's unfortunately common in Windows 10/11 and usually means the EFI partition is totally missing).
   - `bootrec /rebuildbcd`

If `rebuildbcd` finds your Windows installation, type `Y` to add it to the boot list, restart, and you should be good to go.

## The Nuclear Option: Clean Install

If you cloned your old drive to the new NVMe and you've spent more than two hours fighting this error, stop. 

Cloning software (like Macrium Reflect, Acronis, or Samsung Magician) is great when it works, but when it fails to copy the EFI boot partition correctly, fixing it manually is a massive headache. 

The most reliable, fastest way to get your PC running beautifully on that new NVMe drive is to do a **clean installation of Windows**. Boot from your Windows USB, install fresh to the NVMe drive, and then just drag and drop your files over from the old drive. It takes 15 minutes to install Windows 11 on an NVMe SSD, and it guarantees you won't have any lingering registry errors or bootloader ghosts from your old setup.

## Frequent Questions

**Do I need a driver for my NVMe SSD to boot?**
For modern NVMe drives (PCIe 3.0, 4.0, or 5.0) on Windows 10 or 11, no. The native Windows NVMe driver works perfectly out of the box. You do not need to install manufacturer-specific drivers just to get the system to boot.

**Why does my drive show up in BIOS but not as a boot option?**
This means the motherboard sees the physical hardware, but it doesn't see a valid operating system on it. This happens if the drive is completely blank (needs Windows installed), if the boot partition is missing (bad clone), or if your BIOS is set to Legacy mode instead of UEFI.

**Can an M.2 slot be disabled?**
Yes. Read your motherboard manual. It's incredibly common for M.2_2 or M.2_3 slots to share PCIe lanes with SATA ports or PCIe expansion slots. If you have something plugged into the shared port, the M.2 slot might automatically disable itself.

Don't let the black screen scare you. It's almost always a settings mismatch, not a dead drive. Take a breath, check the physical connection, switch to UEFI mode, and you'll get it sorted.



