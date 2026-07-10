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

This isn't a vague "software issue." It's usually a hardware and firmware handshake problem. The SSD itself might be fine. The boot chain might be wrong. The BIOS might be looking in the wrong place. That is why this error can show up even when the drive is physically present.

`[Image placeholder: motherboard with the new NVMe SSD installed in the primary M.2 slot, showing the heatsink and PCIe lane connection]`

## The First Thing to Check: Is the Drive Even Seen?

Before you touch Windows, go straight into the BIOS/UEFI and verify the SSD is detected.

1. Power on the PC and enter the BIOS/UEFI.
2. Look for the drive under storage, drive information, or boot devices.
3. If the new **NVMe SSD** doesn't appear, that's a hardware or firmware issue, not a Windows issue.
4. If it does appear, the problem is likely boot configuration or boot mode.

Some motherboards hide drives in a weird way. On some boards, the **M.2 slot** is only active if the correct SATA lanes are disabled or the slot is enabled in BIOS. On others, the drive shows up only after you enable **PCIe storage** or **NVMe support** in the firmware menu. If the board is older, it may not support the exact drive model or the speed mode you chose.

### Common Symptoms and Likely Causes

| Symptom | Likely Culprit |
|---|---|
| BIOS shows no drive at all | Bad M.2 slot, improper seating, unsupported SSD, BIOS not detecting NVMe |
| Drive appears in BIOS but Windows won't boot | Boot order is wrong, missing bootloader, wrong boot mode |
| PC boots from old HDD/SSD instead of new NVMe | Old drive still set as primary boot target |
| Error appears immediately after install | SSD not fully seated, M.2 slot disabled, BIOS reset needed |
| SSD appears but is not bootable | Windows install not cloned correctly or EFI partition missing |

## Step-by-Step Fix Guide

### 1. Power Down Properly and Reset the Firmware

This sounds basic, but it fixes more weird boot issues than people admit.

1. Shut the PC down completely.
2. Unplug the power cable from the PSU.
3. Hold the power button for 10 seconds to drain residual charge.
4. Reconnect power.
5. Enter BIOS again.

If the board was acting weird after the new install, a firmware reset is worth doing. Some motherboards keep stale boot data or misread the new storage device until a reset occurs.

If your board has a **clear CMOS** jumper or button, use it. A short reset can flush bad boot settings that were baked in before the new SSD was installed.

### 2. Check the Physical Installation

This part matters more than most people think.

- Make sure the **NVMe SSD** is fully seated in the **M.2 slot**.
- Confirm it clicks into place properly.
- If your motherboard uses a retention screw, tighten it, but don't crush the drive.
- If the board has a heatsink over the M.2 slot, make sure it sits flat and doesn't shift the drive.
- If the drive is in a secondary slot, try moving it to the primary one.

A half-seated SSD can look fine and still fail to boot. I have seen boards that detect the drive only after a second reseat. The connector is tiny. The contact pressure is subtle. A sloppy install can cause exactly this kind of headache.

`[Image placeholder: close-up of the M.2 slot with the SSD correctly seated and the screw tightened, showing proper alignment]`

### 3. Make Sure the Board Detects the SSD

Once you're in BIOS, inspect the storage section.

Look for:
- The drive model name
- The PCIe/NVMe interface
- The storage capacity
- The device lane assignment

If the drive doesn't appear, try these moves:

- Move the drive to another **M.2 slot** if your board has more than one.
- Disable unused storage features in BIOS and try again.
- Update the BIOS if the board is old and the SSD is new.
- Check whether the motherboard supports that specific SSD generation and form factor.

Some older boards struggle with newer **Gen4 NVMe SSDs** in certain slots. They may still work, but not at full speed, or not at all in the slot you picked. A dead-simple test is to swap the drive to a different M.2 slot and see if the board recognizes it.

### 4. Check Boot Mode: UEFI vs Legacy

This is where a lot of people get burned.

If Windows was installed in **UEFI mode**, the system needs the BIOS set to **UEFI**. If the machine was installed in **Legacy BIOS** mode, it needs legacy boot enabled. Mixing them causes exactly the kind of error you're seeing.

In BIOS, look for:
- **Boot Mode**: UEFI or Legacy
- **CSM**: enabled or disabled
- **Secure Boot**: on or off

If your Windows install is modern, use **UEFI**. If you cloned an old system or installed Windows in legacy mode, you may need to switch the boot mode to match the install.

A common trap: the SSD is there, but the board is trying to boot from a legacy device that doesn't exist. That makes the machine behave like it has no boot device at all.

### 5. Set the Correct Boot Order

The motherboard may be trying to boot from the wrong drive.

1. Open the boot priority menu.
2. Move the new **NVMe SSD** to the top of the boot sequence.
3. If you still have the old HDD/SSD installed, disconnect it temporarily if possible.
4. Save and reboot.

If the system still doesn't boot, the SSD may not have a valid Windows bootloader.

### 6. If the SSD Was Cloned, Verify the Boot Files

A clone is not magic. It can copy the partition contents and still leave the machine unable to boot.

If you installed Windows by cloning the old drive to the new SSD, check for these:

- The **EFI System Partition** exists
- The bootloader files are present
- The boot order points to the correct partition
- The old drive isn't still being chosen first

If the clone was done badly, the new SSD can appear as a normal drive but still lack the files needed to start Windows. In that case, the fix is to repair the boot entry or reinstall Windows.

You can do this from Windows Recovery if the system can reach the recovery environment. A common recovery command is:

`bootrec /fixboot`

and then:

`bootrec /rebuildbcd`

If those commands fail, the Windows installation is probably missing the required EFI files. At that point, a repair install or clean install is the more honest fix.

### 7. Repair the Windows Bootloader

If the SSD is visible but the machine still says **No Bootable Device Found**, the bootloader may be broken.

Use these steps if you can access recovery:

1. Boot from a Windows installation USB.
2. Choose Repair your computer.
3. Open Troubleshoot.
4. Go to Advanced options.
5. Run Startup Repair.
6. If that fails, open Command Prompt and run the boot repair commands.

If the machine refuses to enter recovery, you may need to change the boot order to the USB installer. That is one of the most common overlooked fixes.

`[Image placeholder: Windows recovery screen with Advanced options open and Startup Repair highlighted]`

## What If the SSD Is Detected but Still Won't Boot?

Then the issue is usually one of these:

- The SSD has no boot partition.
- The drive contains the operating system but not the proper **EFI partition**.
- The Windows install was copied to the drive but the boot manager wasn't recreated.
- The drive is fine, but the board is trying to boot a different device first.

In that case, you have two realistic options:

1. Repair the boot files from recovery.
2. Reinstall Windows on the new SSD and move your files over afterward.

If the SSD is a fresh install target, I usually recommend a clean install when the machine is already acting unstable. It is cleaner, faster, and less annoying than trying to fight a half-broken clone.

## When the Problem Is Actually the SSD

Sometimes the SSD itself is the weak link.

A bad **NVMe drive** can cause:
- random boot failures
- detection drops
- corruption during clone or install
- BIOS freezes during POST

If the drive is not detected in BIOS at all, the issue may be:
- a bad SSD
- a bad M.2 slot
- a damaged PCIe lane on the motherboard
- a power issue with the board

A very quick test is to install the SSD in another slot or test a different drive in the same slot. That tells you fast whether the problem is the drive or the board.

## Quick Checklist

Here is the short version if you want to stop chasing ghosts:

1. Confirm the SSD appears in BIOS.
2. Verify the correct boot mode is enabled.
3. Move the new drive to the top of the boot order.
4. Disconnect the old drive temporarily if needed.
5. Repair the Windows bootloader if the drive is visible.
6. Reinstall Windows if the boot files are missing or the clone is broken.

## Final Thoughts

If the system says **No Bootable Device Found**, don't start with random software fixes. Start with the hardware path: check the **NVMe SSD** seating, confirm BIOS detection, match **UEFI/Legacy** mode to the install, and make sure the new drive is actually first in the boot order. If the drive isn't detected at all, stop blaming Windows and inspect the board, slot, and SSD.
