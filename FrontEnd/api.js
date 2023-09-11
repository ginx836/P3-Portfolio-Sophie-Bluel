//Regroupe les fonctions d'appel aux API
export async function getWorks() {
  const works = await fetch("http://localhost:5678/api/works");
  return await works.json();
}

export async function getCategories() {
  const category = await fetch("http://localhost:5678/api/categories");
  return await category.json();}
  

export async function loginUser(email, password) {
  // Fonction asynchrone pour envoyer la requête de connexion
  const data = { email, password };

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 200) {
    // La requête a réussi, renvoyer les données JSON
    return await response.json();
  } else {
    // La requête a échoué, renvoyer un objet vide
    return {};
  }
}