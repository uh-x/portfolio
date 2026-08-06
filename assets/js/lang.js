function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-lang]").forEach(el => {
        const key = el.getAttribute("data-lang");
        if (data[key]) {
          el.textContent = data[key];
        }
      });
    })
    .catch(err => console.error("Language load error:", err));
}

function initLanguage() {
  const saved = localStorage.getItem("portfolio_lang");
  const userLang = saved || (navigator.language || "en").substring(0, 2);
  const lang = ["en", "ur", "fr"].includes(userLang) ? userLang : "en";

  const select = document.getElementById("langSwitcher");
  if (select) {
    select.value = lang;
    select.addEventListener("change", e => {
      const chosen = e.target.value;
      localStorage.setItem("portfolio_lang", chosen);
      loadLanguage(chosen);
    });
  }

  loadLanguage(lang);
}

document.addEventListener("DOMContentLoaded", initLanguage);

