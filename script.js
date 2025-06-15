let currentLang = 'ko';

function setLang(lang) {
  currentLang = lang;
  fetch('lang-data.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('greeting').innerText = data.greeting[lang];
      document.getElementById('intro').innerText = data.intro[lang];
    });
}

// 기본 언어로 초기화
setLang(currentLang);