document.addEventListener("DOMContentLoaded", () => {
  const projectList = document.getElementById("project-list");
  if (projectList) {
    fetch("data/projects.json")
      .then(res => res.json())
      .then(projects => {
        renderProjects(projects);
        setupFilters(projects);
      })
      .catch(err => console.error("Projects load error:", err));
  }
});

function renderProjects(projects) {
  const container = document.getElementById("project-list");
  if (!container) return;

  container.innerHTML = projects.map(p => `
    <article class="project-card" data-lang="${p.lang}">
      <h3>${p.title}</h3>
      <span class="tag">${p.lang}</span>
      <p>${p.desc}</p>
      ${p.link ? `<a href="${p.link}" target="_blank" class="project-link">View</a>` : ""}
    </article>
  `).join("");
}

function setupFilters(projects) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      const cards = document.querySelectorAll(".project-card");
      cards.forEach(card => {
        const lang = card.getAttribute("data-lang");
        card.style.display =
          filter === "All" || filter === lang ? "block" : "none";
      });
    });
  });
}
