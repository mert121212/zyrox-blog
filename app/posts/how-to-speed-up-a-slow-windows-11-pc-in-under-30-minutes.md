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
keywords:
  - "speed up Windows 11"
  - "make PC faster"
  - "Windows 11 running slow"
  - "optimize Windows for gaming"
  - "fix laggy computer"
author: rachel-kim
---

Windows 11 is a sleek operating system, but over time, it has a terrible habit of getting bogged down. Between background updates, pre-installed bloatware from the manufacturer, and visual effects that prioritize form over function, a PC that felt lightning-fast out of the box can start to feel sluggish within a year.

I fix slow computers for a living, and I see the same patterns every single day. The internet is full of "optimization guides" that tell you to disable critical system services or download sketchy third-party registry cleaners. Don't do that. You will break your computer.

You can reclaim your PC's speed in about 30 minutes using only built-in Windows tools. Here are the practical, safe steps that actually work.

---

## 1. Tame Your Startup Apps (5 Minutes)

This is the absolute number one cause of a slow-feeling PC. Every time you turn on your computer, a dozen apps might be quietly launching in the background. Spotify, Steam, Discord, Microsoft Teams, OneDrive, and various printer utilities all love to start automatically. They consume RAM and CPU cycles before you even open a web browser.

**How to fix it safely:**
1. Right-click the **Start button** and select **Task Manager**.
2. Click the **Startup apps** icon on the left sidebar (it looks like a speedometer).
3. Look at the list of applications. If a status says **Enabled**, that app starts every time you turn on your PC.
4. Right-click any app you don't immediately need when you turn on your computer and select **Disable**.

*Note: Disabling an app here does not delete it. It just stops it from launching automatically. You can still open it normally from the Start menu whenever you need it.*

## 2. Disable Background Apps and Telemetry (5 Minutes)

Windows 11 runs a lot of things in the background to gather usage data (telemetry) and keep apps updated. You don't need most of it, and it drains resources—especially on laptops.

**Turn off unnecessary background permissions:**
1. Open **Settings** (`Windows key + I`).
2. Go to **Apps** > **Installed apps**.
3. For apps you rarely use but want to keep, click the three dots (`...`) next to them, select **Advanced options**, and under "Background apps permissions," change the setting to **Never**.

**Turn off diagnostic data:**
1. In **Settings**, go to **Privacy & security** > **Diagnostics & feedback**.
2. Turn off **Send optional diagnostic data**.
3. Turn off **Tailored experiences**.

## 3. Adjust Visual Effects for Performance (2 Minutes)

Windows 11 uses a lot of animations, shadows, and transparency effects to look pretty. If you are on a high-end gaming PC, you won't notice the performance hit. But if you are on a budget laptop or a system that is a few years old, turning these off makes the interface feel instantly snappier.

**How to optimize visuals without making it ugly:**
1. Press the `Windows key`, type **Advanced system settings**, and hit Enter.
2. Under the **Performance** section, click the **Settings...** button.
3. You will see a list of visual effects. You can select **Adjust for best performance** (which turns everything off).
4. *Crucial Tip:* If you select "Adjust for best performance," I highly recommend checking the box for **"Smooth edges of screen fonts"** before hitting Apply. Without this box checked, the text on your screen will look incredibly jagged and harsh on the eyes. 

## 4. Free Up Storage Space (5 Minutes)

If your C: drive (where Windows is installed) is filled to 95% capacity, your entire system will crawl. Windows needs empty space to act as temporary virtual memory (the pagefile). When it runs out of room, everything stutters. I've seen laptops freeze completely just because they had 200MB of free space left.

**Use Storage Sense:**
1. Open **Settings** > **System** > **Storage**.
2. Turn on **Storage Sense**. This tells Windows to automatically delete temporary files and empty the recycle bin periodically.
3. Click on **Cleanup recommendations**. Windows will scan your drive and show you large files, unused apps, and temporary files you can safely delete with one click.

## 5. Turn Off Xbox Game Bar (If You Don't Game) (2 Minutes)

Windows 11 includes gaming features that run in the background, constantly ready to record your screen or take screenshots. If you use your PC primarily for work, spreadsheets, or browsing, this is wasted memory.

**How to turn it off:**
1. Open **Settings** > **Gaming** > **Xbox Game Bar**.
2. Toggle it to **Off**. 

## 6. Uninstall Manufacturer Bloatware (10 Minutes)

If you bought a pre-built PC from Dell, HP, Lenovo, or Acer, it likely came with a dozen proprietary programs pre-installed. These "Assistant" and "Support" apps often run heavily in the background, constantly scanning your system and popping up with useless notifications.

**How to clean it up:**
1. Open **Settings** > **Apps** > **Installed apps**.
2. Sort the list by **Date installed** to group the apps that came with the PC, or just scroll through.
3. Look for anything with the manufacturer's name (e.g., "HP JumpStart", "Dell SupportAssist", "McAfee LiveSafe").
4. Uninstall them. 

*Note: The only manufacturer apps you usually want to keep are the ones that manage driver updates (like Lenovo Vantage or Asus Armoury Crate), but even those can often be replaced by simply using standard Windows Update.*

---

## When Settings Aren't Enough: The Hardware Reality

If you have followed all these steps and your PC still takes three minutes to boot up and struggles to open Google Chrome, you likely have a hardware bottleneck. Software tweaks can only go so far.

The most common culprit in older PCs is a mechanical Hard Disk Drive (HDD). Windows 11 was fundamentally designed to run on a Solid State Drive (SSD). If your PC does not have an SSD, no amount of software tweaking will make it fast. 

Upgrading an old hard drive to a standard SATA SSD (which costs around $40-$60 for a 1TB drive) will provide a more dramatic speed boost than every software optimization in the world combined. I upgrade old laptops to SSDs regularly, and the owners always think I bought them a brand new computer.

If you are already running on an SSD, the second most common bottleneck is RAM. If your system has 4GB or 8GB of RAM, upgrading to 16GB will give the operating system the breathing room it needs to run smoothly. But as long as your hardware is decent, the 30-minute cleanup above is exactly what you need to keep Windows 11 running like it did on day one.

---

## Frequently Asked Questions (FAQ)

**Q: Will "Registry Cleaners" speed up my PC?**
A: No. Do not use them. Programs that claim to "clean" or "defragment" your registry often delete vital system keys, causing software crashes or completely breaking Windows. Microsoft explicitly advises against using them.

**Q: Should I defrag my SSD to make it faster?**
A: No. You should never manually defragment a Solid State Drive. It does not speed up the drive and actually reduces its lifespan by forcing unnecessary write cycles. Windows automatically runs a safe "TRIM" command on SSDs in the background, which is all they need.

**Q: Does having a messy desktop slow down Windows?**
A: Mostly a myth, but with a grain of truth. Having 200 icons on your desktop won't slow down a modern PC noticeably. However, if those icons are actually massive 4GB video files stored directly on the desktop, it can slow down the initial loading of the desktop interface when you boot up.

**Q: Why is my PC fast after a restart, but slow a few days later?**
A: This is usually a memory leak. Some programs don't properly release RAM back to the system when you close them. After a few days, your RAM fills up with "ghost" data, causing the system to swap to the hard drive. The fix is exactly what you are doing—restarting the PC clears the RAM completely.
