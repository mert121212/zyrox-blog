---
title: "How to Fix Windows Update Problems in 2026"
meta_description: "Follow a practical step-by-step guide to fix Windows update problems, from storage checks to reset tools and service troubleshooting."
date: 2026-08-04
category: "Windows"
tags:
  - "Windows"
  - "Windows Update"
  - "Troubleshooting"
  - "System Repair"
keywords:
  - "fix Windows update problems"
  - "Windows update not working"
  - "Windows update troubleshooting"
  - "Windows 11 update issues"
author: rachel-kim
image: "/images/posts/how-to-speed-up-a-slow-windows-11-pc.jpg"
---

![Hero Image](/images/posts/how-to-speed-up-a-slow-windows-11-pc.jpg)
Learning how to **fix Windows update problems** is essential when your PC gets stuck during critical security patches or fails to install cumulative updates. I've spent more hours than I'd like to admit staring at a Windows Update progress bar stuck at 0% or looping through a "Failure configuring Windows updates — Reverting changes" reboot cycle. It's one of those problems that feels simple on the surface but can spiral into a frustrating rabbit hole if you don't work through it methodically.

The good news is that after dealing with this on dozens of machines, I've landed on a reliable sequence to fix Windows update problems across both Windows 10 and Windows 11. This guide walks through every diagnostic tool and terminal command I actually use, in the exact order I use them.

## Step 1: Run the Built-In Windows Update Troubleshooter

Before you touch the command line, let Windows attempt its own repair. The built-in troubleshooter is more capable than it looks. It can detect stuck services, misconfigured registry keys, and corrupted metadata caches, and fix them automatically.

Open Settings (Win + I), navigate to System → Troubleshoot → Other troubleshooters, find Windows Update, and click Run. Let it finish completely. Even if it says no changes were necessary, make a note of what it checked. On newer [Windows 11](https://www.microsoft.com/windows/windows-11) builds, [Microsoft](https://www.microsoft.com) has folded several deep diagnostic checks into this tool, so it's always worth starting here.

## Step 2: Run SFC and DISM to Repair the Windows Image

Corrupted system files are a massive cause of update failures. Windows ships with two repair utilities: SFC (System File Checker) and DISM (Deployment Image Servicing and Management). 

Open an Administrator Command Prompt and run `sfc /scannow`. It takes about 10-20 minutes and replaces corrupted files from a local cache. If it finds files it can't fix, you need DISM.

Run these three DISM commands in exact sequence:
`DISM /Online /Cleanup-Image /CheckHealth`
`DISM /Online /Cleanup-Image /ScanHealth`
`DISM /Online /Cleanup-Image /RestoreHealth`

The final command connects to Windows Update servers, downloads replacement components, and repairs the image. It can take up to 45 minutes. Once it's done, run `sfc /scannow` one more time.

## Step 3: Stop and Restart Windows Update Services

Sometimes the update stack itself gets stuck. Restarting the services cleanly often breaks the logjam.

You can do this via Services.msc by stopping Windows Update, Background Intelligent Transfer Service (BITS), and Cryptographic Services. But it's much faster in an Admin Command Prompt. Run:
`net stop wuauserv`
`net stop bits`
`net stop cryptsvc`

Wait a moment, then start them back up in reverse:
`net start cryptsvc`
`net start bits`
`net start wuauserv`

Head back to Settings and try checking for updates again.

## Step 4: Clear the SoftwareDistribution and Catroot2 Folders

Windows stores downloaded update packages in `C:\Windows\SoftwareDistribution` and cryptographic signature catalogs in `C:\Windows\System32\catroot2`. If either folder contains corrupted hashes from an interrupted download or sudden reboot, Windows Update will loop forever or throw `0x80070002` errors.

To perform a clean reset from an Admin Command Prompt:
1. Stop all associated services:
   ```cmd
   net stop wuauserv
   net stop cryptsvc
   net stop bits
   net stop msiserver
   ```
2. Safely rename the cache and signature folders (Windows will automatically create fresh, pristine ones upon restart):
   ```cmd
   ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
   ren C:\Windows\System32\catroot2 catroot2.old
   ```
3. Restart the services:
   ```cmd
   net start wuauserv
   net start cryptsvc
   net start bits
   net start msiserver
   ```
4. Head back to Settings and check for updates. The first check will take 3–5 minutes as Windows rebuilds its local cryptographic catalog, but this fixes over 75% of persistent update hangs.

## Step 5: Verify TPM 2.0 and Secure Boot for Windows 11

If Windows 11 is refusing to install or upgrade, you are likely failing the hardware requirements. Windows 11 strictly requires TPM 2.0 and Secure Boot. 

Press Win + R, type `tpm.msc`, and hit Enter. You want to see "The TPM is ready for use" and Specification Version 2.0. If it's missing, reboot into your BIOS and enable [Intel](https://www.intel.com) PTT or [AMD](https://www.amd.com) fTPM.

For Secure Boot, press Win + R, type `msinfo32`, and check the Secure Boot State. It should be On. If not, go into your BIOS, ensure you are in UEFI mode (not Legacy/CSM), and enable Secure Boot.

## Step 6: Roll Back a Bad Update

If an update installed successfully but broke your Wi-Fi or GPU drivers, rolling it back is the right move.

Go to Settings → Windows Update → Update history, and click Uninstall updates. Find the problematic KB number and click Uninstall. 

If the system won't even boot, force a shutdown three times in a row to trigger the Windows Recovery Environment. Go to Troubleshoot → Advanced options → Uninstall Updates, and remove the latest quality or feature update. Don't forget to pause updates in Settings afterward so it doesn't immediately reinstall the broken patch.

## Step 7: Download Updates Manually

When an update just refuses to download through Settings, you can bypass the service entirely using the Microsoft Update Catalog. 

Go to catalog.update.microsoft.com, search for the KB number of the failing update, and download the .msu file that matches your architecture (usually x64). Double-click the file to install it manually. This sidesteps corrupted service components perfectly.

## Understanding Common Error Codes

Update error codes actually mean something specific:
- `0x80070057` (**`ERROR_INVALID_PARAMETER`**): Often caused by corrupted registry entries under the component store or invalid update staging flags. Run `DISM /Online /Cleanup-Image /RestoreHealth` and reset the update cache in Step 4.
- `0x80070070` (**`ERROR_DISK_FULL`**): Windows ran out of free space on your system partition (`C:`) or the hidden EFI/recovery partition. Free up at least 20–30 GB before retrying.
- `0x80248014`: The Windows Update data store is out of sync or corrupted; resolved by resetting `SoftwareDistribution` and `catroot2`.
- `0x80070103`: Windows is attempting to install a device driver that is already installed or has a lower rating than your current driver. This is harmless and can be ignored or hidden.

## The Update Stacking Problem

One situation that trips people up is update stacking — trying to jump to a massive new feature update when you still have monthly cumulative patches pending. Windows Update gets confused by the dependency chain and stalls indefinitely.

The solution is simple: install all pending quality updates first. Reboot every time it asks. Once the quality update chain is totally clear, then attempt the big annual feature update. Following this systematic workflow is the most dependable way to fix Windows update problems without resorting to a destructive clean operating system reinstall.

---

## Frequently Asked Questions

### Why does Windows Update get stuck or fail repeatedly?
Windows Update issues are most commonly caused by interrupted file downloads that corrupt cache folders (`SoftwareDistribution`), damaged system file manifests in the Windows component store, or background services that failed to start properly. Outdated third-party antivirus software and lack of free drive space can also block update transactions.

### Is it safe to clear or rename the SoftwareDistribution folder?
Yes, it is completely safe. The `SoftwareDistribution` directory is a temporary download cache where Windows stages update files. When you stop the update services and rename or delete the folder, Windows automatically creates a brand-new folder and re-downloads fresh update manifests from Microsoft servers.

### What should I do if an update triggers a boot loop or black screen?
If your computer cannot boot normally after installing an update, interrupt the boot sequence three times by holding the power button during startup. This launches Windows Recovery Environment (WinRE). From there, select **Troubleshoot > Advanced Options > Uninstall Updates** and remove the most recently installed quality or feature update.

### How much free drive space is required to fix Windows update problems?
Windows typically requires at least 20 GB to 30 GB of contiguous free space on your primary `C:` drive to unpack, verify, and stage major cumulative and feature updates. If your drive runs out of space during installation, you will frequently see errors such as `0x80070070`.

---

## Related Guides

- [How to Speed Up a Slow Windows 11 PC in Under 30 Minutes](/posts/how-to-speed-up-a-slow-windows-11-pc-in-under-30-minutes/)
- [Why Your PC Feels Slow Even When It Has Good Specs](/posts/why-your-pc-feels-slow-even-when-it-has-good-specs/)
- [Why High-End PCs Stutter in Windows 11: Memory Integrity Explained](/posts/why-high-end-pcs-stutter-windows-11-memory-integrity/)
- [How to Fix High CPU Usage in Windows](/posts/how-to-fix-high-cpu-usage/)
- [How to Free Up Disk Space on Windows Without Deleting Your Files](/posts/how-to-free-up-disk-space-on-windows-without-deleting-your-files/)
