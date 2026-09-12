/* The entry writes itself — the front page's one piece of motion.
   From Claude Design's handoff (12 Sep 2026): seven entries, four
   frames each, then a page turn. Everything slow and soft; nothing
   snaps. Frame 0 is the title and a caret; frame 1 is what you wrote,
   in muted italic; frames 2 and 3 are the house settling it, in ink,
   with "on the record" where a source was found. The footer says who
   did what. Someone who asked for less motion sees entry 1, frame 3,
   still. Plain JavaScript, no framework: the repo is the site. */
(function () {
  var entries = [
    { chapter: 'Chapter 3 · Property', page: 'p. 41', title: 'Harbour House, Dartmouth', /* image: 'images/harbour-house.png' — the watercolour, once its file arrives */ alt: 'Watercolour · Harbour House from the water',
      rows: [
        { label: 'Value', draft: '£1,400,000', settled: '£1,485,000', figure: true },
        { label: 'Source', draft: 'Your estimate, 9 Mar', settled: 'HM Land Registry · DN482119', badge: true },
        { label: 'Held by', fixed: 'The Alderton Family Trust' },
        { label: 'Note', draft: 'Marcus looking at the slipway', settled: 'Marcus Reid looking at the slipway' } ],
      footer: ['', 'written by you', 'settled by Land Registry · your estimate kept underneath', '"Marcus" became a contact · note re-hung under Marcus Reid, surveyor'] },
    // Ian's own boat (12 Sep 2026): Lady Anne, a Botnia Targa 46, kept
    // at Ocean Village, owned by the family. The figures stay the
    // Alderton book's fiction; the boat and the berth are real.
    { chapter: 'Chapter 5 · Boats', page: 'p. 67', title: 'Lady Anne · Botnia Targa 46', image: 'images/lady-anne.webp', alt: 'Watercolour · Lady Anne at Ocean Village',
      rows: [
        { label: 'Value', draft: '£620,000', settled: '£585,000', figure: true },
        { label: 'Source', draft: 'What you paid, 2021', settled: 'Broker valuation · Berthon, April', badge: true },
        { label: 'Berth', fixed: 'Ocean Village Marina · Southampton' },
        { label: 'Held by', fixed: 'The family' } ],
      footer: ['', 'written by you', 'broker valuation filed · purchase price kept underneath', 'survey booked · Charlie added it to the diary and the boat'] },
    { chapter: 'Chapter 3 · Property', page: 'p. 38', title: 'Coldharbour Rectory', alt: 'Watercolour · the Rectory from the lane',
      rows: [
        { label: 'Value', draft: '£2,100,000', settled: '£2,240,000', figure: true },
        { label: 'Source', draft: 'Your estimate', settled: 'Savills appraisal · Feb', badge: true },
        { label: 'Listing', draft: 'Grade II, I think', settled: 'Grade II · Historic England 1108422', badge: true },
        { label: 'Held by', fixed: 'Jonathan & Clare Alderton' } ],
      footer: ['', 'written by you', 'appraisal filed', 'listing confirmed against the National Heritage List · consent notes attached'] },
    { chapter: 'Chapter 7 · Collections', page: 'p. 92', title: 'Steinway Model B, 1928', alt: 'Ink & wash · the Steinway in the drawing room',
      rows: [
        { label: 'Value', draft: '£48,000', settled: '£52,000', figure: true },
        { label: 'Source', draft: 'Insured for, roughly', settled: 'Insurance schedule · Hiscox, renewal', badge: true },
        { label: 'Kept at', fixed: 'Coldharbour Rectory · drawing room' },
        { label: 'Note', draft: 'Tune before Christmas', settled: 'Tuning · Elgar & Sons · 3 Dec' } ],
      footer: ['', 'written by you', 'insured value read from the renewal schedule', 'tuner added as a contact · reminder set'] },
    { chapter: 'Chapter 3 · Property', page: 'p. 44', title: 'The Chapel, St Anne’s', alt: 'Watercolour · the Chapel in winter light',
      rows: [
        { label: 'Value', draft: 'Nominal', settled: '£310,000', figure: true },
        { label: 'Source', draft: 'Not sure it has one', settled: 'Deeds · conveyed 1994 · rebuild cost basis', badge: true },
        { label: 'Held by', fixed: 'The Alderton Family Trust' },
        { label: 'Use', draft: 'Family, occasionally', settled: 'Family · covenant restricts change of use' } ],
      footer: ['', 'written by you', 'deeds found in the Trust chapter · value set from rebuild cost', 'covenant noted from the deeds · flagged to your solicitor'] },
    { chapter: 'Chapter 2 · Structures', page: 'p. 12', title: 'The Alderton Family Trust', alt: 'Ink sketch · the family tree',
      rows: [
        { label: 'Settled', fixed: '1998 · discretionary' },
        { label: 'Trustees', draft: 'Jonathan, and Ruth', settled: 'Jonathan Alderton · Ruth Ellery', badge: true },
        { label: 'Holds', draft: 'Harbour House, the Chapel…', settled: 'Harbour House · The Chapel · 2 accounts' },
        { label: 'Beneficiaries', fixed: 'Tom · Isla · issue' } ],
      footer: ['', 'written by you', 'trustees confirmed from the deed · Ruth invited to this chapter', 'holdings linked from Property and Accounts · nothing typed twice'] },
    { chapter: 'Chapter 9 · Diary', page: 'p. 131', title: 'Thursday · met the surveyor', alt: 'Pencil sketch · the slipway at low tide',
      rows: [
        { label: 'With', draft: 'Marcus', settled: 'Marcus Reid · surveyor', badge: true },
        { label: 'About', draft: 'Kittiwake, the slipway', settled: 'Kittiwake survey · Harbour House slipway' },
        { label: 'Outcome', draft: 'Report in a fortnight', settled: 'Report due 28 May · filed under Kittiwake' },
        { label: 'Cost', draft: '£900 ish', settled: '£950 · Berthon invoice', figure: true } ],
      footer: ['', 'written by you', 'Charlie hung this note on two entries', 'invoice matched to your spending · Boats chapter updated'] }
  ];

  var el = {
    body: document.querySelector('.entry-body'),
    chapter: document.querySelector('.running-head .chapter'),
    page: document.querySelector('.running-head .folio'),
    plate: document.querySelector('.plate'),
    title: document.querySelector('.entry-title .words'),
    caret: document.querySelector('.caret'),
    rows: document.querySelector('.rows'),
    foot: document.querySelector('.entry-foot')
  };
  if (!el.body) return;

  // Paint one entry at one frame. Rows are rebuilt each frame; the
  // colour eases by CSS (1200ms) so a draft becoming settled fades
  // from muted to ink rather than jumping.
  function paint(entryIndex, frame) {
    var e = entries[entryIndex];
    el.chapter.textContent = e.chapter;
    el.page.textContent = e.page;
    el.title.textContent = e.title;
    el.caret.hidden = frame !== 0;
    // The plate: the illustration when we have one, else the caption.
    el.plate.innerHTML = '';
    if (e.image) {
      var img = document.createElement('img');
      img.src = e.image; img.alt = e.alt;
      el.plate.appendChild(img);
    } else {
      var cap = document.createElement('div');
      cap.className = 'plate-empty'; cap.textContent = e.alt;
      el.plate.appendChild(cap);
    }
    el.rows.innerHTML = '';
    e.rows.forEach(function (r) {
      var done = frame >= 2 && r.settled;
      var value = r.fixed !== undefined ? r.fixed : (frame === 0 ? '' : done ? r.settled : r.draft);
      var isDraft = r.fixed === undefined && frame === 1;
      var label = document.createElement('div');
      label.className = 'row-label'; label.textContent = r.label;
      var cell = document.createElement('div');
      cell.className = 'row-value' + (isDraft ? ' draft' : '') + (r.figure && !isDraft ? ' figure' : '');
      var span = document.createElement('span'); span.textContent = value;
      cell.appendChild(span);
      if (done && r.badge) {
        var b = document.createElement('span');
        b.className = 'badge'; b.textContent = 'on the record';
        cell.appendChild(b);
      }
      el.rows.appendChild(label); el.rows.appendChild(cell);
    });
    el.foot.textContent = e.footer[frame];
  }

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { paint(0, 3); return; }

  // The clock, exactly as drawn: each frame holds for its delay, then
  // the page turns (900ms out, swap, 900ms in).
  var delays = [2200, 3800, 4800, 5600];
  var entry = 0, frame = 0;
  paint(entry, frame);
  function tick() {
    var next = frame + 1;
    if (next > 3) {
      el.body.classList.add('turning');
      setTimeout(function () {
        entry = (entry + 1) % entries.length; frame = 0;
        paint(entry, frame);
        el.body.classList.remove('turning');
      }, 900);
      setTimeout(tick, delays[0] + 900);
    } else {
      frame = next; paint(entry, frame);
      setTimeout(tick, delays[next]);
    }
  }
  setTimeout(tick, delays[0]);
})();
