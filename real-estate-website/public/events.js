document.addEventListener('DOMContentLoaded', () => {
  // Filter buttons and cards
  const filters = Array.from(document.querySelectorAll('.event-filter'));
  const cards = Array.from(document.querySelectorAll('.event-card'));

  if (filters.length && cards.length) {
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = (btn.dataset.filter || 'all').trim();

        cards.forEach(card => {
          const cat = (card.dataset.category || '').trim();
          if (filter === 'all' || cat === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });

        // scroll into view of the filters so results are visible
        const filtersEl = document.querySelector('.event-filters');
        if (filtersEl) {
          const header = document.querySelector('.header');
          const offset = header ? header.offsetHeight : 0;
          const top = filtersEl.getBoundingClientRect().top + window.scrollY - offset - 10;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }});