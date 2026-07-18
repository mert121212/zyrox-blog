---
title: "When to Replace a Power Supply Instead of Troubleshooting It"
meta_description: "Know when a failing PSU is better replaced than repaired or endlessly tested."
date: 2026-07-21
category: "Power"
tags:
  - "PSU"
  - "Power Supply"
  - "Hardware Failure"
  - "Replacement"
author: daniel-osei
---

I spent three weeks troubleshooting a system that would randomly restart under load. I swapped RAM, reinstalled Windows, reseated the GPU. Everything. Then I finally pulled out a multimeter, ran a few tests, and discovered the 12V rail on the power supply was sagging from 12.0V to 11.3V under full GPU load. The PSU was a five-year-old unit from a brand I should not have trusted in the first place. Three weeks of work, and the answer was a $90 Seasonic unit.

That experience is why I now think about PSU troubleshooting in a different order than most guides suggest. The question is not always "how do I diagnose this PSU." Sometimes the better question is "should I even bother trying?"

## Understanding the Age-Based Replacement Threshold

Power supplies degrade with use. The electrolytic capacitors inside — the components that smooth and regulate voltage output — have a rated service life measured in hours at a given temperature. Most quality capacitors in a decent PSU are rated for 5,000 to 10,000 hours at 85°C or 105°C.

In a PC that runs eight hours a day, five days a week, you hit 10,000 hours in about five years. In a system that runs nearly continuously — a home server, a media center that is always on, a workstation that never fully powers down — you hit that threshold faster. A PSU running 16 hours a day reaches 10,000 hours in under two years.

**The general rule: a PSU on a system that runs more than eight hours per day and is five or more years old should be considered a replacement candidate, even if it has not shown visible symptoms yet.** Capacitor aging does not always announce itself dramatically. It often manifests as subtle instability — occasional freezes, slight voltage sag, increased ripple — before a harder failure occurs. By the time it becomes obvious, it may have already stressed other components.

This is not about being wasteful. It is about risk management. A $70–$120 PSU replacement is cheap insurance against damaging a $400 GPU or a $500 CPU.

## Failed Protection Circuit Signs

Modern PSUs include multiple protection circuits designed to shut the unit off before damage occurs. When these circuits are tripping repeatedly, it is a strong signal that something is genuinely wrong with the PSU.

**OVP (Over Voltage Protection)** trips when the output voltage on any rail exceeds the permitted threshold. If your system randomly shuts off under load — especially GPU load — and you rule out thermal issues and driver problems, OVP may be triggering. This can happen on aging PSUs because the voltage regulation circuitry is no longer holding the rails steady.

**OCP (Over Current Protection)** triggers when the current draw on a rail exceeds its rated limit. This sometimes happens on cheap PSUs with inaccurate current sensing; the circuit trips even at normal loads.

**Coil whine** is not a protection circuit failure, but it is a diagnostic signal. A PSU emitting a high-pitched whine that changes pitch with system load has coils in the transformer that are resonating audibly. Some coil whine is normal and harmless. Coil whine that increases dramatically under load, or that appears suddenly in a PSU that was previously quiet, can indicate degrading components or loose coil windings.

**Capacitor bulge** is visual confirmation of failure. Remove the PSU cover (power disconnected, capacitors discharged — leave unplugged for 30 minutes before opening) and inspect the cylindrical capacitors. A healthy capacitor has a flat top. A failing one has a domed or bubbling top. A bulging capacitor is not repairable in a home setting and confirms the PSU should be replaced immediately.

## The Paper Clip Test

Before spending money on a replacement, you can confirm whether the PSU can power itself on at all using the paper clip test. This test bypasses the motherboard and forces the PSU into operation.

**Step 1:** Disconnect all power cables from every component in the system.

**Step 2:** Locate the 24-pin ATX connector from the PSU (the large rectangular cable that plugs into the motherboard).

**Step 3:** Bend a paper clip into a U shape and insert one end into the green wire pin (PS_ON, pin 16) and the other end into any black wire pin (ground). The green wire is the power-on signal; grounding it to a black wire simulates the motherboard telling the PSU to start.

**Step 4:** Plug the PSU into a wall outlet and flip the PSU power switch on.

If the PSU fan spins and the unit powers on, it passes the basic self-start test. This does not tell you whether the output voltages are correct, but if the unit does not power on at all during the paper clip test, the PSU has a definitive fault.

**A PSU that fails the paper clip test, shows burn marks on any connector, or has a melted cable should be replaced immediately. Do not reconnect it to any hardware.**

## Situations Where Troubleshooting Is Pointless

There are specific circumstances where continuing to troubleshoot a PSU is a waste of time and potentially dangerous:

**Burn marks on the PSU housing or on a motherboard connector.** Visible burn marks indicate an arc or sustained overcurrent event occurred. Components in the discharge path may be damaged. Replace both the PSU and inspect the motherboard connector carefully.

**Melted or discolored cable connectors.** A melted 8-pin CPU power connector or 6+2 PCIe connector means the connection was running extremely hot, likely due to a poor contact or an overcurrent event. Even if you replace only the PSU, the motherboard or GPU connector it was plugged into may now have damaged pins that will cause the same problem again.

**Confirmed capacitor bulge.** As mentioned above, once you see a bulging capacitor, the unit is done. Continuing to run it risks a venting event inside your case.

**A unit with no brand identification or an unknown tier origin.** Some PSUs — often those sold cheaply with prebuilt systems or found as leftover stock with unfamiliar brand names — have no meaningful quality behind them. If a system is unstable and the PSU is unrecognizable, replace it with a known-good unit before spending any more time diagnosing.

**Age beyond seven years in a high-demand system.** Past this point, even a PSU that currently works may fail without much additional warning. The troubleshooting time is better spent on a replacement that will give you years of reliable operation.

## Situations Where Troubleshooting Is Worth It

Not every PSU symptom requires immediate replacement. There are cases where the problem is elsewhere and the PSU is being blamed unfairly:

**Random reboots that coincide with a recent driver update.** If the instability started after a graphics driver or chipset driver update, the PSU is probably not at fault. Roll back the driver first. I have seen a faulty GPU driver produce symptoms nearly identical to a failing PSU — random restarts under 3D load, occasional black screens — and the fix was a driver rollback, not a new power supply.

**System shutdowns that only occur at specific GPU overclocks.** If the system is stable at stock GPU clocks and unstable only with memory or power overclocks applied, the PSU may simply be undersized for the overclocked load. Try reducing the GPU power limit in **MSI Afterburner** before diagnosing the PSU.

**Coil whine from the GPU rather than the PSU.** GPU coil whine and PSU coil whine sound similar. Isolate the source by listening carefully with the case open. GPU coil whine does not indicate a PSU problem.

**A system that is stable but you suspect the PSU because of its brand.** Suspicion is not a diagnosis. If the system is fully stable, benchmark it, run **OCCT** power supply stress test, and measure the rail voltages. A PSU that passes under full load — even a cheap-looking one — is not causing your problems.

## Cost-Benefit Analysis: Repair vs Replace

For nearly all consumer-grade power supplies, repair is not a viable option at home. PSUs contain large capacitors that can hold lethal charge even when unplugged. The components inside (capacitors, transformers, switching MOSFETs) require specific replacements, soldering, and post-repair testing under load. The expertise and tools required to do this safely would cost more in time than a replacement unit.

The math is simple:

| Scenario | Cost of Troubleshooting | Cost of Replacement |
|---|---|---|
| Replace 2 failed capacitors (shop labor) | $40–80 + 1–2 weeks wait | $60–120 for a new quality PSU |
| Source replacement MOSFET, shipping | $25+ + expertise | $60–120 for a new quality PSU |
| Component damage if PSU fails again | GPU/motherboard at risk | None — new PSU has warranty |

For PSUs under $120, the repair option almost never makes financial or practical sense. Even for higher-end units ($150–250), repair is only worth considering if the failure is confirmed to be a single, simple component (like a blown fuse) and you have the skills to service it safely.

## Replacement Cost vs Potential Damage Cost

This is the argument for not running a suspect PSU longer than necessary:

A mid-range GPU like an RTX 4070 Super costs $500–$600. A modern CPU like a Ryzen 7 7700X costs $300–$350. A quality motherboard is $150–$250. A quality power supply to protect all of that hardware costs $70–$130.

A PSU failure mode that sends voltage spikes down the PCIe bus or through the CPU power connector can damage or destroy any component connected to it. The probability of this happening with a known-failing PSU over a period of weeks or months is not trivially small. Running a unit with confirmed capacitor bulge or burn marks to "save the cost of a replacement" is a gamble with components worth ten to twenty times the replacement cost.

## PSU Tier References: What to Replace With

When replacing a power supply, use a reputable tier list to guide the selection. The **Cultists Network PSU Tier List** and the **Tom's Hardware PSU Tier List** are widely maintained and accurate. For direct recommendations at key price points:

| Budget | Recommended Unit | Wattage Options |
|---|---|---|
| $65–80 | Corsair CX650M | 550W, 650W |
| $80–100 | be quiet! System Power 10 | 650W, 750W |
| $100–130 | Seasonic Focus GX | 650W, 750W, 850W |
| $130–160 | Corsair RM850x | 750W, 850W, 1000W |
| $160–200 | Seasonic Prime TX | 650W, 750W, 850W |

For a standard gaming system with one GPU, 650W to 750W from the above list covers virtually every build up to an RTX 4080 or RX 7900 XT. For RTX 4090 or RX 7900 XTX builds, 850W to 1000W is the appropriate range. Be sceptical of any PSU claiming high wattage at a very low price — the quality of the components inside does not scale down proportionally with cost.

---

## FAQ

**How do I know if my PSU is actually causing my instability?**
The most reliable method is substitution — swap in a known-good PSU temporarily and test whether the instability continues. If the system becomes stable with a different PSU, the original is confirmed faulty. If the problem persists, look elsewhere.

**Is a paper clip test enough to confirm a PSU is healthy?**
No. The paper clip test only confirms the PSU can self-start. It does not verify output voltage accuracy or behavior under load. For a full test under load, use a PSU tester with load resistors or run **OCCT** power supply test with HWiNFO64 monitoring voltages simultaneously.

**Can a bad PSU damage my GPU or CPU?**
Yes. An OVP failure — where the protection circuit itself fails to engage — can allow overvoltage on the 12V rail. This can damage GPUs, which are particularly sensitive to voltage irregularities on the PCIe bus. A PSU that is failing should be replaced before powering on expensive components.

**What wattage do I need to replace my current PSU?**
Use the PCPartPicker power estimate as a starting point, then add 20–25% headroom. A system that draws 500W under full load should be paired with a 650W unit, not a 500W unit running at 100% capacity.

**Are modular PSUs worth the extra cost?**
For most builds, yes. A fully modular PSU like the Seasonic Focus GX or Corsair RM series allows you to connect only the cables you need, which dramatically improves cable management and airflow inside the case.

**My system is stable but the PSU is old. Should I preemptively replace it?**
If the unit is five years old or more and runs more than eight hours per day, preemptive replacement is reasonable risk management, especially if you have added newer, more power-hungry components since the original build. If the system is used lightly (a few hours per day), the risk is lower and you can monitor rather than replace immediately.
