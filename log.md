# Progress Log — Jehovah's Fitness Club website

## 2026-07-27

Built the initial site per the brief in `claude.md`. Plain static HTML/CSS/JS
(no build step), designed to be served directly by GitHub Pages from `main`.

### What's live

- `index.html` — single-page site: header nav + social icons, hero, About
  (mentions Larimer Lounge, Lost Lake, and the monthly Trident residency),
  embedded video section, EPK photo gallery, and an upcoming shows list.
- `css/style.css` — dark theme (black + neon-lime accent), responsive down to
  mobile, condensed display font for headers (Bebas Neue) + Inter for body
  text, both via Google Fonts.
- `js/script.js` — mobile nav toggle only. No other JS on the page.
- `photos/README.md` — exact filenames the site expects for the EPK gallery
  and the two show posters. Gallery tiles use an `onerror` fallback: if a
  photo file isn't present yet, a styled placeholder tile shows instead of a
  broken-image icon, and it self-repairs the moment a real file with the
  right name is added — no code changes needed.
- Upcoming shows section includes both requested dates: **Dazzle — Sat, Aug 8,
  2026** and **Trident (monthly residency) — Sat, Sep 12, 2026**. Each has a
  poster slot (same placeholder-fallback pattern) and a venue/ticket link.
- `.nojekyll` at repo root so GitHub Pages serves the files as-is.

### Placeholders / things I could not verify — replace these

I don't have access to the band's real social accounts, the actual Tiny Desk
video, or real photos, so I used working placeholders instead of guessing at
URLs I couldn't confirm (a wrong guess would point at someone else's
account). Everything below is safe to click today, but should be swapped for
the real thing:

1. **Instagram / Spotify / Apple Music / YouTube** (header + footer) — these
   currently link to a *search* for "Jehovah's Fitness Club" on each
   platform, not the band's actual profile (I don't know the real handles/
   URLs). Replace the four `href`s in `index.html` (search for
   `instagram.com`, `open.spotify.com`, `music.apple.com`,
   `youtube.com/results` — each appears twice, header and footer) with the
   real profile URLs.
2. **"Lofi Therapy" Tiny Desk video** (`#video` section) — shipped as a
   styled placeholder card, not a broken embed. Once the real video is
   public, uncomment/replace the placeholder `<div class="video-placeholder">`
   in `index.html` with the YouTube `<iframe>` left commented directly above
   it (just needs the real video ID dropped in).
3. **EPK photos** — `photos/` only has a `README.md` describing expected
   filenames (`band-01.jpg`, `live-01.jpg`, etc.). Drop the real files in
   with those names and the gallery fills in automatically.
4. **Show posters** — same pattern, expects
   `photos/poster-dazzle-2026-08-08.jpg` and
   `photos/poster-trident-2026-09-12.jpg`.
5. **Ticket / venue links** — Dazzle links to `dazzledenver.com`, Trident
   links to `tridentcafe.com` (both real, well-known Denver-area venues, used
   here as general venue-info links). Neither is a direct link to buy a
   ticket for these specific dates — if you have real ticket URLs for the
   Aug 8 or Sep 12 shows, swap those in instead.

### GitHub Pages

Pushed to `main` on `github.com/lxdepablo/jfc_site`. GitHub Pages is **not
enabled yet** — no `gh` CLI or API token was available in this environment to
turn it on programmatically. To go live:

1. On GitHub: repo → **Settings → Pages**.
2. Under "Build and deployment", set **Source: Deploy from a branch**.
3. Branch: **main**, folder **/ (root)** → Save.
4. Site will publish at `https://lxdepablo.github.io/jfc_site/` within a
   couple minutes.

### Repo notes

- Repo had no commits at all when this task started, so an initial commit
  (`claude.md`) was pushed to `main` first to establish the branch before any
  other work began.
