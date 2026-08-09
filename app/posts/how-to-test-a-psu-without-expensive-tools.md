---
title: How to Test a Power Supply Without Expensive Tools
meta_description: >-
  A practical guide to evaluating a PSU using basic checks, visual inspection,
  and a careful test approach. See the test results to understand the real-world
  impact.
date: 2026-07-07T00:00:00.000Z
category: Power
tags:
  - PSU
  - Power Supply
  - Testing
  - Hardware
author: daniel-osei
keywords:
  - psu
  - power supply
  - testing
  - hardware
  - power
---

![Hero Image](/images/default-hero.jpg)
Last year I spent four days chasing a random reboot problem before I finally pointed the finger at the power supply. The system would run fine for hours, then cut out under load with no BSOD, no warning — just a hard reset. I tested the GPU, reseated RAM, checked thermals, and got nowhere. Swapping the PSU fixed it immediately. The thing that slowed me down was not knowing how to actually test a power supply with the tools I had on hand. This guide covers the full process from visual inspection to load testing, using nothing more expensive than a $15 multimeter.

## Why PSU Testing Gets Overlooked

Power supplies are easy to ignore because they don't show up in benchmark charts or spec sheets. They're also not the first thing that comes to mind when diagnosing instability. But a failing PSU produces symptoms that look exactly like RAM issues, GPU problems, or even software bugs — because when the voltage rails start sagging, any component can misbehave. Testing the PSU early in your diagnostic process saves a lot of time.

## Method 1 — Visual Inspection

The first test costs nothing and takes about five minutes. You're looking for physical evidence of failure.

Power off completely and unplug the PSU from the wall. Wait 30 seconds before opening your case. Look through the PSU fan grill with a flashlight. Check for heavy dust accumulation, which causes overheating, and look closely at the capacitors near the fan. 

Inspect the external connectors, specifically the 24-pin ATX, the EPS CPU, and the PCIe power cables. Look for burn marks, melted plastic, or discolored pins. If you see melted plastic on a PCIe connector, it's a massive fire risk. Do not use that unit again. 

If you are inspecting a dead unit out of warranty and open it up, look for bulging capacitors. The tops should be perfectly flat; if they are domed or leaking fluid, the unit is failing. Look for brown scorch marks on the PCB. Visual inspection is definitive when you find damage, but a visually pristine PSU can still be failing internally.

## Method 2 — The Paper Clip Test

The paper clip test lets you power on the PSU without it being connected to a motherboard. It verifies that the basic power delivery and soft-start circuitry function.

Take a paper clip and bend it into a U-shape. Unplug all cables from your PC components. Locate the 24-pin ATX connector. Looking at the pins with the locking tab facing up, find the green wire (pin 16) and any black ground wire (like pin 17). Insert the paper clip to bridge the green wire to the black wire. 

Plug the PSU into the wall and flip the switch on. The PSU fan should immediately spin up. 

This test proves the PSU can turn on and produce output. It does absolutely nothing to prove that the unit can deliver stable voltages under a heavy gaming load. Passing the paper clip test does not mean the PSU is healthy.

## Method 3 — Multimeter Voltage Test at Each Rail

A basic digital multimeter — a $15 model from the hardware store is fine — lets you measure actual DC voltages at each rail. 

Set your multimeter to DC Voltage mode. With the PSU powered on (either via the paper clip trick or running in the system), probe the connectors. 

The ATX specification has strict tolerances. The 12V rail (yellow wires) must sit between 11.4V and 12.6V. The 5V rail (red wires) must sit between 4.75V and 5.25V. The 3.3V rail (orange wires) must sit between 3.135V and 3.465V. 

Insert the red probe into a yellow wire pin and the black probe into a black ground pin. A reading of 11.8V on the 12V rail at idle is fine. A reading of 11.2V is completely out of spec and signals a serious problem, as it will likely drop even further once your GPU demands power.

## Method 4 — Windows Power Plan Test

This is a quick behavioral test that creates a sustained load to expose marginal PSUs.

Open Control Panel, go to Power Options, and switch your plan to High Performance. This stops the CPU from aggressively downclocking, forcing it to draw more steady power. Open a heavy application or game and use the system normally. 

If the system runs perfectly fine for 20 minutes under a light load but suddenly hard-reboots when you stress it, your PSU is likely struggling to handle peak current demand and is tripping its internal protections.

## Method 5 — Full Load Test with Prime95 and FurMark

This is the most realistic stress test you can run without expensive load-testing hardware. It hammers the CPU and GPU simultaneously, pushing your total system power draw to its absolute limit.

Download Prime95 and FurMark. Open HWiNFO64 and navigate to the Sensors view. Look for the motherboard's 12V rail voltage reading, as well as CPU and GPU voltages. 

Start Prime95 and select the "Blend" torture test. While that's running, launch the FurMark GPU stress test at your native resolution. Let them run together for 20 to 30 minutes. 

Watch HWiNFO64 closely. If the 12V rail drops below 11.4V under this heavy load, your PSU is undersized or failing. If the voltage fluctuates wildly by ±0.5V, the internal regulation is failing. If the system outright crashes or restarts during the test, the PSU could not sustain the load and its Over Current Protection (OCP) saved the system. A high-quality PSU will hold its 12V rail steady, dropping no more than 0.2V under maximum stress.

## Method 6 — Swap with a Known-Good Unit

This is the definitive test. Borrow a working, high-quality PSU from a spare system or a friend, and install it in place of your suspect unit.

Run the same Prime95 and FurMark stress test. If your random reboots and instability completely vanish, your old PSU was the culprit. If the system still crashes with the known-good PSU, the fault lies with your motherboard, RAM, or GPU. There is no ambiguity with a hardware swap; it gives you a final verdict.

## Audio Red Flags

Your ears are excellent diagnostic tools for power supplies.

Listen for severe coil whine. A faint high-pitched buzz under load is normal, but loud, piercing coil whine that just started happening can indicate internal components operating way outside their designed parameters.

Listen for clicking or crackling sounds from inside the unit (unrelated to the fan). This indicates mechanical stress, arcing, or an impending relay failure. If you hear crackling, shut the system down immediately. A grinding fan is less immediately dangerous electrically, but it means the PSU will soon overheat and fail if the fan dies completely.

## When Visual Inspection Alone Is Enough to Condemn a PSU

You do not need to run a multimeter or stress test if you see certain physical signs.

If you see burn marks on any connector, cable, or PCB surface, the unit is dead. If you see melted plastic on a PCIe connector, it's a massive hazard. Bulging or leaking capacitors visible through the fan grill mean the unit is failing. If the unit makes a loud pop, produces a burning smell, or shows visible arcing near the power switch when turned on, unplug it immediately and replace it. No further testing is required.


---

## Related Guides

- [When to Replace a Power Supply Instead of Troubleshooting It](/posts/when-to-replace-a-power-supply-instead-of-troubleshooting-it)
- [How to Choose the Right PSU for Your Build](/posts/how-to-choose-the-right-psu-for-your-build)
- [How to Spot a Bad Power Supply Before You Buy It](/posts/how-to-spot-a-bad-power-supply-before-you-buy-it)
