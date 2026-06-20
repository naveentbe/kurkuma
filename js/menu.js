(function () {
  const container = document.getElementById("menu-categories");
  if (!container) return;

  MENU_CATEGORIES.forEach((category) => {
    const section = document.createElement("section");
    section.className = "menu-category animate-on-scroll";
    section.id = category.id;

    let itemsHtml = category.items
      .map(
        (item) => `
      <div class="menu-item">
        <div>
          <h3 class="menu-item-name">${item.name}</h3>
          ${item.description ? `<p class="menu-item-desc">${item.description}</p>` : ""}
        </div>
        ${item.price ? `<span class="menu-item-price">${item.price}</span>` : ""}
      </div>`
      )
      .join("");

    section.innerHTML = `
      <div style="margin-bottom:2rem">
        <h2>${category.title}</h2>
        ${category.subtitle ? `<p class="menu-category-subtitle">${category.subtitle}</p>` : ""}
        <div class="decorative-line" style="margin-top:1rem"></div>
      </div>
      ${itemsHtml}
    `;

    container.appendChild(section);
  });

  if (window.observeAnimations) window.observeAnimations();
})();
