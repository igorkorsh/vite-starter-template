const accordions = document.querySelectorAll("[data-accordion]");

const showAccordion = (header, panel) => {
  header.setAttribute("aria-expanded", true);
  panel.classList.add("show");
  panel.style.maxHeight = `${panel.scrollHeight}px`;
};

const hideAccordion = (header, panel) => {
  header.setAttribute("aria-expanded", false);
  panel.classList.remove("show");
  panel.style.maxHeight = null;
};

const toggleAccordion = (event) => {
  event.preventDefault();

  const header = event.target;
  const panel = header.nextElementSibling;
  let isExpanded = header.getAttribute("aria-expanded") === "true";

  if (isExpanded) {
    hideAccordion(header, panel);
  } else {
    showAccordion(header, panel);
  }
};

for (const accordion of accordions) {
  accordion.addEventListener("click", (event) => {
    if (event.target.matches("[data-header]")) {
      const panels = accordion.querySelectorAll("[data-panel]");

      // Закрываем все панели
      for (const panel of panels) {
        const header = panel.previousElementSibling;
        if (header !== event.target) {
          hideAccordion(header, panel);
        }
      }

      toggleAccordion(event);
    }
  });
}
