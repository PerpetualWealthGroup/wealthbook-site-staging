/* THE FAMILY BOOK — the front page's one piece of motion (Ian, 12 Sep
   2026: "a beautiful animated family book… sometimes when you turn the
   book there'll be a spreadsheet, sometimes another page with something
   on it"). A cover, then spreads: the thing itself on the left — a
   watercolour, a diary page in pencil, the workbook, a person — and what
   the book made of it on the right. A page-flip engine (page-flip, from
   the CDN) does the turning; nothing turns unless the reader turns it
   or presses the quiet play in the gutter, which writes the right-hand
   page from blank and turns on until stopped. Plain JavaScript. */
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
    { chapter: 'Chapter 9 · Diary', page: 'p. 131', title: 'Thursday · met the surveyor', kind: 'diary', alt: 'Your diary · Thursday 14 May',
      rows: [
        { label: 'With', draft: 'Marcus', settled: 'Marcus Reid · surveyor', badge: true },
        { label: 'About', draft: 'Kittiwake, the slipway', settled: 'Kittiwake survey · Harbour House slipway' },
        { label: 'Outcome', draft: 'Report in a fortnight', settled: 'Report due 28 May · filed under Kittiwake' },
        { label: 'Cost', draft: '£900 ish', settled: '£950 · Berthon invoice', figure: true } ],
      footer: ['', 'written by you', 'Charlie hung this note on two entries', 'invoice matched to your spending · Boats chapter updated'] }
  ];
  entries.push(
    { chapter: 'Chapter 6 · Portfolio', page: 'p. 78', title: 'The Alderton pension and ISAs', kind: 'chart', alt: 'The portfolio since 2019',
      rows: [
        { label: 'Value', draft: 'about £2.4m', settled: '£2,463,180', figure: true },
        { label: 'Source', draft: 'Last statement, roughly', settled: 'Platform feed · valued today', badge: true },
        { label: 'Pots', fixed: 'SIPP · 2 ISAs · a general account' },
        { label: 'Drawing', draft: 'Around £6,000 a month', settled: '£6,000 a month · 2.9% of the pot' } ],
      footer: ['', 'written by you', 'valued from the platform this morning · the line is drawn from every day since 2019', 'the drawing set beside the plan · Charlie will say if the two disagree'] },
    { chapter: 'Chapter 8 · Spending', page: 'p. 102', title: 'The first half of the year', kind: 'sheet', alt: 'The workbook · spending, January to June',
      rows: [
        { label: 'Spent', draft: 'about £240k so far', settled: '£248,550 · January to June', figure: true },
        { label: 'Against', draft: 'the plan, roughly', settled: 'The plan · £230,000 for the half', badge: true },
        { label: 'Over', fixed: 'The boat · £18,100 · the survey and the berth' },
        { label: 'Read by', draft: 'nobody yet', settled: 'Charlie · the plan and the spending disagree by 8%' } ],
      footer: ['', 'written by you', 'the workbook filled from the accounts · nothing typed twice', 'Charlie noticed the boat line and said so on the plan page'] },
    { chapter: 'Chapter 4 · People', page: 'p. 52', title: 'Tom', kind: 'person', alt: 'Tom Alderton · born 2009',
      rows: [
        { label: 'School', draft: 'Seaford, sixth form', settled: 'Seaford College · sixth form · leaves 2027', badge: true },
        { label: 'Fees', draft: 'about £14k a term', settled: '£14,250 a term · £42,750 this year', figure: true },
        { label: 'Paid from', fixed: 'The general account · standing order' },
        { label: 'Next', draft: 'University, probably', settled: 'University 2027 · £9,535 a year · a JISA of £38,000 waiting' } ],
      footer: ['', 'written by you', 'the fees read from the school\u2019s invoices in the vault', 'the JISA linked from Accounts · Charlie will say when it is short'] },
    { chapter: 'Chapter 12 · Inheritance', page: 'p. 140', title: 'What the estate would owe', kind: 'ledger', alt: 'The sum, as the book keeps it',
      rows: [
        { label: 'Estate', draft: 'Everything, less the mortgage', settled: '£7,135,180 · every chapter summed', figure: true },
        { label: 'Allowances', draft: 'The usual two, I think', settled: 'Nil-rate £650,000 · residence £350,000', badge: true },
        { label: 'Exposure', draft: 'A lot', settled: '£2,085,600 at 40%', figure: true },
        { label: 'Held by', fixed: 'Jonathan & Clare, jointly' } ],
      footer: ['', 'written by you', 'the sums as the book keeps them · both allowances doubled between spouses', 'the Trust’s share sits outside the estate after seven years · 2 years to go'] }
  );

  function growthSvg() {
    var pts = [1.62,1.64,1.60,1.55,1.66,1.71,1.69,1.74,1.78,1.75,1.80,1.86,1.83,1.79,1.42,1.51,1.58,1.63,1.69,1.72,1.77,1.80,1.86,1.91,1.95,1.98,2.02,1.97,2.05,2.08,2.12,2.10,2.15,2.19,2.16,2.22,2.18,2.11,2.06,2.09,2.14,2.17,2.21,2.19,2.25,2.28,2.31,2.27,2.33,2.36,2.40,2.38,2.42,2.39,2.44,2.41,2.45,2.43,2.47,2.46];
    var W = 400, H = 300, L = 44, R = 18, T = 44, B = 28, lo = 1.3, hi = 2.6;
    var x = function (i) { return L + (i / (pts.length - 1)) * (W - L - R); };
    var y = function (v) { return T + (1 - (v - lo) / (hi - lo)) * (H - T - B); };
    var d = pts.map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(' ');
    var grid = [1.5, 2.0, 2.5].map(function (g) { return '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(g).toFixed(1) + '" y2="' + y(g).toFixed(1) + '" stroke="#e8e4dc"/><text x="' + (L - 6) + '" y="' + (y(g) + 3.5).toFixed(1) + '" text-anchor="end" font-family="Instrument Sans, system-ui, sans-serif" font-size="10" fill="#8a8375">£' + g.toFixed(1) + 'm</text>'; }).join('');
    var years = [0,12,24,36,48,59].map(function (i, k) { return '<text x="' + x(i).toFixed(1) + '" y="' + (H - 9) + '" text-anchor="middle" font-family="Instrument Sans, system-ui, sans-serif" font-size="10" fill="#8a8375">' + (2019 + k) + '</text>'; }).join('');
    var last = pts.length - 1;
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="The portfolio since 2019, £1.6m to £2.46m">' + grid + years + '<path d="' + d + '" fill="none" stroke="#1a1815" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/><circle cx="' + x(last).toFixed(1) + '" cy="' + y(pts[last]).toFixed(1) + '" r="4" fill="#1a1815" stroke="#ffffff" stroke-width="2"/></svg><span class="chart-title">Since 2019</span><span class="chart-end">£2.46m</span>';
  }
  // The diary page as it was written: the day, the note in pencil, a
  // line added later in a lighter hand.
  function diaryHtml() {
    return '<div class="diary-day">Thursday</div><div class="diary-date">14 May 2026</div>' +
      '<div class="diary-note">Met Marcus at the slipway, 10ish.\nKittiwake survey — he’s looking at the slipway too.\nReport in a fortnight.\n£900 ish, invoice to follow.\n<span class="later">Invoice in — £950, Berthon.<span class="tick">✓</span></span></div>';
  }
  // The workbook page: six months of spending by line, the house's own
  // paper sheet — small capitals, hairlines, tabular figures, the total
  // ruled off; the one line over its plan in the house's red.
  function sheetHtml() {
    var rows = [['January', 26800, 14250, 1400, 3200], ['February', 27100, 0, 1400, 900], ['March', 28400, 0, 6900, 4100], ['April', 27300, 14250, 1400, 2200], ['May', 29900, 0, 5600, 7800], ['June', 28100, 14250, 1400, 1900]];
    var f = function (n) { return '\u00a3' + n.toLocaleString('en-GB'); };
    var t = [0, 0, 0, 0];
    var body = rows.map(function (r) { t[0] += r[1]; t[1] += r[2]; t[2] += r[3]; t[3] += r[4]; return '<tr><td>' + r[0] + '</td><td>' + f(r[1]) + '</td><td>' + (r[2] ? f(r[2]) : '\u2014') + '</td><td' + (r[3] > 2000 ? ' class="over"' : '') + '>' + f(r[3]) + '</td><td>' + f(r[4]) + '</td><td>' + f(r[1] + r[2] + r[3] + r[4]) + '</td></tr>'; }).join('');
    return '<div class="sheet-name">Spending</div><div class="sheet-sub">January to June 2026 \u00b7 from the accounts</div><table><thead><tr><th>Month</th><th>Home</th><th>School</th><th>Boat</th><th>Travel</th><th>Total</th></tr></thead><tbody>' + body +
      '<tr class="total"><td>Half year</td><td>' + f(t[0]) + '</td><td>' + f(t[1]) + '</td><td class="over">' + f(t[2]) + '</td><td>' + f(t[3]) + '</td><td>' + f(t[0] + t[1] + t[2] + t[3]) + '</td></tr></tbody></table>';
  }
  // A person's page: the face, who they are, what their schooling has cost.
  function personHtml() {
    return '<div class="person-face">TA</div><div class="person-name">Tom Alderton</div><div class="person-sub">Born 3 March 2009 \u00b7 son \u00b7 at Seaford College</div>' +
      '<div class="person-ledger"><div class="ledger-row"><span>Prep, 2013 to 2020</span><b>\u00a368,000</b></div><div class="ledger-row"><span>Senior, 2020 to date</span><b>\u00a3144,400</b></div><div class="ledger-row"><span>Music, the trips, the kit</span><b>\u00a311,900</b></div><div class="ledger-row total"><span>His education so far</span><b>\u00a3224,300</b></div></div>';
  }
  function ledgerHtml() {
    return '<div class="ledger-row"><span>Property, three houses</span><b>£4,035,000</b></div><div class="ledger-row"><span>Pensions and ISAs</span><b>£2,463,180</b></div><div class="ledger-row"><span>The boat, the piano, the rest</span><b>£637,000</b></div><div class="ledger-row"><span>Less the mortgage and allowances</span><b>&minus;£1,921,180</b></div><div class="ledger-row total"><span>Taxable at 40%</span><b>£5,214,000</b></div>';
  }

  // Build the pages: a cover, then for every entry a left page (the
  // plate) and a right page (the words). Each right page keeps its own
  // rows so the play can rewrite it beat by beat.
  var book = document.getElementById('book');
  var pages = [];
  var cover = document.createElement('div'); cover.className = 'page cover'; cover.setAttribute('data-density', 'hard');
  cover.innerHTML = '<div class="cover-inner"><div class="kicker">A record of a whole financial life</div><div class="cover-name">The Alderton Family</div><div class="cover-rule"></div><div class="cover-kept">Kept since 2026 · 12 chapters</div></div>';
  pages.push(cover);
  entries.forEach(function (e, i) {
    var left = document.createElement('div'); left.className = 'page';
    var plate = e.kind === 'chart' ? '<div class="plate chart">' + growthSvg() + '</div>' : e.kind === 'ledger' ? '<div class="plate ledger">' + ledgerHtml() + '</div>' : e.kind === 'diary' ? '<div class="plate diary">' + diaryHtml() + '</div>' : e.kind === 'sheet' ? '<div class="plate sheet">' + sheetHtml() + '</div>' : e.kind === 'person' ? '<div class="plate person">' + personHtml() + '</div>' : e.image ? '<div class="plate picture"><img src="' + e.image + '" alt="' + e.alt + '"></div>' : '<div class="plate picture"><div class="plate-empty">' + e.alt + '</div></div>';
    left.innerHTML = '<div class="plate-page">' + plate + '<div class="caption">' + e.alt + '</div></div>';
    var right = document.createElement('div'); right.className = 'page';
    right.innerHTML = '<div class="words-page"><div class="folio-line kicker"><span class="chapter">' + e.chapter + '</span><span class="folio">' + e.page + '</span></div><div class="entry-title"><span class="words">' + e.title + '</span><span class="caret" hidden></span></div><div class="rows"></div><div class="entry-foot"></div></div>';
    right.setAttribute('data-entry', String(i));
    pages.push(left, right);
    paintRows(right, e, 3);
  });
  var back = document.createElement('div'); back.className = 'page cover'; back.setAttribute('data-density', 'hard');
  back.innerHTML = '<div class="cover-inner"><div class="kicker">Wealthbook</div><div class="cover-kept">Everything you own, everything you owe, and everything you need to know.</div></div>';
  pages.push(back);
  pages.forEach(function (p) { book.appendChild(p); });

  function paintRows(right, e, frame) {
    var rows = right.querySelector('.rows'), foot = right.querySelector('.entry-foot'), caret = right.querySelector('.caret');
    caret.hidden = frame !== 0;
    rows.innerHTML = '';
    e.rows.forEach(function (r) {
      var done = frame >= 2 && r.settled;
      var value = r.fixed !== undefined ? r.fixed : (frame === 0 ? '' : done ? r.settled : r.draft);
      var isDraft = r.fixed === undefined && frame === 1;
      var label = document.createElement('div'); label.className = 'row-label'; label.textContent = r.label;
      var cell = document.createElement('div'); cell.className = 'row-value' + (isDraft ? ' draft' : '') + (r.figure && !isDraft ? ' figure' : '');
      var span = document.createElement('span'); span.textContent = value; cell.appendChild(span);
      if (done && r.badge) { var b = document.createElement('span'); b.className = 'badge'; b.textContent = 'on the record'; cell.appendChild(b); }
      rows.appendChild(label); rows.appendChild(cell);
    });
    foot.textContent = e.footer[frame];
  }

  // The engine: a soft turn, corner under the pointer, the cover alone.
  var flip = new St.PageFlip(book, {
    width: 460, height: 640, size: 'stretch', minWidth: 300, maxWidth: 520, minHeight: 420, maxHeight: 720,
    showCover: true, drawShadow: true, maxShadowOpacity: 0.28, flippingTime: 1100, usePortrait: true, mobileScrollSupport: false, startPage: 0
  });
  flip.loadFromHTML(pages);
  var where = document.querySelector('.turns .where');
  function say() {
    var p = flip.getCurrentPageIndex();
    if (p === 0) where.textContent = 'cover';
    else { var e = entries[Math.floor((p - 1) / 2)]; where.textContent = e ? e.page : 'the end'; }
  }
  flip.on('flip', function () { say(); });
  say();
  document.querySelector('.turns .prev').addEventListener('click', function () { stop(); flip.flipPrev('top'); });
  document.querySelector('.turns .next').addEventListener('click', function () { stop(); flip.flipNext('top'); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { stop(); flip.flipNext('top'); }
    if (e.key === 'ArrowLeft') { stop(); flip.flipPrev('top'); }
    if (e.key === ' ' && !/INPUT|TEXTAREA|BUTTON/.test(document.activeElement.tagName)) { e.preventDefault(); play(); }
  });

  // PLAY, in the gutter: writes the spread's right page from blank, beat
  // by beat, then turns; on through the book until stopped.
  var playBox = document.createElement('div'); playBox.className = 'play';
  playBox.innerHTML = '<button type="button" aria-label="Watch the book write itself"><svg viewBox="0 0 10 10" aria-hidden="true"><path class="ico" d="M2.5 1.5v7l6-3.5z" fill="currentColor"/></svg></button>';
  book.appendChild(playBox);
  var playBtn = playBox.querySelector('button'), ico = playBox.querySelector('.ico');
  var delays = [2200, 3800, 4800, 5600], timer = null, playing = false, frame = 3;
  function currentRight() {
    var p = flip.getCurrentPageIndex();
    var idx = p === 0 ? -1 : Math.floor((p - 1) / 2);
    return idx >= 0 && idx < entries.length ? { el: book.querySelectorAll('.page[data-entry]')[idx], e: entries[idx] } : null;
  }
  function showPlay(on) { playing = on; playBox.classList.toggle('on', on); ico.setAttribute('d', on ? 'M2.5 2.5h5v5h-5z' : 'M2.5 1.5v7l6-3.5z'); }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } var r = currentRight(); if (r) paintRows(r.el, r.e, 3); if (playing) showPlay(false); }
  function tick() {
    if (!playing) return;
    var r = currentRight(); if (!r) { stop(); return; }
    var next = frame + 1;
    if (next > 3) {
      if (flip.getCurrentPageIndex() >= pages.length - 2) { stop(); return; }
      flip.flipNext('top'); frame = 0;
      timer = setTimeout(function () { var n = currentRight(); if (n) paintRows(n.el, n.e, 0); timer = setTimeout(tick, delays[0]); }, 1200);
    } else { frame = next; paintRows(r.el, r.e, frame); timer = setTimeout(tick, delays[next]); }
  }
  function play() {
    if (playing) { stop(); return; }
    showPlay(true);
    if (flip.getCurrentPageIndex() === 0) { flip.flipNext('top'); frame = 0; timer = setTimeout(function () { var n = currentRight(); if (n) paintRows(n.el, n.e, 0); timer = setTimeout(tick, delays[0]); }, 1200); return; }
    var r = currentRight(); if (!r) { stop(); return; }
    frame = 0; paintRows(r.el, r.e, 0); timer = setTimeout(tick, delays[0]);
  }
  playBtn.addEventListener('click', play);
})();
