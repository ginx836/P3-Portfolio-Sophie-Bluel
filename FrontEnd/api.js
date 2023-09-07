//Regroupe les fonctions d'appel aux API
export function getWorks() {
  return fetch("http://localhost:5678/api/works").then((works) => works.json());
  return fetch("http://localhost:5678/api/categories").then((categories) =>
    categories.json()
  );
}
