/* 
//Fonction qui génére le HTML des travaux
function generateWorksHTML(works) {  //Prend en paramètre les travaux stockés dans la variable works
  for (let i = 0; i < works.length; i++) {
    //Boucle qui parcourt les travaux
    const work = works[i]; //Récupération du travail courant
    //Génération du HTML du travail courant - On crée une chaine de caractères qui contient le HTML du travail courant
    const workHTML = ` 
      <figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
      </figure>
    `;
    document.querySelector(".gallery").innerHTML += workHTML; //Ajout du HTML du travail courant à la galerie
  }
}

//Appel de la fonction
generateWorksHTML(works); 
*/

export function generateWorksHTML(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];

    //Récupération de l'élément du DOM qui accueillera le travail courant
    const galleryElement = document.querySelector(".gallery");

    //Création de l'élément qui accueillera le travail courant
    const figureElement = document.createElement("figure");

    //Création des balises HTML qui accueilleront les informations du travail courant
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;

    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.textContent = work.title;

    //On rattache les balises HTML au travail courant
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);

    //On rattache le travail courant à la galerie
    galleryElement.appendChild(figureElement);
  }
}
