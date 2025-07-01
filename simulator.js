document.addEventListener("DOMContentLoaded", () => {
  const totalDisplay = document.getElementById("totalPrice");

  let selectedDesign = null;
  let selectedDifficulty = null;
  let selectedOptions = {
    zipper: false,
    decor: false,
    hook: false,
  };

  const updatePrice = () => {
    let total = 0;
    if (selectedDesign) {
      total += parseInt(selectedDesign.dataset.price);
    }
    if (selectedDifficulty) {
      total += parseInt(selectedDifficulty.dataset.price);
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

      // Show sub-options based on index
      if (index === 0) {
        document.getElementById("wallet-options").style.display = "block";
      } else if (index === 1) {
        document.getElementById("pouch-big-options").style.display = "block";
      } else if (index === 2) {
        document.getElementById("pouch-small-options").style.display = "block";
      }

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

  updatePrice(); // initialize
});