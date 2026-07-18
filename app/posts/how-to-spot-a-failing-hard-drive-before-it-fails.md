---
title: "How to Spot a Failing Hard Drive Before It Fails"
meta_description: "A straightforward guide to warning signs, diagnostics, and backup habits that help you catch hard drive issues early."
date: 2026-07-06
category: "Storage"
tags:
  - "Hard Drive"
  - "Backup"
  - "Diagnostics"
  - "Storage"
author: sara-vance
---

The first time I lost data to a failing hard drive, I had ignored four separate warning signs over the course of three weeks. The boot times had gotten longer. A folder occasionally took five seconds to open instead of one. I heard a faint clicking sound once or twice that I dismissed as case vibration. Then one morning the drive simply did not appear in Windows Explorer. Three years of photography projects, documents, and project files — gone.

The second time it happened, I caught it early. I had learned to read the signs. I ran diagnostics, identified the problem before it became catastrophic, cloned the drive to a new one, and never lost a single file. The difference between those two outcomes came down entirely to knowing what to look for.

This guide covers everything I learned the hard way: the S.M.A.R.T. values that actually matter, the tools that surface them clearly, the sounds that should make you nervous, and the exact steps to take when you suspect a drive is on its way out.

---

## What is S.M.A.R.T. and Why Does It Matter

S.M.A.R.T. stands for Self-Monitoring, Analysis, and Reporting Technology. It is a monitoring system built into virtually every modern hard drive and SSD. The drive itself logs dozens of operational metrics continuously, and diagnostic software reads those logs to give you an early picture of drive health.

The problem is that S.M.A.R.T. data is full of values that look alarming but are harmless, and a few values that look boring but signal serious trouble. Knowing which is which is the whole point.

### The S.M.A.R.T. Values That Actually Matter

**Reallocated Sectors Count (ID 05)**
This is the single most important value to watch. When the drive finds a bad sector — a part of the disk that can no longer reliably hold data — it marks it as bad and replaces it with a spare sector from a reserve pool. The Reallocated Sectors Count is how many times this has happened. A value of zero is ideal. Any non-zero value means the drive has already experienced surface damage. A steadily increasing value means the damage is ongoing.

**Spin Retry Count (ID 0A)**
This value counts how many times the drive had to retry spinning its platters up to operating speed. On a healthy drive this should be zero or very close to it. A non-zero and climbing Spin Retry Count often means the spindle motor is wearing out or the bearings are deteriorating — both are signs of imminent mechanical failure.

**Current Pending Sector Count (ID C5)**
This counts sectors that the drive suspects are bad but has not yet confirmed. The drive marks these sectors for re-testing. If the next read succeeds, the count goes back down. If it fails, the sector gets reallocated and the Reallocated Sectors Count goes up. A non-zero Current Pending Sector Count is a yellow flag — the drive is uncertain about some of its own storage surface.

**Uncorrectable Sector Count (ID C6)**
Sectors that have been read, failed, retried, and cannot be corrected. This is a red flag. Any non-zero value here means actual data has become unreadable and the drive was unable to recover it.

**Power-On Hours (ID 09)**
Not a failure indicator by itself, but context-setting. A drive with 40,000+ power-on hours is well past its rated lifespan on most consumer models. Combine this with other warning values to judge urgency.

| S.M.A.R.T. ID | Attribute | Green | Yellow | Red |
|---|---|---|---|---|
| 05 | Reallocated Sectors Count | 0 | 1–5 | 5+ or rising |
| 0A | Spin Retry Count | 0 | 1–3 | Any increase |
| C5 | Current Pending Sector Count | 0 | 1–10 | 10+ or rising |
| C6 | Uncorrectable Sector Count | 0 | — | Any non-zero |
| BB | Reported Uncorrectable Errors | 0 | — | Any non-zero |
| C4 | Reallocation Event Count | 0 | 1–5 | Rising rapidly |

---

## CrystalDiskInfo: Step-by-Step Diagnosis Guide

CrystalDiskInfo is the tool I use for every drive I work with. It is free, lightweight, and reads S.M.A.R.T. data in a clear, color-coded format that makes it easy to spot problems without decoding raw hex values.

**Step 1: Download and install**
Go to the official CrystalDiskInfo page (crystalmark.info) and download the standard installer. Avoid third-party download sites — they often bundle adware with the installer.

**Step 2: Launch and read the health status**
When CrystalDiskInfo opens, each drive in your system gets a health status at the top: Good, Caution, or Bad. A "Caution" status means at least one S.M.A.R.T. value has moved into a warning threshold. "Bad" means the drive has triggered a critical threshold and should be considered unreliable immediately.

**Step 3: Check the color-coded attribute list**
Each S.M.A.R.T. attribute is listed with a status color. Yellow attributes need attention. Red attributes mean you should stop relying on this drive for important data right now.

**Step 4: Look at the Current, Worst, and Threshold columns**
The "Current" value is the present reading. "Worst" is the lowest it has ever been. "Threshold" is the manufacturer's minimum acceptable value. If Current is at or below Threshold for any attribute, the drive has failed its own self-test.

**Step 5: Enable automatic monitoring**
In the Function menu, enable "Resident" mode so CrystalDiskInfo runs in the background and alerts you if the status changes. Set it to alert on "Caution" not just "Bad" — that early warning is the point.

**Step 6: Check temperature**
CrystalDiskInfo also shows drive temperature. HDDs prefer to run between 25°C and 45°C. A drive that runs consistently above 50°C is shortening its lifespan. A sudden temperature spike can indicate failing drive electronics.

---

## Audible Symptoms: The Click of Death and What Else to Listen For

The "click of death" is exactly what it sounds like — a rhythmic clicking sound coming from the drive, often accompanied by the system freezing or the drive disappearing from File Explorer. This sound is the read/write head repeatedly failing to find its home position, retracting, and trying again. It is a sign of a head crash or severe platter damage.

By the time you hear the click of death, the drive is already in serious trouble. But there are subtler sounds worth knowing:

**Repetitive clicking or ticking** — lower frequency than the click of death, often heard during boot or when the drive is under load. This can mean the heads are struggling to read a damaged sector.

**Grinding or scraping** — physical contact between the heads and the platters. If you hear this, shut the drive down immediately. Continued operation will deepen the damage.

**High-pitched whine that changes pitch** — spindle bearing wear. Common in older drives and a sign the mechanical assembly is degrading.

**Sudden silence during operation** — if a drive that was humming quietly suddenly goes completely silent and the system freezes, the spindle motor may have stalled.

The key rule: if a drive starts making any new noise it was not making before, take that seriously. Drives do not spontaneously develop new sounds for innocent reasons.

---

## Slow Performance Patterns That Indicate HDD Failure

Performance degradation before audible failure is more common than most people realize.

**Dramatically longer boot times** — if a system that used to boot in 30 seconds now takes three minutes, and the drive is an HDD, bad sectors in the system partition are a likely cause. The drive is retrying reads on damaged sectors.

**File copy operations stalling or slowing to zero** — a healthy drive copies at a consistent rate. A failing drive will suddenly drop to near-zero bytes per second when it hits a bad sector region, then speed up again.

**Program launch delays** — if Photoshop or Chrome are taking 30–60 seconds to load when they used to open in five seconds, and this is new behavior, the drive surface in the area where those program files live may be degrading.

**Random freezes of 30–120 seconds** — the system freezes, the hard drive activity light blinks, then everything resumes. This is the drive retrying failed reads. Windows will wait up to two minutes for a drive to respond before throwing an error.

**Files opening as corrupted or empty** — the data is there but the drive can no longer read it accurately. This is a late-stage symptom.

---

## HDD vs SSD Failure Modes Compared

Understanding how each type fails differently helps you know what to watch for.

| Factor | HDD | SSD |
|---|---|---|
| Primary failure cause | Mechanical wear, head crash, platter damage | NAND write wear, controller failure |
| Warning before failure | Usually — S.M.A.R.T. often gives advance notice | Sometimes — can fail suddenly with no S.M.A.R.T. warning |
| Audible warning | Yes — clicking, grinding | No — completely silent |
| Most common symptom | Slow reads, freezes, bad sectors | Sudden disappearance, write errors, read-only mode |
| Data recovery difficulty | Moderate to hard | Hard to very hard (NAND controller issue) |
| Typical consumer lifespan | 3–5 years in regular use | 5–7 years or by write endurance (TBW rating) |
| Key S.M.A.R.T. value | Reallocated Sectors Count | Wear Leveling Count, Total Bytes Written |

SSDs tend to fail more suddenly and with less warning than HDDs. The SSD key S.M.A.R.T. value to watch is the Wear Leveling Count — as it approaches the manufacturer's rated endurance, the drive may switch to a read-only mode before full failure. This is actually a recovery-friendly behavior, but it means your SSD should also be in your backup routine.

---

## HDDScan for Surface Testing

CrystalDiskInfo reads S.M.A.R.T. data reported by the drive itself. HDDScan actually scans the drive surface by reading every sector and measuring how long each read takes. This catches physical damage that the drive may not yet have logged internally.

**Step 1: Download HDDScan**
Get it from hddscan.com — the official site. It is portable and requires no installation.

**Step 2: Select the drive**
Choose your target drive from the dropdown. Do not run a surface scan on the system drive while Windows is actively using it — use it on secondary drives or boot from a USB environment for the system drive.

**Step 3: Run a Surface Test**
Click "Surface Tests" → "Scan" → choose "Read Test." This reads every sector and logs the response time. Normal sectors respond in under 100ms. Sectors that take longer (shown in yellow) are "slow" zones — the drive is struggling to read them. Red sectors are areas where the read failed entirely.

**Step 4: Interpret the results**
A healthy drive shows a uniform blue/green map. Yellow clusters mean that area of the disk is degrading. Red means unreadable sectors — if you see red, treat the drive as failing and begin backing up immediately.

---

## Windows CHKDSK Command Guide

CHKDSK is built into Windows and checks the file system and disk surface for logical and physical errors.

**Basic check (read-only, no fixes):**
```
chkdsk C:
```
Run this in an elevated Command Prompt. It reports errors but does not fix them.

**Full check with repairs:**
```
chkdsk C: /f /r
```
`/f` fixes file system errors. `/r` locates bad sectors and attempts to recover data. On a system drive, Windows will schedule this to run at next boot.

**Check a specific drive letter:**
```
chkdsk D: /f /r /x
```
`/x` forces the volume to dismount first, which is necessary on drives in active use.

**Reading the results:**
After CHKDSK completes, look for lines mentioning "bad sectors found" or "errors corrected." Bad sectors found by CHKDSK that were not already in S.M.A.R.T. data mean the S.M.A.R.T. monitoring missed something — take this as a serious sign.

---

## Data Backup Priority When Failure Is Suspected

If you suspect a drive is failing, the order in which you back things up matters. Drives can fail completely mid-backup, so prioritize.

**Step 1: Stop writing to the drive**
Do not install new software, save new files, or defragment a failing drive. Every write operation is a risk when the drive surface is compromised.

**Step 2: Copy irreplaceable files first**
Photos, personal documents, creative projects, passwords, and license keys — things that cannot be downloaded or recreated. Get these off first.

**Step 3: Copy large but replaceable files second**
Software installers, media files you own copies of elsewhere, anything you could re-download.

**Step 4: Use Robocopy for resilient copying**
Standard drag-and-drop will stop if it hits a bad sector. Robocopy with the `/r` and `/w` flags retries failed reads a set number of times and skips rather than stopping:
```
robocopy D:\Source E:\Backup /e /r:3 /w:5 /log:backup_log.txt
```
This continues even over bad sectors and logs which files could not be copied.

---

## When to Clone vs When to Back Up

**Clone the drive** when you want an exact working copy of the system — every partition, every file, including the operating system — so you can swap to a new drive and boot without reinstalling anything. Use Macrium Reflect Free for this. Clone as early as you possibly can after suspecting failure — every hour the drive keeps running increases the risk.

**Back up files** when you already have a working system on another drive or want to preserve only data and documents. Use Macrium Reflect, Veeam Agent Free, or plain Robocopy for file-level backup.

If the drive has already started showing bad sectors or read failures, cloning is risky because the clone may include corrupted data. In that case, file-level backup — prioritized by importance — is safer.

---

## Recovery Options If It Is Already Failing

If the drive has already partially failed, you have a few options before going to professional recovery.

**Recuva (free):** Good for recovering deleted files and files from drives with file system corruption. It can read around some bad sectors.

**TestDisk/PhotoRec (free):** TestDisk repairs partition tables and boot sectors. PhotoRec recovers files by scanning raw disk data regardless of the file system. Both are powerful tools from CGSecurity.

**If the drive is no longer detected by Windows:** Try a different SATA cable and a different power connector first — these are common culprits that are not actually drive failures.

**Professional data recovery:** If the drive is clicking, grinding, or simply not spinning, stop using it and contact a professional service like DriveSavers or Ontrack. Do not try freezer tricks or percussive maintenance — these are myths that can cause additional damage. Professional recovery can be expensive but is the only reliable option for mechanically failed drives.

---

## FAQ

**How often should I check my drive's S.M.A.R.T. data?**
Once a month is a good minimum if you are not running CrystalDiskInfo in resident mode. For any drive that has already shown warning signs, weekly checks are reasonable until the drive is replaced.

**Can a drive pass S.M.A.R.T. and still fail?**
Yes. S.M.A.R.T. is not a guarantee — it is a probability indicator. Studies from Google and Backblaze both found that a meaningful percentage of drives fail without any prior S.M.A.R.T. warnings, particularly SSDs. S.M.A.R.T. is useful but not infallible, which is why backups matter regardless of S.M.A.R.T. status.

**Is it safe to keep using a drive with a few reallocated sectors?**
A small number of reallocated sectors (1–5) that are not increasing can indicate past damage that the drive has compensated for. If the count is stable, the drive may remain usable. If the count is rising, replace the drive as soon as you have backed up your data.

**What is the difference between the raw value and the normalized value in S.M.A.R.T.?**
The raw value is the actual count — for Reallocated Sectors, it is literally the number of sectors reallocated. The normalized value (Current/Worst) is a scale from 1 to 253 that the drive uses for comparison against its Threshold. Both matter. Always look at the raw value for Reallocated Sectors Count, not just the color indicator.

**My drive is making a clicking sound but CrystalDiskInfo shows Good. Should I be worried?**
Yes. Trust your ears over the S.M.A.R.T. rating in this case. A drive that makes clicking sounds is under physical stress that the internal logs may not yet reflect. Back up your data immediately.

**Does running CHKDSK on a failing drive make things worse?**
CHKDSK with `/r` does perform read operations on every sector, which means it will hammer bad sectors during the repair attempt. On a drive that is already in serious trouble, this can accelerate failure. Prioritize a straight file backup before running CHKDSK on a suspected failing drive.

**How long do SSDs typically last?**
Most consumer SSDs are rated for 1–5 years of typical use based on their TBW (Terabytes Written) endurance rating. A Samsung 870 EVO 1TB has a 600 TBW rating, which translates to writing roughly 165 GB per day for ten years — far beyond what most users do. Time-based failure (capacitor and controller aging) is often the real limiter, typically around 5–8 years.
