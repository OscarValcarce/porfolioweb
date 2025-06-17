// script.js

document.addEventListener("DOMContentLoaded", function () {
  /*-----------------------------------------
    0. UTILIDADES
  -----------------------------------------*/

  // --- Hamburguesa (100% JS) ---
  const hamburgerIcon = document.querySelector("#hamburger-nav .hamburger-icon");
  const menuLinks = document.querySelector("#hamburger-nav .menu-links");

  function toggleMenu() {
    menuLinks.classList.toggle("open");
    hamburgerIcon.classList.toggle("open");
  }

  if (hamburgerIcon) {
    hamburgerIcon.addEventListener("click", toggleMenu);
  }

  // Forzar autocierre al hacer clic en cualquier link del menú hamburguesa
  document.querySelectorAll("#hamburger-nav .menu-links a").forEach(link => {
    link.addEventListener("click", () => {
      menuLinks.classList.remove("open");
      hamburgerIcon.classList.remove("open");
    });
  });

  // Cierra el menú hamburguesa si haces clic fuera
  document.addEventListener("click", function (e) {
    if (
      menuLinks.classList.contains("open") &&
      !menuLinks.contains(e.target) &&
      !hamburgerIcon.contains(e.target)
    ) {
      menuLinks.classList.remove("open");
      hamburgerIcon.classList.remove("open");
    }
  });

  /*-----------------------------------------
    1. EFECTOS AL CARGAR Y FADE-IN DE SECCIONES
  -----------------------------------------*/
  window.addEventListener("load", () => {
    document.body.classList.add("loaded"); // cuerpo aparece

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
      { threshold: 0.0 }
    );

    faders.forEach((f) => appearOnScroll.observe(f));
  });

  /*-----------------------------------------
    3. OCULTAR NAVBAR EN FOOTER
  -----------------------------------------*/
  const desktopNav = document.getElementById("desktop-nav");
  const footer = document.querySelector("footer");
  if (desktopNav && footer) {
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
  }

  /*-----------------------------------------
    4. LOGO → SCROLL TOP + RESET ANIM
  -----------------------------------------*/
  document.querySelectorAll(".logo").forEach((logo) => {
    logo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      logo.classList.remove("clicked");
      void logo.offsetWidth; // reinicia animation
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
    if (modal) {
      card.addEventListener("click", () => {
        modal.classList.add("open");
        document.body.classList.add("no-scroll"); // Bloquea scroll fondo
      });
    }
  });

  // Cerrar con la X
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
  });

  // Cerrar al clickar fuera del contenido
  window.addEventListener("click", (e) => {
    if (e.target.classList && e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
  });

  function closeModal(modal) {
    if (!modal) return;
    const content = modal.querySelector('.modal-content');
    if (!content) return;
    content.classList.add('closing');
    setTimeout(() => {
      modal.classList.remove('open');
      content.classList.remove('closing');
      document.body.classList.remove("no-scroll");
    }, 230);
  }

  /* effecto typewriter */
  const typewriterTarget = document.getElementById("typewriter-text");
  if (typewriterTarget) {
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
        }, 1000);
        return;
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
      }

      setTimeout(type, isDeleting ? 50 : typingSpeed);
    }

    type();
  }

  // Cierra el modal si se hace clic en cualquier enlace 'contact me' dentro del modal
  document.querySelectorAll('.modal-contact-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const modal = this.closest('.modal');
      if (modal) closeModal(modal);
      setTimeout(() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 410);
    });
  });
});
