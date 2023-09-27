import { getCategories } from "./api.js";
import { generateWorksHTML } from "./works.js";
import { getWorks } from "./api.js";
import { sendForm } from "./api.js";

let image;

export function initializeForm() {
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const modalBackButton = modal.querySelector(".js-modal-back");

  modalBackButton.style.visibility = "visible";

  //Modifie le contenu de la modale
  modalContent.innerHTML = `
      <h3 class="modal-title">Ajout photo</h3>
      <form id="form-add-picture" class="modal-form">

        <div class="add-picture-container">
          <i class="fa-regular fa-image"></i>
          <input type="file" name="image" id="file" accept="image/*" class="browse" required>
          <span id="picture-select-button" class="picture-select-button">+ Ajouter photo</span>
          <p>jpg, png : 4mo max</p>
        </div>

        <label for="title">Titre</label>
        <input type="text" name="title" id="title" required>

        <label for="categories">Catégorie</label>
        <select name="categories" id="categories">
          ${generateCategoryOptions()}
        </select>

        <hr class="modal-separator form-separator">
        <p class="success-message" visibility=hidden">message d'erreur</p>
        <button type="submit" id="submit" class="modal-validate-button">Valider</button>
      </form>
    `;
  addPicture();

  async function validateForm() {
    const form = document.querySelector(".modal-form");
    const validateButton = document.getElementById("submit");

    validateButton.style.backgroundColor = "#a7a7a7";

    form.addEventListener("change", () => {
      let valid = true;
      for (let input of form.elements) {
        if (input.required && input.value === "") {
          valid = false;
          break;
        }
      }
      if (valid) {
        // validateButton.disabled = false;
        validateButton.style.backgroundColor = "#1d6154";
      } else {
        // validateButton.disabled = true;
        validateButton.style.backgroundColor = "#a7a7a7";
      }
    });
  }
  validateForm();

  const submitButton = document.querySelector(".modal-validate-button");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    sendNewForm();
  });
}

//Crée une fonction qui génère les options du select
async function generateCategoryOptions() {
  const categories = await getCategories();
  const select = document.getElementById("categories");

  const option = document.createElement("option");
  option.value = "";
  option.textContent = "Sélectionner une catégorie";
  select.appendChild(option);

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  }
}

//Crée une fonction qui permet d'ajouter une image à la galerie
async function addPicture() {
  const selectImage = document.getElementById("picture-select-button");
  const inputFile = document.getElementById("file");
  const imgArea = document.querySelector(".add-picture-container");

  selectImage.addEventListener("click", () => {
    inputFile.click();
  });

  inputFile.addEventListener("input", () => {
    image = inputFile.files[0];

    if (image.size <= 4000000) {
      const reader = new FileReader();

      reader.onload = () => {
        imgArea.innerHTML = "";

        const img = document.createElement("img");
        img.src = reader.result;
        imgArea.appendChild(img);
        img.style.cursor = "pointer";

        img.addEventListener("click", () => {
          inputFile.value = "";
          initializeForm();
          image = null;
        });
      };

      reader.readAsDataURL(image);
    } else {
      alert("Image size exceeds 4MB");
      inputFile.value = "";
    }
  });
}

async function sendNewForm() {
  const categories = document.getElementById("categories");
  const title = document.getElementById("title");

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("category", parseInt(categories.value));

  if (!title.value || !categories.value || !image) {
    const successMessage = document.querySelector(".success-message");
    successMessage.style.visibility = "visible";
    successMessage.innerHTML = "Veuillez remplir tous les champs";

    setTimeout(() => {
      successMessage.style.visibility = "hidden";
    }, 3000);
    return;
  }

  formData.append("image", image);

  const response = await sendForm(formData);

  if (response) {
    // Réinitialiser le formulaire
    initializeForm();
    image = null;

    //Actualiser la galerie
    const gallery = document.querySelector(".gallery");
    const works = await getWorks();
    gallery.innerHTML = "";
    generateWorksHTML(works);

    const successMessage = document.querySelector(".success-message");
    successMessage.style.visibility = "visible";
    successMessage.innerHTML = "La photo a été ajoutée avec succès";

    // Supprimer le message de succès après quelques secondes (par exemple, 3 secondes)
    setTimeout(() => {
      successMessage.style.visibility = "hidden";
    }, 3000);
  } else {
    successMessage.style.visibility = "visible";
    successMessage.innerHTML = "Une erreur est survenue";
  }
}
