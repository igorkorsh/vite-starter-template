const scrollLinks = document.querySelectorAll("a[href^='#']");

const calculateSpacing = () => (window.matchMedia("(min-width: 1024px)").matches ? 64 : 54);

for (const link of scrollLinks) {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (!event.target.hash) return;

    const element = document.querySelector(event.target.hash);

    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY - calculateSpacing();

      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
    }
  });
}
