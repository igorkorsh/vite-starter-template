const navToggler = document.querySelector(".nav__toggler");
const navMenu = document.querySelector(".nav__menu");

// Открываем и закрываем меню при нажатии на кнопку
const toggleMenu = () => {
  const isExpanded = navToggler.getAttribute("aria-expanded") === "true";
  navToggler.setAttribute("aria-expanded", !isExpanded);
  navMenu.classList.toggle("open");
};

// Закрываем меню если размер окна браузера стал больше или равен 1024px
const handleResize = () => {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    navToggler.setAttribute("aria-expanded", false);
    navMenu.classList.remove("open");
  }
};

// Добавляем обработчики событий
if (navToggler && navMenu) {
  navToggler.addEventListener("click", toggleMenu);
  window.addEventListener("resize", handleResize);
}
