export function generateWorksHTML(works) {
  //Prend en paramètre les travaux stockés dans la variable works
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
