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

![Hero Image](/images/default-hero.jpg)
Look, I'm gonna be straight with you. I've worked on hundreds of slow [Windows 11](https://www.microsoft.com/windows/windows-11) machines at this point, and nine times out of ten the fix takes less than half an hour. Not exaggerating.

The frustrating part? Most of these PCs aren't actually broken. They're just drowning in background junk — apps that auto-launch on boot, telemetry phoning home every few seconds, animations eating GPU cycles for no good reason. A brand new laptop from Best Buy can start feeling sluggish within six months of normal use. I've watched it happen to my own family's machines.

And before you ask — no, don't go download some "PC Optimizer Pro" or registry cleaner you found on a sketchy website. Those things break stuff. I've had to reinstall Windows on machines that people "optimized" with those tools. Just... don't.

Everything below uses built-in Windows tools. Nothing to download, nothing to pay for.

---

## 1. Your Startup Apps Are Probably Out of Control (5 Min Fix)

This is it. This is the big one.

Open Task Manager right now — right-click the Start button, hit Task Manager — and click that Startup apps tab on the left. The icon looks like a little speedometer. Now look at how many apps say "Enabled."

I looked at my aunt's laptop last Thanksgiving. She had **nineteen** startup apps. Spotify, Steam, Discord, three different printer utilities she didn't know existed, [Microsoft](https://www.microsoft.com) Teams (she doesn't use Teams), OneDrive, some Lenovo thing, a weather widget... all of it launching the second she pressed the power button. Her laptop took almost two full minutes to become usable after logging in. Two minutes! She thought her computer was dying.

We disabled everything except her antivirus and OneDrive. Boot time dropped to about 25 seconds.

Here's the thing people worry about: disabling an app here doesn't uninstall it. It just stops it from auto-launching. You can still open Spotify whenever you want from the Start menu, it just won't be sitting there chewing through your RAM from the moment you turn on the machine.

Go through that list. If you don't need it running the instant your PC boots, right-click it and hit **Disable**. Be aggressive about it.

## 2. Kill the Background Noise (5 Min)

Windows 11 is chatty. It's constantly sending usage data back to Microsoft, keeping apps updated in the background, syncing stuff you forgot you even installed. On a desktop with plenty of horsepower, whatever. On a laptop? That background activity eats battery and CPU time you actually need.

Two things to do:

**First — background app permissions.** Go to Settings (Win + I), then Apps > Installed apps. See all those apps you barely use? Click the three dots next to each one, go to Advanced options, and under "Background apps permissions" switch it to **Never**. I do this for basically everything except email and messaging apps.

**Second — diagnostic data.** Settings > Privacy & security > Diagnostics & feedback. Turn off "Send optional diagnostic data" and "Tailored experiences." This is just Microsoft collecting usage info to "improve your experience" — their words. You don't need it and it uses resources in the background.

## 3. Visual Effects — The Quick Win Nobody Talks About (2 Min)

Okay this one's small but it makes the whole system *feel* faster, especially on older hardware.

Windows 11 has all these smooth animations, drop shadows under windows, transparency effects, fade-in transitions... it looks nice, sure. But if your laptop has integrated graphics or it's a few years old, all that eye candy is dragging down the UI responsiveness.

Press the Windows key and type "Advanced system settings" — hit Enter. Click Settings under Performance. You'll see a big list of visual effects with checkboxes.

You can hit "Adjust for best performance" to nuke everything at once. But fair warning — do yourself a favor and re-check **"Smooth edges of screen fonts"** after you do that. If you leave it unchecked, every piece of text on your screen looks like it was rendered in 1997. Seriously, it's awful. I made that mistake once and spent ten minutes thinking my display driver was broken before I figured it out.

## 4. Free Up Your C: Drive (5 Min)

This one catches people off guard. Your C: drive — the one Windows lives on — needs breathing room. Windows uses empty space on that drive for virtual memory (the pagefile), temp files, update staging... if you've got like 5 GB free on a 256 GB drive, your whole system grinds.

I had a client last month whose laptop was basically unusable. Chrome took 30 seconds to open. Turns out her C: drive had 400 MB free. Four hundred megabytes. She'd been saving everything — photos, videos, downloads — straight to the C: drive for three years without ever cleaning up.

The fix:

Settings > System > Storage. Turn on **Storage Sense** — this makes Windows automatically clean up temp files and empty the Recycle Bin on a schedule. Then hit **Cleanup recommendations**. Windows will scan and show you what you can safely toss. Old Windows Update files alone can sometimes free up 10-15 GB.

## 5. Xbox Game Bar — Turn It Off If You Don't Game (2 Min)

This is a weird one. Windows 11 ships with this gaming overlay called Xbox Game Bar that's always running in the background, ready to record gameplay clips and take screenshots at a moment's notice. Cool if you're a gamer. Completely pointless if you use your PC for spreadsheets and email.

Settings > Gaming > Xbox Game Bar. Toggle it off. Done.

Takes two seconds but frees up a little chunk of memory that was being wasted.

## 6. The Bloatware Purge (10 Min)

If you bought your PC from Dell, HP, Lenovo, Acer — basically any big manufacturer — it came loaded with their proprietary software. "HP JumpStart." "Dell SupportAssist." "McAfee LiveSafe" (oh god, McAfee). These things run constantly, scanning your system, throwing notifications at you, phoning home to check for updates to software you never asked for in the first place.

Go to Settings > Apps > Installed apps. Sort by install date to see what came pre-loaded, or just scroll through and look for anything with the manufacturer's name on it.

Uninstall all of it.

I know some people get nervous about this — "but what about driver updates?" Honestly, Windows Update handles drivers fine for most hardware these days. Lenovo Vantage and Asus Armoury Crate are the only two I'd consider keeping, and even those are optional. I've never had a machine that *needed* Dell SupportAssist to function.

---

## When None of This Helps

So you did all of the above and your PC still takes three minutes to boot and Chrome opens like it's loading through dial-up.

At that point, it's hardware. Software tweaks can only do so much.

The number one culprit I see in slow machines — still, in 2026 — is a mechanical hard drive. A spinning HDD. Windows 11 was built assuming you have an SSD. If you're running the operating system off a traditional hard drive, no amount of setting changes will make it feel fast. It physically can't read data quick enough.

Here's what kills me: a 1 TB SATA SSD costs like $40-$60 now. That's it. I swap old HDDs for SSDs in people's laptops all the time and they genuinely think I replaced their entire computer. The speed difference is that dramatic. We're talking boot times going from 90 seconds to 10. Programs opening in one click instead of watching that loading circle spin for fifteen seconds.

If you already have an SSD and things are still slow, check your RAM. 4 GB is not enough for Windows 11 in 2026 — the OS alone eats most of that. 8 GB is tight. 16 GB is where you want to be. RAM upgrades on most laptops cost $25-$40 and take about ten minutes with a screwdriver.

But if your hardware is halfway decent? The 30-minute cleanup above is all you need. I've done it hundreds of times and it works.

---

## FAQ

**Will registry cleaners speed up my PC?**

No. And I cannot stress this enough — stay away from them. I've seen these programs delete registry keys that Windows actually needs, which causes apps to crash or, in a couple of cases I've dealt with, makes the whole OS unbootable. Microsoft themselves say not to use them. That should tell you something.

**Should I defrag my SSD?**

Please don't. Defragmentation is a thing for old spinning hard drives where data gets physically scattered across the disk platters. SSDs don't work that way — they have no moving parts, and defragging one just burns through write cycles for zero benefit. Windows already runs TRIM on your SSD automatically in the background, which is the only maintenance it needs.

**Does a cluttered desktop actually slow down Windows?**

Eh, mostly no. 200 shortcut icons on your desktop? Your PC doesn't care. But if those aren't shortcuts — if they're actual large files like 4K video clips sitting directly on the desktop — then yeah, it can slow down the desktop rendering when you first log in. The fix is just moving those files into a folder. The shortcuts themselves are harmless.

**My PC is fast after a restart but gets slow after a few days. Why?**

Classic memory leak. Some programs — and I won't name names but you'd recognize them — don't properly give back RAM when you close them. The memory stays "reserved" even though nothing's using it. After a few days of sleep/wake cycles without a full restart, your RAM fills up with this ghost data and Windows starts swapping things to disk, which makes everything feel sluggish. Restarting clears it all out. If this happens to you a lot, just get in the habit of doing a full restart every few days instead of just closing the lid.


---

## Related Guides

- [How to Free Up Disk Space on Windows Without Deleting Your Files](/posts/how-to-free-up-disk-space-on-windows-without-deleting-your-files)
- [How to Check Your PC's Full Specs Without Installing Anything](/posts/how-to-check-your-pcs-full-specs-without-installing-anything)
- [How to Fix Windows Update Problems in 2026](/posts/how-to-fix-windows-update-problems-2026)
