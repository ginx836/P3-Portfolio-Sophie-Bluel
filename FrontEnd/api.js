//Regroupe les fonctions d'appel aux API
export async function getWorks() {
  const works = await fetch("http://localhost:5678/api/works");
  return await works.json();
}

export async function getCategories() {
  const category = await fetch("http://localhost:5678/api/categories");
  return await category.json();}

