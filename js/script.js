document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var headerInner = document.querySelector('.header-inner');

  if (!toggle || !headerInner) return;

  toggle.addEventListener('click', function () {
    var isOpen = headerInner.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('.main-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      headerInner.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});
