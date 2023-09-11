import { loginUser } from "./api.js"; // Importer la fonction loginUser depuis api.js

document.getElementById("login").addEventListener("submit", handleLogin); // Ajouter un écouteur d'événement sur le formulaire de connexion

async function handleLogin(event) { // Fonction asynchrone pour gérer la connexion
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {  // Essayer d'envoyer la requête à l'API
    const result = await loginUser(email, password);

    // Si la connexion réussit, stocker le token dans le localStorage
    if (result.token) {
      localStorage.setItem("accessToken", result.token);
      // Rediriger vers la page d'accueil
      window.location.href = "./index.html";
    } else {
      // Si la connexion échoue, afficher un message d'erreur
      alert("Erreur dans l'identifiant ou le mot de passe");
    }
  } catch (error) { 
    // En cas d'erreur lors de la requête, afficher le message d'erreur
    alert("Erreur lors de la requête : " + error.message);
  }
}
