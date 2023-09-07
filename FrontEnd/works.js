//Fonction qui génére le HTML des travaux
export function generateWorksHTML(works) {  //Prend en paramètre les travaux stockés dans la variable works
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
};
