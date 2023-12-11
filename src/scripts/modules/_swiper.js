import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

const slider = new Swiper(".swiper", {
  modules: [Navigation, Pagination],
  spaceBetween: 24,
  navigation: {
    prevEl: ".slider__button--prev",
    nextEl: ".slider__button--next",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
