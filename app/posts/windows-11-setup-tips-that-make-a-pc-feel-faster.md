---
title: "Windows 11 Setup Tips That Make a PC Feel Faster"
meta_description: "A focused guide to system settings and habits that improve perceived speed on Windows 11 without invasive changes. Here is exactly what you need to know to fix it."
date: 2026-07-01
category: "Windows"
tags:
  - "Windows 11"
  - "Performance"
  - "Setup"
  - "Optimization"
author: rachel-kim
---

When I first set up a new Windows 11 machine, I always spend about 30 minutes going through a checklist before I do anything else. Not because I enjoy tweaking settings menus, but because the out-of-box Windows 11 experience is genuinely not optimized for speed. Microsoft ships the OS with a ton of visual polish, background services, and default behaviors that look great in marketing materials but quietly drag down responsiveness in everyday use.

The good news is that most of the biggest gains come from simple, reversible changes. You do not need to edit the registry or disable core system components. You just need to know where to look and what actually matters versus what is superstition dressed up as optimization advice. I have done this on a lot of machines over the years — old laptops, budget desktops, mid-range workstations — and the same handful of tweaks consistently make the biggest difference.

Here is everything I do, in the order I do it, with the reasoning behind each step.

---

## Step 1: Clean Up Startup Apps in Task Manager

This is the single highest-impact change you can make on most Windows 11 systems, and it takes less than five minutes.

Open Task Manager with **Ctrl + Shift + Esc**, then click the **Startup Apps** tab. You will see a list of every program that launches automatically when Windows starts, along with a column called **Startup impact** rated Low, Medium, or High.

The rule I follow: if it is not something I actively use every day, it gets disabled. Here is how I typically handle common entries:

| App | Action | Reason |
|---|---|---|
| Microsoft Teams | Disable | Launch it when you need it |
| Spotify | Disable | No need to run in background |
| Discord | Keep if you use it daily | Low overhead if actively used |
| Steam | Disable | Launch manually |
| OneDrive | Keep if you rely on sync | But monitor CPU usage |
| Skype | Disable | Rarely essential on startup |
| Adobe Creative Cloud | Disable | Loads fast on demand anyway |
| NVIDIA GeForce Experience | Keep | Driver and overlay features |
| Cortana | Disable | Significant memory footprint |
| Microsoft Edge (preload) | Disable | Loads Edge before you need it |

Disabling a startup app does not uninstall it or break it. The app still works perfectly — it just does not load before you ask it to. On a machine with 8GB of RAM and a spinning hard drive, cutting startup apps alone can shave 30–60 seconds off boot time and noticeably reduce the "settling down" period after login where the machine is still thrashing away doing background work.

To disable: right-click the entry → Disable.

---

## Step 2: Disable Search Indexing (Non-SSD Systems)

Windows Search constantly indexes files in the background so that searches feel instant. On an SSD this is fine — the drive can handle the background I/O without noticeably slowing anything down. On a spinning hard drive, it is a serious problem. The indexing service competes with normal disk activity and can cause constant 100% disk usage spikes that make the whole system feel frozen.

To check whether this applies to you: open **Task Manager → Performance → Disk**. If you see disk usage frequently hitting 80–100% when you are not actively doing anything heavy, Search Indexing is often a major contributor.

To disable:
1. Press **Win + R**, type `services.msc`, hit Enter
2. Scroll to **Windows Search**
3. Double-click it → set **Startup type** to **Disabled**
4. Click **Stop** to halt it immediately
5. Click OK

On a mechanical drive system, this alone can drop background disk usage dramatically. You lose instant search results (searches now crawl the files in real time), but on a slow HDD that trade-off is usually worth it. If you are on an SSD, leave indexing on — it genuinely does not hurt.

---

## Step 3: Tune Visual Effects via sysdm.cpl

Windows 11 has a lot of animations and transparency effects that make the interface feel polished. They also add latency to every interaction — menus take a few extra milliseconds to open, windows animate in and out rather than appearing instantly, and scrolling lists have motion blur that some people find visually uncomfortable at any speed.

Here is how to tune them:

1. Press **Win + R**, type `sysdm.cpl`, hit Enter
2. Go to the **Advanced** tab
3. Under **Performance**, click **Settings**
4. You will see the Visual Effects panel

Rather than selecting "Adjust for best performance" (which makes Windows look like Windows 95), I recommend a selective approach:

**Keep these on:**
- Smooth edges of screen fonts
- Show thumbnails instead of icons
- Show window contents while dragging

**Turn these off:**
- Animate windows when minimizing and maximizing
- Animations in the taskbar
- Fade or slide menus into view
- Fade out menu items after clicking
- Show shadows under mouse pointer
- Slide open combo boxes

The result feels like Windows 11 but snappier. Menus open instantly, windows snap rather than animate, and the whole UI feels more responsive without looking stripped down.

---

## Step 4: Set Up Storage Sense for Automatic Cleanup

Windows 11 accumulates temporary files, old update packages, and Recycle Bin contents over time. On systems with limited storage this becomes a real problem — a nearly full drive is a slow drive.

Storage Sense handles cleanup automatically once configured:

1. Go to **Settings → System → Storage**
2. Toggle **Storage Sense** on
3. Click **Storage Sense** to expand settings
4. Set it to run **Every month** (or every week if storage is tight)
5. Set temporary files cleanup to **1 day**
6. Set Recycle Bin cleanup to **30 days**
7. Set Downloads folder cleanup to **60 days** (or Off if you prefer manual control)

While you are here, also run **Cleanup recommendations** manually the first time. On a fresh Windows install after a year of updates, I have seen this recover 15–25GB of disk space from old update files alone.

---

## Step 5: Power Plan — Balanced vs High Performance

Windows 11 uses the **Balanced** power plan by default, and on most machines that is actually the right choice. Balanced dynamically scales CPU speed up when load increases and backs off when idle. On a laptop, this is essential for battery life. On a desktop, it still works well for everyday tasks.

**High Performance** keeps the CPU running at maximum clock speed all the time. The practical benefit is that it eliminates the ramp-up latency — the 50–200ms delay while the CPU scales from idle to full speed. For most users this is imperceptible. For latency-sensitive tasks (audio production, competitive gaming, real-time data processing) it can make a measurable difference.

| Power Plan | Best For | Trade-off |
|---|---|---|
| Balanced | Most desktop and laptop use | Slight ramp-up delay under burst load |
| High Performance | Audio production, competitive gaming | Higher idle power draw, more heat |
| Power Saver | Laptops on battery | Noticeably lower performance |
| Ultimate Performance | Workstation / server tasks | Extreme power draw, rarely needed |

To switch: **Settings → System → Power & Sleep → Additional power settings** (or search "Choose a power plan" in Start).

My recommendation: use Balanced on laptops always. On desktops used for gaming or production work, try High Performance and see if it makes a real-world difference for your use case before committing to it permanently.

---

## Step 6: Disable Transparency and Animation Effects

Windows 11's transparency effects (the frosted glass look on the taskbar and Start menu) are handled by the GPU, not the CPU. On discrete GPUs this is trivial. On integrated graphics — especially older Intel HD or AMD Vega iGPUs — it can consume a meaningful slice of GPU headroom that would otherwise go to rendering the desktop smoothly.

To disable:
1. **Settings → Accessibility → Visual Effects**
2. Toggle **Transparency effects** to Off
3. Toggle **Animation effects** to Off

You can also reach these from **Settings → Personalization → Colors → Transparency effects**.

On a low-end machine with an Intel UHD 620 or similar, turning off transparency noticeably reduces desktop rendering overhead and makes things like window dragging feel smoother. On a mid-range or better system it will not change much, but there is no downside to disabling it.

---

## Step 7: Audit Background App Permissions

Windows 11 allows apps to run in the background and receive data even when you are not using them. For some apps (email clients, calendar sync) this is useful. For most productivity apps, games, and utilities, it is just wasted CPU and memory.

1. **Settings → Apps → Installed Apps**
2. Click the three-dot menu next to any app → **Advanced options**
3. Under **Background apps permissions**, set to **Never** for apps that do not need it

More efficiently:
1. **Settings → Privacy & Security → Background Apps**
2. You can see a consolidated list here

Apps I always restrict: Spotify, Microsoft News, Movies & TV, Tips, Xbox, Mixed Reality Portal, 3D Viewer. Apps I usually allow: Mail, Calendar, OneDrive, any backup utilities.

---

## Step 8: Browser Choice and Its Impact on System Speed

Your browser is probably the most resource-intensive application you run every day, and the choice of browser matters more than most people realize.

| Browser | RAM Usage (20 tabs) | CPU at Idle | Notes |
|---|---|---|---|
| Chrome 124 | ~1.8GB | Medium | High memory per tab, good performance |
| Firefox 125 | ~1.2GB | Low | Better RAM efficiency, solid speed |
| Edge 124 | ~1.6GB | Medium | Good Chromium base, bloated add-ons |
| Brave | ~1.3GB | Low | Chrome engine, aggressive tracking blocks |
| Opera GX | ~1.9GB | Medium-High | Built-in limiter helps, but heavy base |

On systems with 8GB of RAM, the browser alone can consume 1–2GB, leaving Windows 11 (which itself needs 2–3GB at idle) and your actual work apps fighting over the remainder. On these machines, Firefox or Brave tends to handle memory pressure better than Chrome.

Regardless of browser, disable extensions you do not actively use — each extension adds memory overhead and can intercept and slow down page loads.

---

## Step 9: Virtual Memory Settings

Virtual memory (the page file) acts as overflow storage when physical RAM fills up. Windows manages this automatically by default, which works well for most users. However, there are specific situations where manual adjustment helps.

**Scenario where manual adjustment helps:**
- You have 8GB or less of RAM and do heavy multitasking
- You run video editing software that throws "insufficient memory" errors
- Your system drive is nearly full and the page file is competing for space

To adjust:
1. Press **Win + R** → type `sysdm.cpl` → Advanced → Performance → Settings → Advanced → Virtual Memory → Change
2. Uncheck **Automatically manage paging file size for all drives**
3. Set a custom size: Initial = 1.5x your RAM in MB, Maximum = 3x your RAM in MB
4. Click Set → OK → Restart

On systems with 16GB or more of RAM, the page file rarely matters for everyday performance. On 8GB systems running Chrome and a few productivity apps simultaneously, getting the page file right can prevent sluggishness that looks like a hardware problem but is actually memory management.

---

## Step 10: Schedule Antivirus Scans Strategically

Windows Defender (Microsoft Defender Antivirus) runs full scans periodically in the background. The problem is the default scheduling — full scans can pin CPU and disk usage for extended periods and the default timing is not always considerate of when you are actively using the machine.

To reschedule:
1. Search for **Task Scheduler** in Start
2. Navigate to **Task Scheduler Library → Microsoft → Windows → Windows Defender**
3. Right-click **Windows Defender Scheduled Scan** → Properties
4. Go to the **Triggers** tab → Edit the existing trigger
5. Set it to run weekly, at a time when you are not using the PC (e.g., 3:00 AM on Sunday)
6. Check **Wake the computer to run this task** if you want it to actually run

You can also open **Windows Security → Virus & threat protection → Quick scan** to run scans manually when it is convenient rather than having them interrupt you mid-task.

---

## Before and After: What to Expect

| Optimization | Typical Improvement |
|---|---|
| Startup app cleanup | 30–90s faster boot, less RAM at idle |
| Disable Search Indexing (HDD) | Eliminates 100% disk spikes |
| Visual effects tuning | Snappier UI interactions |
| Storage Sense | Recovers 5–25GB, prevents near-full slowdowns |
| High Performance plan | Eliminates burst latency (0–200ms) |
| Disable transparency | Reduces iGPU load on budget systems |
| Background app audit | 100–300MB RAM freed at idle |
| Browser optimization | 200–800MB RAM freed |

---

## Common Questions

**Will these changes break anything?**
No. Every change listed here is reversible. Startup apps can be re-enabled, visual effects can be turned back on, and power plans can be switched at any time. Nothing touches system files or critical services.

**Do I need third-party optimization software?**
No. Tools like CCleaner, IObit Advanced SystemCare, and similar products offer these same adjustments (and sometimes more aggressive ones) through a GUI. Windows already has built-in tools for everything covered here. Third-party optimizers also sometimes bundle unwanted software and can cause more problems than they solve.

**How much RAM do I need to run Windows 11 well?**
Microsoft lists 4GB as the minimum, but in practice 8GB is the comfortable baseline for everyday use and 16GB is where multitasking feels genuinely smooth. On 8GB systems, the startup cleanup and browser choice tips above make the biggest difference.

**Will disabling animations make my PC look bad?**
Slightly. Windows looks more bare-bones with animations off. Functionally it works identically. Most people who try it prefer the snappier feel after a day or two.

**How often should I redo these optimizations?**
Startup apps accumulate over time as you install new software. I check the startup list every few months. Storage Sense handles cleanup automatically once configured. Everything else is a one-time setup unless you reinstall Windows.

**Should I use a registry cleaner?**
No. Registry cleaners offer negligible performance benefit and carry real risk of deleting entries that applications depend on. Skip them entirely.

**My PC is still slow after all of this — what next?**
The most impactful hardware upgrade on most slow Windows systems is replacing a mechanical hard drive with an SSD. After that, adding RAM (to 16GB) makes the next biggest difference. If thermals are the issue, reapplying thermal paste and cleaning dust can recover significant performance on older machines.


