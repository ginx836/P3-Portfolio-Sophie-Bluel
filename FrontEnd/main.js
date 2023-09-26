import {
  generateWorksHTML,
  generateFigureHTML,
  generateModalGallery,
} from "./works.js";
import { allWorks } from "./filter.js";
import { filterWorks } from "./filter.js";
import { getWorks, getCategories } from "./api.js";
import { editMode } from "./editMode.js";
import { openModal, closeModal, stopPropagation } from "./modal.js";
import { handleBackButtonClick } from "./works.js";

async function init() {
  const works = await getWorks();
  const category = await getCategories();
  
  generateFigureHTML();
  generateWorksHTML(works);
  allWorks(works);
  filterWorks(works, category);
  editMode();
  generateModalGallery();

  
  //Gestion des événement
  document.querySelectorAll(".jsModal").forEach((a) => {
    a.addEventListener("click", openModal);
  });
  document.querySelectorAll(".jsModalClose").forEach((a) => {
    a.addEventListener("click", closeModal);
  });
  document.querySelectorAll(".jsModalStop").forEach((a) => {
    a.addEventListener("click", stopPropagation);
  });
  
  document.querySelector(".jsModalBack").addEventListener("click", () => {
    handleBackButtonClick();
  });
  
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
      handleBackButtonClick();
    }
  });
  
  document.querySelector(".jsModalClose").addEventListener("click", (e) => {
    closeModal(e);
    handleBackButtonClick();
  });
  
  document.querySelector(".modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      closeModal(e);
      handleBackButtonClick();
    }
  });
}

init();

