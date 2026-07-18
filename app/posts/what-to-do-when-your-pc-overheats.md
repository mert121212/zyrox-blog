---
title: "What to Do When Your PC Overheats"
meta_description: "A practical checklist for identifying overheating causes and reducing heat before it leads to instability or damage."
date: 2026-07-28
category: "Cooling"
tags:
  - "Overheating"
  - "Thermals"
  - "Cooling"
  - "Troubleshooting"
author: daniel-osei
---

There is a specific kind of dread that comes with watching your PC stutter mid-game, lock up during a render, or shut itself off without warning. I have been there more times than I would like to admit, and almost every time the root cause turned out to be heat. Overheating is one of the most common and most preventable hardware problems out there, and the good news is that with the right tools and a bit of patience, it is something you can usually fix yourself.

This guide walks through the full process — from detecting overheating and diagnosing which component is responsible, to cleaning dust, replacing thermal paste, tuning fans, and deciding when it is finally time to upgrade the cooling hardware entirely.

## How to Identify Overheating with HWiNFO64

Before touching anything inside the case, you need real data. Guessing at temperatures is a waste of time. The best free tool for this is **HWiNFO64**, which reads sensors from every major component and presents them in a single window.

Download HWiNFO64 from the official site at hwinfo.com, install it, and launch it in Sensors-only mode. You will see a scrollable list of readings covering your CPU cores, package temperature, GPU hot spot, VRMs, NVMe drive temps, and more.

Run a stress test alongside it. For CPU stress testing, use **Prime95** with the Small FFTs preset, which puts maximum load on the processor in a short time. For GPU, use **FurMark** or run a demanding game title for 15–20 minutes. Watch the temperature columns as load climbs.

### What to look for: thermal throttling detection

Throttling is the key signal that overheating has become a real problem. Modern CPUs and GPUs protect themselves by automatically reducing their clock speed when they exceed a thermal limit. This is called thermal throttling.

In HWiNFO64, look for a column labeled **CPU Throttling** or **GPU Throttling**. If you see Yes, True, or a non-zero value in that column during load, the component is actively being slowed down to prevent damage. That is the system telling you the cooling is not keeping up.

You can also detect throttling indirectly: if frame rates drop suddenly and recover, or if a render that normally completes in a predictable time suddenly slows without explanation, throttling is a likely cause.

## CPU vs GPU Overheating: Different Causes, Different Fixes

Not all heat is created equal, and the cause of overheating on a CPU is often very different from what drives GPU temperatures up.

**CPU overheating** is usually caused by one of three things: dried-out or improperly applied thermal paste between the processor and cooler, a cooler that is undersized for the processor's TDP, or degraded mounting pressure on the heatsink. In some cases, especially with Intel's 13th and 14th generation CPUs, power limits set too aggressively in BIOS also drive temperatures beyond what the cooler can handle.

**GPU overheating** tends to come from a combination of factors: thick dust accumulation on the heatsink fins and fans, a GPU cooler that was never sufficient for the card's heat output, or a case that traps warm air around the graphics card with no fresh airflow from the front. High-end cards like the RTX 4090 or RX 7900 XTX produce enormous amounts of heat and need both good coolers and good case airflow to stay in range.

The key difference: a CPU that throttles will usually slow down its single-core performance and cause stuttering in everything from games to file transfers. A GPU that throttles will show as a sudden frame rate collapse and dropped clock speeds visible in tools like **GPU-Z** or HWiNFO64's GPU section.

## Dangerous Temperature Thresholds by Component

Every component has a range where it runs normally and a threshold where performance starts to be sacrificed or long-term damage becomes a risk. Use this table as a reference:

| Component | Safe Range | Caution Zone | Dangerous |
|---|---|---|---|
| CPU (desktop, Intel/AMD) | Up to 80°C | 85–90°C | 95°C+ |
| CPU (laptop) | Up to 85°C | 88–93°C | 95°C+ |
| GPU (NVIDIA / AMD) | Up to 83°C | 85–90°C | 93°C+ |
| GPU Hot Spot (NVIDIA) | Up to 95°C | 100–105°C | 110°C+ |
| NVMe SSD | Up to 60°C | 65–70°C | 75°C+ |
| VRM (motherboard) | Up to 90°C | 95–100°C | 110°C+ |

If your readings fall in the caution or dangerous zones during normal load, something needs to change. Do not run a system in the red zone and hope it stabilizes.

## Step-by-Step Dust Cleaning Guide

Dust is the single most common cause of overheating in systems that are six months old or more. Dust acts as an insulating layer on heatsink fins and fan blades, dramatically reducing their ability to move and dissipate heat. I cleaned a friend's three-year-old gaming PC last year and dropped CPU temps by 18°C just from removing dust. It took about 25 minutes.

**What you need:** Compressed air canister (or a blower), isopropyl alcohol (90%+ concentration), cotton swabs, a Phillips-head screwdriver, antistatic wrist strap (optional but useful).

**Step 1: Shut down completely and unplug.** Do not just sleep the machine. Full power off, and disconnect the cable from the wall.

**Step 2: Move the PC to a well-ventilated area.** Outdoors is ideal. You are going to blow dust out and you do not want it redistributed inside your room.

**Step 3: Remove the side panels.** Most modern cases use thumbscrews on the back panel.

**Step 4: Use short bursts of compressed air.** Hold the can upright and use short, controlled blasts. Never hold the nozzle for more than a second at a time — the liquid propellant can spray out and damage components if you hold it too long or tilt the can.

**Step 5: Focus on the CPU heatsink and GPU heatsink fins.** Blow from multiple angles. The fins trap dust in layers that short blasts from one angle will not clear.

**Step 6: Blow out case fans.** Hold fan blades still with a finger while blasting. If the blades spin freely while you blow, they can generate a voltage spike that in rare cases can damage the fan controller.

**Step 7: Clean intake filters.** Most cases with mesh fronts or bottom intakes have removable dust filters. Pull them out, rinse them under warm water if they are foam, or tap them clean if they are metal mesh. Let them dry completely before reinserting.

**Step 8: Reassemble, power on, and check HWiNFO64 again.** If temperatures improved significantly, dust was your problem. If they did not drop meaningfully, move on to thermal paste.

## Thermal Paste Replacement Guide

Thermal paste is a thermally conductive compound that fills microscopic air gaps between the CPU's metal lid and the cooler's base plate. Over time — typically three to five years depending on the compound and temperatures — it dries out, cracks, or pump-out of position, which increases thermal resistance dramatically.

**When to replace it:** If your CPU temperatures are high after cleaning dust, if the system is three years old or older, or if you are removing the cooler for any reason, replace the paste while you are at it.

**What you need:** Isopropyl alcohol (90%+), lint-free cloths or coffee filters, a tube of quality thermal paste. For a mid-range build, **Thermal Grizzly Kryonaut** is an excellent choice. For those who want something more budget-friendly, **Arctic MX-6** is reliable and widely available. Avoid the cheap compound that ships with many coolers unless it is from a reputable brand like Noctua.

**Step 1: Remove the cooler.** Unscrew the mounting hardware slowly and evenly — loosen each screw a turn or two at a time in a cross pattern before fully removing. This prevents uneven pressure on the CPU socket.

**Step 2: Clean the CPU lid.** Apply a small amount of isopropyl alcohol to a lint-free cloth and wipe in one direction. Repeat until no discoloration comes off on the cloth. Then clean the cooler's base plate the same way.

**Step 3: Apply fresh paste.** For most desktop CPUs, a pea-sized dot in the center is enough. The mounting pressure will spread it. Do not try to manually spread it — you risk introducing air bubbles.

**Step 4: Remount the cooler** in a cross pattern, just as you removed it. Firm finger pressure is enough — overtightening can crack the CPU package on some platforms.

**Step 5: Boot and monitor temperatures.** You may see slightly elevated temps for the first hour as the paste seats itself. After that, temperatures should be noticeably lower than before.

## Fan Curve Tuning in BIOS and MSI Afterburner

Out-of-the-box fan curves are often too conservative — the fans spin slowly to keep noise down, but that means the components run hotter than they need to. Tuning the fan curve yourself gives you control over that tradeoff.

**In BIOS:** On ASUS boards, find Fan Xpert or Q-Fan Control. On MSI boards, look under Hardware Monitor. Most modern BIOS interfaces let you set a graph of fan speed percentage vs. temperature. A good starting point is to set 100% speed when CPU temperature hits 80°C, and around 50–60% at 65°C. This ramps the fans up quickly when things get hot while keeping noise low at idle.

**For GPU fans with MSI Afterburner:** Open Afterburner, click the fan icon, enable the custom fan curve, and draw your own response curve. I run my GPU fans at 60% by the time the GPU hits 75°C, and 100% at 85°C. The automatic curve that came with my card did not start ramping until 80°C, which was already in the caution zone.

## Case Airflow Improvement

Good airflow turns the inside of the case into a wind tunnel — fresh cool air enters from the front and bottom, passes over the components, and exits out the back and top. Poor airflow creates hot pockets where warm air stagnates.

**Clean intake filters first** — a clogged filter can cut airflow by 40–50% even with powerful fans.

**Check fan direction** — intake fans should pull air into the case (frame visible from outside, label visible from inside). Exhaust fans push air out (label visible from outside).

**Consider adding fans** — if you have empty fan mounting positions, adding a 120mm or 140mm intake at the front will help significantly. Noctua NF-A14 and be quiet! Silent Wings 4 are both excellent 140mm options.

**Adjust cable management** — loose cables balled up in the main chamber restrict airflow. Route them behind the motherboard tray where possible.

## Emergency Actions When Your System Is Throttling Right Now

If your system is actively throttling during an important session and you need a temporary fix:

1. Close every non-essential application to reduce load on both CPU and GPU.
2. Lower in-game graphics settings to reduce GPU heat output immediately.
3. Open the PC case side panel — this is not a long-term solution but can drop temps 5–8°C quickly by allowing ambient air to mix with case air.
4. Point a desk fan at the open case.
5. Make sure the PC is not inside a cabinet or pressed against a wall — any blocked exhaust path makes things worse.
6. In HWiNFO64, check if a specific fan has stopped — a single dead fan can cause disproportionate temperature spikes.

These are band-aids. Address the root cause as soon as you can.

## When to Upgrade Cooling Hardware

Sometimes cleaning and paste replacement are not enough. Here are the clear signals that it is time to spend money on better cooling:

- Your CPU cooler is a stock Intel box cooler or a low-profile OEM unit paired with a mid-range or high-end processor.
- You have replaced thermal paste and cleaned dust thoroughly but still hit 90°C+ under sustained load.
- Your GPU reaches thermal limits even with a clean heatsink and aggressive fan curve.
- The system runs at high temperatures in a cool room — the ambient environment is not the problem.

For CPU cooling, the **Noctua NH-D15** remains the gold standard for air cooling and will outperform many all-in-one liquid coolers. The **be quiet! Dark Rock Pro 5** is another strong performer. If you want liquid, the **Corsair H150i Elite Capellix** and **NZXT Kraken 360** are proven 360mm AIO options that handle even the hottest desktop CPUs comfortably.

For GPU cooling, replacing thermal pads and paste on the card itself is a valid fix for older models. For newer mid-range and high-end cards, aftermarket GPU coolers from companies like Arctic Accelero are available for some models, though the compatibility list is limited.

---

## FAQ

**What temperature is too hot for a CPU?**
For most desktop processors, anything above 90°C under sustained load is worth addressing. Occasional spikes to 95°C during brief bursts are less concerning than sitting at 90°C continuously.

**Does overheating permanently damage components?**
Yes, over time. Heat degrades capacitors, solder joints, and silicon. A single thermal event rarely causes instant death, but repeated throttling cycles over months accelerates long-term degradation.

**How often should I replace thermal paste?**
Every two to three years as a proactive maintenance step, or whenever you remove the cooler for any reason.

**Can dust really cause that much of a temperature increase?**
Absolutely. A heavily dust-clogged heatsink can see temperature increases of 15–25°C compared to a clean one. It is the first thing to check.

**Is it safe to run with the case side panel off?**
For a short-term test, yes. Long-term, it disrupts the designed airflow path and introduces more dust. Not a recommended permanent solution.

**Does a bigger case always mean better thermals?**
Not automatically. A large case with poor fan placement and no mesh intake can perform worse than a compact case with a well-designed airflow layout.

**Will undervolting my CPU or GPU help with temperatures?**
Yes, meaningfully. Undervolting reduces power consumption without reducing performance in most cases. Tools like **ThrottleStop** for Intel CPUs and AMD's built-in Precision Boost Overdrive settings allow this. A 10–15% reduction in power can translate to 8–12°C lower temperatures.
