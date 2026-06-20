(function () {
  const backdrop = document.getElementById("reservation-modal");
  if (!backdrop) return;

  let lang = "fr";
  let step = "booking";
  let guests = 2;
  let selectedDate = null;
  let dateMode = "today";
  let seating = "none";
  let time = "";
  let loading = false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const els = {
    policy: document.getElementById("modal-policy"),
    stepBooking: document.getElementById("step-booking"),
    stepContact: document.getElementById("step-contact"),
    stepSuccess: document.getElementById("step-success"),
    stepError: document.getElementById("step-error"),
    guestGrid: document.getElementById("guest-grid"),
    guestLabel: document.getElementById("accordion-guests-label"),
    dateGrid: document.getElementById("date-grid"),
    dateLabel: document.getElementById("accordion-date-label"),
    seatingList: document.getElementById("seating-list"),
    seatingLabel: document.getElementById("accordion-seating-label"),
    lunchSlots: document.getElementById("lunch-slots"),
    dinnerSlots: document.getElementById("dinner-slots"),
    timeLabel: document.getElementById("accordion-time-label"),
    largeGroupNotice: document.getElementById("large-group-notice"),
    reserveBtn: document.getElementById("modal-reserve-btn"),
    footer: document.getElementById("modal-footer"),
    langToggle: document.getElementById("lang-toggle"),
    customDateInput: document.getElementById("custom-date-input"),
    contactForm: document.getElementById("contact-form"),
    bookingSummary: document.getElementById("booking-summary"),
    successTitle: document.getElementById("success-title"),
    successDetail: document.getElementById("success-detail"),
    errorMessage: document.getElementById("error-message"),
    errorPhone: document.getElementById("error-phone"),
  };

  function labels() {
    return getLabels(lang);
  }

  function canReserve() {
    return guests < 9 && selectedDate && time && seating;
  }

  function openModal() {
    backdrop.classList.add("open");
    document.body.classList.add("modal-open");
    resetModal();
    renderAll();
  }

  function closeModal() {
    backdrop.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  function resetModal() {
    step = "booking";
    guests = 2;
    selectedDate = new Date(today);
    dateMode = "today";
    seating = "none";
    time = "";
    loading = false;
    if (els.contactForm) els.contactForm.reset();
  }

  function showStep(name) {
    step = name;
    document.querySelectorAll(".modal-step").forEach((el) => el.classList.remove("active"));
    const active = document.getElementById(`step-${name}`);
    if (active) active.classList.add("active");

    if (els.footer) {
      els.footer.style.display = name === "booking" || name === "contact" ? "block" : "none";
    }

    if (name === "contact") updateSummary();
    updateFooterButton();
  }

  function updateFooterButton() {
    if (!els.reserveBtn) return;
    const L = labels();

    if (step === "booking") {
      els.reserveBtn.textContent = L.reserve;
      els.reserveBtn.disabled = !canReserve() || loading;
    } else if (step === "contact") {
      els.reserveBtn.textContent = loading ? L.loading : L.confirm;
      els.reserveBtn.disabled = loading;
    }
  }

  function renderGuests() {
    if (!els.guestGrid) return;
    els.guestGrid.innerHTML = "";
    for (let i = 1; i <= 9; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `guest-btn${guests === i ? " selected" : ""}`;
      btn.textContent = i === 9 ? "+" : String(i);
      btn.addEventListener("click", () => {
        guests = i;
        renderGuests();
        updateAccordionLabels();
        updateFooterButton();
        if (els.largeGroupNotice) {
          els.largeGroupNotice.hidden = guests < 9;
          els.largeGroupNotice.textContent = labels().largeGroup;
        }
      });
      els.guestGrid.appendChild(btn);
    }
  }

  function renderDates() {
    if (!els.dateGrid) return;
    const L = labels();
    els.dateGrid.innerHTML = "";

    const modes = [
      { mode: "today", date: today, label: L.today, sub: formatDisplayDate(today, lang) },
      { mode: "tomorrow", date: tomorrow, label: L.tomorrow, sub: formatDisplayDate(tomorrow, lang) },
      { mode: "other", date: null, label: L.other, sub: "" },
    ];

    modes.forEach(({ mode, date, label, sub }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `date-btn${dateMode === mode ? " selected" : ""}${mode === "other" ? " date-btn-other" : ""}`;
      const isSelectedOther = mode === "other" && dateMode === "other" && selectedDate;
      btn.innerHTML = `<span>${label}</span><span>${isSelectedOther ? formatDisplayDate(selectedDate, lang) : sub}</span>`;

      if (mode === "other") {
        const input = document.createElement("input");
        input.type = "date";
        input.className = "hidden-date-input";
        input.min = formatDateISO(today);
        input.addEventListener("change", (e) => {
          if (e.target.value) {
            selectedDate = new Date(e.target.value + "T12:00:00");
            dateMode = "other";
            renderDates();
            updateAccordionLabels();
            updateFooterButton();
          }
        });
        btn.addEventListener("click", () => input.showPicker?.() || input.click());
        btn.appendChild(input);
      } else {
        btn.addEventListener("click", () => {
          dateMode = mode;
          selectedDate = new Date(date);
          renderDates();
          updateAccordionLabels();
          updateFooterButton();
        });
      }

      els.dateGrid.appendChild(btn);
    });
  }

  function renderSeating() {
    if (!els.seatingList) return;
    els.seatingList.innerHTML = "";
    SEATING_OPTIONS.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `seating-btn${seating === opt.id ? " selected" : ""}`;
      btn.textContent = opt[lang];
      btn.addEventListener("click", () => {
        seating = opt.id;
        renderSeating();
        updateAccordionLabels();
        updateFooterButton();
      });
      els.seatingList.appendChild(btn);
    });
  }

  function renderTimeSlots(container, slots) {
    if (!container) return;
    container.innerHTML = "";
    slots.forEach((slot) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `time-btn${time === slot ? " selected" : ""}`;
      btn.textContent = formatTimeSlot(slot, lang);
      btn.addEventListener("click", () => {
        time = slot;
        renderTimeSlots(els.lunchSlots, LUNCH_SLOTS);
        renderTimeSlots(els.dinnerSlots, DINNER_SLOTS);
        updateAccordionLabels();
        updateFooterButton();
      });
      container.appendChild(btn);
    });
  }

  function updateAccordionLabels() {
    const L = labels();
    if (els.guestLabel) els.guestLabel.textContent = L.guests(guests);
    if (els.dateLabel && selectedDate) {
      els.dateLabel.textContent = formatDisplayDate(selectedDate, lang);
    }
    if (els.seatingLabel) els.seatingLabel.textContent = getSeatingLabel(seating, lang);
    if (els.timeLabel) els.timeLabel.textContent = time ? formatTimeSlot(time, lang) : L.time;
  }

  function updateSummary() {
    if (!els.bookingSummary) return;
    const L = labels();
    els.bookingSummary.innerHTML = `
      <p><strong>${L.guests(guests)}</strong></p>
      <p>${formatDisplayDate(selectedDate, lang)} · ${formatTimeSlot(time, lang)}</p>
      <p>${getSeatingLabel(seating, lang)}</p>
    `;
  }

  function renderAll() {
    if (els.policy) els.policy.textContent = labels().policy;
    if (els.langToggle) els.langToggle.textContent = lang === "fr" ? "EN" : "FR";
    if (els.largeGroupNotice) {
      els.largeGroupNotice.hidden = guests < 9;
      els.largeGroupNotice.textContent = labels().largeGroup;
    }

    const lunchLabel = document.getElementById("lunch-label");
    const dinnerLabel = document.getElementById("dinner-label");
    if (lunchLabel) lunchLabel.textContent = `${labels().lunch} / Lunch`;
    if (dinnerLabel) dinnerLabel.textContent = `${labels().dinner} / Dinner`;

    renderGuests();
    renderDates();
    renderSeating();
    renderTimeSlots(els.lunchSlots, LUNCH_SLOTS);
    renderTimeSlots(els.dinnerSlots, DINNER_SLOTS);
    updateAccordionLabels();
    updateFooterButton();
    showStep(step);
  }

  async function submitReservation(formData) {
    const payload = {
      createdAt: new Date().toISOString(),
      restaurant: SITE.name,
      bookingDate: formatDateISO(selectedDate),
      bookingTime: time,
      guests,
      seating: getSeatingLabel(seating, lang),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      notes: "",
      sourceUrl: window.location.href,
      submittedAt: new Date().toISOString(),
    };

    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await response.text().catch(() => "");

    if (!response.ok || text.includes("Access denied")) {
      throw new Error("Submission failed");
    }

    try {
      const parsed = JSON.parse(text);
      if (parsed.error || parsed.success === false) throw new Error(parsed.error || "Failed");
    } catch (e) {
      if (e instanceof SyntaxError) return;
      throw e;
    }
  }

  document.querySelectorAll("[data-open-reservation]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  document.getElementById("modal-close")?.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
  });

  els.langToggle?.addEventListener("click", () => {
    lang = lang === "fr" ? "en" : "fr";
    renderAll();
  });

  document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const content = trigger.nextElementSibling;
      const isOpen = content?.classList.contains("open");
      document.querySelectorAll(".accordion-content").forEach((c) => c.classList.remove("open"));
      if (!isOpen) content?.classList.add("open");
    });
  });

  els.reserveBtn?.addEventListener("click", async () => {
    if (step === "booking" && canReserve()) {
      showStep("contact");
      return;
    }

    if (step === "contact" && els.contactForm) {
      if (!els.contactForm.checkValidity()) {
        els.contactForm.reportValidity();
        return;
      }

      loading = true;
      updateFooterButton();

      try {
        await submitReservation(new FormData(els.contactForm));
        if (els.successTitle) els.successTitle.textContent = labels().success;
        if (els.successDetail) els.successDetail.textContent = labels().successDetail;
        showStep("success");
      } catch {
        if (els.errorMessage) els.errorMessage.textContent = labels().error;
        if (els.errorPhone) els.errorPhone.textContent = SITE.phone;
        showStep("error");
      } finally {
        loading = false;
        updateFooterButton();
      }
    }
  });

  document.getElementById("back-to-booking")?.addEventListener("click", () => showStep("booking"));
  document.getElementById("close-success")?.addEventListener("click", closeModal);
  document.getElementById("close-error")?.addEventListener("click", closeModal);
  document.getElementById("retry-reservation")?.addEventListener("click", () => showStep("contact"));

  selectedDate = new Date(today);
})();
