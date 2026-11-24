/* =============================================
   ROHIT AGARWALA — Photo viewer (Gallery page)

   Every <a class="photo" data-album="..."> opens its full-size photo here.
   The arrows move through the photos of the same album, in page order.
   Keys: ← and → to move, Esc to close. On phones, swipe left or right.
   Without JavaScript the links still work: they open the photo directly.
   ============================================= */
(function () {
  'use strict';

  const links = Array.from(document.querySelectorAll('a.photo[data-album]'));
  if (!links.length) return;

  const ARROW_LEFT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  const ARROW_RIGHT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  const CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  // Build the viewer once and reuse it for every photo
  const viewer = document.createElement('div');
  viewer.className = 'viewer';
  viewer.hidden = true;
  viewer.setAttribute('role', 'dialog');
  viewer.setAttribute('aria-modal', 'true');
  viewer.setAttribute('aria-label', 'Photo viewer');
  viewer.innerHTML =
    '<button type="button" class="viewer-btn viewer-prev" aria-label="Previous photo">' + ARROW_LEFT + '</button>' +
    '<figure class="viewer-figure">' +
      '<img class="viewer-img" alt="">' +
      '<figcaption class="viewer-caption"></figcaption>' +
      '<p class="viewer-count" aria-live="polite"></p>' +
    '</figure>' +
    '<button type="button" class="viewer-btn viewer-next" aria-label="Next photo">' + ARROW_RIGHT + '</button>' +
    '<button type="button" class="viewer-btn viewer-close" aria-label="Close photo viewer">' + CROSS + '</button>';
  document.body.appendChild(viewer);

  const img = viewer.querySelector('.viewer-img');
  const caption = viewer.querySelector('.viewer-caption');
  const count = viewer.querySelector('.viewer-count');
  const figure = viewer.querySelector('.viewer-figure');
  const prevBtn = viewer.querySelector('.viewer-prev');
  const nextBtn = viewer.querySelector('.viewer-next');
  const closeBtn = viewer.querySelector('.viewer-close');

  let album = [];     // photo links of the open album, in page order
  let index = 0;      // which of them is showing
  let opener = null;  // the link that opened the viewer; focus returns to it on close

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      open(link);
    });
  });

  function open(link) {
    album = links.filter(function (l) { return l.dataset.album === link.dataset.album; });
    index = album.indexOf(link);
    opener = link;
    const single = album.length < 2;
    prevBtn.hidden = single;
    nextBtn.hidden = single;
    show();
    viewer.hidden = false;
    document.body.classList.add('viewer-open');
    closeBtn.focus();
  }

  function close() {
    viewer.hidden = true;
    document.body.classList.remove('viewer-open');
    img.removeAttribute('src');
    if (opener) opener.focus();
  }

  function step(delta) {
    index = (index + delta + album.length) % album.length;
    show();
  }

  function show() {
    const link = album[index];
    const thumb = link.querySelector('img');
    img.src = link.href;
    img.alt = thumb ? thumb.alt : '';
    caption.textContent = link.dataset.caption || '';
    count.textContent = (index + 1) + ' / ' + album.length;
    // Load the neighbouring photos in the background so the arrows feel instant
    [1, -1].forEach(function (d) {
      new Image().src = album[(index + d + album.length) % album.length].href;
    });
  }

  prevBtn.addEventListener('click', function () { step(-1); });
  nextBtn.addEventListener('click', function () { step(1); });
  closeBtn.addEventListener('click', close);

  // A click on the dark background (not on the photo or its caption) closes the viewer
  viewer.addEventListener('click', function (event) {
    if (event.target === viewer || event.target === figure) close();
  });

  document.addEventListener('keydown', function (event) {
    if (viewer.hidden) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'ArrowRight' && album.length > 1) step(1);
    else if (event.key === 'ArrowLeft' && album.length > 1) step(-1);
    else if (event.key === 'Tab') keepFocusInside(event);
  });

  // Keep Tab cycling through the viewer's buttons while it is open
  function keepFocusInside(event) {
    const buttons = [prevBtn, nextBtn, closeBtn].filter(function (b) { return !b.hidden; });
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
    else if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
    else if (buttons.indexOf(document.activeElement) === -1) { first.focus(); event.preventDefault(); }
  }

  // Swipe left / right on touch screens
  let touchStartX = null;
  viewer.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });
  viewer.addEventListener('touchend', function (event) {
    if (touchStartX === null || album.length < 2) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchStartX = null;
  });
})();
