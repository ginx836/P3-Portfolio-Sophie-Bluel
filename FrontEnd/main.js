import {
  generateWorksHTML,
  generateFigureElement,
  generateModalGallery,
} from "./works.js";
import { allWorks, filterWorks } from "./filter.js";
import { getWorks, getCategories } from "./api.js";
import { editMode } from "./editMode.js";
import { openModal, closeModal, stopPropagation } from "./modal.js";

async function init() {
  const works = await getWorks();
  const categories = await getCategories();

  generateFigureElement();
  generateWorksHTML(works);
  allWorks(works);
  filterWorks(works, categories);
  editMode();
  generateModalGallery();

  // Event handling
  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
  });
  document.querySelectorAll(".js-modal-close").forEach((a) => {
    a.addEventListener("click", closeModal);
  });
  document.querySelectorAll(".js-modal-stop").forEach((a) => {
    a.addEventListener("click", stopPropagation);
  });

  document.querySelector(".js-modal-back").addEventListener("click", handleBackButtonClick);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
      handleBackButtonClick();
    }
  });

  document.querySelector(".js-modal-close").addEventListener("click", (e) => {
    closeModal(e);
    handleBackButtonClick();
  });

  document.querySelector(".modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      closeModal(e);
      handleBackButtonClick();
    }
  });

  function handleBackButtonClick() {
    generateModalGallery();
  }
}

init();