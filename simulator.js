document.addEventListener("DOMContentLoaded", () => {
  const totalDisplay = document.getElementById("totalPrice");

  let i18nText = null;

  function applyTranslations() {
    const lang = window.lang || "ko";
    if (!i18nText) return;
    for (const id in i18nText) {
      const el = document.getElementById(id);
      if (!el) {
        console.warn(`Element with id "${id}" not found in DOM`);
        continue;
      }
      if (!i18nText[id][lang]) {
        console.warn(`No translation for id "${id}" in lang "${lang}"`);
        continue;
      }
      el.textContent = i18nText[id][lang];
    }
  }

  fetch("lang-data.json")
    .then(res => res.json())
    .then(data => {
      i18nText = data;
      applyTranslations();
    });

  let selectedDesign = null;
  let selectedDifficulty = null;
  let selectedOptions = {
    zipper: false,
    deco: false,
    hook: false,
    flap: false,
    coin: false,
    cash: false,
    lettering: false,
    drawstring: false,
    button: false,
    velcro: false,
  };
  let selectedLock = null;

  const updatePrice = () => {
    let total = 0;
    if (selectedDesign) {
      total += parseInt(selectedDesign.dataset.price);
    }
    if (selectedDifficulty) {
      total += parseInt(selectedDifficulty.dataset.price);
    }
    if (selectedLock) {
      total += parseInt(selectedLock.dataset.price);
    }
    for (const key in selectedOptions) {
      if (selectedOptions[key]) {
        const el = document.querySelector(`.option-btn[data-type="${key}"]`);
        if (el) total += parseInt(el.dataset.price);
      }
    }
    totalDisplay.textContent = `₩${total.toLocaleString()}`;
  };

  // Design selection
  document.querySelectorAll('.design-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.design-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedDesign = btn;

      // Hide all sub-option sections
      document.getElementById("wallet-options").style.display = "none";
      document.getElementById("pouch-big-options").style.display = "none";
      document.getElementById("pouch-small-options").style.display = "none";
      document.getElementById("pouch-etc-options").style.display = "none";

      // Show sub-options based on index
      if (index === 0) {
        document.getElementById("wallet-options").style.display = "block";
      } else if (index === 1) {
        document.getElementById("pouch-big-options").style.display = "block";
      } else if (index === 2) {
        document.getElementById("pouch-small-options").style.display = "block";
        document.getElementById("pouch-etc-options").style.display = "block";
      }

      applyTranslations();

      updatePrice();
    });
  });

  // Difficulty selection
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedDifficulty = btn;
      updatePrice();
    });
  });

  // Option toggle buttons
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      selectedOptions[type] = !selectedOptions[type];
      btn.classList.toggle('selected');
      updatePrice();
    });
  });

  // Lock selection
  document.querySelectorAll('.lock-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lock-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedLock = btn;
      updatePrice();
    });
  });

  updatePrice(); // initialize
});