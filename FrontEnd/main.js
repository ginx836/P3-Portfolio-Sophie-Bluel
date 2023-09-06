//Récupération des travaux depuis le fichier JSON

const works = await fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);

//Importe le fichier works.js

import { generateWorksHTML } from "./works.js";

generateWorksHTML(works);

// console.log(works);

// Section Filtres 

//Creation d'un bouton "Tous" avec la class ".all" dans la div ".filter-container"

const allButton = document.createElement("button");
allButton.classList.add("all");
allButton.textContent = "Tous";
document.querySelector(".filter-container").appendChild(allButton);

allButton.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  generateWorksHTML(works);
});


//Création d'un bouton "Objets" avec la class ".objects" dans la div ".filter-container"

const objectsButton = document.createElement("button");
objectsButton.classList.add("objects");
objectsButton.textContent = "Objets";
document.querySelector(".filter-container").appendChild(objectsButton);


objectsButton.addEventListener("click", function () {
  const filteredObjectsWorks = works.filter(function (work) {
    return work.categoryId === 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorksHTML(filteredObjectsWorks);
});

//Création d'un bouton "Appartements" avec la class ".appartement" dans la div ".filter-container"

const apartmentButton = document.createElement("button");
apartmentButton.classList.add("appartments");
apartmentButton.textContent = "Appartements";
document.querySelector(".filter-container").appendChild(apartmentButton);


apartmentButton.addEventListener("click", function () {
  const filteredAppartmentWorks = works.filter(function (work) {
    return work.categoryId === 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorksHTML(filteredAppartmentWorks);
});

//Création d'un bouton "Hôtels & restaurants" avec la class ".hotels" dans la div ".filter-container"

const hotelButton = document.createElement("button");
hotelButton.classList.add("hotels");
hotelButton.textContent = "Hôtels & restaurants";
document.querySelector(".filter-container").appendChild(hotelButton);


hotelButton.addEventListener("click", function () {
  const filteredHotelsWorks = works.filter(function (work) {
    return work.categoryId === 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorksHTML(filteredHotelsWorks);
});
