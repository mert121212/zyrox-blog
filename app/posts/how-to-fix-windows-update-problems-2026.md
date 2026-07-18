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

I've spent more hours than I'd like to admit staring at a Windows Update progress bar stuck at 0% or looping through a "Failure configuring Windows updates — Reverting changes" reboot cycle. It's one of those problems that feels simple on the surface but can spiral into a frustrating rabbit hole if you don't work through it methodically. The good news is that after dealing with this on dozens of machines — from freshly built desktops to enterprise laptops that haven't been patched in two years — I've landed on a reliable sequence that fixes the vast majority of Windows Update failures. This guide walks through every tool and technique I actually use, in the order I actually use them.

---

## Step 1: Run the Built-In Windows Update Troubleshooter

Before you touch the command line, let Windows attempt its own repair. The built-in Windows Update Troubleshooter is more capable than it looks. In recent builds it can detect stuck services, misconfigured registry keys, and corrupted metadata caches — and fix them automatically.

**How to find and run it:**

1. Open **Settings** with `Win + I`
2. Navigate to **System → Troubleshoot → Other troubleshooters**
3. Find **Windows Update** in the list and click **Run**

Let the troubleshooter finish completely. Don't close it early. The summary screen will tell you what it found and what (if anything) it changed. Even if it says "No changes were necessary," note the specific items it checked — that information is useful for the next steps.

On Windows 11 version 23H2 and later, Microsoft has folded several additional diagnostic checks into this tool, including component store validation. It's worth running even if you've tried it before on an older build.

---

## Step 2: Run SFC /scannow and DISM to Repair the Windows Image

Corrupted system files are one of the most common root causes of persistent update failures. Windows ships two complementary repair utilities: **SFC** (System File Checker) and **DISM** (Deployment Image Servicing and Management). Use both — in sequence — for the best result.

Open **Command Prompt as Administrator**: right-click the Start button, select **Terminal (Admin)**, or search `cmd`, right-click, and choose **Run as administrator**.

**Run SFC first:**

```
sfc /scannow
```

SFC scans all protected system files and replaces corrupted versions from a local cache. Expect it to take 10–20 minutes. When it finishes you'll see one of three outcomes:

- *Windows Resource Protection did not find any integrity violations* — SFC found nothing wrong
- *Windows Resource Protection found corrupt files and successfully repaired them* — repaired, try updating again
- *Windows Resource Protection found corrupt files but was unable to fix some of them* — this is where DISM comes in

**Run DISM in sequence:**

```
DISM /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
```

Run all three in that exact order. `CheckHealth` reads a flag in the image and takes only a few seconds. `ScanHealth` does a thorough offline corruption scan (5–10 minutes). `RestoreHealth` is the key command — it connects to Windows Update servers, downloads replacement components, and repairs the image. This one can take 20–45 minutes depending on your internet speed.

After DISM finishes, run `sfc /scannow` one more time to let SFC apply fixes to files that DISM has now repaired in the image.

---

## Step 3: Stop and Restart Windows Update Services via Services.msc

Sometimes the update stack itself gets into a stuck state where services are running but not functioning correctly. Restarting them cleanly often breaks the logjam.

**Using Services.msc (GUI method):**

1. Press `Win + R`, type `services.msc`, and hit Enter
2. Find and **Stop** each of these services (right-click → Stop):
   - **Windows Update** (wuauserv)
   - **Background Intelligent Transfer Service** (BITS)
   - **Cryptographic Services** (CryptSvc)
3. Wait for all three to fully stop, then **Start** them again in the same order

**Using Command Prompt (faster):**

```
net stop wuauserv
net stop bits
net stop cryptsvc
net start cryptsvc
net start bits
net start wuauserv
```

This forces a clean restart of the entire update stack without requiring a full system reboot. After this, head to **Settings → Windows Update** and try checking for updates again.

---

## Step 4: Clear the SoftwareDistribution Folder

The `SoftwareDistribution` folder at `C:\Windows\SoftwareDistribution` is where Windows stores downloaded update packages and metadata. If this folder gets corrupted — which happens after interrupted downloads, power loss during updates, or disk errors — update checks will fail silently or loop forever. Deleting its contents forces Windows to start fresh.

**Follow this exact sequence:**

1. Open an elevated Command Prompt and stop the relevant services:
   ```
   net stop wuauserv
   net stop bits
   net stop cryptsvc
   ```
2. Open **File Explorer** and navigate to `C:\Windows\SoftwareDistribution`
3. Select everything inside the folder (`Ctrl + A`) and delete it. You can also rename the whole folder to `SoftwareDistribution.old` if you prefer to keep a backup: right-click the folder in `C:\Windows\` and rename it
4. Restart the services:
   ```
   net start cryptsvc
   net start bits
   net start wuauserv
   ```
5. Open **Settings → Windows Update** and click **Check for updates**

Windows will recreate the `SoftwareDistribution` folder automatically. The first update check after clearing it will take longer than usual because it has to re-download the update catalog — that's expected behavior, not a new error.

---

## Step 5: Verify TPM 2.0 and Secure Boot for Windows 11

If you're dealing with Windows 11 installation or upgrade errors specifically, the most common blockers are **TPM 2.0** and **Secure Boot**. Windows 11 requires both, and the installer will refuse to proceed — or will uninstall itself after setup — if either is missing or disabled.

**Check TPM status:**

1. Press `Win + R`, type `tpm.msc`, and press Enter
2. The TPM Management console opens. You want to see: *The TPM is ready for use* and **Specification Version: 2.0**

If TPM shows as not available or version 1.2, reboot into your UEFI firmware settings and look for:
- **Intel platforms:** *Intel Platform Trust Technology (PTT)* — enable it under Security settings
- **AMD platforms:** *AMD fTPM switch* — enable it under AMD CPU Configuration

**Check Secure Boot status:**

1. Press `Win + R`, type `msinfo32`, and press Enter
2. Under **System Summary**, find **Secure Boot State** — it should read **On**

To enable Secure Boot: reboot, press your firmware key at POST (usually `Del`, `F2`, or `Esc`), or use **Settings → System → Recovery → Advanced startup → Restart now → UEFI Firmware Settings**. Inside the firmware, find **Boot → Secure Boot** and enable it. Confirm the system is in **UEFI mode**, not **Legacy/CSM mode** — Secure Boot won't function in Legacy mode regardless of the setting.

---

## Step 6: Roll Back a Bad Update

If an update installed and then broke something — your GPU driver stopped working, a specific app crashes, Wi-Fi disconnects repeatedly — rolling it back is the right move.

**Via Settings (system is still bootable):**

1. Go to **Settings → Windows Update → Update history**
2. Click **Uninstall updates**
3. Sort by **Install date**, find the problematic KB number, and click **Uninstall**

**Via Windows Recovery Environment (system won't boot):**

1. Trigger the Windows RE by interrupting boot three times in a row (hold the power button during startup)
2. Go to **Troubleshoot → Advanced options → Uninstall Updates**
3. Select **Uninstall latest quality update** (monthly patch) or **Uninstall latest feature update** (version upgrade)

After rollback, use the **Pause updates** option in Settings to prevent the same update from being applied again while you investigate or wait for a revised version.

---

## Step 7: Download Updates Manually from the Microsoft Update Catalog

When automatic delivery keeps failing for a specific update, the Microsoft Update Catalog lets you download and install it directly, bypassing the update service entirely.

1. Go to [catalog.update.microsoft.com](https://www.catalog.update.microsoft.com) in your browser
2. Search for the KB number shown in your update error (you'll find this in **Settings → Windows Update → Update history**)
3. Select the version matching your Windows edition and processor architecture (x64 for most systems; ARM64 for Surface Pro X and newer ARM devices)
4. Download the `.msu` file
5. Double-click to install, or from an elevated prompt:
   ```
   wusa.exe C:\Users\YourName\Downloads\KB1234567.msu /quiet /norestart
   ```

This method sidesteps corrupted service components entirely and is particularly useful for cumulative updates that refuse to download through the Settings panel.

---

## Common Windows Update Error Codes

| Error Code | Meaning | Fix |
|---|---|---|
| **0x80070057** | Invalid parameter — often a partition or disk issue during update staging | Run `sfc /scannow`; check disk health with `chkdsk /f /r`; verify free space |
| **0x80248014** | Update metadata or catalog out of sync — Update Services is confused about what's available | Clear SoftwareDistribution folder; restart update services; re-check |
| **0x8007000E** | Insufficient memory — Windows ran out of RAM while downloading or applying the update | Close background applications; check for RAM errors via Windows Memory Diagnostic (`mdsched.exe`) |
| **0x80070103** | Driver version mismatch — Windows is trying to install an incompatible driver version | Skip or hide the specific driver update using the [Show or hide updates](https://support.microsoft.com/en-us/topic/use-the-show-or-hide-updates-troubleshooter-package-to-prevent-specific-updates-from-being-installed-bf6b2d4e-bb6e-8b42-8db2-6a6038b5d0e5) troubleshooter (`wushowhide.diagcab`) |

---

## The Update Stacking Problem: Why Updates Fail in a Chain

One situation that trips people up consistently is **update stacking** — trying to jump to a new feature update when several cumulative quality updates are still pending. Windows Update can get confused by the dependency chain and stall indefinitely.

The solution is to work through updates in sequence:

1. Check **Settings → Windows Update** and let all pending **quality updates** (the monthly cumulative patches) install first
2. Reboot after each batch when prompted — don't skip the restarts
3. Once the quality update chain is complete, attempt the **feature update** (the annual OS version upgrade, like 22H2 → 23H2 → 24H2)

If you want to avoid this problem proactively, defer feature updates: **Settings → Windows Update → Advanced options → Choose when updates are installed** — set Feature Updates to defer by 30–90 days. This gives Microsoft time to catch post-release issues before they hit your machine.

---

## Common Questions

**Q: The Windows Update Troubleshooter says it fixed things, but the update still fails. What should I do next?**
A: The troubleshooter handles surface-level issues but doesn't touch deep image corruption. Run `DISM /Online /Cleanup-Image /RestoreHealth` and then clear the SoftwareDistribution folder. Those two steps cover the cases the troubleshooter misses.

**Q: Windows says I'm up to date, but I know there's a newer version available. Why isn't it showing up?**
A: Microsoft stages updates gradually using Compatibility Holds — if your hardware or driver configuration has a known issue with the new version, your machine is placed on a hold list and won't be offered the update until the issue is resolved. Run the **PC Health Check** app or use the **Media Creation Tool** to force-initiate the upgrade if you want to bypass the hold.

**Q: Should I disable Windows Update to avoid interruptions?**
A: Disabling it entirely is a bad idea — security patches close actively exploited vulnerabilities, and skipping them indefinitely creates real exposure. Instead, configure **Active Hours** under **Settings → Windows Update → Advanced options** to prevent automatic installs during your working hours, and enable **Notify to schedule restart** so you control when reboots happen.

**Q: My drive is nearly full and updates keep failing. Is that the cause?**
A: Yes. Windows Update needs several gigabytes of free space to download, extract, and stage update files. If you're under 10 GB free, that's your problem. Go to **Settings → System → Storage → Cleanup recommendations** or run **Disk Cleanup** (`cleanmgr.exe`) to recover space, then retry.

**Q: My laptop shows error 0x80070057 repeatedly. I've tried everything. What's left?**
A: Run `chkdsk C: /f /r` from an elevated prompt and reboot — Windows will scan the drive for bad sectors on next startup. A failing or fragmented drive is a common source of 0x80070057 that SFC and DISM won't catch because those tools check the OS image, not the physical disk surface.

**Q: How do I find which specific update caused a problem?**
A: Go to **Settings → Windows Update → Update history**, note the install date of the most recent update, and check whether your problem started around that date. Once you have the KB number, search it on the [Windows Release Health](https://aka.ms/WindowsReleaseHealth) dashboard — Microsoft posts known issues and workarounds there. If a known issue exists, the fix is usually a follow-up patch rather than a permanent rollback.

**Q: Can I use the Microsoft Update Catalog on a machine that's completely offline?**
A: Yes — download the `.msu` file on another device, transfer it via USB drive, and install it with `wusa.exe` as described in Step 7. This is exactly how IT administrators patch air-gapped machines.


