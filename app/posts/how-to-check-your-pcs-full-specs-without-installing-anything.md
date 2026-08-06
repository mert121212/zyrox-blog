---
title: "How to Check Your PC's Full Specs Without Installing Anything"
meta_description: "Learn how to find your computer's exact processor, RAM, motherboard, graphics card, and storage details using only built-in Windows tools."
date: 2026-08-13
category: "Windows"
tags:
  - "Hardware"
  - "System Specs"
  - "Windows 11"
  - "Troubleshooting"
author: rachel-kim
---

Whether you are trying to sell your old laptop, figure out if you can play a new game, or ask a tech-savvy friend for troubleshooting help, you need to know what hardware is actually inside your computer.

It is surprising how many people don't know what processor they own. And to be fair, Windows doesn't always make it obvious. The internet is filled with third-party tools like CPU-Z or Speccy that will list your specs for you, but you don't need them. 

Windows has incredibly detailed hardware reporting tools built directly into the operating system. Here is how to find every component in your PC in under two minutes, without downloading a single piece of software.

---

## 1. The Quick Overview: Settings App

If you just need the basic information—your processor (CPU), how much RAM you have, and whether you are running Windows 10 or 11—the standard Settings app is the fastest route.

1. Right-click on the **Start** button (the Windows logo on your taskbar).
2. Click on **System** from the menu that appears.
3. You are now on the **About** page.
4. Under **Device specifications**, you will see:
   - **Processor:** e.g., *AMD Ryzen 7 5800X 8-Core Processor*
   - **Installed RAM:** e.g., *32.0 GB*
5. Scroll down slightly to **Windows specifications** to see if you have Windows 11 Home or Pro.

*Limitation: This page is great for a quick glance, but notice what is missing? It doesn't tell you what graphics card you have, or how much storage space is left.*

---

## 2. The Gamer's Check: Task Manager

If you are a gamer or need to check on your graphics card (GPU) and storage drives, the Task Manager is the best tool. It presents the hardware clearly and shows you how hard it is currently working.

1. Right-click the **Start** button and select **Task Manager** (or press `Ctrl + Shift + Esc`).
2. If Task Manager opens in a small window with no tabs, click **More details** at the bottom.
3. Click on the **Performance** tab (the icon looks like a small line graph on the left sidebar in Windows 11).
4. Click through the categories on the left:
   - **CPU:** Shows your exact processor name in the top right, and the number of Cores in the bottom right.
   - **Memory:** Shows your total RAM, and critically, its speed (e.g., *Speed: 3200 MHz*) and how many slots are used (e.g., *Slots used: 2 of 4*).
   - **Disk:** Shows your storage drives. Look at the "Type" at the bottom to see if it is an SSD or HDD.
   - **GPU:** Shows the exact name of your graphics card in the top right (e.g., *NVIDIA GeForce RTX 4070*). It also shows your Dedicated GPU memory (VRAM) at the bottom.

---

## 3. The Deep Dive: System Information (msinfo32)

If you are dealing with tech support, upgrading your PC, or trying to find your exact motherboard model to update your BIOS, the Task Manager isn't detailed enough. You need the System Information tool.

1. Press the `Windows Key + R` to open the Run dialogue box.
2. Type `msinfo32` and press Enter. 
3. A somewhat old-fashioned looking window will open. This is the master ledger of your PC's hardware.
4. On the main **System Summary** page, you can find the highly specific details:
   - **BaseBoard Manufacturer:** This is who made your motherboard (e.g., *ASUSTeK COMPUTER INC.* or *Micro-Star International (MSI)*).
   - **BaseBoard Product:** This is your exact motherboard model (e.g., *MAG B650 TOMAHAWK WIFI*). This is crucial information if you ever need to buy compatible RAM or download driver updates.
   - **BIOS Version/Date:** Tells you exactly how old your motherboard's firmware is.

---

## 4. The Diagnostic Tool: DirectX Diagnostic (dxdiag)

This is a legacy tool originally built to troubleshoot gaming and multimedia issues, but it remains one of the best ways to get a clean, exportable summary of your system.

1. Press the `Windows Key + R`.
2. Type `dxdiag` and press Enter.
3. If it asks to check for digital signatures, click Yes or No (it doesn't matter for finding specs).
4. The window that opens is divided into tabs:
   - **System:** Shows the CPU, RAM, and motherboard model.
   - **Display:** This is the most detailed view of your Graphics Card. It shows the chip type, total VRAM, and current driver version. (If you have a laptop with integrated and dedicated graphics, you will see a 'Display' tab and a 'Render' tab).
5. **The Best Feature:** At the bottom, click **Save All Information**. This saves a text file to your desktop containing every single specification of your PC. If you are asking for help on a tech support forum like Reddit's r/buildapc, simply copy and paste the contents of that text file. It gives the experts exactly what they need to help you.

---

## Summary Checklist

- **Need just the CPU and RAM?** Right-click Start > System.
- **Need the Graphics Card and SSD type?** Use Task Manager (Performance tab).
- **Need the Motherboard model?** Run `msinfo32`.
- **Need to send your specs to tech support?** Run `dxdiag` and click "Save All Information". 

You now know how to interrogate your computer like a professional IT technician, without downloading a single sketchy "System Scanner" program.
