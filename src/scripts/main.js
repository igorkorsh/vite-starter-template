import "./modules/_navMenu";
import "./modules/_scrollTo";
import "./modules/_activeNavLink";
import "./modules/_addCurrentYear";
import "./modules/_swiper";
// import "./modules/_modalWindow";
// import "./modules/_modalYoutubeVideo";
// import "./modules/_modalBoxVideo";
// import "./modules/_accordion";

import { getScript } from "./modules/_getScript";
import { addCaptcha } from "./modules/_addCaptcha";
import { deStyleMarketo } from "./modules/_deStyleMarketo";

if ("MktoForms2" in window) {
  MktoForms2.whenRendered((form) => {
    deStyleMarketo(form); // Удаляем стили по умолчанию
  });

  MktoForms2.whenReady((form) => {
    getScript("https://www.google.com/recaptcha/api.js?onload=onloadCallback") // Загружаем скрипт динамически
      .then(() => {
        window.onloadCallback = () => addCaptcha(form); // Добавляем капчу
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
