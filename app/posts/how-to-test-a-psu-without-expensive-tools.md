---
title: "How to Test a Power Supply Without Expensive Tools"
meta_description: "A practical guide to evaluating a PSU using basic checks, visual inspection, and a careful test approach."
date: 2026-07-07
category: "Power"
tags:
  - "PSU"
  - "Power Supply"
  - "Testing"
  - "Hardware"
author: daniel-osei
---

Last year I spent four days chasing a random reboot problem before I finally pointed the finger at the power supply. The system would run fine for hours, then cut out under load with no BSOD, no warning — just a hard reset. I tested the GPU, reseated RAM, checked thermals, and got nowhere. Swapping the PSU fixed it immediately. The thing that slowed me down was not knowing how to actually test a power supply with the tools I had on hand. This guide covers the full process from visual inspection to load testing, using nothing more expensive than a $15 multimeter.

## Why PSU Testing Gets Overlooked

Power supplies are easy to ignore because they don't show up in benchmark charts or spec sheets. They're also not the first thing that comes to mind when diagnosing instability. But a failing PSU produces symptoms that look exactly like RAM issues, GPU problems, or even software bugs — because when the voltage rails start sagging, any component can misbehave. Testing the PSU early in your diagnostic process saves a lot of time.

## Method 1 — Visual Inspection

The first test costs nothing and takes about five minutes. You're looking for physical evidence of failure.

**Step-by-step visual inspection:**

1. **Power off completely** and unplug the PSU from the wall. Wait 30 seconds before opening anything.
2. **Remove the PSU from the case** if possible. This isn't strictly required but makes inspection easier.
3. **Look through the fan grill** with a flashlight. Check for dust accumulation that could cause overheating, and look at the capacitors visible near the fan side.
4. **Inspect the external connectors**: Check the 24-pin ATX connector, the EPS CPU connectors, and PCIe connectors for burn marks, melted plastic, or discolored pins. Even minor discoloration on a connector indicates a heat problem.
5. **Check the power cable** and the IEC socket on the PSU itself for any signs of arcing or scorch marks.
6. **If you can safely open the unit** (warranty voided, but useful for a unit you suspect is dead): look for bulging capacitors — the tops should be flat, not domed. Look for brown or black burn marks on the PCB. Look for any component that appears physically displaced.

### What Visual Inspection Can and Cannot Tell You

| Finding | Conclusion |
|---------|------------|
| Burn marks on connectors | Condemn — do not use |
| Bulging capacitors | Condemn — unit is failing |
| Melted PCIe or CPU connector | Condemn — fire risk |
| Heavy dust accumulation | Clean and retest; may be overheating |
| No visible damage | Cannot rule out failure — continue testing |

Visual inspection is definitive when you find damage. A burned 24-pin connector or a bulging cap is all the evidence you need to discard the unit. When there's no visible damage, you need to go further.

## Method 2 — The Paper Clip Test

The paper clip test (sometimes called the "PSU jumper test") lets you power on the PSU without it being connected to a motherboard. It tests basic power delivery — that the unit can turn on and produce output.

**What you need**: A single wire bent into a U-shape, or a paper clip bent straight. A standard safety pin also works.

**Step-by-step:**

1. Unplug the PSU from all components.
2. Locate the **24-pin ATX connector** (the large plug that goes to the motherboard).
3. Looking at the connector with the locking tab facing up, find **pin 16** (PS_ON — green wire) and **pin 17** (COM — black wire). On most standard connectors, the green wire is near the middle of the top row.
4. Insert the bent paper clip or wire to bridge pin 16 (green) to any pin 17 (black/ground).
5. Plug the PSU back into the wall and flip the PSU power switch on.
6. The PSU fan should spin. If you have a fan connected to a Molex connector, it should also spin.

**What this test proves**: The PSU can turn on and produce enough output to spin a fan. The over-voltage protection, under-voltage protection, and soft-start circuitry are functioning at a basic level.

**What this test does NOT prove**: It tells you nothing about voltage accuracy under load, ripple, or whether the PSU will behave correctly when a GPU and CPU are drawing heavy current simultaneously. A PSU can pass the paper clip test and still cause system instability under real load.

## Method 3 — Multimeter Voltage Test at Each Rail

A basic digital multimeter — a **Cen-Tech** or **AstroAI AM33D** from under $20 will do — lets you measure actual DC voltages at each rail. This is significantly more informative than the paper clip test.

**Acceptable voltage tolerances (ATX specification):**

| Rail | Nominal | Minimum | Maximum |
|------|---------|---------|---------|
| 12V | 12.0V | 11.4V | 12.6V |
| 5V | 5.0V | 4.75V | 5.25V |
| 3.3V | 3.3V | 3.135V | 3.465V |
| -12V | -12.0V | -10.8V | -13.2V |
| 5VSB | 5.0V | 4.75V | 5.25V |

**How to measure:**

1. Set your multimeter to DC Voltage mode (the setting with a V and a straight line).
2. Use the paper clip method above to power on the PSU outside the system, or measure with the PSU connected to the motherboard and the system running.
3. **For a Molex connector**: Insert the red probe into the yellow wire cavity (12V) and the black probe into the black wire cavity (ground). Read the voltage.
4. **For the 24-pin connector**: Yellow pins are 12V, red pins are 5V, orange pins are 3.3V. Black pins are ground. Carefully probe each.
5. Record each reading. Compare to the tolerances above.

A reading of 11.8V on the 12V rail at idle isn't a crisis. A reading of 11.2V — which is outside spec — signals a problem, especially if it drops further under load. Anything out of tolerance at idle almost certainly gets worse when the system is stressed.

## Method 4 — Windows Power Plan Test

This is a quick behavioral test that creates a load spike to expose marginal PSUs.

1. Open **Control Panel → Power Options**.
2. Switch your power plan to **High Performance**. This prevents the CPU from downclocking and keeps it drawing more steady power.
3. Open a CPU-intensive application (a large video encode, a game, or even a browser with many tabs).
4. Watch for system instability — unexpected reboots, freezes, or graphical artifacts.
5. If the system runs stably for 15–20 minutes under this light load but crashes under heavier load, the PSU is struggling under peak current demand.

This test isn't precise, but it reliably exposes PSUs that are significantly undersized or have weak 12V rail regulation.

## Method 5 — Full Load Test with Prime95 and FurMark

This is the most realistic stress test you can run without dedicated equipment. It hammers both the CPU and GPU simultaneously, pushing total system draw to near-maximum.

**Step-by-step:**

1. Download **Prime95** (mersenne.org) and **FurMark** (geeks3d.com/furmark). Both are free.
2. Before starting, open **HWiNFO64** and navigate to the Sensors view. Look for CPU voltage, GPU voltage, and any PSU voltage monitoring your motherboard reports on the 12V rail.
3. Start Prime95. Select **"Torture Test" → "Blend"**. This stresses both CPU and RAM.
4. While Prime95 is running, launch FurMark. Start the **GPU Stress Test** at your native resolution.
5. Run both simultaneously for at least **20–30 minutes**.
6. Watch HWiNFO64 throughout. Look for the 12V rail dropping below 11.4V. Look for voltage fluctuations larger than ±0.3V. Watch GPU core voltage for sags.

### What to Watch in HWiNFO64

| Symptom | Likely Cause |
|---------|-------------|
| 12V drops below 11.4V under load | PSU 12V rail weak or undersized |
| System crashes/restarts during test | PSU can't sustain load, OCP triggered |
| Voltage fluctuates ±0.5V or more | Poor voltage regulation, aging caps |
| Stable voltages throughout | PSU is likely healthy |
| GPU throttles unexpectedly | May be PSU power limit, check GPU power draw |

A quality PSU like the **Seasonic Focus GX-850** or **Corsair RM850x** will hold the 12V rail within 0.2V of nominal even under combined CPU+GPU stress. A failing unit often drops noticeably.

## Method 6 — Swap with a Known-Good Unit

This is the definitive test and the one I should have done earlier when troubleshooting my reboot problem. Borrow a working PSU of sufficient wattage — from a spare system, a friend, or a local PC shop — and install it in place of the suspect unit.

Run the same load test. If the instability disappears, the original PSU is the problem. If the instability persists with a known-good PSU, the fault lies elsewhere.

There's no ambiguity in this result. All other methods produce evidence; this method produces a verdict.

## Audio Red Flags

Your ears are a useful diagnostic tool. Two sounds specifically indicate PSU problems:

**Coil whine from the PSU**: A high-pitched whine or buzz that changes frequency with system load. Some coil whine from the PSU is normal at low loads, but loud or persistent coil whine can indicate components operating outside their designed parameters. If the whine is new and accompanied by instability, take it seriously.

**Clicking or crackling sounds**: A clicking or irregular sound from inside the PSU — not the fan — indicates a component under mechanical stress or an impending failure of a relay or inductor. This warrants immediate shutdown and inspection.

A fan grinding or bearing noise from the PSU is a separate issue — it won't necessarily cause voltage problems immediately, but a failed PSU fan causes the unit to overheat and trigger thermal shutdown or premature failure of capacitors.

## When Visual Inspection Alone Is Enough to Condemn a PSU

You don't need to run any further tests in these situations:

- **Burn marks** on any connector, cable, or PCB surface
- **Melted plastic** on any connector
- **Bulging or leaking capacitors** (visible through the fan grill)
- **The unit makes a pop or bang** when powered on
- **A burning smell** when powered on, even briefly
- **Visible arcing marks** near the IEC inlet or power switch

These are all signs of catastrophic or impending failure. No further testing is needed — replace the unit and inspect the components it was connected to for secondary damage.

---

## FAQ

**Can a PSU fail suddenly or does it always give warning signs?**
Both happen. Some PSUs fail gradually — coil whine gets louder, voltages drift slowly — giving you time to catch it. Others fail abruptly with no warning. A PSU that was running fine yesterday can short internally overnight. This is why having a second known-good PSU available is valuable for diagnosis.

**Is it safe to run the paper clip test at home?**
Yes, with the proper precautions: power off and unplug before handling connectors, and never bridge pins with the unit live. Once the paper clip is inserted, plug in and turn on. Don't probe inside the unit while it's live.

**What's the minimum multimeter quality needed for PSU testing?**
Any meter with DC voltage accuracy within ±1% is fine. A cheap $15–20 meter from Amazon or a hardware store is adequate for reading PSU rails, since you're looking for deviations of 5% or more from nominal.

**How do I tell if a PSU is undersized vs failing?**
An undersized PSU droops under load but recovers at idle. A failing PSU shows erratic voltage behavior — spikes, drops, or instability even at moderate loads. Use HWiNFO64 during the stress test to observe the pattern.

**Does a PSU get worse over time even without visible failure?**
Yes. Electrolytic capacitors degrade over years of use, especially in hot environments. A PSU that performed perfectly for five years may start showing marginal voltage regulation by year seven or eight. This is normal aging, and it's why older units in high-power builds deserve periodic voltage checks.

**Can a bad PSU damage other components?**
Yes. An over-voltage event — which can happen when protective circuitry fails — can damage the motherboard, GPU, RAM, and storage. Under-voltage is less likely to cause immediate hardware damage but can cause data corruption on SSDs if the system crashes mid-write. Investing in a quality PSU with solid protection circuits is real component insurance.

**Should I keep the old PSU after replacing it?**
If it passed all tests and the swap was just exploratory, yes — keep it as a spare for future diagnostics. If it showed clear signs of failure, don't reuse it. A failing PSU reintroduced into another system will eventually cause the same problems.
