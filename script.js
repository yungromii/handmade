let currentLang = 'ko';

// 언어 바꾸기
function setLang(lang) {
  currentLang = lang;
  fetch('lang-data.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('notice').innerText = data.notice[lang];
      document.getElementById('contact').innerText = data.contact[lang];
    });

  // 언어 메뉴 닫기
  document.getElementById('lang-menu').classList.add('hidden');
}

// 초기 세팅
setLang(currentLang);

// 언어 토글
document.getElementById('lang-icon').addEventListener('click', () => {
  document.getElementById('lang-menu').classList.toggle('hidden');
});

// 메뉴 토글
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('show');
});