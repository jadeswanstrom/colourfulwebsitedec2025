// script.js

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // HERO / CAROUSEL
  // =========================
  const slides = [
    { src: "assets/slide-1.jpg", alt: "Girl Boss coloring book cover", link: "#" },
    { src: "assets/slide-2.jpg", alt: "Cozy Studio coloring book cover", link: "#" },
    { src: "assets/slide-3.jpg", alt: "Sunday Reset coloring book cover", link: "#" },
  ];

  const imgEl = document.querySelector(".carousel__img");
  const dotsEl = document.querySelector(".carousel__dots");
  const heroLink = document.querySelector(".hero__link");
  const carousel = document.querySelector(".carousel");

  // Only run carousel code on pages that actually have it
  if (imgEl && dotsEl && heroLink) {
    let index = 0;
    let timer = null;

    function renderDots() {
      dotsEl.innerHTML = "";
      slides.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.className = "dot";
        btn.type = "button";
        btn.role = "tab";
        btn.ariaLabel = `Slide ${i + 1}`;
        btn.setAttribute("aria-selected", i === index ? "true" : "false");
        btn.addEventListener("click", () => {
          goTo(i);
          restart();
        });
        dotsEl.appendChild(btn);
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      const s = slides[index];
      imgEl.src = s.src;
      imgEl.alt = s.alt;
      heroLink.href = s.link;
      renderDots();
    }

    function next() {
      goTo(index + 1);
    }

    function start() {
      timer = setInterval(next, 5000);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    function restart() {
      stop();
      start();
    }

    /* pause on hover (nice touch) */
    if (carousel) {
      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);
    }

    /* init */
    goTo(0);
    start();
  }

  // =========================
  // MOBILE NAV TOGGLE (UPDATED)
  // =========================
  const toggle = document.querySelector(".navToggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    const closeNav = () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a nav link is tapped (mobile UX)
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeNav);
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }
});
