---
title: What to Do When Your PC Overheats
meta_description: "Learn what to do when your PC overheats: identify thermal throttling, clean heatsinks, repaste CPUs, tune fan curves, and diagnose AIO pump failures."
date: 2026-07-28T00:00:00.000Z
category: Cooling
tags:
  - Overheating
  - Thermals
  - Cooling
  - Troubleshooting
author: daniel-osei
keywords:
  - "what to do when your pc overheats"
  - "pc overheating fix"
  - "cpu temperature too high"
  - "how to cool down a hot pc"
  - "gpu thermal throttling fix"
image: "/images/posts/best-cpu-cooler-for-ryzen-7-7800x3d.jpg"
---

![Hero Image](/images/posts/best-cpu-cooler-for-ryzen-7-7800x3d.jpg)

Knowing **what to do when your pc overheats** protects your processor and graphics card from permanent thermal wear while eliminating stuttering in modern games. Watching your computer freeze during a heavy render or shut off without warning triggers immediate frustration. Fortunately, excessive heat is one of the most common and solvable hardware issues you can encounter.

With the right diagnostic approach and a little patience, resolving cooling problems is straightforward. This complete troubleshooting roadmap explains what to do when your pc overheats, covering temperature monitoring, dust removal, thermal paste application, and fan profile tuning.

---

## Table of Contents
- [Identifying High Temperatures with HWiNFO64](#identifying-high-temperatures-with-hwinfo64)
- [CPU vs. GPU Overheating Symptoms](#cpu-vs-gpu-overheating-symptoms)
- [Modern Temperature Thresholds: How Hot Is Too Hot?](#modern-temperature-thresholds-how-hot-is-too-hot)
- [Step-by-Step Dust Cleaning Checklist](#step-by-step-dust-cleaning-checklist)
- [Thermal Paste Reapplication and Modern Die Layouts](#thermal-paste-reapplication-and-modern-die-layouts)
- [Diagnosing Liquid Cooler Pump Failures](#diagnosing-liquid-cooler-pump-failures)
- [Custom Fan Curves and Case Airflow Optimization](#custom-fan-curves-and-case-airflow-optimization)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Related Guides](#related-guides)

---

## Identifying High Temperatures with HWiNFO64

Before disassembling cooling fans, measure your actual operating temperatures under load using the [HWiNFO64 Diagnostic Utility](https://www.hwinfo.com/). Guessing thermal levels by touching the exterior chassis is ineffective.

Download HWiNFO64 and launch it in Sensors-only mode. You will see real-time readouts covering CPU core temperatures, package power, GPU hotspot temperatures, and motherboard VRM sensors. Run a stress test like Cinebench for the CPU or a demanding game loop for the graphics card:

- **Thermal Throttling Columns:** In HWiNFO64, monitor the CPU Thermal Throttling and GPU Thermal Throttling rows. If these sensors switch to "Yes", your hardware is actively downclocking itself to avoid hardware damage.
- **Clock Speed Drops:** When throttling occurs, core clock frequencies collapse below their advertised base clocks, creating frame rate drops and micro-stuttering.

---

## CPU vs. GPU Overheating Symptoms

Different PC components overheat for distinct reasons:

- **CPU Overheating:** Usually stems from dried thermal interface material, an undersized air cooler, improper mounting bracket tension, or an unpeeled plastic film on the cooler cold plate. On modern [Intel](https://www.intel.com) processors, uncapped motherboard power limits also drive extreme package temperatures. CPU overheating causes system-wide micro-stuttering and sudden thermal shutdowns.
- **GPU Overheating:** Typically occurs when dust clogs heatsink fin stacks or when restricted case intakes trap warm exhaust around the card. High-end graphics cards consume 250W to 450W of power, requiring active chassis airflow to stay cool. GPU thermal throttling manifests as severe frame rate drops during gaming.

---

## Modern Temperature Thresholds: How Hot Is Too Hot?

Modern processor architectures operate hotter by design than older monolithic chips:

- **AMD Ryzen 7000 and 9000 Processors:** Engineered to boost dynamically until reaching their 95°C TJMax limit under sustained rendering workloads. On the Ryzen 7 7800X3D, the maximum limit is 89°C due to 3D V-Cache positioning, while the 9800X3D supports 95°C.
- **Intel 13th and 14th Gen Processors:** Feature an official TJMax of 100°C. Heavy multi-threaded rendering regularly pushes high-end chips into the 90°C to 98°C range before emergency thermal protection activates at 105°C.
- **Mainstream 65W Desktop Processors:** Chips like the Ryzen 5 5600 or Core i5-12400 should remain between 65°C and 78°C under load. Temperatures above 85°C on these processors indicate inadequate cooling.
- **Graphics Card Core and Hotspot:** GPU core temperatures should stay below 80°C. GPU hotspot and memory junction sensors can safely hit 90°C to 95°C, but sustained readings exceeding 105°C require immediate maintenance.

---

## Step-by-Step Dust Cleaning Checklist

Dust accumulation is the primary cause of thermal creep over months of regular computer operation. Compressed dust forms an insulating blanket that blocks airflow across metal heatsink fins:

1. **Power Down Completely:** Unplug the PC from the wall and relocate the chassis to a well-ventilated workspace.
2. **Use Compressed Air Safely:** Apply short, controlled bursts of compressed air through radiator fins and heatsinks. Never hold the canister upside down to avoid spraying liquid propellant.
3. **Hold Fan Blades Steady:** Place a finger gently against fan blades when spraying them with compressed air. Allowing fans to freewheel rapidly can generate reverse electrical voltage that damages fan headers.
4. **Clean Intake Dust Filters:** Remove and wash nylon dust filters with warm water, ensuring they are bone-dry before reinstalling them.

---

## Thermal Paste Reapplication and Modern Die Layouts

Thermal compound fills microscopic imperfections between the CPU integrated heat spreader and the cooler copper base. Over years of thermal cycling, paste dries and cracks:

1. **Clean Surfaces Thoroughly:** Use 99% isopropyl alcohol and lint-free wipes to clean residual compound from both the processor and cooler cold plate.
2. **Apply Appropriate Patterns:** For Intel LGA1700 processors, the elongated rectangular package benefits from a five-dot pattern or vertical line. For AMD AM5 processors with off-center compute dies, use a five-dot X pattern to guarantee coverage over active cores.
3. **Tighten Screws in an Alternating Pattern:** Fasten cooler mounting screws in an X-pattern to ensure balanced clamping pressure across the processor package.

---

## Diagnosing Liquid Cooler Pump Failures

If your CPU shoots from room temperature to 100°C within 30 seconds of turning on the PC, your thermal paste is not the problem. This rapid temperature spike indicates an All-In-One (AIO) liquid pump failure:

- **The Tube Touch Test:** Carefully touch both rubber coolant hoses while the system runs. In a functioning loop, liquid circulates quickly and both tubes feel uniformly warm. If one hose feels scalding hot while the other stays cold, coolant has stopped circulating entirely.
- **Pump RPM Verification:** Check the AIO pump header in BIOS or HWiNFO64. A working pump motor runs between 2,200 and 3,500 RPM. A reading of 0 RPM signals a dead impeller motor or disconnected power cable.
- **Preventing Air Bubbles:** The top radiator tank must always sit physically higher than the CPU pump block to prevent trapped air bubbles from starving the pump impeller.

---

## Custom Fan Curves and Case Airflow Optimization

Factory motherboard fan profiles often prioritize silence over thermal performance. Setting custom fan curves inside the BIOS keeps temperatures stable:

- **CPU Fan Curve:** Configure case and cooler fans to run at 50% speed around 60°C, ramping up to 100% when temperatures hit 80°C.
- **Positive Case Pressure:** Install more intake fans than exhaust fans to draw air through filtered openings, preventing dust from entering unfiltered chassis cracks.
- **Cable Management:** Secure loose power cables behind the motherboard tray to maintain an open airflow path from front intake fans directly to the graphics card and CPU cooler.

Understanding what to do when your pc overheats helps you maintain healthy operating temperatures and extend the lifespan of your gaming hardware.

---

## Frequently Asked Questions

### Is 85°C dangerous for a CPU while gaming?
Modern processors can safely operate at 85°C during intense gaming loads. However, if your CPU regularly exceeds 90°C while gaming, improving case airflow or repasting your cooler is recommended.

### How often should thermal paste be replaced?
High-quality thermal paste typically lasts between three and five years. You only need to replace it sooner if you notice creeping thermal throttling or if you remove your CPU cooler.

### Can high temperatures permanently damage a graphics card?
Modern GPUs feature automatic thermal protection mechanisms that downclock or shut down before reaching destructive temperatures. However, sustained excessive heat degrades thermal pads and solder joints over long periods.

### Why does my PC shut down suddenly while playing games?
Sudden shutdowns without blue screen errors usually indicate the CPU or GPU reached emergency thermal cutoff limits, or the power supply tripped over-temperature protection under sustained heat.

---

## Related Guides

- [How to Fix High CPU Usage in Windows](/posts/how-to-fix-high-cpu-usage/)
- [How to Diagnose a Random PC Reboot Without Losing Your Mind](/posts/how-to-diagnose-a-random-reboot/)
- [Signs Your Motherboard Is Failing](/posts/signs-your-motherboard-is-failing/)
- [Why Case Airflow Matters More Than People Think](/posts/why-case-airflow-matters-more-than-people-think/)
- [The Difference Between Air Cooling and Liquid Cooling](/posts/the-difference-between-air-cooling-and-liquid-cooling/)
