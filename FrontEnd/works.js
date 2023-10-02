import { getWorks, deleteWork } from "./api.js";
import { initializeForm } from "./form.js";

//Génère la structure HTML d'un travail
export function generateFigureElement(imageUrl, title, id) {
  return `
    <figure data-id=${id}>
      <img src="${imageUrl}" alt="${title}">
      <figcaption>${title}</figcaption>
    </figure>
  `;
}

//Génère le HTML de la galerie
export async function generateWorksHTML(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  for (const work of works) {
    const { id, imageUrl, title } = work;
    const workHTML = generateFigureElement(imageUrl, title, id);
    gallery.innerHTML += workHTML;
  }
}

//Génère la galerie photo dans la modale
export async function generateModalGallery() {
  const modal = document.querySelector(".modal");
  const modalContent = modal.querySelector(".modal-content");
  const modalBackButton = modal.querySelector(".js-modal-back");

  modalBackButton.style.visibility = "hidden";

  const works = await getWorks();

  const modalGallery = document.createElement("div");
  modalGallery.classList.add("modal-gallery");

  for (const work of works) {
    const modalWorkContainer = generateModalWorkContainerHTML(work);
    modalGallery.appendChild(modalWorkContainer);
  }

  modalContent.innerHTML = `
    <h3 class="modal-title">Galerie photo</h3>
    <hr class="modal-separator">
    <p class="success-message">message d'erreur</p>
    <button type="button" class="add-picture-button">Ajouter une photo</button>
  `;

  modalContent.insertBefore(modalGallery, modalContent.querySelector(".modal-separator"));

  document.querySelector(".add-picture-button").addEventListener("click", initializeForm);

  const deleteIcons = modalGallery.querySelectorAll(".delete-icon");
  for (const deleteIcon of deleteIcons) {
    deleteIcon.addEventListener("click", async () => {
      const id = deleteIcon.parentElement.dataset.id;

      await deleteWork(id);

      deleteIcon.parentElement.remove();

      const gallery = document.querySelector(".gallery");
      const figureToRemove = gallery.querySelector(`figure[data-id="${id}"]`);
      if (figureToRemove) {
        figureToRemove.remove();

        const successMessage = document.querySelector(".success-message");
        successMessage.style.visibility = "visible";
        successMessage.innerHTML = "La photo a été supprimée avec succès";

        setTimeout(() => {
          successMessage.style.visibility = "hidden";
        }, 3000);

        const updatedWorks = await getWorks();
        generateWorksHTML(updatedWorks);
      }
    });
  }
}

//Génère la structure HTML d'un travail dans la modale
function generateModalWorkContainerHTML(work) {
  const { id, imageUrl, title } = work;

  const container = document.createElement("div");
  container.classList.add("modal-work-container");
  container.dataset.id = id;

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  const figure = document.createElement("figure");
  figure.innerHTML = `<img src="${imageUrl}" alt="${title}" data-id="${id}">`;

  container.appendChild(deleteIcon);
  container.appendChild(figure);

  return container;
}