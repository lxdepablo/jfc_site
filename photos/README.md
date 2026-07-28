# Press Photos

The EPK gallery on the homepage currently uses six live photos, two each from
Larimer Lounge, Lost Lake, and Trident (sourced from `../Photos/`, resized and
compressed for web use):

| Filename           | Source                                          |
|---------------------|--------------------------------------------------|
| `larimer-01.jpg`   | Larimer Lounge — full band, photo by Ivy Owens    |
| `larimer-02.jpg`   | Larimer Lounge — photo by Ivy Owens               |
| `lostlake-01.jpg`  | Lost Lake                                         |
| `lostlake-02.jpg`  | Lost Lake                                         |
| `trident-01.jpg`   | Trident                                           |
| `trident-02.jpg`   | Trident                                           |

To swap any of these out, replace the file (keep the same name) or add a new
image and update the matching `<figure>`/`<img>` block in the `#epk` section
of `index.html`.

## Still needed: show posters

The upcoming-shows section expects two poster images that don't exist yet —
until they're added, each show card shows a "poster coming soon" placeholder
instead of a broken image:

| Filename                          | Show                          |
|------------------------------------|--------------------------------|
| `poster-dazzle-2026-08-08.jpg`    | Dazzle — Sat, Aug 8, 2026      |
| `poster-trident-2026-09-12.jpg`   | Trident — Sat, Sep 12, 2026    |

Drop the poster art in with those exact filenames and it'll appear
automatically, no code changes needed.
