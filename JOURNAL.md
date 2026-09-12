# The front page — where it stands (12 September 2026, 18:40 BST)

This repo is the STAGING twin of wealthbook.co.uk (the live repo is
`PerpetualWealthGroup/wealthbook-site`). "Ship it" builds here; "Merge it"
copies here to live. The live site still carries the old hero; nothing
below has gone live.

## What is on staging now (main, this commit)

The front page as a family scrapbook, "The Family Book": the words and a
closed hardback in the hero; press it and a page-flip engine (page-flip
2.0.7 from jsdelivr) opens it where the words were — inside the cover the
Aldertons' watercolour facing the contents; then spreads, the thing on the
left (a watercolour, a ledger, a chart, a diary hand, a person), the words
on the right. Eight chapters in Wealthbook's own order — About us,
Property, Chattels (the Land Rover, Lady Anne, Clare's leased car, the
Steinway), Cash flow & spending, Pensions & investments, Structures, Diary,
Inheritance — the folios in sequence, a running head on every left page,
an endpaper and a plain back cover that closes the book. On a phone the
book is born with a taller page and shows one page at a time. Charlie's
part and For advisers sit beneath; Charlie's acronym reads Contextual ·
Holistic · AI · Responsive · Learning · Intuitive · Engine.

The design source is the Claude Code artifact "The Family Book"
(https://claude.ai/code/artifact/a1208d06-a50b-4ed9-8790-12e25ce3f795,
version 29). index.html, css/site.css (the live base + the book's styles)
and js/book.js were built from it: the artifact's `<style>` after
`/* ── THE FAMILY BOOK` appended to the live css; its script with the
base64 pictures swapped for images/*.webp; its body with the menu's links
and without the sketch note; `?v=` bumped on css and js (GitHub Pages
caches ten minutes).

## Where it is going (Ian, 12 September 2026, evening)

The animated book is being retired. Ian: "it looks absolutely **** on a
mobile… do away with the animations and the silliness of it; you can have
the book there." What replaces it, drawn before built:

1. A STILL BOOK in the hero — the closed hardback as a painted object, no
   engine, no turning.
2. AN EIGHT-CHAPTER SCROLL, "What the book covers": the eight chapters in
   order, each a watercolour we already have, a line on what the chapter
   keeps and the three facts it insists on — the same on a desk and a
   phone. Modelled on Family Capital's "Eight aspects. In order." page
   (`iancooke8-png/familycapital`, eight-aspects.html), with the verb
   changed: theirs are things an adviser does, ours are things you keep.
3. AN INTRODUCE CHARLIE PANEL: Charlie on the right as the app has her,
   before she knows who you are — press Introduce Charlie and she appears
   and talks about Wealthbook only: what she does, why she is there, why
   she is called Charlie, what the book keeps, what she never does. She
   keeps nothing, takes no figures, gives no advice, and a stranger gets a
   limited number of questions before she says come and open a book. This
   needs a public door from the app (secure.wealthbook.co.uk), which is
   why the website has moved into the app session: the two are built
   together.
4. Beneath: the record, not advice — the log, the spending, the plan;
   invite an IFA into the pages that concern them or not, advised or not,
   and take them out again. Advice stays with the regulated firm; the book
   stays with you.
5. The menu: The book · What it covers · Charlie · For advisers.

The pictures to keep, all in images/: family.webp (lunch at the harbour),
harbour-house.webp (March House), landrover.webp, lady-anne.webp. The
house's tokens and type are in css/site.css.
