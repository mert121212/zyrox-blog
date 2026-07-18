---
title: "How to Choose a Good SSD for Video Editing"
meta_description: "Understand what matters most for video editing storage, including throughput, capacity, and endurance. Here is my honest experience and what you actually need."
date: 2026-07-29
category: "Storage"
tags:
  - "SSD"
  - "Video Editing"
  - "Storage"
  - "Performance"
author: sara-vance
---

I've built editing workstations for other people and for myself, and the storage question always takes longer to answer than people expect. Everyone wants to know which SSD is fastest. The more useful question is which SSD stays fast, handles the write patterns that video editing creates, and lasts long enough to be worth the investment.

Video editing is genuinely hard on storage in ways that gaming and general computing aren't. You're not just reading large files — you're simultaneously reading source footage, writing cache files, writing proxy media, and occasionally exporting. All of that happens concurrently, and it keeps happening for hours. A drive that looks fast in a benchmark can disappoint badly in a real editing session.

## What Makes Video Editing Different from Other Workloads

Three things separate video editing storage from everything else: sequential write intensity, SLC cache exhaustion, and sustained throughput requirements.

**Sequential writes**: Editing generates enormous sequential write traffic. Every time you create proxies, render previews, or export a timeline, the drive absorbs gigabytes or tens of gigabytes in large sequential writes. This is different from gaming (mostly sequential reads) and office work (small random reads and writes). The drive needs to handle sustained sequential writes without slowing down dramatically.

**SLC cache exhaustion**: Most consumer NVMe drives use a portion of their NAND flash as SLC (Single-Level Cell) cache, which enables high initial write speeds — often 3,000–7,000 MB/s burst. But this cache is limited in size. Once it's full, writes slow to the native speed of the TLC or QLC NAND beneath it, which can be as low as 400–800 MB/s on budget drives. For short tasks this never matters. For a 30-minute export on a long-form project, it matters a lot.

**Sustained throughput**: The number on the box reflects peak speed. What counts for editing is the speed the drive maintains after the SLC cache is full. Samsung's 990 Pro sustains around 3,400 MB/s even post-cache. Budget QLC drives can drop to 600 MB/s. That difference is the difference between an export taking 4 minutes or 20 minutes.

## Resolution and Codec Requirements

Different editing scenarios place different minimum demands on storage. Here's a practical guide based on codec and resolution:

| Editing Scenario | Min Sequential Read | Min Sequential Write | Notes |
|---|---|---|---|
| 1080p H.264 (8-bit) | 200 MB/s | 100 MB/s | Any SATA SSD handles this |
| 1080p ProRes 422 | 500 MB/s | 300 MB/s | SATA SSD borderline; NVMe preferred |
| 4K H.265 (10-bit) | 400 MB/s | 200 MB/s | Good SATA SSD works; NVMe better |
| 4K ProRes 422 HQ | 1,200 MB/s | 800 MB/s | NVMe required |
| 4K ProRes 4444 | 1,800 MB/s | 1,200 MB/s | Fast NVMe required |
| 6K/8K RAW (BRAW, R3D) | 2,500 MB/s | 1,500 MB/s | High-end NVMe or RAID required |
| Multi-camera 4K editing | 1,500+ MB/s | 800+ MB/s | Depends on track count |

These are minimums for smooth playback without dropping frames. Working with proxies reduces storage requirements dramatically, but if your workflow depends on native footage editing, these numbers are the floor, not the ceiling.

## Drive Comparison: Samsung 990 Pro vs WD Black SN850X vs Crucial T705

The three drives most commonly recommended for editing workstations right now are the Samsung 990 Pro, the WD Black SN850X, and the Crucial T705. Here's how they compare on the metrics that actually matter for editing:

| Drive | Seq Read | Seq Write | Sustained Write (post-cache) | TBW (2TB) | Price (2TB) |
|---|---|---|---|---|---|
| Samsung 990 Pro 2TB | 7,450 MB/s | 6,900 MB/s | ~3,400 MB/s | 1,200 TBW | ~$150 |
| WD Black SN850X 2TB | 7,300 MB/s | 6,600 MB/s | ~3,000 MB/s | 1,200 TBW | ~$145 |
| Crucial T705 2TB | 14,500 MB/s | 12,700 MB/s | ~3,200 MB/s | 1,200 TBW | ~$170 |

The Crucial T705 dominates peak speeds thanks to its PCIe 5.0 interface — but those peak numbers require a PCIe 5.0 M.2 slot, which only high-end Z790 and X670E motherboards provide. On a PCIe 4.0 slot, the T705 falls back to PCIe 4.0 speeds and loses its advantage entirely.

For most editing workstations, the Samsung 990 Pro is my top recommendation. Its sustained write performance after cache exhaustion is class-leading, it runs cooler than many competitors, and Samsung's consistent firmware quality means fewer surprises over years of use. The SN850X is equally good and worth choosing if you find it on sale.

## OS Drive and Project Drive: Keep Them Separate

This is the single highest-impact workflow change you can make, and it costs very little if you already have two drive bays.

When your operating system, applications, project files, and cache all live on the same drive, they compete for I/O bandwidth. DaVinci Resolve's cache is particularly aggressive — it writes gigabytes of data simultaneously with timeline playback. If that's happening on the same drive that's also serving the OS and application data, you'll feel it.

The setup I recommend:

- **Drive 1 (OS + Applications)**: 500GB–1TB NVMe SSD. Any mid-range drive works here. Samsung 870 EVO (SATA) or WD Blue SN580 (NVMe) are cost-effective choices.
- **Drive 2 (Projects + Media)**: 2TB–4TB high-performance NVMe. This is where the 990 Pro or SN850X belongs.
- **Drive 3 (Media Archive)**: 4TB–8TB SATA SSD or large HDD in a separate enclosure. Speed matters less here since you're not editing from this drive.

DaVinci Resolve, Premiere Pro, and Final Cut Pro all allow you to specify separate cache locations. Point the cache to Drive 2 and keep it on a partition separate from your active project files if possible.

## NVMe vs SATA for Editing: The Real-World Difference

Benchmarks show NVMe drives being 5–10x faster than SATA. In editing, the real-world difference is more nuanced.

For 1080p H.264/H.265 editing, SATA is genuinely fine. A 550 MB/s SATA SSD handles native 4K H.265 footage comfortably. For anything above that — ProRes, RAW, or high-bitrate 4K — NVMe's sustained throughput matters.

The more important distinction isn't peak speed. It's queue depth behavior. NVMe handles deep I/O queues far better than SATA. When Resolve or Premiere is issuing simultaneous reads and writes across multiple tracks, NVMe maintains more consistent performance. SATA drives can stall briefly when I/O queues build up, which shows as dropped frames or timeline hitches.

My rule: If you're editing professionally or regularly work with footage above 4K H.264, NVMe is the correct answer. If you're a hobbyist editing 1080p or 4K H.264 YouTube videos, SATA is sufficient and saves money.

## RAID 0 for Editors: When It Makes Sense

RAID 0 stripes data across two drives, combining their bandwidth. Two 990 Pros in RAID 0 can deliver sequential reads approaching 14 GB/s — enough for 8K RAW editing without breaking a sweat. It sounds attractive.

The catch: RAID 0 doubles failure risk. If either drive fails, all data on both drives is lost. There's no redundancy. This makes RAID 0 acceptable only as a scratch or cache drive with no unique data, or as a project drive with a robust, verified backup.

RAID 0 makes sense in these specific cases:
- As a DaVinci Resolve cache drive (cache is regeneratable, no permanent data loss if it fails)
- For editors working with 6K+ footage who can't afford 10GbE NAS storage
- When paired with a tested backup workflow that runs nightly

RAID 0 does not make sense as your only project drive, as your archive drive, or if you aren't confident your backup system runs reliably.

## TBW and Endurance for Heavy Edit Workflows

TBW (Terabytes Written) is the manufacturer's estimate for total data the drive can write before it reaches end-of-life. A 2TB Samsung 990 Pro has a 1,200 TBW rating.

A heavy editing workflow might write 50–100GB per working day (proxies, cache, exports, project saves). At 100GB/day, five days a week, you're writing 26TB per year. At that rate, a 1,200 TBW drive lasts approximately 46 years — TBW is not a concern for editors at any realistic workload.

Where TBW becomes relevant is on drives with aggressive SLC cache strategies that write data multiple times before committing it to TLC or QLC cells. Budget QLC drives can have write amplification factors of 3x or higher, meaning 100GB of user data might cause 300GB of actual NAND writes. This matters for longevity.

Samsung, WD, and Crucial all publish their drive management algorithms. The 990 Pro and SN850X use intelligent cache management that keeps write amplification low. This is one reason to prefer them over no-name drives that advertise high TBW ratings without explaining how they calculate them.

## Drive Cache Strategy

NVMe drives manage their internal DRAM cache and SLC cache differently, and the strategy affects sustained performance.

Drives with DRAM cache (Samsung 990 Pro, WD Black SN850X, Crucial T705) use the DRAM as a fast lookup table for the mapping between logical and physical addresses. This significantly reduces latency and helps maintain consistent performance under sustained I/O. DRAM-less drives (WD Blue SN580, SK Hynix P31) use Host Memory Buffer (HMB), which borrows system RAM. HMB works well but adds a small latency overhead under heavy I/O.

For editing, always choose a drive with dedicated DRAM cache if you're editing anything above 1080p. The performance difference during concurrent reads and writes is measurable in real editing sessions.

## Capacity Planning for Media Archives

Raw footage accumulates faster than most people plan for. A single day of shooting 4K ProRes 4444 can generate 300–500GB. A feature film project can easily require 10–20TB for raw media alone.

Planning recommendations:
- **Project drive**: Buy twice as much as you think you need. Storage fills up faster than expected when you factor in multiple takes, B-roll, proxies, and rendered previews.
- **Archive drive**: Plan for at least three copies of finished projects (3-2-1 backup rule: 3 copies, 2 different media types, 1 offsite). Backblaze B2 or Amazon S3 Glacier work well as the offsite copy for video files.
- **Cache drive**: Allocate at minimum 500GB for a dedicated Resolve or Premiere cache. 1TB is better if you work on long-form projects.

The cost of storage has never been lower. Running out of space mid-project is always more expensive than buying adequate capacity upfront.

## Frequently Asked Questions

**Do I need a PCIe 5.0 SSD for video editing?**
Not for most workflows. PCIe 5.0 drives like the Crucial T705 deliver impressive peak numbers but their sustained write performance isn't dramatically different from a good PCIe 4.0 drive. Unless you're editing 8K RAW in native resolution, PCIe 4.0 is the practical ceiling.

**How much SSD capacity do I actually need?**
For a working project drive: 2TB minimum, 4TB recommended. For an archive: separate from your project drive, as large as budget allows. Many editors use 2TB NVMe for projects and a 4TB external SSD for archives.

**Is a Samsung 870 EVO still good for editing?**
For 1080p to 4K H.264, yes. At 550 MB/s sequential read and write, it handles those workloads comfortably. For ProRes 422 HQ or above, you'll want NVMe.

**Should I buy an SSD or HDD for media archives?**
SSDs for archives you access regularly, HDDs for long-term cold storage. A 4TB Samsung 870 QVO (SATA SSD) is excellent for active archives. For deep cold storage (footage you might access once a year), HDDs offer better cost-per-gigabyte.

**Does temperature affect editing performance?**
Yes. NVMe drives thermal throttle when they get too hot (typically above 70°C). In sustained editing sessions without adequate cooling, you can trigger throttling that slows writes. A heatsink on your M.2 drive — either a third-party clip-on or the board's included cover — prevents this.

**Is there a difference between Mac and PC SSD recommendations?**
Mac Studio and Mac Pro use proprietary Apple storage that isn't user-upgradeable on recent models. For Macs that support user storage upgrades (Mac Mini, older Mac Pro), the same NVMe recommendations apply. The application behavior (Resolve, Premiere, Final Cut) is the same regardless of OS.

The best SSD for editing isn't the one with the highest number on the box. It's the one that performs consistently through the entire export.


