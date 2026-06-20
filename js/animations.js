(function () {
  function observeElements() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-80px", threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll:not(.is-visible)").forEach((el) => observer.observe(el));
  }

  observeElements();
  window.observeAnimations = observeElements;
})();
