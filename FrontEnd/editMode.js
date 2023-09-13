export function editMode() {
  const accessToken = localStorage.getItem("accessToken");

  const editMode = document.getElementById("editMode");
  const connectedLogin = document.getElementById("connectedLogin");
  const filterContainer = document.querySelector(".filterContainer");
  const projects = document.getElementById("projects");
  const projectsTitle = document.getElementById("projectsTitle");
  const editProjects = document.querySelector(".editProjects");

  if (accessToken) {
    // Affiche la div editMode
    editMode.style.display = "flex";

    // Change le texte de la classe connectedLogin en "logout"
    connectedLogin.innerHTML = "logout";
    connectedLogin.href = "./index.html";

    // Fait disparaître la div filterContainer
    filterContainer.style.visibility = "hidden";

    //Suprrime la marge inférieure de la section projects
    projects.style.marginBottom = "0";

    // Modifie la marge du titre de la section projects
    projectsTitle.style.margin = "0  0  0 4em";

    // Fait apparaître la classe editProjects
    editProjects.style.display = "flex";
  }
}
// Appel de la fonction au chargement de la page
editMode();

// Ajout d'un listener sur le bouton logout
document
  .getElementById("connectedLogin")
  .addEventListener("click", handleLogout);

export function handleLogout() {
  // Supprime le token du localStorage
  localStorage.removeItem("accessToken");
}
