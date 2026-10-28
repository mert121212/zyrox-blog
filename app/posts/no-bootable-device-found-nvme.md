---
title: "How to Fix No Bootable Device Found on NVMe SSD"
meta_description: "Fix 'No Bootable Device Found' on your new NVMe SSD. Resolve BIOS boot priorities, UEFI vs CSM modes, MBR to GPT conversion, and Intel VMD settings."
date: 2026-07-09T00:00:00.000Z
updated: 2026-10-28
category: "Hardware Troubleshooting"
tags:
  - "NVMe SSD"
  - "BIOS"
  - "UEFI"
  - "Boot Error"
  - "Windows Troubleshooting"
keywords:
  - "no bootable device found on nvme ssd"
  - "m2 ssd not showing in bios boot priority"
  - "fix boot error after installing new ssd"
  - "uefi csm settings for nvme drive"
author: "sara-vance"
image: "/images/posts/best-ssd-for-gaming-2026.jpg"
hide_verdict: true
---

![Hero Image](/images/posts/best-ssd-for-gaming-2026.jpg)

Discovering an error stating **no bootable device found on nvme ssd** drives is one of the most stressful experiences following a hardware storage upgrade. You carefully slot your new M.2 drive into the motherboard, tighten the retention screw, power on your desktop, and receive an abrupt black screen error stating that your operating system has vanished.

In the vast majority of cases, your new drive is completely functional. Modern solid-state drives communicate through high-speed PCIe lanes that require specific UEFI firmware protocols, partition tables, and motherboard lane configurations that older SATA drives never demanded.

Resolving the error stating no bootable device found on nvme ssd hardware requires verifying physical M.2 pin seating, disabling legacy CSM compatibility modes, converting legacy MBR partition tables to modern GPT, and repairing the Windows EFI bootloader.

## Why Your Motherboard Fails to Boot the New NVMe Drive

When you install an M.2 NVMe solid-state drive, several architectural conflicts can interrupt the standard initialization process:

- **UEFI vs Legacy CSM Mode Conflict:** Older mechanical hard drives and SATA SSDs frequently used legacy BIOS (CSM) boot modes. In contrast, modern NVMe drives strictly require pure Unified Extensible Firmware Interface (UEFI) initialization. If CSM remains active, the motherboard cannot hand over execution to the NVMe storage controller.
- **Missing or Corrupted EFI System Partition:** If you cloned an existing Windows installation using basic disk imaging software, the utility may have copied your primary `C:` drive partition while omitting the hidden 100MB FAT32 EFI boot partition.
- **MBR vs GPT Partition Mismatch:** Legacy disks format partitions using Master Boot Record (MBR). Pure UEFI bootloaders only recognize GUID Partition Table (GPT) formatting.
- **Intel VMD Storage Controller Masking:** Modern Intel 11th through 14th Gen platforms enable Intel Volume Management Device (VMD) by default, hiding raw NVMe drives from standard Windows bootloaders unless custom storage drivers are loaded.

```
+-----------------------------------------------------------------------+
|                    NVMe BOOT TROUBLESHOOTING PROTOCOL                 |
+-----------------------------------------------------------------------+
|  1. PHYSICAL LAYER: Reseat M.2 drive firmly at 30° angle into socket  |
|  2. FIRMWARE MODE:  Set BIOS Boot Mode strictly to UEFI (Disable CSM) |
|  3. STORAGE DRIVER: Disable Intel VMD / RST in BIOS if unconfigured   |
|  4. PARTITION MAP:  Convert legacy MBR to GPT using mbr2gpt utility   |
|  5. BOOTLOADER:     Rebuild EFI structure using bcdboot command       |
+-----------------------------------------------------------------------+
```

## Step 1: Physical Verification and Motherboard Lane Sharing

Before adjusting software settings, confirm that your physical hardware installation meets electrical requirements:

1. **Reseat the M.2 Drive:** Modern M.2 connectors must enter the slot at a distinct 30-degree upward angle. Press the gold contact pins firmly into the socket until the notch sits flat against the mounting standoff before fastening the retention screw. An incompletely seated drive can power its internal LED while failing to initialize PCIe data pins.
2. **Check Motherboard M.2 Lane Sharing:** Review your motherboard manual carefully. On many mid-range chipsets, populating the second or third M.2 slot automatically disables SATA ports 5 and 6 or bifurcates bottom PCIe slots. If your secondary boot drive was connected to a disabled SATA port, your PC will report a boot failure.
3. **Execute a Hard CMOS Discharge:** Unplug the power supply from the wall outlet and hold the front power button for ten seconds to drain residual energy. Adding a new PCIe device can confuse automated resource allocation; resetting CMOS forces motherboard firmware to map hardware buses cleanly.

## Step 2: Confirming BIOS Hardware Detection

Reboot your computer while repeatedly tapping `Delete` or `F2` to enter your motherboard BIOS setup:

- Navigate to the **Storage Configuration** or **NVMe Configuration** menu.
- Verify whether the motherboard displays your exact SSD model string (e.g., Samsung SSD 990 PRO 2TB or WD_BLACK SN850X).
- If the drive does not appear in hardware inventory lists, test the drive in a secondary M.2 slot or update your motherboard BIOS firmware, as ancient BIOS releases often lack microcode support for modern 4TB NVMe drives.

## Step 3: Configuring UEFI and Disabling Legacy CSM

If your hardware is detected in the storage inventory but absent from the boot priority list, an active Compatibility Support Module (CSM) is almost certainly the cause:

1. Navigate to the **Boot** menu in your BIOS.
2. Locate **CSM (Compatibility Support Module)** and set it to **Disabled**.
3. Set your **Boot Mode** strictly to **UEFI Only**.
4. Enable **Secure Boot** if installing Windows 11.
5. Save changes (`F10`) and restart.

NVMe drives interface with the operating system through the PCIe bus rather than legacy AHCI SATA controllers. Switching your platform to pure UEFI allows motherboard firmware to search for the standardized `\EFI\Boot\bootx64.efi` file structure.

## Step 4: Disabling Intel VMD Controller (For Intel Platforms)

On Intel 11th, 12th, 13th, and 14th Gen systems from [Intel](https://www.intel.com), a proprietary storage layer known as **Intel VMD (Volume Management Device)** causes widespread boot failures:

- If enabled in BIOS without corresponding Intel Rapid Storage Technology (RST) drivers installed into Windows, the operating system kernel cannot communicate with the NVMe storage bus, throwing an `INACCESSIBLE_BOOT_DEVICE` blue screen or reporting no boot device.
- In your BIOS Advanced menu, search for **VMD Setup Menu** or **Intel Rapid Storage Technology** and set it to **Disabled**. This switches your M.2 slots back to standard AHCI/NVMe passthrough mode, allowing Windows to boot natively.

## Step 5: Fixing the MBR Cloning Trap with mbr2gpt

If you cloned an older Windows installation from a SATA drive directly onto your new NVMe drive, you likely copied a legacy MBR partition table that pure UEFI mode cannot launch:

1. Insert a bootable Windows installation USB drive and boot from it.
2. On the initial setup screen, press `Shift + F10` to open an administrative Command Prompt.
3. Validate and convert your disk non-destructively:
   ```cmd
   mbr2gpt /validate /disk:0
   mbr2gpt /convert /disk:0
   ```
This built-in tool from [Microsoft](https://learn.microsoft.com) automatically shrinks your primary OS partition by 100MB, creates a clean FAT32 EFI System Partition, and writes fresh UEFI boot files without touching your documents or applications.

## Step 6: Rebuilding Corrupted UEFI Bootloader Files

If the EFI partition exists but boot files became corrupted during disk cloning, rebuild your boot configuration directly:

1. From the Windows installer Command Prompt, open Diskpart:
   ```cmd
   diskpart
   list volume
   ```
2. Locate the small **100MB to 260MB FAT32 volume**. Select it and assign it a temporary drive letter:
   ```cmd
   select volume 3
   assign letter=S:
   exit
   ```
3. Generate fresh, uncorrupted UEFI boot structures from your Windows installation:
   ```cmd
   bcdboot C:\Windows /s S: /f UEFI
   ```
4. Command Prompt will return: **"Boot files successfully created."** Remove your USB flash drive and restart your computer.

Resolving the issue of no bootable device found on nvme ssd hardware restores instant access to your desktop, unleashing full PCIe transfer speeds and smooth boot times.

**Further Reading:** [How to Choose a Good SSD for Video Editing](/posts/how-to-choose-a-good-ssd-for-video-editing/) · [How to Diagnose a Random PC Reboot Without Losing Your Mind](/posts/how-to-diagnose-a-random-reboot/) · [How to Choose the Right SSD for Your System](/posts/how-to-choose-the-right-ssd-for-your-system/)
