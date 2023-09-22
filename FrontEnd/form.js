import { getCategories } from "./api.js";
import { generateWorksModal } from "./works.js";


export function initializeForm() {
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modalContent");
  const modalBackButton = modal.querySelector(".jsModalBack");


  modalBackButton.style.visibility = "visible";
  
  //Modifie le contenu de la modale
  modalContent.innerHTML = `
      <h3 class="modalTitle">Ajout photo</h3>
      <form id="formAddPicture" class="modalForm">

        <div class="addPictureContainer" data-img="">
          <i class="fa-regular fa-image"></i>
          <input type="file" name="image" id="file" class="browse" multiple>
          <span id="pictureSelectButton" class="pictureSelectButton">+ Ajouter photo</span>
          <p>jpg, png : 4mo max</p>
        </div>

        <label for="title">Titre</label>
        <input type="text" name="title" id="title" required>

        <label for="categories">Catégorie</label>
        <select name="categories" id="categories">
          ${generateCategoryOptions()}
        </select>

        <hr class="modalSeparator formSeparator">
        <button type="submit" class="modalValidateButton">Valider</button>
      </form>
    `;

  async function generateCategoryOptions() {
    const categories = await getCategories();
    const select = document.getElementById("categories");
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      select.appendChild(option);
    }
  }
}

//Crée une fonction qui génère le contenu de la div .modalContent pour afficher la gallerie
export async function generateModalGallery() {
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modalContent");
  const modalBackButton = modal.querySelector(".jsModalBack");

  modalBackButton.style.visibility = "hidden";

  modalContent.innerHTML = `
  <h3 class="modalTitle">Galerie photo</h3>
	<div class="modalGallery">
	</div>
	<hr class="modalSeparator">
	<button type="button" class="addPictureButton">Ajouter une photo</button>
  `;
}

