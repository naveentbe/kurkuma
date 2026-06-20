(function () {
  const header = document.getElementById("site-header");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");

  if (!header) return;

  const pageName = window.location.pathname.split("/").pop() || "index.html";
  const isHome = pageName === "index.html" || pageName === "";
  const sectionIds = ["esprit", "cuisine", "soirees", "galerie", "contact"];

  function setMobileMenu(open) {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    if (menuIconOpen) menuIconOpen.hidden = open;
    if (menuIconClose) menuIconClose.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      setMobileMenu(!mobileMenu.classList.contains("open"));
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMobileMenu(false);
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => setMobileMenu(false));
  });

  function updateActiveNav() {
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    let activeHash = "";

    if (isHome) {
      if (window.scrollY < 80 && !window.location.hash) {
        activeHash = "";
      } else {
        const headerOffset = 120;
        for (const id of [...sectionIds].reverse()) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= headerOffset) {
            activeHash = `#${id}`;
            break;
          }
        }
        if (!activeHash && window.location.hash) {
          activeHash = window.location.hash;
        }
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      let active = false;

      if (href === "index.html" || href === "./" || href === "/") {
        active = isHome && !activeHash;
      } else if (href.startsWith("index.html#") || href.startsWith("#")) {
        const hash = href.includes("#") ? "#" + href.split("#")[1] : "";
        active = isHome && activeHash === hash;
      } else if (href.includes("menu")) {
        active = pageName.includes("menu");
      }

      link.classList.toggle("active", active);
    });
  }

  if (isHome) {
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("hashchange", updateActiveNav);
    updateActiveNav();
  }

  document.getElementById("footer-year").textContent = new Date().getFullYear();
})();
