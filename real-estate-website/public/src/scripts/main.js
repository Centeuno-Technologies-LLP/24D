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
    // Happy customer testimonials filter (robust rewrite)
    

 /* KPI HIGHLIGHT cOUNTER */
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = 60;

    const update = () => {
      const increment = Math.ceil(target / speed);
      count += increment;

      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));


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
  if (!slides.length || !dots.length) return;

  index = Number(index) || 0;
  // clamp index
  index = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  if (slides[index]) slides[index].classList.add("active");
  if (dots[index]) dots[index].classList.add("active");

  currentSlide = index;
}

function nextSlide() {
  if (!slides.length) return;
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

// Start auto-rotate only if there are slides and dots
if (slides.length && dots.length) {
  // show first slide
  showSlide(0);
  slideInterval = setInterval(nextSlide, 6000);
}

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
if (dots && dots.length) {
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      if (slideInterval) clearInterval(slideInterval);
      const idx = parseInt(dot.dataset.slide);
      if (!Number.isFinite(idx)) return;
      showSlide(idx);
      slideInterval = setInterval(nextSlide, 6000);
    });
  });
}

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

  if (!track || !slides.length || !nextBtn || !prevBtn) return;

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

if (pressCards.length && slider && prevBtn && nextBtn) {
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
}

/* PROJECT FLTERING LOGIC */

(function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = (btn.dataset.filter || "all").trim();

      // Scroll the page to the filter controls so the user sees the results
      const filtersEl = document.querySelector('.project-filters');
      if (filtersEl) {
        const header = document.querySelector('.header');
        const offset = header ? header.offsetHeight : 0;
        const top = filtersEl.getBoundingClientRect().top + window.scrollY - offset - 10;
        window.scrollTo({ top, behavior: 'smooth' });
      }

      cards.forEach(card => {
          const combined = [card.dataset.filter, card.dataset.category, card.dataset.type, card.getAttribute('data-tags')]
            .filter(Boolean)
            .join(' ');

          const cardFilters = combined.split(/\s+/).filter(Boolean);
          const matches = filter === 'all' || card.classList.contains(filter) || cardFilters.includes(filter);
          if (matches) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
})();

/* ===============================
   24EXCLUSIVES SECTION STYLES
================================ */

const active24ExclusiveFilters = {
  location: 'all',
  budget: 'all',
  status: 'all'
};

document.querySelectorAll('.filter24Exclusive').forEach(select => {
  select.addEventListener('change', () => {
    active24ExclusiveFilters[select.dataset.filter] = select.value;
    apply24ExclusiveFilters();
  });
});

function apply24ExclusiveFilters() {
  document.querySelectorAll('.project24ExclusiveItem').forEach(project => {
    const matchLocation =
      active24ExclusiveFilters.location === 'all' ||
      project.dataset.location === active24ExclusiveFilters.location;

    const matchBudget =
      active24ExclusiveFilters.budget === 'all' ||
      project.dataset.budget === active24ExclusiveFilters.budget;

    const matchStatus =
      active24ExclusiveFilters.status === 'all' ||
      project.dataset.status === active24ExclusiveFilters.status;

    project.style.display = (matchLocation && matchBudget && matchStatus)
      ? 'grid'
      : 'none';
  });
}

document.querySelector('.filter24ExclusiveReset').addEventListener('click', () => {
  document.querySelectorAll('.filter24Exclusive').forEach(select => {
    select.value = 'all';
    select.dispatchEvent(new Event('change'));
  });
});

/* ===============================how work*/

document.addEventListener("DOMContentLoaded", () => {

  const steps = document.querySelectorAll(".partnerHowStep");
  const line = document.querySelector(".partnerHowLine");

  // Enable animation mode
  steps.forEach(step => step.classList.add("animate"));

  function revealSteps() {
    steps.forEach(step => {
      const rect = step.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        step.classList.add("active");
      }
    });
  }

  revealSteps();
  window.addEventListener("scroll", revealSteps);

  // Mouse interaction
  document.addEventListener("mousemove", (e) => {
    const center = window.innerWidth / 2;
    const offset = (e.clientX - center) * 0.01;
    line.style.transform = `translateX(calc(-50% + ${offset}px))`;
  });

});

