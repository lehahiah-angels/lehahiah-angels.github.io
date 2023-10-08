// Gestion du changement de style de la barre de navigation lors du défilement
const navBar = document.querySelector(".nav-bar");

window.addEventListener("scroll", () => {
  navBar.classList.toggle("scroll", window.scrollY > 0);
});
