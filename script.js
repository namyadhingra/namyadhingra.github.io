// Build the patch-grid squares (a small nod to vision-transformer patch tokenization)
// and stagger their fade-in once, on load.
(function buildPatchGrid() {
  const grid = document.querySelector('.patch-grid');
  if (!grid) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cols = 8, rows = 5;
  const total = cols * rows;

  for (let i = 0; i < total; i++) {
    const span = document.createElement('span');
    if (reduceMotion) {
      span.style.opacity = '0.5';
    } else {
      const delay = (Math.random() * 0.6).toFixed(2);
      span.style.animationDelay = `${delay}s`;
    }
    grid.appendChild(span);
  }
})();

// Lightweight active-section highlight in the rail nav.
(function highlightActiveSection() {
  const links = Array.from(document.querySelectorAll('.rail-nav a'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = '#' + entry.target.id;
        const link = links.find((l) => l.getAttribute('href') === id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.style.color = '');
          link.style.color = 'var(--indigo)';
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
})();