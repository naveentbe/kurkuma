(function () {
  const AUTOPLAY_MS = 5000;
  const SWIPE_THRESHOLD = 48;

  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector(".card-carousel-track");
    const slides = [...root.querySelectorAll(".card-carousel-slide")];
    const prevBtn = root.querySelector(".card-carousel-btn--prev");
    const nextBtn = root.querySelector(".card-carousel-btn--next");
    const dotsContainer = root.querySelector(".card-carousel-dots");

    if (!track || slides.length === 0) return;

    let index = 0;
    let autoplayTimer = null;
    let touchStartX = 0;
    let touchStartY = 0;

    slides.forEach((_, i) => {
      if (!dotsContainer) return;
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `card-carousel-dot${i === 0 ? " is-active" : ""}`;
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Photo ${i + 1}`);
      dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
      dot.addEventListener("click", () => {
        goTo(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer ? [...dotsContainer.querySelectorAll(".card-carousel-dot")] : [];

    function goTo(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;

      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });

      slides.forEach((slide, i) => {
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    prevBtn?.addEventListener("click", () => {
      goTo(index - 1);
      resetAutoplay();
    });

    nextBtn?.addEventListener("click", () => {
      goTo(index + 1);
      resetAutoplay();
    });

    root.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
        resetAutoplay();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
        resetAutoplay();
      }
    });

    root.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
      },
      { passive: true }
    );

    root.addEventListener(
      "touchend",
      (event) => {
        const deltaX = touchStartX - event.changedTouches[0].clientX;
        const deltaY = touchStartY - event.changedTouches[0].clientY;

        if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;

        goTo(deltaX > 0 ? index + 1 : index - 1);
        resetAutoplay();
      },
      { passive: true }
    );

    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", (event) => {
      if (!root.contains(event.relatedTarget)) startAutoplay();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    goTo(0);
    startAutoplay();
  });
})();
