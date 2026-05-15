const observed = new WeakSet();

let observer = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
  }
  return observer;
}

/** Attach intersection observer to any .reveal nodes not yet observed (safe to call multiple times). */
export function observeReveals() {
  const obs = getObserver();
  document.querySelectorAll('.reveal').forEach((el) => {
    if (!observed.has(el)) {
      observed.add(el);
      obs.observe(el);
    }
  });
}
