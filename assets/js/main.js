// Öffnungszeiten: Täglich 16:30–23:00 Uhr, Dienstag Ruhetag
(function () {
  var pill = document.getElementById('statusPill');
  if (pill) {
    var now = new Date();
    var day = now.getDay(); // 0=Sonntag ... 2=Dienstag
    var minutes = now.getHours() * 60 + now.getMinutes();
    var isOpen = day !== 2 && minutes >= (16 * 60 + 30) && minutes < (23 * 60);
    if (!isOpen) {
      pill.textContent = '● ' + (day === 2 ? 'Dienstag Ruhetag' : 'Geschlossen');
      pill.style.background = 'var(--color-secondary)';
    }
  }

  var todayRow = document.querySelector('.hours-table tr[data-day="' + new Date().getDay() + '"]');
  if (todayRow) todayRow.classList.add('today');

  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
})();
