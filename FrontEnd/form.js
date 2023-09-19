import { getCategories } from "./api.js";
import { modal } from "./modal.js";

export function initializeForm() {
  //Modifie le contenu de la modale lros du clic sur le bouton "Ajouter une photo"
  const addPictureButton = document.querySelector(".addPhoto");

  addPictureButton.addEventListener("click", () => {
    const modalTitle = document.querySelector(".modalTitle");
    modalTitle.innerHTML = "Ajout photo";

    //Remplace le contenu de la modale par un formulaire
    const modalGallery = document.querySelector(".modalGallery");

    const modalForm = document.createElement("div");
    modalForm.className = "modalForm";
    modalForm.innerHTML = `
  <form action="" method="post" class="formAddPhoto">
  <div class="formAddPhotoContainer">
  <button type="button" class="pictureUpload">
  <i class="fa-regular fa-image">
  </i>
  </button>
  <button type="button" class="addPictureButton">+ Ajouter photo</button>
  <p>jpg, png : 4mo max</p>
  </div>
  <div id="formAddPhotoInput">
  <label for="title">Titre</label>
  <input type="text" name="title" id="title" required>
  <label for="categories">Catégorie</label>
  <select name="categories" id="categories">
  </select>
  </div>
  `;

    modalGallery.replaceWith(modalForm);

    //Récupère la liste des catégories et les ajoute au formulaire
    const categories = getCategories();
    categories.then((categories) => {
      const select = document.getElementById("categories");
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
      }
    });

    //Modifie le bouton "Ajouter une photo" en "Valider"
    const addPictureButton = document.querySelector(".addPhoto");
    addPictureButton.innerHTML = "Valider";

    //Rend visible le bouton de retour
    const modalBackButton = modal.querySelector(".jsModalBack");
    if (modalBackButton) {
      modalBackButton.style.visibility = "visible";
    }

    //Crée la fonction qui permet de réinitialiser le contenu de la modale
    const resetAddPhotoModal = (e) => {
      // if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
      const modalTitle = document.querySelector(".modalTitle");
      modalTitle.innerHTML = "Galerie Photo";
      modalForm.replaceWith(modalGallery);
      modalBackButton.style.visibility = "hidden";
      addPictureButton.innerHTML = "Ajouter une photo";
    };

    modal.addEventListener("click", resetAddPhotoModal);

    const jsModalClose2 = document.querySelector(".jsModalClose");
    jsModalClose2.addEventListener("click", resetAddPhotoModal);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        resetAddPhotoModal(e);
      }
    });

    modalBackButton.addEventListener("click", () => {
      resetAddPhotoModal();
    });
  });
}
