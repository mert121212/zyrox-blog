---
title: "The Best Way to Organize Your Game Library on an SSD"
meta_description: "A practical approach to keeping a game library tidy, fast, and easy to manage across one or more drives."
date: 2026-07-05
category: "Storage"
tags:
  - "Gaming"
  - "SSD"
  - "Storage"
  - "Organization"
author: sara-vance
---

I have about 200 games in my Steam library. Add Epic, GOG, and EA App titles on top of that and the number climbs even higher. For years I let those games pile up wherever the launcher defaulted, and eventually my 1TB SSD was constantly in the red. Load times got worse. Windows updates started failing because there was no room. I finally sat down and built a real system, and the difference was immediate. This is what I learned.

## How Much Space Do You Actually Need?

Before diving into organization, let's get honest about capacity. Game install sizes have grown dramatically — a modern AAA title like Call of Duty: Modern Warfare III can take up over 200GB by itself once you add updates and packs.

| Drive Size | Realistic Game Capacity | Notes |
|---|---|---|
| 500GB | 8–12 AAA titles | Tight. Constant rotation needed. |
| 1TB | 15–25 AAA titles | Workable with discipline |
| 2TB | 35–55 AAA titles | Comfortable for most large libraries |
| 4TB | 70–100+ AAA titles | Future-proof for collectors |

These numbers assume a mix of large AAA games (~50–80GB each) and smaller indie titles (~2–10GB). If your library skews toward shooters and open-world games, expect lower counts. If you play a lot of indie and older games, the numbers stretch significantly.

My personal sweet spot turned out to be a 2TB NVMe SSD as the primary drive combined with a 4TB HDD for archiving games I haven't touched in six months or more. That two-tier setup changed everything.

## The Two-Tier System: Active vs. Inactive Games

The single most impactful organizational decision I made was separating games into two categories:

**Tier 1 — Active (NVMe SSD):** Games you're currently playing or plan to play within the next few weeks. These benefit from fast load times and quick shader compilation. Think Baldur's Gate 3, Elden Ring, whatever you picked up last week.

**Tier 2 — Archive (HDD):** Games you haven't played in months but don't want to uninstall permanently. The HDD load penalty is noticeable but not a dealbreaker for occasional revisits.

The rule I follow: if I haven't launched a game in 60 days, it moves to the archive drive. Takes about 30 seconds to decide, and it keeps my SSD breathing room healthy.

## Using Steam Storage Manager Step by Step

Steam's built-in Storage Manager is genuinely useful but a lot of people don't know it exists. Here's how to use it properly.

**Step 1: Open Steam Storage Manager**
- Open Steam → Settings → Storage
- You'll see a bar graph of your drive usage, broken down by game

**Step 2: Add a Second Library Location**
- Click the "+" button at the top left of the Storage panel
- Select your second drive (HDD or secondary SSD)
- Steam creates a `steamapps` folder on that drive automatically

**Step 3: Move Games Between Drives**
- In the Storage panel, click on a drive to see installed games
- Check the box next to any game you want to move
- Click "Move" at the bottom of the list
- Select the destination drive
- Steam handles the transfer without re-downloading — files move, not copy

**Step 4: Set a Default Install Location**
- At the top of the Storage panel, set your preferred drive as default
- New installs will go there unless you manually pick otherwise during install

**Step 5: Monitor Usage**
- Check the storage panel monthly
- Steam shows total used, free, and a per-game breakdown
- Sort by size to identify the biggest space consumers quickly

I move 4–5 games to my HDD archive every month this way. It takes less than 10 minutes and keeps my SSD from hitting the danger zone.

## Epic, GOG Galaxy, and EA App Multi-Library Setup

Steam isn't the only launcher you're managing, and the others have their own approaches.

### Epic Games Launcher

Epic doesn't have a built-in "move game" function as polished as Steam's, but it can manage multiple library locations.

1. Go to Epic Games Launcher → Settings → Manage Games → Library Locations
2. Add a new folder on any drive
3. For new installs, click the folder icon during the install step and pick your preferred location
4. To "move" an existing game: uninstall it, change the default library location, reinstall — Epic re-downloads, so this is slow

For Epic specifically, I use the Windows file system workaround (covered below) to move games without re-downloading.

### GOG Galaxy

GOG Galaxy has a proper move feature:
1. Right-click any installed game → Manage Installation → Move
2. Choose the destination folder
3. GOG Galaxy handles the transfer and updates its records automatically

This is clean and reliable. I've moved Cyberpunk 2077 between drives twice without any issue.

### EA App

The EA App (formerly Origin) supports multiple install locations:
1. Go to EA App → Settings → Download
2. Change "Default Install Location" to your preferred drive
3. For existing games: click the three-dot menu on any game → Move Game
4. Select the new location — EA App re-links the installation

The EA App is still maturing but the move function works. Just make sure you have enough space on the destination before you start.

## Junction Points and Symbolic Links for Game Saves

Some games store save files inside the game's install folder rather than in `Documents` or the cloud. When you move those games to an HDD, the saves go with them — which is fine for performance but annoying if you want fast access to saves from multiple drives.

Windows symbolic links (symlinks) solve this elegantly.

**Scenario:** Your game saves are at `D:\HDD\SteamLibrary\steamapps\common\GameName\Saves` but you want them at `C:\Users\YourName\Documents\GameSaves\GameName` for backup purposes.

**Step 1: Create the target folder**
```
mkdir "C:\Users\YourName\Documents\GameSaves\GameName"
```

**Step 2: Move the saves**
Cut and paste the existing `Saves` folder to `C:\Users\YourName\Documents\GameSaves\GameName`

**Step 3: Create the symbolic link (run as Administrator)**
```
mklink /D "D:\HDD\SteamLibrary\steamapps\common\GameName\Saves" "C:\Users\YourName\Documents\GameSaves\GameName"
```

Now the game sees the `Saves` folder exactly where it expects it, but the files actually live on your SSD in a centralized backup location. I use this for a handful of games that don't support cloud saves natively.

**Junction points** work similarly but are slightly different technically. For most game save scenarios, `/D` symlinks are the easier choice.

## Controlling Launcher Cache Locations

Launchers accumulate cache over time and it all lands on your system drive by default.

### Steam Download Cache

Steam's shader and download cache can grow to several gigabytes:
1. Steam → Settings → Downloads → Clear Download Cache (button at the bottom)
2. Do this after large updates finish — it won't break anything
3. Steam → Settings → Shader Pre-Caching → uncheck "Allow background processing" if you want to reclaim space proactively

### Moving Steam's Shader Cache

Shader cache for individual games lives inside `steamapps\shadercache`. If Steam is on your C drive, this can bloat. You can move the entire Steam installation (including shader cache) to another location via Steam → Settings → Storage → right-click your current drive → set a new default and reinstall Steam there.

### Epic Launcher Cache

Epic stores cache in `C:\Users\YourName\AppData\Local\EpicGamesLauncher\Saved`. You can't easily redirect this, but periodically clearing the `WebCache` subfolder (when Epic is closed) reclaims space.

### EA App Cache

EA App: Settings → Application → Clear Cache. Do this every few months. EA's cache can hit 10GB+ if you play online-heavy titles.

| Launcher | Cache Location | How to Clear |
|---|---|---|
| Steam | steamapps\shadercache | Settings → Downloads → Clear Cache |
| Epic | AppData\Local\EpicGamesLauncher | Delete WebCache folder manually |
| GOG Galaxy | AppData\Local\GOG.com\Galaxy\cache | Clear via Galaxy settings or manually |
| EA App | AppData\Local\Electronic Arts | Settings → Application → Clear Cache |

## Preventing the SSD from Filling Up

A full SSD doesn't just run out of space — it also performs noticeably worse. Most NVMe drives need at least 10–15% free space for optimal write speeds due to how NAND wear leveling works.

**Strategies I use:**

1. **Set a 15% free space rule.** On a 1TB SSD, that's 150GB of buffer. When I drop below that, I move games to the archive HDD.

2. **Enable cloud saves everywhere.** Steam Cloud, GOG Galaxy sync, and Xbox Game Pass cloud saves mean you can safely delete and reinstall without losing progress. Verify cloud saves are active before deleting anything.

3. **Use Steam's "Uninstall" vs "Delete Local Content" properly.** Uninstalling via Steam is safe. The game stays in your library, and saves stored in Documents or the cloud remain untouched.

4. **Audit with WinDirStat or TreeSize Free.** These tools show exactly what's eating your SSD. I run a scan quarterly. Shader caches, Windows temp files, and old launcher installers are frequent offenders.

5. **Check Windows' auto-deletion settings.** Settings → System → Storage → Storage Sense. You can set Windows to automatically delete temp files and empty the Recycle Bin. Enable this. It's not aggressive enough to delete game files, but it catches a lot of background clutter.

## Game Folder Naming and Organization

This sounds mundane but it matters when you're managing hundreds of titles across drives.

Steam and most launchers handle folder names automatically, so you don't always have a choice. But for games installed manually (DRM-free GOG titles, for example), here's what I use:

**Format:** `GameTitle_Year` — Example: `Baldurs Gate 3_2023`

For game files outside launchers (game recordings, screenshots, shader backups), I use:

```
D:\Gaming\
  └── Screenshots\
        └── GameName\
  └── Recordings\
        └── GameName\
  └── Mods\
        └── GameName\
  └── Backups\
        └── SaveGames\
              └── GameName\
```

This structure keeps everything findable. When I want to back up saves for a game I'm about to uninstall, I know exactly where to look.

**Steam screenshot folder:** Steam stores screenshots in a nested folder by AppID, which is not human-readable. I set Steam to automatically save screenshots to a custom folder: Steam → Settings → In-Game → Screenshot Folder. Point it to `D:\Gaming\Screenshots`.

## Recap: My Actual Setup

| Drive | Role | What's On It |
|---|---|---|
| 1TB Samsung 990 Pro (C:) | OS + Active Games | Windows, current games, launchers |
| 2TB Seagate Barracuda (D:) | Archive + Overflow | Inactive games, recordings, GOG installs |
| External 4TB WD Elements | Cold Backup | Save game backups, old screenshots |

That combination has kept me organized for two years. The key isn't having the most space — it's using a system that makes maintenance automatic rather than something you have to think about.

---

## FAQ

**Q: Can I have games from multiple launchers on the same drive folder?**
Yes. You can put Steam, GOG, and Epic libraries all on the same drive, even in adjacent folders. The launchers don't conflict with each other at the file system level, though keeping them in separate named folders (`D:\Steam`, `D:\Epic`, `D:\GOG`) makes manual management easier.

**Q: Will moving a game via Steam Storage Manager break my save files?**
No, for most games. Steam Cloud saves are stored server-side and are unaffected. Local saves stored in `Documents` or `AppData` are also unaffected by moving the game install folder. The exception is games that store saves inside their install directory — use symbolic links for those as described above.

**Q: Does game performance differ between a SATA SSD and an NVMe SSD?**
For loading screens, NVMe is noticeably faster. In actual gameplay, the difference is minimal for most titles. The bigger divide is SSD vs. HDD — a SATA SSD still loads far faster than any spinning disk.

**Q: How often should I clear shader cache?**
I clear Steam's download cache monthly and shader cache every 2–3 months or after major Windows updates. It causes a one-time stutter on next launch as shaders recompile, but reclaims useful space and can fix some launch issues.

**Q: What's the safest way to back up game saves?**
Use cloud saves when available (Steam Cloud, GOG, Xbox Game Pass). For games without cloud support, use symbolic links to point saves to a folder synced by OneDrive or Google Drive. This gives you automatic offsite backup without any extra steps.

**Q: Is it worth buying a dedicated SSD just for games?**
Yes, especially if your OS drive is 1TB or smaller. A dedicated game drive removes competition for space and makes it easy to run a clean backup of just the game library. A 2TB NVMe SSD in the $80–100 range is excellent value for this purpose.
