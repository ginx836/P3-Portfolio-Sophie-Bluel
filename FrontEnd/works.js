import { getWorks, deleteWork } from "./api.js";
import { initializeForm } from "./form.js";
export function generateFigureHTML(imageUrl, title, id) {
  return `
    <figure data-id=${id}>
      <img src="${imageUrl}" alt="${title}">
      <figcaption>${title}</figcaption>
    </figure>
  `;
}

export async function generateWorksHTML(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  for (const work of works) {
    const id = work.id;
    const workHTML = generateFigureHTML(work.imageUrl, work.title, id);
    document.querySelector(".gallery").innerHTML += workHTML;
  }
}

export async function generateModalGallery() {
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modalContent");
  const modalBackButton = modal.querySelector(".jsModalBack");

  modalBackButton.style.visibility = "hidden";

  const works = await getWorks();

  const modalGallery = document.createElement("div");
  modalGallery.classList.add("modalGallery");

  for (const work of works) {
    const modalWorkContainer = generateModalWorkContainerHTML(work);
    modalGallery.appendChild(modalWorkContainer);
  }

  modalContent.innerHTML = `
    <h3 class="modalTitle">Galerie photo</h3>
    <hr class="modalSeparator">
    <button type="button" class="addPictureButton">Ajouter une photo</button>
  `;

  modalContent.insertBefore(
    modalGallery,
    modalContent.querySelector(".modalSeparator")
  );

  document.querySelector(".addPictureButton").addEventListener("click", () => {
    initializeForm();
  });


  const deleteIcons = modalGallery.querySelectorAll(".deleteIcon");
  for (const deleteIcon of deleteIcons) {
    deleteIcon.addEventListener("click", async () => {
      const id = deleteIcon.parentElement.dataset.id;

      const response = await deleteWork(id);

      if (response) {
        deleteIcon.parentElement.remove();

        const gallery = document.querySelector(".gallery");
        const figureToRemove = gallery.querySelector(`figure[data-id="${id}"]`);
        if (figureToRemove) {
          figureToRemove.remove();
          const works = await getWorks();
          await generateWorksHTML(works);
        }
      } else {
        alert("Une erreur est survenue");
      }
    });
  }
}
function generateModalWorkContainerHTML(work) {
  const container = document.createElement("div");
  container.classList.add("modalWorkContainer");
  container.dataset.id = work.id;

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("deleteIcon");
  deleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  const figure = document.createElement("figure");
  figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}" data-id="${work.id}">`;

  container.appendChild(deleteIcon);
  container.appendChild(figure);


  return container;
}
// La fonction pour gérer le clic sur le bouton "Back"
export function handleBackButtonClick() {
  generateModalGallery();
}
