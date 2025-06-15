// script.js

/*-----------------------------------------
  0. UTILIDADES
-----------------------------------------*/

// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Forzar autocierre al hacer clic en cualquier link del menú hamburguesa
document.querySelectorAll("#hamburger-nav .menu-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector("#hamburger-nav .menu-links").classList.remove("open");
    document.querySelector("#hamburger-nav .hamburger-icon").classList.remove("open");
  });
});

// Cierra el menú hamburguesa si haces clic fuera
document.addEventListener("click", function(e) {
  const menu = document.querySelector("#hamburger-nav .menu-links");
  const icon = document.querySelector("#hamburger-nav .hamburger-icon");
  if (
    menu.classList.contains("open") &&
    !menu.contains(e.target) &&
    !icon.contains(e.target)
  ) {
    menu.classList.remove("open");
    icon.classList.remove("open");
  }
});

/*-----------------------------------------
  1. EFECTOS AL CARGAR Y FADE-IN DE SECCIONES
-----------------------------------------*/
window.addEventListener("load", () => {
  document.body.classList.add("loaded");   // cuerpo aparece

  // Intersección para fade-element
  const faders = document.querySelectorAll(".fade-element");
  const appearOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  faders.forEach((f) => appearOnScroll.observe(f));
});

/*-----------------------------------------
  2. BOTÓN SCROLL-TO-TOP
-----------------------------------------*/
const scrollBtn = document.getElementById("scrollToTop");
window.addEventListener("scroll", () => {
  if (pageYOffset > 300) {
    if (scrollBtn.style.display !== "block") {
      scrollBtn.style.display = "block";
      scrollBtn.style.opacity = "0";
      setTimeout(() => (scrollBtn.style.opacity = "1"), 10);
    }
  } else if (scrollBtn.style.display === "block") {
    scrollBtn.style.opacity = "0";
    setTimeout(() => (scrollBtn.style.display = "none"), 300);
  }
});
scrollBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/*-----------------------------------------
  3. OCULTAR NAVBAR EN FOOTER
-----------------------------------------*/
const desktopNav = document.getElementById("desktop-nav");
const footer = document.querySelector("footer");
new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        desktopNav.style.opacity = "0";
        desktopNav.style.pointerEvents = "none";
      } else {
        desktopNav.style.opacity = "1";
        desktopNav.style.pointerEvents = "auto";
      }
    });
  },
  { threshold: 0.1 }
).observe(footer);

/*-----------------------------------------
  4. LOGO → SCROLL TOP + RESET ANIM
-----------------------------------------*/
document.querySelectorAll(".logo").forEach((logo) => {
  logo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    logo.classList.remove("clicked");
    void logo.offsetWidth;         // reinicia animation
    logo.classList.add("clicked");
  });
  logo.addEventListener("mouseenter", () => logo.classList.remove("clicked"));
});

/*-----------------------------------------
  5. MODALES
-----------------------------------------*/
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card, idx) => {
  const modal = document.getElementById(`modal-${idx + 1}`);
  card.addEventListener("click", () => {
    modal.classList.add("open");
    document.body.classList.add("no-scroll");   // 3- Bloquea scroll fondo
  });
});

// Cerrar con la X
document.querySelectorAll(".modal-close").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

// Cerrar al clickar fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  }
});

function closeModal(modal) {
  modal.classList.remove("open");
  document.body.classList.remove("no-scroll");  // reactiva scroll
}

/* effecto typewriter */
const typewriterTarget = document.getElementById("typewriter-text");
const phrases = [
  "Under development...",
  "Collecting financial data...",
  "Building the network...",
  "Work in progress...",
  "Asking Harry Markowitz...",
  "Choosing stocks...",
  "In the making...",
  "Backtesting strategies...",
  "Maximizing Sharpe ratio...",
  "Minimizing risk...",


];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
let typingSpeed = 100; // ms per character

function type() {
  const fullText = phrases[currentPhrase];

  if (isDeleting) {
    currentChar--;
  } else {
    currentChar++;
  }

  typewriterTarget.textContent = fullText.substring(0, currentChar);

  if (!isDeleting && currentChar === fullText.length) {
    setTimeout(() => {
      isDeleting = true;
      type();
    }, 1000); // wait before deleting
    return;
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentPhrase = (currentPhrase + 1) % phrases.length;
  }

  setTimeout(type, isDeleting ? 50 : typingSpeed);
}

// Start typing on page load
document.addEventListener("DOMContentLoaded", type);
