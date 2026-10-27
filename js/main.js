(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById('theme-toggle');

  function storeTheme(theme) {
    try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storeTheme(next);
  });

  // Follow system changes only while the visitor hasn't chosen a theme
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var onSystemChange = function (e) {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) {}
    if (saved !== 'light' && saved !== 'dark') applyTheme(e.matches ? 'dark' : 'light');
  };
  if (systemDark.addEventListener) systemDark.addEventListener('change', onSystemChange);
  else if (systemDark.addListener) systemDark.addListener(onSystemChange);

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-toggle');
  var navLinks = document.getElementById('nav-links');

  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navLinks.classList.toggle('is-open', open);
  }

  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });

  navLinks.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('is-open') && !e.target.closest('.nav')) setMenu(false);
  });

  var desktopMq = window.matchMedia('(min-width: 861px)');
  var onDesktop = function (e) { if (e.matches) setMenu(false); };
  if (desktopMq.addEventListener) desktopMq.addEventListener('change', onDesktop);
  else if (desktopMq.addListener) desktopMq.addListener(onDesktop);

  /* ---------- Header border on scroll ---------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');

  // Stagger siblings that share a parent
  reveals.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.classList.contains('reveal');
    });
    var i = siblings.indexOf(el);
    if (i > 0) el.style.setProperty('--delay', Math.min(i * 80, 400) + 'ms');
  });

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px', threshold: 0 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Active nav link ---------- */
  var navMap = {};
  navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) {
    navMap[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navMap[entry.target.id];
        if (!link || !entry.isIntersecting) return;
        Object.keys(navMap).forEach(function (k) {
          navMap[k].classList.remove('is-active');
          navMap[k].removeAttribute('aria-current');
        });
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(navMap).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById('copy-email');
  var copyStatus = document.getElementById('copy-status');

  copyBtn.addEventListener('click', function () {
    var email = copyBtn.getAttribute('data-email');
    var done = function (ok) {
      copyStatus.textContent = ok ? 'Email copied to clipboard.' : 'Copy failed — my email is ' + email;
      clearTimeout(copyBtn._t);
      copyBtn._t = setTimeout(function () { copyStatus.textContent = ''; }, 4000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done(ok);
    }
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
