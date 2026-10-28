---
title: "How to Test a Power Supply Without Expensive Tools"
meta_description: "Learn how to test a power supply without expensive tools. Perform the paper clip jumper test, verify multimeter pin voltages, and run load stress tests."
date: 2026-07-07T00:00:00.000Z
category: "Power"
tags:
  - "PSU"
  - "Power Supply"
  - "Testing"
  - "Hardware"
keywords:
  - "how to test a power supply"
  - "psu paperclip test guide"
  - "test psu with multimeter voltages"
  - "diagnose faulty power supply symptoms"
author: "daniel-osei"
image: "/images/posts/best-psu-for-rtx-5080.jpg"
---

![Hero Image](/images/posts/best-psu-for-rtx-5080.jpg)

Learning **how to test a power supply** safely at home is one of the most effective troubleshooting techniques in desktop diagnostics. When a PC experiences random restarts, sudden freezes, or refuses to power on entirely, users frequently blame memory modules, graphics drivers, or corrupted Windows installations.

In reality, an unstable power supply produces symptoms that mimic almost every other hardware failure. Electrical voltage rails sagging under peak gaming loads cause processors to crash silently without leaving blue screen logs.

Mastering how to test a power supply requires visual inspection, performing the 24-pin paper clip jumper test, measuring DC rail voltages with a budget multimeter, and executing controlled software load tests.

## Table of Contents
- [Visual Physical Inspection and Safety Warnings](#visual-physical-inspection-and-safety-warnings)
- [The Paper Clip Jumper Test and Zero-RPM Fans](#the-paper-clip-jumper-test-and-zero-rpm-fans)
- [Multimeter Voltage Verification and Power Good Signal](#multimeter-voltage-verification-and-power-good-signal)
- [Transient Load Testing with OCCT Power Stress](#transient-load-testing-with-occt-power-stress)
- [Real-World Voltage Telemetry with HWiNFO64](#real-world-voltage-telemetry-with-hwinfo64)
- [Hardware Isolation with Known-Good Swaps](#hardware-isolation-with-known-good-swaps)
- [Frequently Asked Questions](#frequently-asked-questions)

---

## Visual Physical Inspection and Safety Warnings

Before connecting test equipment, conduct a five-minute visual inspection to check for physical evidence of failure:

1. **Power Down Completely:** Turn off the power supply rocker switch, unplug the AC power cord from the wall outlet, and wait 60 seconds for internal capacitors to bleed off residual energy.
2. **Inspect Connectors for Thermal Scorching:** Check your 24-pin ATX, 8-pin EPS CPU, and 12V-2x6 PCIe power cables. Discolored nylon housings, charred pins, or melted plastic indicate high electrical resistance. Never reuse a power cable showing thermal damage.
3. **Inspect Internal Components via Flashlight:** Shine a bright light through the rear honeycomb ventilation grille. Look for swollen cylindrical capacitors whose aluminum tops appear convex or crusty with brown residue.

> [!CAUTION]
> **Never open a computer power supply casing.** The primary bulk capacitors store upwards of **400 Volts Direct Current (DC)**. This lethal electrical charge remains trapped for days after disconnecting the unit from the wall. Touching an exposed solder trace or internal lead can cause severe electrical burns, nerve damage, or fatal ventricular fibrillation.

## The Paper Clip Jumper Test and Zero-RPM Fans

The paper clip test allows you to jump-start a power supply without connecting it to a motherboard, verifying that its internal standby circuitry (+5VSB) and primary switching circuits can engage:

1. Disconnect all power cables from your motherboard, graphics card, and storage drives.
2. Locate the 24-pin ATX main connector. With the plastic retention latch facing up, identify the single **green wire (Pin 16, PS_ON#)** and any adjacent **black wire (Pin 15, 17, or 18, Ground)**.
3. Bend a standard metal paper clip into a U-shape and insert one end into Pin 16 and the other into Ground.
4. Plug the AC wall cord in and flip the power rocker switch to ON (I).

```
+-----------------------------------------------------------------------+
|                    24-PIN ATX JUMPER PINOUT GUIDE                     |
+-----------------------------------------------------------------------+
|  Pin 16: PS_ON# (Green Wire)  ──► Short together with paper clip      |
|  Pin 17: Ground (Black Wire)  ──► Completes turn-on circuit           |
+-----------------------------------------------------------------------+
|  THE ZERO-RPM FAN TRAP:                                               |
|  Many modern power supplies feature a semi-passive Hybrid/Eco switch. |
|  If active, the fan remains COMPLETELY STOPPED at idle even when on!  |
|  Switch Eco Mode to OFF or attach a sacrificial 12V fan to verify.    |
+-----------------------------------------------------------------------+
```

Passing the paper clip test only confirms that the power supply can turn on without a load; it provides zero evidence that the unit can maintain clean voltage when your GPU pulls 300 watts.

## Multimeter Voltage Verification and Power Good Signal

A digital multimeter lets you test exact DC voltage tolerances across every critical rail as specified by [Intel](https://www.intel.com) ATX design standards:

Set your multimeter dial to **DC Voltage (20V range)**. With the unit running via the paper clip jumper, place the black probe into any black Ground pin and test colored pins with the red probe:

| Voltage Rail | Wire Color | Nominal Target | Minimum Safe (-5%) | Maximum Safe (+5%) |
| :--- | :--- | :--- | :--- | :--- |
| **+12V Rail** | Yellow | +12.00V | **11.40V** | **12.60V** |
| **+5V Rail** | Red | +5.00V | **4.75V** | **5.25V** |
| **+3.3V Rail** | Orange | +3.30V | **3.14V** | **3.47V** |
| **+5VSB (Standby)** | Purple (Pin 9) | +5.00V | **4.75V** | **5.25V** |
| **PWR_OK (Power Good)** | Gray (Pin 8) | +5.00V | **+2.4V (Logic High)** | **+5.25V** |

### Testing the Power Good (PWR_OK) Signal
When internal circuits stabilize, the power supply supervisory chip sends a +5V logic signal down Pin 8 (Gray wire) called **PWR_OK**. The ATX specification dictates that this delay (timing parameter T3) must measure between 100 ms and 150 ms on modern ATX 3.0 platforms. If this signal fails to rise, the motherboard locks the CPU in an endless RESET loop—leaving fans spinning with no POST display.

## Transient Load Testing with OCCT Power Stress

Modern graphics cards generate millisecond transient power spikes reaching up to double their rated TDP. If a power supply has degraded output filtering capacitors, these sudden power spikes trip Over-Current Protection (OCP), causing an immediate black-screen shutdown:

1. Download [OCCT](https://www.ocbase.com) software.
2. Select the **Power** test module, which simultaneously generates AVX multi-core processor instructions and 3D graphics rendering.
3. Execute the stress test for 15 minutes while observing voltage graphs.
4. If your desktop shuts down instantly within seconds of starting the test—yet passes isolated CPU and GPU tests individually—your power supply cannot handle combined transient excursions.

## Real-World Voltage Telemetry with HWiNFO64

If your desktop boots into Windows with the suspect power supply, software sensor polling records real-world electrical behavior under load:

1. Launch [HWiNFO](https://www.hwinfo.com) in Sensors-only mode and navigate to your motherboard Super I/O chip sensor section.
2. Monitor the **+12V, +5V, and +3.3V** voltage rows across Current, Minimum, and Maximum columns.
3. Launch a heavy graphical workload like Cyberpunk 2077 or 3DMark Time Spy.
4. Let the test run for 15 minutes:
   - **Healthy Unit:** The +12V rail sags by no more than 0.15V to 0.25V under load.
   - **Defective Unit:** If the +12V rail sags below **11.40V**, the voltage regulation circuitry is failing. If the system crashes with **Kernel-Power Event ID 41**, the power supply tripped internal protection circuits under peak load.

## Hardware Isolation with Known-Good Swaps

The definitive method to resolve ambiguous diagnostic symptoms is swapping the suspect unit with a known-good power supply from another desktop.

Install the verified working unit and run the same combined CPU and GPU stress tests. If system instability disappears completely, your original power supply was the culprit.

Mastering how to test a power supply gives you the confidence to pinpoint hardware failures quickly, saving time and money on unnecessary component replacements.

## Frequently Asked Questions

### What is the quickest way when learning how to test a power supply?
The quickest initial test is the 24-pin paper clip jumper test, which shorts Pin 16 (Green PS_ON#) to Ground (Black) to verify that internal switching circuits can engage.

### Why does my PSU fan not spin during the paper clip test?
Many modern high-efficiency power supplies feature a semi-passive zero-RPM fan mode. When this feature is active, cooling fans remain stationary under zero load. Toggle the Eco/Hybrid switch to normal mode or check voltage output with a multimeter.

### What is the safe voltage range for the +12V rail on a PC power supply?
According to the Intel ATX specification, the +12V rail must remain within ±5% tolerance (between 11.40V and 12.60V). If your +12V rail sags below 11.40V under heavy gaming loads, replace the power supply immediately.

### Can a failing power supply cause random game crashes without shutting down the PC?
Yes. If internal filtering capacitors degrade, excessive electrical ripple voltage enters motherboard VRMs and graphics card silicon, triggering game crashes, driver timeouts, and blue screens that appear identical to software bugs.

---

## Related Guides

- [How to Choose the Right PSU for Your Build](/posts/how-to-choose-the-right-psu-for-your-build/)
- [How to Read a PSU Spec Sheet Without Getting Confused](/posts/how-to-read-a-psu-spec-sheet/)
- [How to Spot a Bad Power Supply Before You Buy It](/posts/how-to-spot-a-bad-power-supply-before-you-buy-it/)
- [When to Replace a Power Supply Instead of Troubleshooting It](/posts/when-to-replace-a-power-supply-instead-of-troubleshooting-it/)
- [Best PSU for RTX 5080: Wattage Requirements and Top Picks](/posts/best-psu-for-rtx-5080/)
