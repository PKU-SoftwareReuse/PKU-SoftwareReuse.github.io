(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var nav = document.getElementById('site-nav');
  var toggle = nav && nav.querySelector('.site-nav__toggle');
  var links = nav && nav.querySelector('.site-nav__links');
  var masthead = document.querySelector('.masthead');
  var progress = document.querySelector('.site-scroll-progress span');
  var hero = document.querySelector('.home-hero');

  root.classList.add('motion-ready');

  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);

    var icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', !open);
      icon.classList.toggle('fa-xmark', open);
    }
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });

    links.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNav(false);
    });

    document.addEventListener('click', function (event) {
      if (nav.classList.contains('is-open') && !nav.contains(event.target)) setNav(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setNav(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) setNav(false);
    });
  }

  document.querySelectorAll('.author__urls-wrapper button').forEach(function (button) {
    button.addEventListener('click', function () {
      var list = button.parentElement.querySelector('.author__urls');
      if (!list) return;
      var open = list.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  function initPublicationYearFilter() {
    var filter = document.querySelector('[data-publication-year-filter]');
    if (!filter) return;

    var status = filter.querySelector('[data-publication-result-count]');
    var options = Array.from(filter.querySelectorAll('[data-publication-year-option]'));
    var items = Array.from(document.querySelectorAll('.publication-item[data-publication-year]'));
    var groups = Array.from(document.querySelectorAll('[data-publication-group]'));
    var recentYearCutoff = Number(filter.dataset.publicationYearCutoff);
    if (!status || !options.length || !items.length || !Number.isFinite(recentYearCutoff)) return;

    function applyYear(year) {
      var visibleCount = 0;

      items.forEach(function (item) {
        var itemYear = Number(item.dataset.publicationYear);
        var visible = year === 'all' ||
          (year === 'before' && itemYear < recentYearCutoff) ||
          item.dataset.publicationYear === year;
        item.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      options.forEach(function (option) {
        var active = option.dataset.publicationYearOption === year;
        option.classList.toggle('is-active', active);
        option.setAttribute('aria-pressed', String(active));
      });

      groups.forEach(function (group) {
        var empty = group.querySelector('[data-publication-empty]');
        if (empty) empty.hidden = Boolean(group.querySelector('.publication-item:not([hidden])'));
      });

      status.textContent = visibleCount + ' 篇论文';
    }

    var url = new URL(window.location.href);
    var requestedYear = url.searchParams.get('year');
    var hasRequestedYear = options.some(function (option) {
      return option.dataset.publicationYearOption === requestedYear;
    });
    var selectedYear = hasRequestedYear ? requestedYear : 'all';

    applyYear(selectedYear);
    filter.hidden = false;

    options.forEach(function (option) {
      option.addEventListener('click', function () {
        selectedYear = option.dataset.publicationYearOption;
        applyYear(selectedYear);

        if (selectedYear === 'all') {
          url.searchParams.delete('year');
        } else {
          url.searchParams.set('year', selectedYear);
        }
        window.history.replaceState(null, '', url.toString());
      });
    });
  }

  initPublicationYearFilter();

  var scrollFrame = 0;
  var pointerX = 0;
  var pointerY = 0;

  function updateHeroPosition() {
    if (!hero || reduceMotion) return;
    var scrollShift = Math.min(window.scrollY * 0.055, 28);
    hero.style.setProperty('--hero-shift-x', pointerX.toFixed(2) + 'px');
    hero.style.setProperty('--hero-shift-y', (pointerY + scrollShift).toFixed(2) + 'px');
  }

  function updateScrollState() {
    scrollFrame = 0;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = scrollRange > 0 ? Math.min(scrollTop / scrollRange, 1) : 0;

    if (masthead) masthead.classList.toggle('is-scrolled', scrollTop > 18);
    if (progress) progress.style.transform = 'scaleX(' + ratio + ')';
    updateHeroPosition();
  }

  window.addEventListener('scroll', function () {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollState);
  }, { passive: true });

  updateScrollState();

  if (hero && finePointer && !reduceMotion) {
    hero.addEventListener('pointermove', function (event) {
      var rect = hero.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      updateHeroPosition();
    });

    hero.addEventListener('pointerleave', function () {
      pointerX = 0;
      pointerY = 0;
      updateHeroPosition();
    });
  }

  function addRevealItems(selector, stagger) {
    document.querySelectorAll(selector).forEach(function (element, index) {
      element.classList.add('reveal-item');
      element.style.setProperty('--reveal-delay', ((index % stagger) * 80) + 'ms');
    });
  }

  function attachTilt(selector, maxX, maxY) {
    document.querySelectorAll(selector).forEach(function (element) {
      element.addEventListener('pointermove', function (event) {
        var rect = element.getBoundingClientRect();
        var relativeX = (event.clientX - rect.left) / rect.width - 0.5;
        var relativeY = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty('--tilt-x', (-relativeY * maxX).toFixed(2) + 'deg');
        element.style.setProperty('--tilt-y', (relativeX * maxY).toFixed(2) + 'deg');
      });

      element.addEventListener('pointerleave', function () {
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  function animateCount(element) {
    if (element.dataset.counted === 'true') return;
    element.dataset.counted = 'true';
    var target = Number(element.dataset.countTarget || element.textContent.trim());
    if (!Number.isFinite(target)) return;
    var duration = 1150;
    var startTime = 0;

    function tick(time) {
      if (!startTime) startTime = time;
      var progressValue = Math.min((time - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progressValue, 3);
      element.textContent = String(Math.round(target * eased));
      if (progressValue < 1) window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  if (!reduceMotion) {
    addRevealItems('.home-team__intro > .section-kicker, .home-team__intro > h2, .home-team__intro > p, .home-team__intro > .text-link', 4);
    addRevealItems('.home-team__visual', 1);
    addRevealItems('.home-leader', 2);
    addRevealItems('.home-member-collage__item', 7);
    addRevealItems('.home-vision__content > .section-kicker, .home-vision__content > h2, .home-vision__content > p, .home-vision__content > .text-link', 4);
    addRevealItems('.home-vision__principles article', 3);
    addRevealItems('.home-section .section-heading', 1);
    addRevealItems('.home-research-card', 3);
    addRevealItems('.home-project-card', 3);
    addRevealItems('.home-paper', 3);
    addRevealItems('.home-output__news', 1);
    addRevealItems('.home-contact__inner > div', 2);
    addRevealItems('.people-section, .academic-card, .publication-item, .news-item, .join-panel', 5);

    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    document.querySelectorAll('.reveal-item').forEach(function (element) {
      revealObserver.observe(element);
    });

    var countObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.75 });

    document.querySelectorAll('.home-stats dt').forEach(function (element) {
      element.dataset.countTarget = element.textContent.trim();
      element.textContent = '0';
      countObserver.observe(element);
    });

    if (finePointer) {
      attachTilt('.home-research-card', 5, 6);
      attachTilt('.home-leader', 4, 5);
      document.querySelectorAll('.home-project-card__media').forEach(function (media) {
        var visual = media.querySelector('img, .home-project-card__placeholder');
        if (!visual) return;

        media.addEventListener('pointermove', function (event) {
          var rect = media.getBoundingClientRect();
          var x = ((event.clientX - rect.left) / rect.width - 0.5) * 9;
          var y = ((event.clientY - rect.top) / rect.height - 0.5) * 7;
          visual.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) scale(1.055)';
        });

        media.addEventListener('pointerleave', function () {
          visual.style.transform = '';
        });
      });
    }
  }

  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      root.classList.add('motion-loaded');
    });
  });
})();
