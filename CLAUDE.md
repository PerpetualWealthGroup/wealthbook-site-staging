# wealthbook-site-staging — the front website's staging twin

This repo IS the staging site, at
https://perpetualwealthgroup.github.io/wealthbook-site-staging/ — GitHub
Pages serves `main` as it stands, no build, live within about half a
minute of a push. It exists so that nothing lands on wealthbook.co.uk
before Ian has walked it (Ian, 12 Sep 2026: "when we go live with this
people will see it straight away").

## The two words, for the website

- **"Ship it"** = Claude pushes the page to THIS repo's `main`; the reply
  is "on staging". Ian walks the staging address.
- **"Merge it"** = Claude pushes the same files to
  `PerpetualWealthGroup/wealthbook-site` `main`, which is wealthbook.co.uk;
  the reply is "live at hh:mm BST".
- Nothing else moves anything. The artifact sketch is where ideas are
  argued about before either.

## Rules

- Ian never edits either repo by hand.
- The files are identical to the live repo's except this CLAUDE.md and
  the absence of `CNAME` (the domain belongs to the live repo only).
  Links in `index.html` are relative so the page works under the
  `/wealthbook-site-staging/` path as it does at the domain's root.
- `css/site.css` and `js/entry.js` carry a `?v=` on their links; bump it
  on every push that touches them (Pages caches for ten minutes).
