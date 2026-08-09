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
---

![Hero Image](/images/default-hero.jpg)
I've spent more hours than I'd like to admit staring at a Windows Update progress bar stuck at 0% or looping through a "Failure configuring Windows updates — Reverting changes" reboot cycle. It's one of those problems that feels simple on the surface but can spiral into a frustrating rabbit hole if you don't work through it methodically. 

The good news is that after dealing with this on dozens of machines, I've landed on a reliable sequence that fixes the vast majority of Windows Update failures. This guide walks through every tool and technique I actually use, in the exact order I use them.

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

## Step 4: Clear the SoftwareDistribution Folder

Windows stores downloaded update packages in `C:\Windows\SoftwareDistribution`. If this folder gets corrupted (from a power loss or disk error), update checks will fail silently or loop forever. 

To fix this, open an Admin Command Prompt and stop the three services from Step 3 (`wuauserv`, `bits`, `cryptsvc`). Then open File Explorer, go to `C:\Windows\SoftwareDistribution`, and delete everything inside. Restart the three services in the command prompt. 

Windows will recreate the folder automatically. Your next update check will take longer than usual because it has to re-download the catalog, but it usually clears the error.

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

Update error codes actually mean something. `0x80070057` is an invalid parameter, often pointing to a failing or completely full hard drive. Run a chkdsk and clear up some space. 

`0x80248014` means the update metadata is out of sync, which is fixed by clearing the SoftwareDistribution folder in Step 4. 

`0x80070103` means Windows is trying to install an incompatible driver version. You can just hide this specific update using Microsoft's "Show or hide updates" troubleshooter tool.

## The Update Stacking Problem

One situation that trips people up is update stacking — trying to jump to a massive new feature update when you still have monthly cumulative patches pending. Windows Update gets confused by the dependency chain and stalls indefinitely.

The solution is simple: install all pending quality updates first. Reboot every time it asks. Once the quality update chain is totally clear, then attempt the big annual feature update. Work through it methodically, and you'll get it working again.


---

## Related Guides

- [How to Free Up Disk Space on Windows Without Deleting Your Files](/posts/how-to-free-up-disk-space-on-windows-without-deleting-your-files)
- [How to Fix High CPU Usage on Windows](/posts/how-to-fix-high-cpu-usage)
- [How to Check Your PC's Full Specs Without Installing Anything](/posts/how-to-check-your-pcs-full-specs-without-installing-anything)
