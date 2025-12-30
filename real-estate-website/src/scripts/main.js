document.addEventListener("DOMContentLoaded", () => {

  loadComponent("header", "../src/components/header.html");
  loadComponent("footer", "../src/components/footer.html");

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (!header) return;

    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

});

/* Component Loader */
function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(err => console.error("Component load error:", err));
}

/* ===============================
   HERO CAROUSEL LOGIC
================================ */
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

slideInterval = setInterval(nextSlide, 6000);

// Scroll reveal animation
const fadeElements = document.querySelectorAll(".fade-up");

const revealOnScroll = () => {
  fadeElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* DOT CLICK */
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    clearInterval(slideInterval);
    showSlide(parseInt(dot.dataset.slide));
    slideInterval = setInterval(nextSlide, 6000);
  });
});

/* ============================
   WHAT WE DO SLIDER
============================ */

const slidera = document.querySelector(".what-slider");
const nextBtna = document.querySelector(".next");
const prevBtna = document.querySelector(".prev");

if (slidera && nextBtna && prevBtna) {
  const cardWidth = slidera.querySelector(".what-card").offsetWidth + 24;

  nextBtna.addEventListener("click", () => {
    slidera.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  prevBtna.addEventListener("click", () => {
    slidera.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });
}


/* =========================
   PROCESS SCROLL REVEAL
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".process-step");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // reveal once
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  steps.forEach((step) => observer.observe(step));
});

/* HOME PROJECT CAROUSEL */
(() => {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".project-slide");
  const nextBtn = document.querySelector(".carousel-arrow.next");
  const prevBtn = document.querySelector(".carousel-arrow.prev");

  let index = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });
})();

// PRESS EVENTS SLIDER
const pressCards = document.querySelectorAll('.press-card');
const slider = document.querySelector('.press-slider');
const prevBtn = document.querySelector('.press-nav.prev');
const nextBtn = document.querySelector('.press-nav.next');

let currentIndex = 0;

function updateSlider() {
  pressCards.forEach((card, index) => {
    card.classList.remove('active');
    if (index === currentIndex) {
      card.classList.add('active');
    }
  });

  const offset = -(currentIndex * 70);
  slider.style.transform = `translateX(${offset}%)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % pressCards.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + pressCards.length) % pressCards.length;
  updateSlider();
});

// Init
updateSlider();
