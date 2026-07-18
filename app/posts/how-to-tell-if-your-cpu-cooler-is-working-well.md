---
title: "How to Tell If Your CPU Cooler Is Working Well"
meta_description: "Learn how to spot thermal issues, fan problems, and poor mounting that can affect your CPU's long-term stability. See the test results to understand the real-world impact."
date: 2026-07-13
category: "Cooling"
tags:
  - "CPU Cooler"
  - "Thermals"
  - "Cooling"
  - "Benchmarking"
author: daniel-osei
---

Most people assume their CPU cooler is fine until the system crashes, throttles hard under a benchmark, or starts sounding like a jet engine. By that point, you've already lost stability and potentially degraded your thermal paste faster than necessary. The truth is, a badly mounted or aging cooler shows signs well before any of that — you just need to know where to look.

I've been testing coolers and diagnosing thermal problems across a wide range of builds for years. In this guide I'll walk you through exactly how to evaluate whether your CPU cooler is doing its job properly, using real data and the right tools. No guesswork required.

## What "Normal" Actually Looks Like: Temperature Reference Table

Before you can say something is wrong, you need to know what right looks like. CPU temperatures vary significantly depending on the chip's architecture, TDP, and the cooler class you're using. Here's a reference table covering common scenarios:

| CPU Category | Example CPUs | Idle Temp (Normal) | Load Temp (Normal) | Danger Zone |
|---|---|---|---|---|
| Budget / Entry (65W TDP) | Intel Core i3-13100, Ryzen 5 5600 | 28–40°C | 60–75°C | 90°C+ |
| Mid-Range (65–105W TDP) | Ryzen 7 7700X, Intel Core i5-13600K | 35–50°C | 70–85°C | 95°C+ |
| High-End (125W–170W TDP) | Ryzen 9 7950X, Intel Core i9-13900K | 40–55°C | 80–95°C | 100°C+ |
| High-End with AIO (240mm+) | Ryzen 9 7950X, Intel Core i9-14900K | 35–48°C | 75–88°C | 100°C+ |
| Laptop CPUs (15–45W TDP) | Intel Core Ultra 7, Ryzen AI 9 | 40–55°C | 80–95°C | 100°C+ |

A few important notes: AMD CPUs in the Ryzen 7000 series run natively warm at idle because of power management behavior. Seeing 50–55°C at idle on a Ryzen 9 7900X is not unusual. Intel 13th and 14th gen chips are more aggressive about power draw and can hit 90°C+ under sustained all-core loads even with good cooling — this is partially by design. sustained temperatures above 95°C for extended periods will accelerate degradation.

## Setting Up HWiNFO64 for Proper Monitoring

HWiNFO64 is the most reliable free tool for real-time CPU thermal monitoring. Task Manager doesn't show you what you need. The built-in performance overlay in Windows gives you a single CPU temperature that can be misleading. HWiNFO64 shows you everything.

**Step-by-step setup:**

1. Download HWiNFO64 from hwinfo.com (free, no install required if you use the portable version).
2. Launch it and select **Sensors Only** mode.
3. In the sensors window, scroll down to find your CPU section. You'll see a list of temperature entries.
4. The three sensors you need to watch are:
   - **CPU Package** — the overall thermal reading for the entire processor die. This is your primary metric.
   - **Core Max** — the highest temperature recorded across any individual core. This tells you if one core is consistently hotter than the others.
   - **CPU VRM (MOS)** — the voltage regulator module temperature. High VRM temps (90°C+) can indicate poor airflow over the board or an inadequate cooler for a high-TDP chip.
5. To make sensors easier to track, right-click any sensor row and select **Add to Tray** to pin it to your system tray for quick reference.
6. To log temperatures over time, go to **File → Save Report** or enable logging from the main menu. This is useful for capturing temperatures during a stress test.

**CPU Package vs CPU Core temperature — what's the difference?**

CPU Package is the temperature measured by a thermal sensor embedded in the processor package. It tends to be slightly higher than individual core temps and responds faster to instantaneous load spikes. CPU Core temperatures are per-core readings averaged or individual depending on your view. When mounting issues are present, you'll often see large variance between individual core temperatures — some cores running 10–15°C hotter than others. The Package temperature gives you the big picture; Core Max and per-core temps tell you if something is uneven.

## Fan RPM Monitoring: What's Abnormal

In HWiNFO64, fan RPM data appears in the same sensors panel below temperature readings. For a tower cooler like the Noctua NH-U12A or be quiet! Dark Rock Pro 5:

- **At idle:** Fan RPMs should be low, typically 400–700 RPM for a well-tuned curve. The cooler should be quiet.
- **Under moderate load:** 800–1200 RPM is normal.
- **Under heavy all-core load (Cinebench, Prime95):** 1400–1800 RPM for most 120–140mm fans. You'll hear it, but it shouldn't be screaming.
- **Abnormal patterns to watch for:**
  - Fan RPM at 0 or showing no data — the fan may not be plugged into a CPU_FAN header, or the fan has failed.
  - Fan spinning at max RPM (typically 1800–2000 RPM for 140mm fans) at idle — the BIOS fan curve is misconfigured, or thermals are already out of control.
  - RPM jumping erratically between very low and very high values — bearing wear, a partially failed fan, or a loose cable.

For AIOs like the Corsair iCUE H150i or the Arctic Liquid Freezer III 360, you'll also see pump RPM in addition to fan RPM. A healthy pump runs at 2000–3200 RPM continuously. If pump RPM is 0 or extremely erratic, the pump may be failing, which is a serious issue that will cause rapid thermal runaway.

## Spotting Thermal Throttle in Real Data

Thermal throttling is when your CPU automatically reduces its clock speed to prevent overheating. It's a safety mechanism, but it means your cooler isn't keeping up with the thermal load being generated. You'll see this in HWiNFO64 as:

- **Core clocks dropping mid-load** — watch the CPU Core Clock sensor column while running a benchmark. If clocks start at 4.8 GHz and drop to 3.2 GHz partway through without you changing anything, that's throttle.
- **Temperature capping** — the temperature hits exactly the chip's thermal junction limit (Tj Max), typically 100°C for Intel and 95°C for AMD, and stays there while performance drops.
- **The "Thermal Throttle" flag** — HWiNFO64 has a dedicated throttle indicator column. Enable it by right-clicking the column headers in the sensors window.

In Cinebench R23, a properly cooled mid-range system should sustain close to its boost clock throughout the entire multi-core run. If you run the test twice back to back and the second score is significantly lower (more than 5–8%), thermals are likely degrading performance.

## Identifying Poor Mounting: The Uneven Core Temperature Sign

One of the most reliable signs of a bad cooler mount is uneven temperatures across individual CPU cores. If you expand the core temperature section in HWiNFO64, you'll see temperatures for Core 0, Core 1, Core 2, and so on.

On a properly mounted cooler, core temperatures under load should cluster within about 5–8°C of each other. If you see a pattern like this:

- Core 0: 72°C
- Core 1: 84°C
- Core 2: 73°C
- Core 3: 86°C

…then something is wrong. That 10–14°C spread indicates uneven contact between the CPU heat spreader and the cooler base. This usually means the cooler isn't fully seated, one of the mounting screws wasn't tightened sufficiently, the mounting hardware is warped, or the thermal paste wasn't applied with adequate coverage.

## Re-Seat Procedure: What to Do When Temps Are Suspicious

If you suspect a mounting issue, the solution is to re-seat the cooler with fresh thermal paste. Here's the process:

1. Power off the system completely and unplug from the wall.
2. Remove the cooler (mounting depends on your cooler — most use a backplate with four screws through the motherboard).
3. Use a lint-free cloth or coffee filter with 90%+ isopropyl alcohol to clean the old thermal paste off both the CPU heat spreader and the cooler base plate. Wipe in one direction, not circular motions, to avoid spreading residue.
4. Apply fresh thermal paste. For most coolers and CPUs, a rice-grain-sized dot in the center of the heat spreader is sufficient. For larger CPUs (Intel's wide LGA1700 dies), a short line or X pattern provides better coverage.
5. Remount the cooler. For screw-based mounts, tighten in a diagonal/cross pattern — tighten one screw slightly, then the opposite, then the other two — rather than fully tightening each one before moving to the next. This ensures even pressure.
6. Boot the system and monitor temperatures in HWiNFO64 after 10–15 minutes of normal use.

## Thermal Paste Aging: When to Replace It

Thermal paste doesn't last forever. Most compounds begin to degrade meaningfully between 3–5 years of normal use, though high-quality pastes like Thermal Grizzly Kryonaut or Noctua NT-H2 tend to last longer than budget options. Signs of aging thermal paste include:

- Gradually rising temperatures over months with no change in ambient temperature or case airflow
- Temperatures that used to be fine but have crept up 5–10°C over the past year
- Dry, cracked, or flaky paste visible when you remove the cooler

If your system is more than three years old and you've never reapplied thermal paste, it's worth doing as preventative maintenance even if you haven't noticed dramatic temperature increases yet.

## Running a Proper Burn-In Test

Casual gaming and desktop use don't always stress the CPU enough to reveal marginal cooling problems. A dedicated stress test will.

**Cinebench R23 Multi-Core:**
1. Download from the Microsoft Store or the Maxon website (free).
2. Run the multi-core test once to warm up, then run it again. Note the score and watch temperatures in HWiNFO64 simultaneously.
3. A stable cooler should maintain consistent temperatures throughout the run and produce similar scores on both runs.

**Prime95 Small FFTs:**
1. Download Prime95 (free, primenet.mersenne.org).
2. Select **Just Stress Testing** → **Small FFTs** (maximum heat generation).
3. Run for 15–20 minutes. This is more aggressive than any real-world workload.
4. Watch for: temperatures exceeding 100°C (Intel) or 95°C (AMD), core clock drops, system instability.
5. If the system passes 20 minutes of Small FFTs without throttling or crashing, your cooler is in good shape for real-world use.

**Note on Intel 13th/14th gen:** These CPUs can exceed 100°C in Prime95 Small FFTs even with very good air cooling. This isn't always a mounting problem — it's a reflection of the chip's extreme power draw under artificial workloads. Use Cinebench R23 as the more realistic benchmark for these platforms.

---

## Frequently Asked Questions

**My CPU hits 90°C in games — is that dangerous?**
It depends on the CPU. Intel Core i9-13900K regularly hits 90–95°C in demanding games; this is within spec. For a Ryzen 5 5600, hitting 90°C in games is unusual and worth investigating — either the cooler is undersized, the mounting is bad, or ambient temperatures are very high.

**How do I know if my AIO pump is working?**
In HWiNFO64, look for pump RPM readings — should be 2000–3200 RPM constantly. Also listen for a faint liquid flow sound near the CPU block. If CPU temps spike rapidly to very high levels within seconds of load, the pump has likely failed.

**Does the brand of thermal paste matter much?**
More than people expect, but the difference between good pastes is smaller than the difference between good and bad application. Thermal Grizzly Kryonaut, Arctic MX-6, and Noctua NT-H2 all perform within 2–3°C of each other under similar conditions. Avoid cheap no-name pastes included with budget coolers if you plan to keep the system long-term.

**Why are my core temperatures uneven even after a fresh mount?**
Some CPU dies have a slight physical curve (known as CPU "bowing"), particularly LGA1700 Intel CPUs. After-market contact frames like the Thermal Grizzly Conductonaut Extreme Contact Frame or the Thermalright LGA1700 BCF can correct this. It's a known issue that Intel partially acknowledged.

**Is a 280mm or 360mm AIO always better than a high-end air cooler?**
Not always. A 360mm AIO generally outperforms even the best air coolers under sustained all-core loads, but a 280mm AIO versus a Noctua NH-D15S or be quiet! Dark Rock Pro 5 is much closer than most people expect. For CPUs up to 125W TDP, a top-tier air cooler is completely competitive and more reliable long-term since there are no pump failure risks.

**Can I run my system indefinitely without checking cooler performance?**
Technically yes, but it's not a good habit. I recommend running a quick HWiNFO64 temperature check every 6–12 months — just 10 minutes while running a game or Cinebench. Catching thermal paste degradation or a slowly failing fan early is much less disruptive than dealing with unexpected throttling or system instability.


