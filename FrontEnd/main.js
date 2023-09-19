import { generateWorksHTML } from "./works.js";
import { allWorks } from "./filter.js";
import { filterWorks } from "./filter.js";
import { getWorks, getCategories } from "./api.js";
import { editMode } from "./editMode.js";
import { initializeForm } from "./form.js";
import {
  openModal,
  closeModal,
  focusInModal,
  stopPropagation,
  generateWorksModal,
} from "./modal.js";

async function init() {
  const works = await getWorks();
  const category = await getCategories();

  generateWorksHTML(works);
  allWorks(works);
  filterWorks(works, category);
  editMode();
  generateWorksModal(works);
  initializeForm();

  document.querySelectorAll(".jsModal").forEach((a) => {
    a.addEventListener("click", openModal);
  });
  document.querySelectorAll(".jsModalClose").forEach((a) => {
    a.addEventListener("click", closeModal);
  });
  document.querySelectorAll(".jsModalStop").forEach((a) => {
    a.addEventListener("click", stopPropagation);
  });
  document.querySelectorAll(".jsModal").forEach((a) => {
    a.addEventListener("keydown", focusInModal);
  });
}

init();
