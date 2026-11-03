# smAisle Run

A smAisle memory game (Plus for now). Study 8 items for 15 seconds, then build a route from the cart to PAY that picks them up in order. Three carts. One store a day, the same for everyone, new at midnight Eastern. The repo is AisleRunGame so the name can change.

- Play: https://smaisle.app/AisleRunGame/ (preview: ?preview=1; store tests: ?store=hardware, ?store=pet)
- Version: on the home screen, in the menu, How to Play and Stats (v1.0 · Nov 3)
- No. 1 = 2026-11-03. Game code `rg`.

## Build
Edit `source/`, then run `python3 source/build.py`. It writes `index.html` (GitHub), `index-artifact.html` (Claude copy), `owner.html` and `manifest.json`. Keep the two game copies on the same version.
- **The name lives in one place:** `NAME` at the top of `source/build.py`. Change it and rebuild. If the address changes, also change `SHARE_URL` in `source/src.html`.
- `src.html` shell, shared screens and settings. `game.js` play, saving, demo, drawing. `puzzle.js` daily store. `icons.js` 68 grocery icons, `stores.js` Hardware and Pet shop. `sound.js` sounds. `art.js` cover picture and icon.
- `node source/icon.js` draws the icons and `cover.png`.
- `node source/check.js` checks 1,400 days of every store and prints how hard each weekday is.
- `node source/play.js <folder>` is the full phone test, with screenshots.

## Settings (top of the script in source/src.html)
- `PLUS_GAME=true`. Set to `false` for a standard game with no preview.
- `PV_ROWS=3`, how many rows the preview gives.
- `STORES_LIVE=['grocery']`. Stores in this list take turns by day. Adding one changes which store older days use unless the player already started that day, so add new stores with care.

## Rules
- Study: 8 items, 15 seconds, counted from the first look, so a reload never shows the list longer.
- Tap one item per row. Each pick opens the next row. Tap PAY or Check out and the cart rolls. A wrong item tips it. "Not yet! That comes later." if it's on the list, "That's not on your list." if not.
- 3 carts. Cart 1 = 3 stars, cart 2 = 2, cart 3 = 1, no checkout = 0.
- Surprise, by seed, never both: Mom's text (a swap in row 5-7, after row 3 is picked; the old item stays as a trap) or price checks (after rows 3 and 6, 4 seconds; wrong or late takes the labels off the next row for the day).
- Difficulty, `hardness()` in `puzzle.js`: Monday fewest look-alikes and list items in wrong rows, Sunday the most look-alikes. Always 8 items, 15 seconds, 3 carts.
- Result locks for the day. After the last cart: Keep playing (saves nothing) or Show the route (asks first).
- Reload resumes: picks, carts, labels and time stay. A reload during a roll still spends the cart and judges the route.
- Archive plays past days, marked late, not in the streak. Stats: played, wins, win %, streak, best streak, stars.
- `?store=` tests save nothing and send nothing. Unknown or live stores are ignored.

## Plus
Preview (?preview=1 or the app without Plus): the full list, then the first cart's first 3 rows with a Roll button, then the Plus offer. No surprises, nothing recorded, Archive hidden. Buying Plus in the app goes on with all 3 carts.

## Usage
Firestore collection `rg_devices` in aislerun-88e79, owner page `owner.html`. Sent only from smaisle.app or github.io, after the terms, never in the Claude copy, the demo, Archive days or `?store=` tests.
Fields: first, last, days, v, opens, plays, done, wins, stars, streak, best, terms, desk, code, t, o (opens by day), p (plays by day), r (stars by day, 0-3).

## To go live
1. Merge branch `v1` to `main` so Pages serves it.
2. Add `{id:'rg',name:'smAisle Run',daily:true,archive:true,plus:true,...}` and an icon to `smaisle.github.io/daily/games.js`. The game calls markDone with id `rg`.

## v1.0 (Nov 3)
First real version, from Route test v0.15.
