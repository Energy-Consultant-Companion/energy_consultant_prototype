# ENSERA — Klick-Prototyp

A clickable prototype of ENSERA, built one-to-one from the Paper design file
*Ensera → Full Software · Ensera*. 40 screens, wired into a single walkthrough
that covers both sides of the product: the homeowner sending a first enquiry,
and the energy consultant working the resulting case.

## The walkthrough

| Chapter | Perspective | What it shows |
| --- | --- | --- |
| Anfrage stellen | Kundschaft | The consultant's own website → four-step enquiry form |
| Anfrage annehmen | Beraterin | Enquiry pre-checked against her own rules → accept → access mail goes out |
| Weg 2 · Per Mail | Kundschaft | Reply to the mail with attachments; status and reminders arrive automatically |
| Weg 1 · Im Portal | Kundschaft | Fill in the missing details, then full access to the client portal |
| Fälle | Beraterin | Dashboard, case list, creating a case from documents or an imported project |
| Ein Fall | Beraterin | Overview, steps, history, document folders, missing documents, ⌘P actions |
| Schritte, Fragen, Suche | Beraterin | Next steps, questions with ENSERA drafts, global and case-scoped search |
| Unterlagen prüfen | Beraterin | Inbox, counter-signing, manual review with findings |
| Förderung | Beraterin | Pick a case → funding paths → programme detail → adopt into the case |
| Regulierungen | Beraterin | Ask the regulation model, read the answer with citations, see what changed |
| Einstellungen | Beraterin | Profile / working style and project templates |

## Driving the demo

- **Click the screens.** Buttons, rows, rail items and menu entries navigate.
- **H** — flash every clickable region on the current screen.
- **O** — overview of all 40 screens, grouped by chapter.
- **← / →** — step through the walkthrough in order.
- The browser back button works; every screen has its own URL (`/fall-uebersicht`).

## How it is built

- **Next.js 15** (App Router, statically generated) · **React 19** · **Tailwind v4** · **Motion**.
- `src/screens/*.tsx` are generated from the Paper artboards — do not hand-edit.
  Re-generate with `node tools/codegen.mjs` after refreshing `tools/raw`.
- `src/app/globals.css` carries the Paper design tokens verbatim as a Tailwind
  theme, which is what lets the exported markup render unmodified.
- `src/lib/hotspots.ts` is the only place interaction is defined. Because the
  exported screens are static, each rule finds a node at runtime — by its text
  or by a CSS selector — and `useHotspots` turns the enclosing element into a
  link. Adding a click target means adding one line there.
- `src/components/Stage.tsx` scales the fixed 1440px artboards to the viewport
  instead of reflowing them, so the prototype always matches the design.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

### Checks

With a production server running on port 4311 (`npx next start -p 4311`):

```bash
node tools/flowtest.mjs    # clicks through the main paths and asserts the destination
node tools/reachable.mjs   # fails loudly if a hotspot sits behind an overlay
node tools/audit.mjs       # hotspot count per screen
```

## Deployment

Static output on Vercel; no server, no environment variables.
