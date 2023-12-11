const triggers = document.querySelectorAll('[data-modal="modalWindow"]');

const openModal = (event) => {
  event.preventDefault();

  const modal = document.getElementById(event.target.dataset.modal);
  document.body.classList.add("no-scroll");
  modal.classList.add("open");

  const closeModal = (event) => {
    event.preventDefault();

    if (!event.target.matches(".modal__content")) {
      document.body.classList.remove("no-scroll");
      modal.classList.remove("open");
    }
  };

  modal.addEventListener("click", closeModal);
};

for (const trigger of triggers) {
  trigger.addEventListener("click", openModal);
}
