# Progress Log — Jehovah's Fitness Club website

## 2026-07-27 (update 8) — actually fixed the CSS cache-busting this time

User reported the red circle was still showing after update 7. Root cause:
update 7 edited `css/style.css` to remove the circle rule, but the
stylesheet `<link>` still pointed at `css/style.css?v=3` — the *same*
version string used since update 6. Confirmed directly against GitHub's
Pages edge that the server-side file was correct (no circle rule present)
even at the `v=3` URL, meaning this was purely a client-side cache miss:
any browser that had already fetched `style.css?v=3` before update 7 had
no reason to ever refetch that exact URL again, so it kept rendering the
old (circle-having) CSS indefinitely regardless of how much time passed.
Bumped to `?v=4` to force every cached copy to be treated as stale.

Lesson for future edits: any time `css/style.css` or the cache-busted image
files change, the version query param in `index.html` MUST be bumped in
the same commit — editing the file without changing its URL means cached
visitors never see the update, no matter how long they wait.

## 2026-07-27 (update 7) — removed hero circle, confirmed prior fix was a cache issue

User reported the hero still showed a duplicated band-name logo next to the
red circle behind the gymnast graphic. Two things:

- **Removed the red circle backdrop** behind the hero illustration entirely
  (`.hero-art::before` in `css/style.css`), per the request.
- **The "duplicated logo" was stale cache, not a leftover bug.** The
  previous update (update 6) already fixed the gymnast art to remove the
  baked-in wordmark, but only the stylesheet link got a cache-busting
  version param — the image files kept their old filenames, so a browser
  that had already cached `images/gymnast-black.png` from before that fix
  had no reason to refetch it. Confirmed via a local headless-browser
  screenshot that the actual current artwork is correct (single wordmark,
  no circle). Added `?v=2` cache-busting params to all four custom image
  references (`wordmark-black.png`, `wordmark-white.png`,
  `gymnast-black.png`) so this can't recur — same fix pattern as the CSS
  cache issue from update 6, just extended to images.

If a visitor still sees the old version after this, it's almost certainly
their browser cache — a hard refresh (Ctrl/Cmd+Shift+R) or private window
will show the current version immediately, since the URLs themselves have
changed.

## 2026-07-27 (update 6) — Gallery rename, fixed hero art, cache-busting

User feedback after the redesign:

- **"Electronic Press Kit" renamed to "Gallery"** — nav link, hero CTA
  button, section heading, and section id/class (`#epk` → `#gallery`).
- **Fixed a real bug in the hero art**: the illustration used as the hero
  graphic (`images/gymnast-black.png`) had the cursive wordmark baked into
  its top edge (it's one combined piece of art in the source file), so the
  band name was rendering twice — once cleanly as the big h1, once cramped
  above the gymnast figure. Traced this to the source SVG having two
  layers (figure + wordmark); regenerated the hero art from the figure
  layer only, so the wordmark now appears exactly once.
- **"Colors still displaying as black and green" was a caching issue, not a
  code bug.** Verified directly against GitHub's Pages edge (bypassing DNS)
  that the deployed CSS is the new white/black/red stylesheet, not the old
  dark/lime-green one — that old palette (`#0b0b0c` bg / `#d4ff3f` accent)
  matches what the user described, meaning their browser (or an
  intermediate cache) was still serving a pre-redesign copy. Added a
  `?v=3` cache-busting query param to the stylesheet link so future CSS
  changes force a fresh fetch instead of relying on users to hard-refresh.
  GitHub Pages' own CDN cache is only 10 minutes (`max-age=600`), so this
  was very likely the visitor's own browser cache.

## 2026-07-27 (update 5) — content rewrite + visual redesign

Two rounds of changes requested by the user:

**Content**: removed the placeholder hero tagline ("Loud, sweaty, and built
for repetitions."), replaced the About copy with the band's real bio
(Boulder-based, seven-piece jazz/Latin/funk/hip-hop group), added the full
seven-person lineup with instruments, and aligned "Trident" to its full name
(Trident Booksellers & Cafe) throughout.

**Visual redesign** — "80s workout video" aesthetic: white primary
background, black + red accents, sharp-edged cards with thick black borders
and an offset red "sticker" drop-shadow (used on the video frame and show
cards), a repeating black/red diagonal stripe bar as a section bookend
(top of page, above footer), and Anton (bold condensed display face) for
headings in place of Bebas Neue.

Incorporated real band artwork from the `art/` folder the user provided:
- `JFC_long_logo.svg` (cursive wordmark) → rasterized, trimmed, and used as
  the header logo and footer logo (`images/wordmark-black.png` /
  `wordmark-white.png`).
- `poster_april_bw (1) (3).svg` (illustration of a performer on gymnastics
  rings, crucifix-posed, "JFC" on the shirt) → rasterized as the hero
  graphic (`images/gymnast-black.png`), set against a red circle backdrop.
  Also generated a red-recolored variant (`images/gymnast-red.png`, not
  currently used on the page, kept in case it's wanted for merch/social).
- `JFC_logo (3).svg` (hand-painted red "JFC" monogram) → extracted, trimmed,
  and used as the site favicon (`favicon.ico`, `favicon-32.png`,
  `apple-touch-icon.png`).

Skipped `frog.png`, `chariot.png`, and `hiding.png` — fun character art, but
tonally a mismatch for the retro-poster press-kit look, and this is a
press-facing page. Happy to use them elsewhere (social posts, merch) if
wanted.

Verified with a headless-Chrome screenshot (no real browser available
otherwise in this environment) at desktop and mobile widths — no layout
overflow, all photo/asset paths resolve, video embed renders in its framed
box.

## 2026-07-27 (update 4) — Dazzle poster added

Added `dazzle_poster.jpeg` (dropped by the user into `Photos/`) as
`photos/poster-dazzle-2026-08-08.jpg` — resized/compressed to 220KB. Since
it uses the exact filename the show card already expects, it now renders in
place of the "poster coming soon" placeholder with no HTML changes. The
Trident (Sep 12) poster is still outstanding.

## 2026-07-27 (update 3) — custom domain detected

A `CNAME` file was added directly on GitHub (not by this tool), pointing the
site at `www.jehovahsfitnessclub.com`. Rebased local work on top of it rather
than overwrite. This changes the GitHub Pages setup step below: after
enabling Pages (Settings → Pages → Source: main / root), also set **Custom
domain** to `www.jehovahsfitnessclub.com` there if it isn't picked up
automatically, and make sure the domain's DNS has a CNAME record pointing
`www` at `lxdepablo.github.io` (and typically an apex/`A` redirect or ALIAS
for the bare `jehovahsfitnessclub.com` → `www`, handled at the
registrar/DNS provider, outside this repo).

## 2026-07-27 (update 2) — real Apple Music link

Swapped the last placeholder link for the real one: **Apple Music** now
points to `music.apple.com/us/artist/jehovahs-fitness-club/1747247595`
(header + footer), provided by the user. All four platform links
(Instagram, Spotify, Apple Music, YouTube) are now real. Only remaining
placeholders are the two show posters and the venue ticket links (see notes
below).

## 2026-07-27 (update) — real photos and links

Wired in real assets the user provided after the initial build:

- **EPK gallery** now uses six real live photos instead of placeholders —
  two each from Larimer Lounge and Lost Lake (from `Photos/Larimer 1-17` and
  `Photos/Lost Lake 5-30-26`, credited to photographer Ivy Owens for the
  Larimer shots) and two from Trident (`Photos/Trident 2-21` and
  `Photos/Trident 3-21`). Originals were 2–13MB each; resized to max 1600px
  and compressed with ImageMagick down to 224–462KB. See `photos/README.md`
  for the source mapping.
- **Instagram**: now links to `instagram.com/jehovahsfitnessclub` (real
  profile, provided by user).
- **Spotify**: now links to the real artist page,
  `open.spotify.com/artist/0YALn4LU3fYaaF4aKDxp1l` (provided by user).
- **YouTube / Tiny Desk video**: the `#video` section now embeds the real
  video (ID `WopTDuCCgxg`, provided by user) instead of a placeholder card.
- **Apple Music** — still unset, no link provided yet. Still points at an
  Apple Music search for the band name as a working placeholder (header +
  footer, search for `music.apple.com` in `index.html`).
- **Show posters** — no poster art was found in the `Photos/` folder (it's
  all live-show photography, no flyer/poster graphics), so the two poster
  slots in the Shows section still show the "poster coming soon" placeholder.
  See `photos/README.md` for the exact filenames they're waiting on.
- **Venue ticket links** — unchanged, still general venue-info links (see
  note below), not confirmed ticket-purchase URLs for these specific dates.

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
