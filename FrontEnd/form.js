import { getCategories } from "./api.js";
import { generateWorksHTML, generateWorksModal } from "./works.js";
import { getWorks } from "./api.js";

export function initializeForm() {
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modalContent");
  const modalBackButton = modal.querySelector(".jsModalBack");

  modalBackButton.style.visibility = "visible";

  //Modifie le contenu de la modale
  modalContent.innerHTML = `
      <h3 class="modalTitle">Ajout photo</h3>
      <form id="formAddPicture" class="modalForm">

        <div class="addPictureContainer">
          <i class="fa-regular fa-image"></i>
          <input type="file" name="image" id="file" accept="image/*" class="browse">
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
        <button type="submit" id="submit" class="modalValidateButton" disabled>Valider</button>
      </form>
    `;

  //Crée une fonction qui génère les options du select
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

  //Crée une fonction qui permet d'ajouter une image
  async function addPicture() {
    const selectImage = document.getElementById("pictureSelectButton");
    const inputFile = document.getElementById("file");
    const imgArea = document.querySelector(".addPictureContainer");
    const submitButton = document.getElementById("submit");

    selectImage.addEventListener("click", () => {
      inputFile.click();
    });

    inputFile.addEventListener("input", () => {
      const image = inputFile.files[0];

      if (image.size <= 4000000) {
        const reader = new FileReader();

        reader.onload = () => {
          //Remplace les éléments de la div par l'image sélectionnée
          imgArea.innerHTML = "";

          //Crée un élément img et lui attribue l'image sélectionnée
          const img = document.createElement("img");
          img.src = reader.result;
          imgArea.appendChild(img);
          imgArea.classList.add("active");
        };

        reader.readAsDataURL(image);
        // console.log(image);
      } else {
        alert("Image size exceeds 4MB");
        //Réinitialise le contenu de l'input
        inputFile.value = "";
      }

      //Envoie le formulaire
      submitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const categories = document.getElementById("categories");
        const title = document.getElementById("title");
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("category", parseInt(categories.value));
        formData.append("image", image);

        const pathAPI = "http://localhost:5678/api";
        const response = await fetch(pathAPI + "/works", {
          headers: {
            accept: "application/json",
            authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          method: "POST",
          body: formData,
        });
        if (response.status === 201) {
          // Réinitialiser le formulaire
          title.value = "";
          categories.selectedIndex = 0;
          inputFile.value = "";
          imgArea.innerHTML = `
      <i class="fa-regular fa-image"></i>
      <input type="file" name="image" id="file" accept="image/*" class="browse">
      <span id="pictureSelectButton" class="pictureSelectButton">+ Ajouter photo</span>
      <p>jpg, png : 4mo max</p>
    `;
          imgArea.classList.remove("active");

          //Actualiser la galerie
          const gallery = document.querySelector(".gallery");
          const works = await getWorks();
          gallery.innerHTML = "";
          generateWorksHTML(works);

          // Afficher le message de succès
          const form = document.querySelector(".modalForm");
          const submitButton = document.querySelector(".modalValidateButton");
          const separator = document.querySelector(".modalSeparator");
          const successMessage = document.createElement("p");
          successMessage.textContent = "La photo a été ajoutée";
          successMessage.style.color = "green";
          successMessage.style.textAlign = "center";
          successMessage.style.top = "-1em";
          successMessage.style.position = "relative";
          separator.style.marginBottom = "2em";

          form.insertBefore(successMessage, submitButton);

          // Supprimer le message de succès après quelques secondes (par exemple, 3 secondes)
          setTimeout(() => {
            form.removeChild(successMessage);
          }, 10000);
        } else {
          console.log(response.statusText);
        }
      });
    });
  }

  //Crée une fonction qui permet de supprimer une image en cliquant dessus
  async function removePicture() {
    const imgArea = document.querySelector(".addPictureContainer");
    const inputFile = document.getElementById("file");
    const form = document.querySelector(".modalForm");

    imgArea.addEventListener("click", () => {
      //Réinitialise le contenu de l'input
      inputFile.value = "";
      imgArea.innerHTML = `
    <i class="fa-regular fa-image"></i>
    <input type="file" name="image" id="file" accept="image/*" class="browse">
    <span id="pictureSelectButton" class="pictureSelectButton">+ Ajouter photo</span>
    <p>jpg, png : 4mo max</p>
    `;
      imgArea.classList.remove("active");
      addPicture();
      form.reset();
    });
  }

  //Crée une fonction qui permet de valider si le formulaire est rempli
  async function validateForm() {
    const form = document.querySelector(".modalForm");
    const validateButton = document.getElementById("submit");

    form.addEventListener("change", () => {
      let valid = true;
      for (let input of form.elements) {
        if (input.required && input.value === "") {
          valid = false;
          break;
        }
      }
      if (valid) {
        validateButton.disabled = false;
        validateButton.classList.add("enabled");
      } else {
        validateButton.disabled = true;
        validateButton.classList.remove("enabled");
      }
    });
  }
  validateForm();
  removePicture();
  addPicture();
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
  const works = await getWorks();
  generateWorksModal(works);
}
