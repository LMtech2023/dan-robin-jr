document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealEls.forEach((el) => observer.observe(el));

  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeaderShadow = () => {
      header.classList.toggle('site-header--scrolled', window.scrollY > 10);
    };
    updateHeaderShadow();
    window.addEventListener('scroll', updateHeaderShadow);
  }

  const navToggle = document.querySelector('.site-header__toggle');
  const navOverlay = document.querySelector('.site-header__overlay');
  const siteNav = document.getElementById('site-nav');
  const navLinks = siteNav?.querySelectorAll('.site-nav__link');

  const setNavOpen = (open) => {
    if (!header || !navToggle) return;
    header.classList.toggle('site-header--nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    navOverlay?.setAttribute('aria-hidden', String(!open));
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
