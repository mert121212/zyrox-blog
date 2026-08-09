---
title: How to Spot a Failing Hard Drive Before It Fails
meta_description: >-
  A straightforward guide to warning signs, diagnostics, and backup habits that
  help you catch hard drive issues early. Here is my honest experience and what
  you actually need.
date: 2026-07-06T00:00:00.000Z
category: Storage
tags:
  - Hard Drive
  - Backup
  - Diagnostics
  - Storage
author: sara-vance
keywords:
  - hard drive
  - backup
  - diagnostics
  - storage
  - spot
---

![Hero Image](/images/default-hero.jpg)
The first time I lost data to a failing hard drive, I had ignored four separate warning signs over the course of three weeks. The boot times had gotten longer. A folder occasionally took five seconds to open instead of one. I heard a faint clicking sound once or twice that I dismissed as case vibration. Then one morning the drive simply did not appear in Windows Explorer. Three years of photography projects, documents, and project files — gone.

The second time it happened, I caught it early. I had learned to read the signs. I ran diagnostics, identified the problem before it became catastrophic, cloned the drive to a new one, and never lost a single file. The difference between those two outcomes came down entirely to knowing what to look for.

This guide covers everything I learned the hard way: the S.M.A.R.T. values that actually matter, the tools that surface them clearly, the sounds that should make you nervous, and the exact steps to take when you suspect a drive is on its way out.

## What is S.M.A.R.T. and Why Does It Matter

S.M.A.R.T. stands for Self-Monitoring, Analysis, and Reporting Technology. It is a monitoring system built into virtually every modern hard drive and SSD. The drive itself logs dozens of operational metrics continuously, and diagnostic software reads those logs to give you an early picture of drive health.

The problem is that S.M.A.R.T. data is full of values that look alarming but are harmless, and a few values that look boring but signal serious trouble. Knowing which is which is the whole point.

### The S.M.A.R.T. Values That Actually Matter

Reallocated Sectors Count (ID 05) is the single most important value to watch. When the drive finds a bad sector — a part of the disk that can no longer reliably hold data — it marks it as bad and replaces it with a spare sector from a reserve pool. A value of zero is ideal. Any non-zero value means the drive has already experienced surface damage. A steadily increasing value means the damage is ongoing, and you need to replace it immediately.

Spin Retry Count (ID 0A) counts how many times the drive had to retry spinning its platters up to operating speed. On a healthy drive this should be zero. A non-zero and climbing count often means the spindle motor is wearing out or the bearings are deteriorating — both are signs of imminent mechanical failure.

Current Pending Sector Count (ID C5) tracks sectors that the drive suspects are bad but has not yet confirmed. The drive marks these sectors for re-testing. If the next read succeeds, the count goes back down. If it fails, the sector gets reallocated. A non-zero count is a serious yellow flag indicating the drive is uncertain about its own storage surface.

Uncorrectable Sector Count (ID C6) and Reported Uncorrectable Errors (ID BB) are massive red flags. These measure sectors that have been read, failed, retried, and cannot be corrected. Any non-zero value here means actual data has become unreadable and the drive was unable to recover it. Stop relying on this drive immediately.

Power-On Hours (ID 09) isn't a failure indicator by itself, but it gives crucial context. A drive with 40,000+ power-on hours is well past its rated lifespan on most consumer models. Combine this with other warning values to judge how urgently you need a replacement.

## CrystalDiskInfo: Step-by-Step Diagnosis Guide

CrystalDiskInfo is the tool I use for every drive I work with. It is free, lightweight, and reads S.M.A.R.T. data in a clear, color-coded format that makes it easy to spot problems without decoding raw hex values.

Download it directly from the official crystalmark.info site to avoid bundled adware. When it opens, each drive in your system gets a health status at the top: Good, Caution, or Bad. A "Caution" status means at least one S.M.A.R.T. value has moved into a warning threshold. "Bad" means the drive has triggered a critical threshold and should be considered entirely unreliable.

Pay attention to the color-coded attribute list. Yellow attributes need your attention. Red attributes mean you should stop using this drive for important data right now. The "Current" value is the present reading, "Worst" is the lowest it has ever been, and "Threshold" is the manufacturer's minimum acceptable value. If Current is at or below Threshold for any attribute, the drive has failed its own self-test.

I highly recommend enabling "Resident" mode in the Function menu so CrystalDiskInfo runs in the background and alerts you if the status changes. Set it to alert on "Caution", because an early warning is exactly what you need. 

Also, check the drive temperature. HDDs prefer to run between 25°C and 45°C. A drive that runs consistently above 50°C is shortening its lifespan, and a sudden temperature spike can indicate failing drive electronics.

## Audible Symptoms: The Click of Death and What Else to Listen For

The "click of death" is exactly what it sounds like — a rhythmic clicking sound coming from the drive, often accompanied by the system freezing or the drive disappearing from File Explorer. This sound is the read/write head repeatedly failing to find its home position, retracting, and trying again. It is a sign of a head crash or severe platter damage. By the time you hear it, the drive is in deep trouble.

There are subtler sounds worth knowing. Repetitive clicking or ticking, at a lower frequency than the click of death, can mean the heads are struggling to read a damaged sector. Grinding or scraping indicates physical contact between the heads and the platters — if you hear this, shut the drive down immediately to prevent deeper damage. A high-pitched whine that changes pitch points to spindle bearing wear, common in older drives.

The key rule is simple: if a drive starts making any new noise it was not making before, take that seriously. Drives do not spontaneously develop new sounds for innocent reasons.

## Slow Performance Patterns That Indicate HDD Failure

Performance degradation before audible failure is incredibly common. Dramatically longer boot times are a major hint. If a system that used to boot in 30 seconds now takes three minutes, and the boot drive is an HDD, it's likely retrying reads on damaged sectors in the system partition.

Watch for file copy operations stalling or slowing to zero. A healthy drive copies at a consistent rate. A failing drive will suddenly drop to near-zero bytes per second when it hits a bad sector region, then speed up again. 

Similarly, random system freezes of 30 to 120 seconds where the hard drive activity light blinks before everything resumes is the classic sign of a drive retrying failed reads. Windows will wait up to two minutes for a drive to respond before throwing an error.

## HDD vs SSD Failure Modes Compared

Understanding how each type fails helps you know what to watch for. HDDs primarily fail due to mechanical wear, head crashes, and platter damage. They usually give advance notice via S.M.A.R.T. warnings and audible symptoms like clicking or grinding. Their most common failure symptoms are slow reads, freezes, and bad sectors. Data recovery from a failed HDD is moderate to hard.

SSDs, on the other hand, fail primarily due to NAND write wear or controller failure. They often fail suddenly with zero S.M.A.R.T. warning and are completely silent, meaning you won't get any audible heads-up. The most common symptom of a failing SSD is sudden disappearance from the system, write errors, or the drive locking itself into a read-only mode. Data recovery from a controller-failed SSD is notoriously difficult, making regular backups even more critical. Keep a close eye on your SSD's Wear Leveling Count and Total Bytes Written.

## HDDScan for Surface Testing

While CrystalDiskInfo reads logs, HDDScan actually scans the drive surface by reading every sector and measuring response times. This catches physical damage the drive hasn't officially logged yet.

Download it from hddscan.com. Select your target drive (don't run a surface scan on your active system drive). Click "Surface Tests", choose "Read Test", and let it run. Normal sectors respond in under 100ms. Sectors that take longer show up in yellow, meaning the drive is struggling to read them. Red sectors mean the read failed entirely. If you see red, treat the drive as failing and start backing up immediately.

## Windows CHKDSK Command Guide

CHKDSK is built into Windows and checks the file system and disk surface. Running `chkdsk C:` in an elevated Command Prompt reports errors without fixing them. Running `chkdsk C: /f /r` fixes file system errors and attempts to recover data from bad sectors. 

After it completes, look for any lines mentioning "bad sectors found" or "errors corrected." If CHKDSK finds bad sectors that weren't in your S.M.A.R.T. data, your S.M.A.R.T. monitoring missed something important.

## Data Backup Priority When Failure Is Suspected

If you suspect a drive is failing, stop writing to it. Don't install software or save new files. Prioritize copying irreplaceable files first — photos, personal documents, and passwords. Leave large, replaceable files like game installs for last.

Use Robocopy for resilient copying instead of standard drag-and-drop, which will just freeze if it hits a bad sector. A command like `robocopy D:\Source E:\Backup /e /r:3 /w:5` tells Windows to retry failed reads three times and wait five seconds between tries, skipping stubborn files instead of crashing the whole backup.

## When to Clone vs When to Back Up

Clone the drive (using Macrium Reflect Free) when you want an exact working copy of the system, including the OS, so you can swap to a new drive without reinstalling everything. Do this as early as possible after suspecting failure.

Back up files when you only need to preserve data and documents. If the drive is already showing bad sectors or read failures, cloning is highly risky because the clone might get stuck on corrupted data. In that case, prioritize a file-level backup.

## Recovery Options If It Is Already Failing

If the drive has partially failed, tools like Recuva can recover deleted files or read around some bad sectors. TestDisk and PhotoRec are powerful free tools for repairing partition tables and recovering raw data regardless of file system corruption.

If the drive is clicking, grinding, or not spinning at all, do not try freezer tricks or percussive maintenance. Stop using it immediately and contact a professional data recovery service like DriveSavers. It will be expensive, but it's the only reliable option for mechanically dead drives.


---

## Related Guides

- [SSD vs HDD Boot Speed: What Actually Changes in Real Use](/posts/ssd-vs-hdd-boot-speed)
- [Why Upgrading Storage Alone Does Not Make Everything Faster](/posts/why-upgrading-storage-alone-doesnt-make-everything-faster)
- [The Best Way to Organize Your Game Library on an SSD](/posts/the-best-way-to-organize-your-game-library-on-an-ssd)
