const triggers = document.querySelectorAll("[data-url]");
let video;
let savedUrl;

const getVideoURL = (url) => {
  if (url.includes("dl=1")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}dl=1`;
};

const openModal = (event) => {
  event.preventDefault();

  const target = event.target;
  const element = document.getElementById("boxplayer");
  if (!element) return;

  // Открываем модальное окно
  const modal = document.getElementById(target.dataset.modal);
  document.body.classList.add("no-scroll");
  modal.classList.add("open");

  const videoUrl = getVideoURL(target.dataset.url);
  const posterUrl = target.dataset.poster;

  if (!video || savedUrl !== videoUrl) {
    element.textContent = "";

    // Создаем плеер
    video = document.createElement("video");
    video.setAttribute("width", 800);
    video.setAttribute("height", 450);
    video.setAttribute("controls", true);
    video.setAttribute("playsInline", true);
    video.setAttribute("src", videoUrl);
    video.setAttribute("poster", posterUrl);

    element.appendChild(video);
  }

  if (video) {
    video.play();
  }

  // Закрываем модальное окно
  const closeModal = (event) => {
    event.preventDefault();

    if (!event.target.classList.contains("modal__media")) {
      document.body.classList.remove("no-scroll");
      modal.classList.remove("open");

      if (video) {
        video.pause();
        savedUrl = videoUrl;
      }
    }
  };

  modal.addEventListener("click", closeModal);
};

for (const trigger of triggers) {
  trigger.addEventListener("click", openModal);
}
