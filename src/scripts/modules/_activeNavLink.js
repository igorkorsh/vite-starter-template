const sections = document.querySelectorAll("section[id]");

const handleScroll = () => {
  for (const section of sections) {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute("id");
    const link = document.querySelector(`a[href="#${sectionId}"]`);

    if (link) {
      if (window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight) {
        if (link.classList.contains("nav__menu-link")) {
          link.classList.add("active");
        }
      } else {
        link.classList.remove("active");
      }
    }
  }
};

window.addEventListener("DOMContentLoaded", handleScroll);
window.addEventListener("scroll", handleScroll);
