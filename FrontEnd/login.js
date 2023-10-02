import { loginUser } from "./api.js";

document.getElementById("login").addEventListener("submit", handleLogin);

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  function errorMessage(message) {
    const error = document.querySelector(".error-message");
    error.style.visibility = "visible";
    error.innerHTML = message;

    setTimeout(function () {
      error.style.visibility = "hidden";
    }, 3000);
  }

  try {
    // Essayer d'envoyer la requête à l'API
    const result = await loginUser(email, password);

    // Si la connexion réussit, stocker le token dans le localStorage
    if (result.token) {
      localStorage.setItem("accessToken", result.token);

      // Rediriger vers la page d'accueil
      window.location.href = "./index.html";
    } else {
      // Si la connexion échoue, afficher un message d'erreur
      errorMessage("Erreur dans l'identifiant ou le mot de passe");
    }
  } catch (error) {
    // En cas d'erreur de connexion, afficher un message d'erreur
    errorMessage("Impossible de se connecter au serveur");
  }
}
