document.getElementById("login").addEventListener("submit", (event) => {
  event.preventDefault();

  async function login(email, password) {
    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {

        // La requête a réussi
        const result = await response.json();

        // Stocker le token dans le localStorage
        localStorage.setItem("accessToken", result.token);

        // Rediriger vers la page d'accueil
        window.location.href = "./index.html";
      } else {
        // La requête a échoué
        alert("Erreur dans l’identifiant ou le mot de passe");
      }
    } catch (error) {
      // Erreur lors de la requête
      alert("Erreur lors de la requête :", error.message);
    }
  }
  login();
});
