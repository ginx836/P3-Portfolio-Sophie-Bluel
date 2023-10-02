import { generateWorksHTML } from "./works.js";

//Création d'un bouton "Tous" qui affiche tous les travaux
export function allWorks(works) {
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  document.querySelector(".filter-container").appendChild(allButton);

  allButton.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    generateWorksHTML(works);
  });
}

//Création d'un bouton pour chaque catégorie qui affiche les travaux de la catégorie
export function filterWorks(works, category) {

  //On parcourt les catégories
  category.forEach((category) => {
    //On crée un bouton pour chaque catégorie
    const filterButton = document.createElement("button");
    filterButton.textContent = category.name;
    document.querySelector(".filter-container").appendChild(filterButton);

    //On ajoute un écouteur d'événement sur chaque bouton
    filterButton.addEventListener("click", function () {
      //On filtre les travaux en fonction de la catégorie
      const filteredWorks = works.filter(function (work) {
        return work.categoryId === category.id;
      });
      //On vide la galerie
      document.querySelector(".gallery").innerHTML = "";
      //On génère le HTML des travaux filtrés
      generateWorksHTML(filteredWorks);
    });
  });
}



