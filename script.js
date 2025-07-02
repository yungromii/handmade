let currentLang = 'ko';

// 언어 바꾸기
function setLang(lang) {
  currentLang = lang;
  fetch('lang-data.json')
    .then(response => response.json())
    .then(data => {
      const notice = document.getElementById('notice');
      if (notice) notice.innerText = data.notice[lang];

      const contact = document.getElementById('contact');
      if (contact) contact.innerText = data.contact[lang];

      const inform = document.getElementById('inform');
      if (inform) inform.innerText = data.inform[lang];

      const order = document.getElementById('order');
      if (order) order.innerText = data.order[lang];

      const wallet = document.getElementById('wallet');
      if (wallet) wallet.innerText = data.wallet[lang];

      const penpouch = document.getElementById('penpouch');
      if (penpouch) penpouch.innerText = data.penpouch[lang];

      const pouch = document.getElementById('pouch');
      if (pouch) pouch.innerText = data.pouch[lang];
    });

  // 언어 메뉴 닫기
  document.getElementById('lang-menu').classList.add('hidden');
}

// 초기 세팅 (DOM 로드 후 실행)
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
});

// 언어 토글
document.getElementById('lang-icon').addEventListener('click', () => {
  document.getElementById('lang-menu').classList.toggle('hidden');
});

// 메뉴 토글
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('show');
});

// 단일 선택: 잠금 방식 버튼
// Removed previous DOMContentLoaded listener for lock-buttons

// 가격 계산 함수에 잠금 방식 반영
function updatePrice() {
  let price = 0;

  // 디자인 선택
  const selectedDesign = document.querySelector('.design-btn.selected');
  if (selectedDesign) {
    price += parseInt(selectedDesign.getAttribute('data-price')) || 0;
  }

  // 추가 옵션
  const selectedOptions = document.querySelectorAll('.option-btn.selected');
  selectedOptions.forEach(option => {
    price += parseInt(option.getAttribute('data-price')) || 0;
  });

  // 작업 난이도
  const selectedDifficulty = document.querySelector('.difficulty-btn.selected');
  if (selectedDifficulty) {
    price += parseInt(selectedDifficulty.getAttribute('data-price')) || 0;
  }

  // 잠금 방식 (단일 선택)
  const selectedLock = document.querySelector('.lock-btn.selected');
  console.log('Selected lock:', selectedLock); // ← 디버깅용
  if (selectedLock) {
    price += parseInt(selectedLock.getAttribute('data-price')) || 0;
  }

  const priceElement = document.getElementById('price');
  if (priceElement) {
    priceElement.innerText = `${price}원`;
  }
}

// 각 버튼 클릭 시 가격 업데이트 연결
function bindPriceButtons() {
  const allButtons = document.querySelectorAll('.design-btn, .option-btn, .difficulty-btn, .lock-btn');
  allButtons.forEach(button => {
    button.addEventListener('click', updatePrice);
  });
}

// DOMContentLoaded 시 한 번만 실행
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);

  const lockButtons = document.querySelectorAll('.lock-btn');
  lockButtons.forEach(button => {
    button.addEventListener('click', () => {
      lockButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      updatePrice();
    });
  });

  bindPriceButtons();
});