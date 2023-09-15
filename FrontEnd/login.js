import { loginUser } from "./api.js";

document.getElementById("login").addEventListener("submit", handleLogin);

/**
 *
 * @param {Event} event
 */

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  function errorMessage(message) {
    const form = document.getElementById("loginForm");
    const error = document.createElement("p");
    error.textContent = message;
    error.style.color = "red";
    error.style.textAlign = "center";
    error.style.marginBottom = "1em";
    form.appendChild(error);

    const submitButton = document.querySelector("input[type='submit']");
    submitButton.addEventListener("click", function () {
      error.remove();
    });

    setTimeout(function () {
      error.remove();
    }, 10000);
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
