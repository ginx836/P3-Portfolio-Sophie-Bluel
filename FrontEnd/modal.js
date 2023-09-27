export let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusedElement = null;

// Empêche la propagation de l'événement
export function stopPropagation(e) {
  e.stopPropagation();
}

export function openModal(e) {
  e.preventDefault();
  modal = document.querySelector("#modal1");
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  const modalBackButton = modal.querySelector(".js-modal-back");
  if (modalBackButton) {
    modalBackButton.style.visibility = "hidden";
  }
  modal.style.display = "flex";
  focusables[1].focus();  
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
}

export function closeModal(e) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);

  modal = null;
}

export function focusInModal(e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();        
}

//Ajoute un eventlistener sur la touche tab et Escape
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});
