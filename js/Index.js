// Gestion du changement de style de la barre de navigation lors du défilement
document.addEventListener("DOMContentLoaded", function () {
  const navBar = document.querySelector(".nav-bar");

  window.addEventListener("scroll", () => {
    navBar.classList.toggle("scroll", window.scrollY > 0);
  });
});

//Changement d'image sous moble
function changeImage() {
  var image = document.querySelector(".responsiveImage");
  if (window.innerWidth < 900) {
    image.src = "images/z1.jpg";
  } else {
    image.src = "images/z7.jpg";
  }
}
window.onload = changeImage;
window.onresize = changeImage;

// Gestion du carrousel infini
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = Array.from(carousel.children);

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.floor(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (
    carousel.scrollLeft === 0 ||
    Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 1300);
};

autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// Gestion du carrousel infini
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionne l'élément du bouton "to-top"
  var toTopButton = document.querySelector(".to-top");

  // Affiche ou masque le bouton "to-top" en fonction de la position de défilement
  window.addEventListener("scroll", function () {
    // Vérifie si la position de défilement est supérieure à 1000px avant d'afficher le bouton
    if (
      (document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100) &&
      (document.body.scrollTop < 1000 ||
        document.documentElement.scrollTop < 1000)
    ) {
      toTopButton.style.display = "block";
    } else {
      toTopButton.style.display = "none";
    }
  });

  // Scroll vers le haut de la page lorsque le bouton est cliqué
  toTopButton.addEventListener("click", function () {
    scrollToTop(1500);
  });

  // Fonction pour effectuer le scroll vers le haut de la page avec une animation
  function scrollToTop(duration) {
    var start = window.scrollY || document.documentElement.scrollTop,
      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = Math.easeInOutExpo(currentTime, start, -start, duration);
      document.body.scrollTop = val;
      document.documentElement.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  // Fonction d'interpolation pour l'animation de défilement
  Math.easeInOutExpo = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
    t--;
    return (c / 2) * (-Math.pow(2, -10 * t) + 2) + b;
  };
});
