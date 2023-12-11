const triggers = document.querySelectorAll("[data-ytvideo]");
let player;
let savedId;
let time;

const openModal = (event) => {
  event.preventDefault();

  const target = event.target;
  const element = document.getElementById("ytplayer");
  if (!element) return;

  const videoId = target.dataset.ytvideo;

  // Открываем модальное окно
  const modal = document.getElementById(target.dataset.modal);
  document.body.classList.add("no-scroll");
  modal.classList.add("open");

  if (!player) {
    // Добавляем скрипт YouTube
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/player_api";
    document.head.prepend(script);

    // Создаем плеер
    window.onYouTubePlayerAPIReady = () => {
      player = new YT.Player("ytplayer", {
        width: "800",
        height: "450",
        videoId: videoId,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
        },
      });
    };
  } else {
    // Если мы закрываем окно, а затем открываем – видео продолжает воспроизведение с того же момента
    // Однако, если мы открываем новое видео, то видео воспроизводится сначала
    if (videoId !== savedId) {
      time = 0;
      savedId = videoId;
    }

    player.loadVideoById(videoId, time);
  }

  // Закрываем модальное окно
  const closeModal = (event) => {
    event.preventDefault();

    if (!event.target.classList.contains("modal__media")) {
      document.body.classList.remove("no-scroll");
      modal.classList.remove("open");
      player.pauseVideo();
      time = player.getCurrentTime();
      savedId = videoId;
    }
  };

  modal.addEventListener("click", closeModal);
};

for (const trigger of triggers) {
  trigger.addEventListener("click", openModal);
}
