
/* PARTNER TESTIMONIALS Filters */
document.addEventListener('DOMContentLoaded', () => {
const HappyCustomerChips = document.querySelectorAll('.Happy-customer-chip');
const HappyCustomerCards = document.querySelectorAll('.Happy-customer-testimonial-card');

HappyCustomerChips.forEach(chip => {
  chip.addEventListener('click', () => {
    HappyCustomerChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.getAttribute('data-filter');

    HappyCustomerCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
})});


/* HAPPY CUSTOMER VIDEO CARDS - YouTube Thumbnails */
const HappyCustomerCarousel = document.querySelector('.Happy-customer-video-carousel');
const HappyCustomerPrev = document.querySelector('.Happy-customer-video-nav.prev');
const HappyCustomerNext = document.querySelector('.Happy-customer-video-nav.next');

let HappyCustomerIndex = 0;

HappyCustomerNext.addEventListener('click', () => {
  const cardWidth = document.querySelector('.Happy-customer-video-card').offsetWidth + 24;
  HappyCustomerIndex++;
  HappyCustomerCarousel.style.transform = `translateX(-${HappyCustomerIndex * cardWidth}px)`;
});

HappyCustomerPrev.addEventListener('click', () => {
  const cardWidth = document.querySelector('.Happy-customer-video-card').offsetWidth + 24;
  HappyCustomerIndex = Math.max(0, HappyCustomerIndex - 1);
  HappyCustomerCarousel.style.transform = `translateX(-${HappyCustomerIndex * cardWidth}px)`;
});

/* Hover to Play */
document.querySelectorAll('.Happy-customer-video-card').forEach(card => {
  const video = card.querySelector('video');

  card.addEventListener('mouseenter', () => {
    video.currentTime = 0;
    video.play();
  });

  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

