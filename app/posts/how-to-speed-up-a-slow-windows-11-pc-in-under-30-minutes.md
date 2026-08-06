---
title: "How to Speed Up a Slow Windows 11 PC in Under 30 Minutes"
meta_description: "A practical, no-nonsense guide to speeding up a laggy Windows 11 computer by targeting the settings and background apps that actually cause slowdowns."
date: 2026-08-08
category: "Windows"
tags:
  - "Windows 11"
  - "Performance"
  - "Optimization"
  - "Troubleshooting"
author: rachel-kim
---

Windows 11 is a sleek operating system, but over time, it has a habit of getting bogged down. Between background updates, pre-installed bloatware from the manufacturer, and visual effects that prioritize form over function, a PC that felt lightning-fast out of the box can start to feel sluggish within a year.

The internet is full of "optimization guides" that tell you to disable critical system services or download sketchy third-party registry cleaners. Don't do that. 

You can reclaim your PC's speed in about 30 minutes using only built-in Windows tools. Here are the practical, safe steps that actually work.

---

## 1. Tame Your Startup Apps (5 Minutes)

This is the number one cause of a slow-feeling PC. Every time you turn on your computer, a dozen apps might be quietly launching in the background. Spotify, Steam, Discord, Microsoft Teams, OneDrive, and various printer utilities all love to start automatically. They consume RAM and CPU cycles before you even open a web browser.

**How to fix it:**
1. Right-click the **Start button** and select **Task Manager**.
2. Click the **Startup apps** icon on the left sidebar (it looks like a speedometer).
3. Look at the list of applications. If a status says **Enabled**, that app starts every time you turn on your PC.
4. Right-click any app you don't immediately need when you turn on your computer and select **Disable**.

*Note: Disabling an app here does not delete it. It just stops it from launching automatically. You can still open it normally whenever you need it.*

## 2. Disable Background Apps and Telemetry (5 Minutes)

Windows 11 runs a lot of things in the background to gather usage data (telemetry) and keep apps updated. You don't need most of it.

**Turn off unnecessary background permissions:**
1. Open **Settings** (`Windows key + I`).
2. Go to **Apps** > **Installed apps**.
3. For apps you rarely use but want to keep, click the three dots (`...`) next to them, select **Advanced options**, and under "Background apps permissions," change the setting to **Never**.

**Turn off diagnostic data:**
1. In **Settings**, go to **Privacy & security** > **Diagnostics & feedback**.
2. Turn off **Send optional diagnostic data**.
3. Turn off **Tailored experiences**.

## 3. Adjust Visual Effects for Performance (2 Minutes)

Windows 11 uses a lot of animations, shadows, and transparency effects. If you are on a high-end gaming PC, you won't notice the performance hit. If you are on a budget laptop or a system that is a few years old, turning these off makes the interface feel instantly snappier.

**How to optimize visuals:**
1. Press the `Windows key`, type **Advanced system settings**, and hit Enter.
2. Under the **Performance** section, click the **Settings...** button.
3. You will see a list of visual effects. You can select **Adjust for best performance** (which turns everything off).
4. *Pro Tip:* If you select "Adjust for best performance," I highly recommend checking the box for **"Smooth edges of screen fonts"** before hitting Apply. Without this, text on your screen will look incredibly jagged and harsh. 

## 4. Free Up Storage Space (5 Minutes)

If your C: drive (where Windows is installed) is filled to 95% capacity, your entire system will crawl. Windows needs empty space to act as temporary virtual memory (the pagefile). When it runs out of room, everything stutters.

**Use Storage Sense:**
1. Open **Settings** > **System** > **Storage**.
2. Turn on **Storage Sense**. This tells Windows to automatically delete temporary files and empty the recycle bin periodically.
3. Click on **Cleanup recommendations**. Windows will scan your drive and show you large files, unused apps, and temporary files you can safely delete with one click.

## 5. Turn Off Xbox Game Bar (If You Don't Game) (2 Minutes)

Windows 11 includes gaming features that run in the background, constantly ready to record your screen or take screenshots. If you use your PC primarily for work, browsing, or light tasks, this is wasted resources.

**How to turn it off:**
1. Open **Settings** > **Gaming** > **Xbox Game Bar**.
2. Toggle it to **Off**. 

## 6. Uninstall Manufacturer Bloatware (10 Minutes)

If you bought a pre-built PC from Dell, HP, Lenovo, or Acer, it likely came with a dozen proprietary programs pre-installed. These "Assistant" and "Support" apps often run heavily in the background.

**How to clean it up:**
1. Open **Settings** > **Apps** > **Installed apps**.
2. Sort the list by **Date installed** to group the apps that came with the PC, or just scroll through.
3. Look for anything with the manufacturer's name (e.g., "HP JumpStart", "Dell SupportAssist", "McAfee LiveSafe").
4. Uninstall them. 

*Note: The only manufacturer apps you usually want to keep are the ones that manage driver updates (like Lenovo Vantage), but even those can often be replaced by simply using Windows Update.*

---

## When Settings Aren't Enough: The Hardware Reality

If you have followed all these steps and your PC still takes three minutes to boot up and struggles to open Google Chrome, you likely have a hardware bottleneck.

The most common culprit in older PCs is a mechanical Hard Disk Drive (HDD). Windows 11 was fundamentally designed to run on a Solid State Drive (SSD). If your PC does not have an SSD, no amount of software tweaking will make it fast. 

Upgrading an old hard drive to a standard SATA SSD (which costs around $40-$60 for a 1TB drive) will provide a more dramatic speed boost than every software optimization in the world combined. But as long as you are already running on an SSD, the 30-minute cleanup above is exactly what you need to keep Windows 11 running like it did on day one.
