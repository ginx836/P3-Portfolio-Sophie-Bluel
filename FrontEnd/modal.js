let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusedElement = null;

// Ouvre la modale
const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  const modalBackButton = modal.querySelector(".jsModalBack");
  if (modalBackButton) {
    modalBackButton.style.visibility = "hidden";
  }
  modal.style.display = "flex";
  focusables[0].focus();
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".jsModalClose").addEventListener("click", closeModal);
  modal
    .querySelector(".jsModalStop")
    .addEventListener("click", stopPropagation);
};

document.querySelectorAll(".jsModal").forEach((a) => {
  a.addEventListener("click", openModal);
});

// Ferme la modale
const closeModal = function (e) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".jsModalClose").removeEventListener("click", closeModal);
  modal
    .querySelector(".jsModalStop")
    .removeEventListener("click", stopPropagation);

  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

// Gère le focus dans la modale (tab, shift+tab)
const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});

//Ajoute les travaux dans la modale
export function generateWorksModal(works) {
  //Prend en paramètre les travaux stockés dans la variable works
  for (let i = 0; i < works.length; i++) {
    //Boucle qui parcourt les travaux
    const work = works[i]; //Travail courant
    const workHTML = `
      <div class="modalWorkContainer">
      <span class="deleteIcon data-index="${i}"><i class="fa-solid fa-trash-can"></i>
      </span>
      <figure>
        <img src="${work.imageUrl}" alt="${work.title}">
      </figure>
      </div>
    `;
    //Ajout du HTML du travail courant à la galerie
    document.querySelector(".modalGallery").innerHTML += workHTML;
  }
}

//Modifie le contenu de la modale lros du clic sur le bouton "Ajouter une photo"
const addPhotoButton = document.querySelector(".addPhoto");

addPhotoButton.addEventListener("click", () => {
  const modalTitle = document.querySelector(".modalTitle");
  modalTitle.innerHTML = "Ajout photo";

  //Supprime la div galerie de la modale
  const modalGallery = document.querySelector(".modalGallery");

  const modalForm = document.createElement("div");
  modalForm.className = "modalForm";
  modalForm.innerHTML = `
  `;

  modalGallery.replaceWith(modalForm);

  //Rend visible le bouton de retour
  const modalBackButton = modal.querySelector(".jsModalBack");
  if (modalBackButton) {
    modalBackButton.style.visibility = "visible";
  }

  //Lorsque l'on clique du le bouton "Retour" de la modale, on réinitialise on contenu.
  modalBackButton.addEventListener("click", () => {
    resetAddPhotoModal();
  });

  //Crée la fonction qui permet de réinitialiser le contenu de la modale
  const resetAddPhotoModal = (e) => {
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    const modalTitle = document.querySelector(".modalTitle");
    modalTitle.innerHTML = "Galerie Photo";
    modalForm.replaceWith(modalGallery);
    modalBackButton.style.visibility = "hidden";
  };

  modal.addEventListener("click", resetAddPhotoModal);

  const jsModalClose2 = document.querySelector(".jsModalClose");
  jsModalClose2.addEventListener("click", resetAddPhotoModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      resetAddPhotoModal(e);
    }
  });
});
