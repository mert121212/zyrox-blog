---
title: "How to Diagnose a Random PC Reboot Without Losing Your Mind"
meta_description: "A hands-on guide to finding the cause of random reboots, from overheating and unstable power to driver and BIOS issues."
date: 2026-06-28
category: "Troubleshooting"
tags:
  - "Random Reboots"
  - "Overheating"
  - "Power Supply"
  - "Diagnostics"
author: rachel-kim
---

There is a specific kind of frustration that comes from a PC that reboots randomly. It is not like a known error you can look up. It just restarts — sometimes in the middle of a game, sometimes during compilation, sometimes while you are watching YouTube — and then boots back up like nothing happened. No explanation. No apology. Just gone.

I have been through this diagnostic process more times than I can count, on my own machines and helping others. The honest truth is that random reboots have a frustratingly wide set of possible causes: thermal shutdown, PSU failure, unstable drivers, RAM errors, overclock instability, corrupted system files, and more. The key is a systematic methodology that rules things out efficiently rather than throwing changes at the wall hoping something sticks.

This guide walks through exactly that methodology, step by step.

---

## Step 1: Determine What Kind of Restart You Are Seeing

Not all unexpected reboots are the same. Before you diagnose anything, identify which category you are dealing with:

| Type | Description | What Caused It |
|---|---|---|
| Blue Screen (BSOD) | Blue screen with error code, then restart | Software, driver, or hardware fault |
| Hard shutdown + immediate restart | No screen, just cuts off and reboots | Thermal protection, PSU failure |
| Scheduled restart | System reboots at an odd time, nothing else | Windows Update completed |
| Soft restart | Windows restarts cleanly via software | Crash recovery setting, driver crash |
| POST failure restart loop | Reboots before Windows even loads | Hardware fault, BIOS issue |

**How to tell them apart:**
- If you saw a blue flash before restart, it was a BSOD
- If the machine just cut off with no transition, it was a hard shutdown (thermal or PSU)
- If the machine rebooted cleanly to a "Windows needs to restart" message, it was a scheduled or managed restart

Check **Settings → Windows Update → Update History** to rule out a scheduled Windows restart first. It sounds obvious but it eliminates a surprising number of "random" reboots.

---

## Step 2: Filter Event Viewer for Critical Errors

Event Viewer is Windows' log of everything that happened on the system. After a random reboot, it often contains the exact error that triggered the restart.

**Step by step:**
1. Press **Win + R**, type `eventvwr.msc`, hit Enter
2. In the left panel, expand **Windows Logs** → click **System**
3. In the right panel, click **Filter Current Log**
4. Under **Event level**, check **Critical** and **Error**
5. Click OK
6. Look for events timestamped around the time of the reboot

What you are looking for:
- **Event ID 41 (Kernel-Power):** This is the signature of an unexpected shutdown — power loss, thermal shutdown, or hard crash. It means the system did not shut down cleanly.
- **Event ID 1001 (Windows Error Reporting):** Contains crash dump information and sometimes the stop code
- **Event ID 6008:** "The previous system shutdown was unexpected" — confirms an unclean shutdown

If you find Event ID 41 with no preceding error events, the shutdown was abrupt (PSU or thermal). If you find driver errors, BSOD records, or application crashes logged just before the reboot, those are your leads.

---

## Step 3: Decode Blue Screen Stop Codes

If the reboot was preceded by a BSOD, the stop code is your most specific diagnostic clue. Windows often flashes the screen too briefly to read it, so check Event Viewer (Event ID 1001) or look for dump files in `C:\Windows\Minidump` using WinDbg or WhoCrashed.

**Common stop codes and what they mean:**

| Stop Code | Most Likely Cause | First Steps |
|---|---|---|
| IRQL_NOT_LESS_OR_EQUAL | Driver accessing memory at wrong interrupt level | Update or roll back recent driver changes; run DDU on GPU driver |
| MEMORY_MANAGEMENT | RAM corruption or driver accessing bad memory address | Run MemTest86; check RAM seating; test sticks individually |
| CRITICAL_PROCESS_DIED | Windows system process crashed — often explorer.exe or services.exe | Run SFC /scannow; check for malware; repair Windows installation |
| WHEA_UNCORRECTABLE_ERROR | Hardware-level error — CPU, RAM, or motherboard | Check RAM stability; verify CPU is not overclocked or overvolted; check temps |
| PAGE_FAULT_IN_NONPAGED_AREA | Driver or software accessing non-existent memory | Specific to driver — check Event Viewer for driver name in the crash |
| SYSTEM_THREAD_EXCEPTION_NOT_HANDLED | Usually a driver crash — often GPU or network driver | DDU + clean GPU driver reinstall; check for driver in crash dump |
| DRIVER_POWER_STATE_FAILURE | Driver failing during sleep/wake cycle | Common with GPU drivers and some NIC drivers after Windows updates |
| KERNEL_SECURITY_CHECK_FAILURE | Corrupted system file or driver | Run SFC /scannow; DISM /Online /Cleanup-Image /RestoreHealth |

**How to run SFC:**
1. Open Command Prompt as Administrator
2. Type `sfc /scannow` and hit Enter
3. Wait for the scan to complete — it checks and repairs corrupted system files

**How to run DISM:**
```
DISM /Online /Cleanup-Image /RestoreHealth
```
Run this if SFC finds errors it cannot repair.

---

## Step 4: Check Temperatures — Throttle vs Shutdown

There is an important distinction between thermal throttling and thermal shutdown:

**Thermal throttling:** The CPU or GPU detects it is approaching its maximum temperature (typically 95–100°C for modern CPUs) and reduces its clock speed to bring temperatures down. The system keeps running but performance drops. You will not see a reboot from throttling alone.

**Thermal shutdown:** The temperature exceeds a critical threshold (typically set in the BIOS/UEFI) and the system performs an emergency power-off to protect the hardware. This looks exactly like someone yanked the power cord. No BSOD, no warning — just off. Followed by an Event ID 41 in Event Viewer.

**How to check:**
1. Download **HWiNFO64** (free) — run it in sensors-only mode
2. Let the system run under load (game, benchmark, stress test)
3. Watch CPU temperature (the "Package" or "Tctl" value) and GPU temperature
4. If CPU hits 95°C+ under load, throttling is happening. If it hits a hard shutoff point (often 100–105°C), expect a shutdown

**Normal temperature ranges under sustained load:**
| Component | Good | Concerning | Critical |
|---|---|---|---|
| Intel 12th/13th/14th gen CPU | < 85°C | 85–95°C | > 95°C |
| AMD Ryzen 7000 CPU | < 85°C | 85–95°C | > 95°C |
| NVIDIA RTX 40-series GPU | < 80°C | 80–88°C | > 88°C |
| AMD RX 7000-series GPU | < 85°C | 85–95°C | > 95°C |

If temperatures are the problem, solutions include: cleaning dust from heatsinks and fans, replacing thermal paste, improving case airflow, or upgrading the CPU cooler.

---

## Step 5: Evaluate PSU Failure vs Software Instability

PSU failure and software instability can look nearly identical from the outside — both cause sudden, unexpected reboots. Here is how to tell them apart:

**Signs pointing to PSU failure:**
- Reboots happen specifically under high load (gaming, stress testing, video encoding)
- The machine cuts off hard with no BSOD, no warning
- The system struggles to boot after a reboot (takes multiple attempts)
- Other components behave strangely (USB devices disconnecting, RAM instability)
- The PSU is 5+ years old or heavily loaded relative to its rated wattage
- Event Viewer shows only Event ID 41 with no preceding error

**Signs pointing to software/driver instability:**
- Reboots accompanied by a BSOD with a specific stop code
- Reboots happen after a specific action (opening a particular app, waking from sleep)
- Event Viewer shows driver errors or application crashes just before the restart
- The system is stable under heavy load but unstable doing a specific software task

**How to test the PSU:**
- Use a PSU tester (like the Thermaltake Dr. Power III) for basic functionality checks
- More reliably: swap in a known-good PSU of adequate wattage and see if the problem persists
- Run OCCT's PSU test for 15–30 minutes and monitor voltages with HWiNFO64 — the 12V rail should stay within 5% of 12V (11.4–12.6V)

A PSU that is failing will often still pass a multimeter test at idle but drop voltage under load. That is why load testing is essential.

---

## Step 6: Check Driver Signature Enforcement

Windows has a feature called Driver Signature Enforcement that requires all kernel-mode drivers to be digitally signed by Microsoft. Unsigned or improperly signed drivers can cause system instability and random BSODs.

This is rarely an issue with mainstream hardware, but it can come up with:
- Older drivers for legacy hardware
- Modified or cracked software that installs kernel drivers
- Development/testing environments with custom drivers

**To check:**
1. Open Command Prompt as Administrator
2. Run: `bcdedit /enum {current}`
3. Look for `testsigning` — if it shows `Yes`, test signing mode is enabled (which means unsigned drivers may be loaded)
4. Look for `nointegritychecks` — if `Yes`, signature enforcement is disabled

If you find these flags set unexpectedly, it could indicate that software has disabled protections, which is worth investigating.

---

## Step 7: Set Up HWiNFO64 for Post-Mortem Logging

The problem with random reboots is that by the time you go looking for data, the machine has restarted and the in-memory state is gone. HWiNFO64's logging feature solves this by continuously writing sensor data to a CSV file on disk — so after a reboot you can look back and see exactly what temperatures, voltages, and clock speeds were doing in the moments before the crash.

**Setup:**
1. Download and install HWiNFO64 from hwinfo.com
2. Open it in Sensors-only mode
3. Click the floppy disk icon (or go to Settings → Logging)
4. Enable logging to a CSV file, set the log interval to 1–2 seconds
5. Leave it running in the background during normal use

**After a reboot:**
1. Open the CSV log file in Excel or Notepad
2. Find the last timestamps before the reboot
3. Look for: sudden temperature spikes, voltage drops on the 12V rail, CPU clock speed drops (throttling), or GPU frequency crashes

This data often tells you exactly what happened. A temperature that went from 80°C to 102°C in 10 seconds before the shutdown is thermal. A 12V rail that dropped from 12.1V to 11.1V under gaming load is PSU. A clock speed that dropped from 5.2GHz to 800MHz consistently under load is throttling.

---

## Systematic Elimination Table

Use this as your checklist. Work through it in order — the items at the top are more common and easier to test.

| # | Potential Cause | How to Check | How to Fix |
|---|---|---|---|
| 1 | Scheduled Windows Update restart | Check Windows Update History | Adjust active hours in Windows Update settings |
| 2 | Thermal shutdown (CPU) | HWiNFO64 temps under load | Clean dust, replace thermal paste, improve airflow |
| 3 | Thermal shutdown (GPU) | HWiNFO64 GPU temp under load | Clean GPU heatsink, improve case airflow |
| 4 | PSU failure / undervoltage | OCCT PSU test + HWiNFO64 voltage logging | Replace PSU |
| 5 | Bad GPU driver | BSOD with GPU-related stop code | DDU clean reinstall of GPU driver |
| 6 | RAM errors | MemTest86 (full overnight test) | Reseat RAM; test sticks individually; replace |
| 7 | Corrupted system files | SFC /scannow | Run SFC and DISM repair |
| 8 | Bad overclock (CPU/RAM/GPU) | Revert to stock clocks and test | Reduce overclock; improve stability margins |
| 9 | Failing HDD/SSD | CrystalDiskInfo health check | Replace failing drive |
| 10 | BIOS/UEFI bug | Check manufacturer forums | Update BIOS (only if update addresses your issue) |
| 11 | Malware | Full scan with Malwarebytes + Windows Defender | Remove malware; consider OS reinstall |
| 12 | Unsigned/corrupted drivers | Event Viewer + Driver Verifier | Identify and replace problematic driver |
| 13 | Motherboard hardware fault | Process of elimination after above steps | RMA or replace motherboard |
| 14 | Faulty power delivery (VRM) | Stress test with power monitoring | Better cooling on VRM; motherboard replacement |

---

## When to Seek Professional Help

Most random reboot causes can be diagnosed and resolved at home with free tools. But there are scenarios where professional diagnosis makes more sense:

- **You have already worked through the elimination table** and cannot isolate the cause
- **The machine is still under warranty** — let the manufacturer's support diagnose it before you void anything
- **Suspected motherboard or CPU failure** — these require hardware swaps to confirm and are difficult to diagnose without spare parts
- **Data is at risk** — if the drive shows health warnings alongside the instability, get professional data recovery involved before doing anything else
- **The machine belongs to a business** — a paid technician with proper diagnostic tools is faster and more accountable than DIY for critical systems

A local computer repair shop with good reviews can run a comprehensive hardware diagnostic (often $50–100) that confirms or rules out PSU, RAM, and motherboard faults faster than most DIY approaches. That is sometimes worth it to skip straight to a definitive answer.

---

## Common Questions

**My PC only reboots while gaming. What does that suggest?**
High-load reboots most commonly point to two things: thermal shutdown (the GPU or CPU gets too hot under gaming load) or PSU failure (the power supply cannot sustain the wattage demand). Check temperatures with HWiNFO64 during gaming first, then investigate the PSU if thermals look fine.

**I see Event ID 41 every time but no other errors. What does that mean?**
Event ID 41 (Kernel-Power) just confirms the shutdown was unclean — it does not tell you why. The absence of preceding error events suggests a hard shutdown (thermal, PSU, or physical power issue) rather than a software crash, which typically leaves a BSOD record.

**How do I know if my RAM is causing the reboots?**
Run MemTest86 from a bootable USB drive. Let it run for at least two full passes (4–8 hours on 16GB). If it reports errors, your RAM is faulty. Also try running with only one stick installed — BSOD crashes with MEMORY_MANAGEMENT or WHEA_UNCORRECTABLE_ERROR stop codes often point to RAM.

**The reboots started right after a Windows Update. Is the update the cause?**
Quite possibly. Driver updates delivered through Windows Update have a history of causing instability, especially for GPU and NIC drivers. Go to **Settings → Windows Update → Update History → Uninstall Updates** and remove the most recent update. You can also use Device Manager to roll back specific device drivers.

**My PC reboots at sleep/wake. Is that different from other random reboots?**
Yes — sleep/wake reboots are often driver-related rather than hardware. The DRIVER_POWER_STATE_FAILURE stop code is common here. GPU drivers, NIC drivers, and USB device drivers are the usual suspects. Check Event Viewer around the timestamp of the wake attempt.

**How long should I run HWiNFO64 logging before a reboot occurs?**
Leave it running indefinitely during normal use. The log file grows slowly (a few MB per day at 2-second intervals) and the data will be there whenever the reboot happens. Just make sure it is set to start automatically with Windows or remember to restart it after each reboot.



