function updateProgress(progress) {
  if (!progress) return;

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${amount}%`;
}

function syncParallax(parallaxItems, reduceMotion) {
  if (reduceMotion.matches) return;

  const viewportHeight = window.innerHeight;
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    const rect = item.getBoundingClientRect();
    const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
    const y = centerOffset * speed * -1;
    item.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
  });
}

export function initScrollEffects() {
  const progress = document.querySelector(".scroll-progress");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
  let ticking = false;

  function requestScrollSync() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateProgress(progress);
      syncParallax(parallaxItems, reduceMotion);
      ticking = false;
    });
  }

  window.addEventListener("scroll", requestScrollSync, { passive: true });
  window.addEventListener("resize", requestScrollSync);
  requestScrollSync();
}
