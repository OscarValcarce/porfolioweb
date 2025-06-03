// script.js

// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Fade-in on load
window.addEventListener("load", () => {
  // Activar transición de opacidad en <body>
  document.body.classList.add("loaded");

  // IntersectionObserver para fade-element
  const faders = document.querySelectorAll(".fade-element");
  const options = {
    threshold: 0.2,
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});

// Scroll-to-top behavior con fade-in y fade-out
const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    if (scrollBtn.style.display !== "block") {
      scrollBtn.style.display = "block";
      scrollBtn.style.opacity = "0";
      // Pequeño retraso para disparar la transición
      setTimeout(() => {
        scrollBtn.style.opacity = "1";
      }, 10);
    }
  } else {
    if (scrollBtn.style.display === "block") {
      scrollBtn.style.opacity = "0";
      // Después de la transición, ocultar el botón
      setTimeout(() => {
        scrollBtn.style.display = "none";
      }, 300);
    }
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
