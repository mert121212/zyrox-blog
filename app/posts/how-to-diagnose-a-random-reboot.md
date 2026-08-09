---
title: How to Diagnose a Random PC Reboot Without Losing Your Mind
meta_description: >-
  A hands-on guide to finding the cause of random reboots, from overheating and
  unstable power to driver and BIOS issues.
date: 2026-06-28T00:00:00.000Z
category: Troubleshooting
tags:
  - Random Reboots
  - Overheating
  - Power Supply
  - Diagnostics
author: rachel-kim
keywords:
  - random reboots
  - overheating
  - power supply
  - diagnostics
  - troubleshooting
---

![Hero Image](/images/default-hero.jpg)
There is a specific kind of frustration that comes from a PC that reboots randomly. It's not like a known error you can look up. It just restarts — sometimes in the middle of a game, sometimes during compilation, sometimes while you are watching YouTube — and then boots back up like nothing happened. No explanation. No apology. Just gone.

I've been through this diagnostic process more times than I can count, on my own machines and helping others. The honest truth is that random reboots have a frustratingly wide set of possible causes: thermal shutdown, PSU failure, unstable drivers, RAM errors, overclock instability, corrupted system files, and more. The key is a systematic methodology that rules things out efficiently rather than throwing changes at the wall hoping something sticks.

## Step 1: Determine What Kind of Restart You Are Seeing

Not all unexpected reboots are the same. Before you diagnose anything, identify which category you are dealing with. 

If you saw a blue flash before the restart, it was a Blue Screen of Death (BSOD), which usually points to software, drivers, or a hardware fault. If the machine just cut off with no screen transition at all, it was a hard shutdown, which is almost always a thermal protection trip or a PSU failure. 

If the machine rebooted cleanly to a "Windows needs to restart" message, it was a scheduled or managed restart, likely from Windows Update. Check your Update History in Settings to rule this out first. It sounds obvious, but it eliminates a surprising number of "random" reboots.

## Step 2: Filter Event Viewer for Critical Errors

Event Viewer is Windows' log of everything that happened on the system. After a random reboot, it often contains the exact error that triggered the restart.

Press Win + R, type `eventvwr.msc`, and hit Enter. In the left panel, expand Windows Logs and click System. On the right panel, click Filter Current Log, check Critical and Error, and click OK. Look for events timestamped right around the time of the reboot.

You are looking for Event ID 41 (Kernel-Power). This is the signature of an unexpected shutdown. It means the system did not shut down cleanly. You might also see Event ID 1001, which contains crash dump information. If you find Event ID 41 with no preceding error events, the shutdown was abrupt (PSU or thermal). If you find driver errors or application crashes logged just before the reboot, those are your leads.

## Step 3: Decode Blue Screen Stop Codes

If the reboot was preceded by a BSOD, the stop code is your most specific diagnostic clue. If Windows flashes the screen too briefly to read it, check Event Viewer (Event ID 1001) or look for dump files in `C:\Windows\Minidump` using a tool like WhoCrashed.

Different stop codes mean different things. `IRQL_NOT_LESS_OR_EQUAL` usually means a driver is acting up, often the GPU or network driver. `MEMORY_MANAGEMENT` or `PAGE_FAULT_IN_NONPAGED_AREA` points strongly to RAM corruption or a bad driver allocating memory incorrectly. `WHEA_UNCORRECTABLE_ERROR` is a hardware-level error, meaning you should check RAM stability, CPU overclocks, and temperatures.

If you see `CRITICAL_PROCESS_DIED` or `KERNEL_SECURITY_CHECK_FAILURE`, a core Windows file crashed. Open an Administrator Command Prompt and run `sfc /scannow`. If that doesn't fix it, run `DISM /Online /Cleanup-Image /RestoreHealth`.

## Step 4: Check Temperatures — Throttle vs Shutdown

There is an important distinction between thermal throttling and thermal shutdown.

Thermal throttling happens when the CPU or GPU gets too hot (typically 95–100°C for modern CPUs) and reduces its clock speed to cool down. The system keeps running, just slower. You will not see a reboot from throttling alone.

Thermal shutdown happens when the temperature exceeds a critical threshold set in the BIOS, and the system performs an emergency power-off to protect the hardware. This looks exactly like someone yanked the power cord. 

To check this, download HWiNFO64, run it in sensors-only mode, and let the system run under a heavy load like a game. Watch the CPU "Package" temp and the GPU temp. Most modern [Intel](https://www.intel.com) and [AMD](https://www.amd.com) CPUs should stay under 85°C, while modern GPUs should stay under 80-85°C. If your CPU hits a hard shutoff point (often 100–105°C), expect a shutdown. The fix is usually cleaning dust, replacing thermal paste, or improving case airflow.

## Step 5: Evaluate PSU Failure vs Software Instability

PSU failure and software instability can look nearly identical from the outside. Both cause sudden, unexpected reboots. 

Signs pointing to a PSU failure include reboots that happen specifically under high load (like gaming), a machine that cuts off hard with no warning, or a system that struggles to boot back up after a crash. If your PSU is old or heavily loaded, and Event Viewer only shows Event ID 41, I'd bet on the PSU.

Software instability usually shows up as a BSOD with a specific stop code. The reboots might happen after a specific action, like waking from sleep or opening a certain app.

To test the PSU reliably, you really need to swap in a known-good unit. You can also run OCCT's PSU test for 15 minutes and monitor voltages with HWiNFO64 — the 12V rail should stay within 5% of 12V.

## Step 6: Set Up HWiNFO64 for Post-Mortem Logging

The problem with random reboots is that by the time you go looking for data, the machine has restarted and the memory is wiped. HWiNFO64's logging feature solves this by continuously writing sensor data to a CSV file.

Open HWiNFO64 in Sensors-only mode, click the floppy disk icon to enable logging to a CSV file, and set the interval to 1–2 seconds. Leave it running in the background. After the next reboot, open the CSV file and look at the last timestamps before the crash. 

A temperature that went from 80°C to 102°C in 10 seconds before the shutdown is thermal. A 12V rail that dropped from 12.1V to 11.1V under load is PSU. This data often tells you exactly what happened.

## Systematic Elimination 

Work through the possibilities in order. Check Windows Update history first. Monitor temps under load. Test your RAM overnight with MemTest86. Run SFC and DISM to check for corrupted files. If you have overclocks (even XMP on your RAM), revert them to stock and test. 

Don't skip straight to buying a new motherboard. Most of the time, the fix is finding the bad driver, the dusty heatsink, or the dying power supply. If you've tried all of this and are still stuck, it might be time to take it to a local repair shop for a comprehensive hardware diagnostic.


---

## Related Guides

- [What to Check First When a PC Won't Boot](/posts/what-to-check-first-when-a-pc-wont-boot)
- [How to Debug a PC That Randomly Reboots](/posts/how-to-debug-a-pc-that-randomly-reboots)
- [Signs Your Motherboard May Be Failing](/posts/signs-your-motherboard-is-failing)
