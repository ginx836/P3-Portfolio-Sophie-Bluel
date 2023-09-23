import { generateWorksHTML, generateWorksModal } from "./works.js";
import { allWorks } from "./filter.js";
import { filterWorks } from "./filter.js";
import { getWorks, getCategories } from "./api.js";
import { editMode } from "./editMode.js";
import { openModal, closeModal, stopPropagation } from "./modal.js";
import { generateModalGallery } from "./form.js";
import { initializeForm } from "./form.js";

async function init() {
  const works = await getWorks();
  const category = await getCategories();

  generateWorksHTML(works);
  allWorks(works);
  filterWorks(works, category);
  editMode();
  generateModalGallery();
  generateWorksModal(works);


  document.querySelectorAll(".jsModal").forEach((a) => {
    a.addEventListener("click", openModal);
  });
  document.querySelectorAll(".jsModalClose").forEach((a) => {
    a.addEventListener("click", closeModal);
  });
  document.querySelectorAll(".jsModalStop").forEach((a) => {
    a.addEventListener("click", stopPropagation);
  });

  document.querySelector(".addPictureButton").addEventListener("click", () => {
    initializeForm();
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

  // La fonction pour gérer le clic sur le bouton "Back"
  function handleBackButtonClick() {
    // Générer la galerie modale
    generateModalGallery();
    generateWorksModal(works);

    // Réinitialiser l'état du bouton "Ajouter une photo"
    const addPictureButton = document.querySelector(".addPictureButton");
    if (addPictureButton) {
      addPictureButton.addEventListener("click", () => {
        initializeForm();
      });
    }
  }
}

init();
