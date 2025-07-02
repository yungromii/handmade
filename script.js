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