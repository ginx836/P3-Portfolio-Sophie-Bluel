export function addPicture() {
  const selectImage = document.getElementById("pictureSelectButton");
  const inputFile = document.getElementById("file");
  const imgArea = document.querySelector(".addPictureContainer");

  selectImage.addEventListener("click", () => {
    inputFile.click();
  });

  inputFile.addEventListener("change", () => {
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
        imgArea.dataset.img = image.name;
      };

      reader.readAsDataURL(image);
    } else {
      alert("Image size exceeds 4MB");
      //Réinitialise le contenu de l'input
      inputFile.value = "";
    }
  });
}

  