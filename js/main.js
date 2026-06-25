document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealEls.forEach((el) => observer.observe(el));

  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow =
        window.scrollY > 10
          ? '0 4px 30px rgba(0,0,0,0.7)'
          : '0 4px 30px rgba(0,0,0,0.5)';
    });
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navOverlay = document.querySelector('.nav-overlay');
  const siteNav = document.getElementById('site-nav');
  const navLinks = siteNav?.querySelectorAll('a');

  const setNavOpen = (open) => {
    if (!header || !navToggle) return;
    header.classList.toggle('site-header--nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (navOverlay) {
      navOverlay.setAttribute('aria-hidden', String(!open));
    }
  };

  navToggle?.addEventListener('click', () => {
    const isOpen = header?.classList.contains('site-header--nav-open');
    setNavOpen(!isOpen);
  });

  navOverlay?.addEventListener('click', () => setNavOpen(false));

  navLinks?.forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header?.classList.contains('site-header--nav-open')) {
      setNavOpen(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && header?.classList.contains('site-header--nav-open')) {
      setNavOpen(false);
    }
  });
});
