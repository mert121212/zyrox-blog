---
title: "How to Debug a PC That Randomly Reboots"
meta_description: "A practical checklist for identifying whether random restarts come from overheating, unstable power, or software issues."
date: 2026-07-18
category: "Troubleshooting"
tags:
  - "Random Reboots"
  - "Debugging"
  - "Overheating"
  - "Power Issues"
author: rachel-kim
---

Random reboots are one of the most frustrating things a PC can do. The system doesn't warn you, doesn't leave an obvious error on screen, and the problem might not repeat for hours — or it might happen three times in a row. I've dealt with this on my own machines more than once, and the most important lesson I've learned is this: don't guess. Every reboot leaves evidence somewhere, and with the right tools you can find it methodically rather than swapping parts blindly.

This guide walks through the full diagnostic process from start to finish — Windows Event Viewer, crash dump analysis with WhoCrashed, temperature logging with HWiNFO64, RAM testing with MemTest86, GPU driver reinstallation with DDU, and BIOS configuration review. By the end, you'll have a structured elimination framework that narrows down the cause without costing you unnecessary time or money.

## Step 1: Read the Evidence in Event Viewer

Every reboot — even an unexpected one — leaves a record in Windows Event Viewer. This is your starting point before touching any hardware or running any tools.

**How to open Event Viewer:**
1. Press `Win + X` and click **Event Viewer**, or press `Win + R`, type `eventvwr.msc`, and hit Enter.
2. In the left panel, expand **Windows Logs** and click **System**.
3. In the **Actions** panel on the right, click **Filter Current Log**.
4. In the filter dialog, set **Event level** to **Critical** and **Error**, then click OK.

**What to look for:**

The most useful event immediately after an unexpected reboot is a **BugCheck** event. Look for Event ID **41** from source **Kernel-Power** — this is logged every time Windows restarts without a clean shutdown. It confirms an unexpected reboot occurred but doesn't tell you why on its own.

Pair that with Event ID **1001** from source **BugCheck** — this contains the actual stop code from the crash. The stop code is your primary diagnostic lead.

| Event ID | Source | What It Means |
|---|---|---|
| 41 | Kernel-Power | System restarted without clean shutdown |
| 1001 | BugCheck | BSOD occurred; contains stop code |
| 6008 | EventLog | Unexpected shutdown logged at next boot |
| 7034 | Service Control Manager | A service terminated unexpectedly |

Once you have the stop code from Event ID 1001, you have a specific direction to investigate.

## Step 2: Identify the Stop Code and Its Cause

Blue screen stop codes are not random — each one points toward a specific category of failure. These are the most common codes associated with random reboots:

| Stop Code | Most Likely Cause | First Action |
|---|---|---|
| IRQL_NOT_LESS_OR_EQUAL | Driver accessing memory it shouldn't; often GPU or NIC drivers | Run DDU, reinstall GPU drivers |
| MEMORY_MANAGEMENT | RAM error, memory controller issue, or bad driver allocating memory incorrectly | Run MemTest86 |
| CRITICAL_PROCESS_DIED | Core Windows process crashed; often caused by corrupt system files or a driver | Run `sfc /scannow` in elevated CMD |
| WHEA_UNCORRECTABLE_ERROR | Hardware error at the CPU, RAM, or motherboard level; can be triggered by unstable overclock or PSU instability | Disable all XMP/EXPO, test default clocks |
| PAGE_FAULT_IN_NONPAGED_AREA | Bad RAM, corrupted driver, or failing storage | MemTest86 + check drive health with CrystalDiskInfo |
| KERNEL_SECURITY_CHECK_FAILURE | Corrupted driver or system file | DDU reinstall + `sfc /scannow` |
| SYSTEM_THREAD_EXCEPTION_NOT_HANDLED | Specific driver file caused an exception; Event Viewer often names the file | Identify and remove the named driver |

Write down the stop code before proceeding. If Windows reboots too fast to read the BSOD, open Settings → System → About → Advanced system settings → Startup and Recovery → Settings, and uncheck **Automatically restart** under System failure. This forces the system to hold on the blue screen so you can read it.

## Step 3: Analyze the Crash Dump with WhoCrashed

Windows generates a minidump file every time it blue screens. These files contain technical detail about which process or driver caused the crash — information that Event Viewer summarizes but doesn't fully expose.

**WhoCrashed** is a free tool from Resplendence Software that reads these minidump files and presents the findings in plain language. Here's how to use it:

1. Download WhoCrashed from resplendence.com and install it (it's free, no account needed).
2. Launch WhoCrashed and click **Analyze** in the top toolbar.
3. WhoCrashed will scan the default minidump folder (`C:\Windows\Minidump`) and list all recent crashes.
4. Click any crash entry to see the detailed report below.

**Reading the output:**

The most important line in the WhoCrashed report is the **Probably caused by** line. This typically names either a specific driver file (e.g., `nvlddmkm.sys` for NVIDIA GPU drivers, `ntoskrnl.exe` for kernel-level issues, or a third-party driver like an antivirus component) or a generic system component.

- `nvlddmkm.sys` → NVIDIA driver crash → Use DDU to fully remove and reinstall GPU drivers
- `amdkmdag.sys` → AMD GPU driver crash → Same DDU process
- `ntfs.sys` → File system issue → Check drive health, run CHKDSK
- `ntoskrnl.exe` → Kernel itself; often points to RAM or hardware instability rather than a specific driver

If WhoCrashed points to a driver file consistently across multiple crashes, that's your primary suspect. If it varies across crashes, the problem is more likely hardware instability — RAM, PSU, or thermal.

## Step 4: Monitor Temperatures with HWiNFO64

If the reboots happen under load — during gaming, rendering, or heavy CPU tasks — overheating is a strong candidate. The challenge is that by the time you check temperatures after a crash, the hardware has already cooled down. The solution is logging.

**HWiNFO64** (free, from hwinfo.com) can run in the background and write temperature readings to a CSV log file continuously. This gives you a post-mortem temperature record showing what the system was doing right before it crashed.

**Setting up temperature logging in HWiNFO64:**

1. Download HWiNFO64 and run it in **Sensors-only** mode.
2. In the Sensors window, click the **gear icon** (Settings) in the bottom toolbar.
3. Navigate to the **Logging** tab.
4. Enable **Auto-start logging to file** and choose a save location.
5. Set the polling interval to **1000ms** (1 second) for a balance of detail and file size.
6. Close settings and leave HWiNFO64 running in the background.

After the next reboot, open the saved CSV file and look at the last entries before the timestamp gap (the gap is when the system crashed). Check:

- **CPU Package Temp** — Safe maximum for most AMD and Intel CPUs is 90–95°C. Sustained readings above 85°C indicate inadequate cooling.
- **GPU Core Temp** — Most modern GPUs throttle around 83–87°C; actual limits are higher but approaching them under sustained load is a concern.
- **CPU VCore voltage** — Erratic voltage spikes or drops on the 12V and VCore rails can indicate PSU or motherboard VRM instability.

**Dangerous temperature thresholds:**

| Component | Caution | Critical |
|---|---|---|
| Intel 13th/14th Gen CPU | >85°C | >100°C |
| AMD Ryzen 7000 series | >85°C | >95°C |
| NVIDIA RTX 40/50 series GPU | >83°C | >90°C |
| AMD RX 7000 series GPU | >90°C | >100°C |
| NVMe SSD (primary) | >60°C | >70°C |

If temperatures look normal and the voltage readings are stable, move on — thermal causes are unlikely.

## Step 5: Test RAM with MemTest86

RAM errors are a common and frequently missed cause of random reboots. Windows doesn't always generate a memory-specific BSOD when RAM errors occur — sometimes the system simply restarts. MemTest86 is the gold standard for RAM testing because it runs outside of Windows entirely, eliminating any possibility that the OS is masking errors.

**Running MemTest86:**

1. Download MemTest86 (free version) from memtest86.com.
2. Use the provided tool to write it to a USB drive (this process takes about 2 minutes).
3. Reboot your PC and boot from the USB drive (you may need to enter your BIOS boot menu — typically F8, F11, or F12 on startup).
4. MemTest86 starts automatically. Let it run **at least one full pass**, preferably two or more. A full pass on 32GB of RAM takes roughly 1.5 to 2 hours.
5. Any red error entries indicate defective RAM.

**If MemTest86 finds errors:**
- First, try reseating your RAM sticks — remove them, clean the contacts gently, and reinstall firmly.
- If running two sticks, test each stick individually in slot A2 (the slot the motherboard manual recommends for single-channel) to isolate which stick is faulty.
- If errors persist on a single stick, that stick needs replacement.

**If MemTest86 finds no errors:**
If your system is running with XMP or EXPO enabled in the BIOS, test with XMP/EXPO disabled first. Some systems are unstable with the XMP profile enabled even if the individual sticks aren't defective — the issue is with the memory controller's ability to run at that specific combination of frequency and timing on that motherboard.

## Step 6: Reinstall GPU Drivers with DDU

GPU driver corruption or incomplete driver installations are a surprisingly common cause of IRQL crashes, BSOD events, and random reboots — especially after a driver update or a GPU swap. The standard Windows "Update Driver" process doesn't fully remove old driver files, leaving artifacts that can conflict.

**Display Driver Uninstaller (DDU)** performs a complete driver removal that Windows's built-in process cannot match. It's free, from guru3d.com.

**DDU step-by-step:**

1. Download DDU from guru3d.com and extract it to your desktop.
2. Boot Windows into **Safe Mode**: Settings → System → Recovery → Advanced startup → Restart now → Troubleshoot → Advanced options → Startup Settings → Restart → press 4 for Safe Mode.
3. In Safe Mode, run DDU as administrator.
4. In the DDU interface, select your GPU manufacturer (NVIDIA or AMD) from the dropdown on the right.
5. Click **Clean and restart**.
6. After restart (in normal Windows), go to the GPU manufacturer's website and download the latest driver package directly.
7. Install the driver fresh — do not use GeForce Experience's driver installer if you want a clean install; use the standalone package and choose **Custom Install → Perform a clean installation**.

After DDU reinstallation, test the system under the conditions that previously triggered reboots. If the crashes stop, a corrupted driver was the cause.

## Step 7: Eliminate BIOS Overclock Variables

Unstable overclocks — including XMP/EXPO memory profiles — are responsible for a significant portion of WHEA_UNCORRECTABLE_ERROR crashes and random reboots that don't produce any driver-specific stop code.

**This applies even if you haven't manually overclocked.** XMP and EXPO are technically overclocks applied by the memory profile. Some combinations of motherboard, memory controller, and RAM kit are unstable at the XMP-rated speed even when each component is individually rated for it.

**Overclock elimination test procedure:**

1. Enter your BIOS (typically Del or F2 at startup).
2. Navigate to memory settings and **disable XMP / EXPO / DOCP** — set RAM to its JEDEC default speed (typically 4800MHz for DDR5 or 3200MHz for DDR4).
3. If you have a manual CPU overclock or PBO (Precision Boost Overdrive) enabled, reset CPU settings to default.
4. If you have a manual GPU overclock set in MSI Afterburner or similar, remove it.
5. Save and exit BIOS.
6. Run the system for 24–48 hours under normal workloads.

If the reboots stop, you've confirmed an instability in the overclock configuration. You can then re-enable overclocks one at a time — starting with XMP — to identify which specific setting triggers instability. Some motherboards require manual memory timing adjustments to stabilize XMP profiles; others simply need a higher CPU SoC voltage or FCLK adjustment.

## Step 8: Identify PSU Instability

PSU problems are harder to diagnose without specialized equipment, but HWiNFO64 voltage logging (from Step 4) gives you a useful first indicator. If the logged 12V rail voltage shows swings greater than ±5% from 12V under load, or if VCore voltage appears erratic rather than steady, the PSU is worth suspecting.

**PSU instability symptoms specific to random reboots:**
- Reboots happen specifically at the start of a heavy GPU load (the moment a game launches or a benchmark starts) — this matches the transient spike profile that weak PSUs fail to handle
- System reboots but shows no BSOD and no Event ID 1001 — a total power interruption doesn't give Windows time to write a crash dump
- HWiNFO64 logs show voltage drops on 12V rail during the moment of reboot
- The system is stable at idle but consistently fails under combined CPU + GPU load

If you have access to a second known-good PSU of adequate wattage, swapping it in is the fastest test. If you don't, testing with PCIe power cables firmly reseated and all supplemental power connectors secured is a reasonable first step — loose connections at the GPU's 12VHPWR or 8-pin PCIe connectors can cause exactly this failure pattern.

## Systematic Elimination Methodology Table

Use this table to track your progress through each potential cause:

| Potential Cause | Diagnostic Tool | Test Performed? | Result | Status |
|---|---|---|---|---|
| Driver corruption | WhoCrashed, DDU | | | ☐ Eliminated / ☐ Confirmed |
| RAM error | MemTest86 | | | ☐ Eliminated / ☐ Confirmed |
| XMP/EXPO instability | BIOS default test | | | ☐ Eliminated / ☐ Confirmed |
| CPU/GPU overheating | HWiNFO64 logging | | | ☐ Eliminated / ☐ Confirmed |
| PSU instability | HWiNFO64 voltage log | | | ☐ Eliminated / ☐ Confirmed |
| Manual overclock | BIOS reset test | | | ☐ Eliminated / ☐ Confirmed |
| System file corruption | sfc /scannow | | | ☐ Eliminated / ☐ Confirmed |
| Storage failure | CrystalDiskInfo / CHKDSK | | | ☐ Eliminated / ☐ Confirmed |

Work through each row systematically. Don't skip to hardware replacement before exhausting the software and configuration diagnostics — the majority of random reboot cases I've seen are resolved at the driver, XMP, or overclock level without touching a single piece of hardware.

---

## FAQ

**Q: My PC reboots only during gaming. What should I check first?**
Start with HWiNFO64 temperature logging — gaming is the highest combined CPU and GPU load scenario, which makes it the first point of failure for thermal and PSU problems. Also check WhoCrashed for a driver-related stop code, particularly `nvlddmkm.sys` or `amdkmdag.sys`. GPU driver reinstallation with DDU resolves this more often than you'd expect.

**Q: Event Viewer shows Event ID 41 but no Event ID 1001. What does that mean?**
Event ID 41 without a corresponding BugCheck event means the system experienced a hard power loss — Windows didn't have time to write a crash dump before power cut out. This strongly points toward PSU instability, a loose power connector, or a thermal shutdown happening faster than Windows can log. Check temperatures with HWiNFO64 and inspect all PSU cable connections.

**Q: MemTest86 found errors on both sticks. Do I need to replace both?**
Not necessarily. First test each stick individually. If only one stick shows errors, that's your faulty stick. If both show errors, it can indicate a motherboard memory controller problem rather than defective sticks — try a different memory slot configuration and see if errors persist.

**Q: Can a failing SSD cause random reboots?**
Yes, though it's less common than RAM or driver causes. A drive with bad sectors in the Windows system partition can cause random crashes and reboots as the OS tries to read from unavailable sectors. Run CrystalDiskInfo to check S.M.A.R.T. health status, and run `chkdsk /f /r` from an elevated command prompt on your system drive.

**Q: I disabled XMP and the system seems stable. Can I re-enable it safely?**
Often yes, but you may need to tune the XMP settings rather than use them as-is. Many motherboards have an "EXPO Safe" or "DOCP" mode that applies the memory frequency with more conservative timings. You can also try manually setting only the memory speed while leaving the timings at auto — this runs the RAM faster than JEDEC default without the full aggressive timing profile.

**Q: My system reboots randomly even at idle. Where do I start?**
At-idle reboots are more likely software or driver issues than thermal ones, since thermals aren't stressed at idle. Run WhoCrashed first to check for stop codes. Then run `sfc /scannow` and `DISM /Online /Cleanup-Image /RestoreHealth` from an elevated command prompt to check for corrupt system files. If those come back clean, consider a fresh driver install via DDU.

**Q: How long should I run MemTest86 before trusting the result?**
At least one full pass, but two is better. A single pass through 32GB of DDR5 takes roughly 90 minutes to 2 hours. If you're chasing an intermittent RAM error, running two or three passes gives you much higher confidence in a clean result. If errors appear in the first pass, you don't need to run further — the fault is confirmed.
