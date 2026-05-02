 // Cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
    function animRing() {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    // Nav scroll
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.15 });
    reveals.forEach(el => obs.observe(el));

    // Counter animation
    const counters = document.querySelectorAll('[data-target]');
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.target);
          let cur = 0;
          const step = target / 50;
          const timer = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = Math.floor(cur);
            if (cur >= target) clearInterval(timer);
          }, 30);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObs.observe(c));

    // Modal
    const units = {
      premier: {
        title: 'The Residence',
        sub: 'Premier Suite · Studios, 1 & 2 Bedroom',
        details: [
          { label: 'Starting Price', value: '$485,000' },
          { label: 'Size Range', value: '720 – 950 sqft' },
          { label: 'Bedrooms', value: '1 – 2' },
          { label: 'Bathrooms', value: '1 – 2' },
          { label: 'Floor Level', value: '5F – 18F' },
          { label: 'Availability', value: '12 Units Left' },
        ]
      },
      grand: {
        title: 'The Prestige',
        sub: 'Grand Suite · 2 & 3 Bedroom',
        details: [
          { label: 'Starting Price', value: '$780,000' },
          { label: 'Size Range', value: '1,200 – 1,600 sqft' },
          { label: 'Bedrooms', value: '2 – 3' },
          { label: 'Bathrooms', value: '2 – 3' },
          { label: 'Floor Level', value: '19F – 28F' },
          { label: 'Availability', value: '8 Units Left' },
        ]
      },
      penthouse: {
        title: 'The Penthouse',
        sub: 'Pinnacle Collection · 3 & 4 Bedroom',
        details: [
          { label: 'Starting Price', value: '$2,400,000' },
          { label: 'Size Range', value: '2,800 – 4,200 sqft' },
          { label: 'Bedrooms', value: '3 – 4' },
          { label: 'Bathrooms', value: '3 – 4' },
          { label: 'Floor Level', value: '29F – 34F' },
          { label: 'Availability', value: '4 Units Left' },
        ]
      }
    };

    function openModal(type) {
      const u = units[type];
      document.getElementById('modal-title').textContent = u.title;
      document.getElementById('modal-sub').textContent = u.sub;
      document.getElementById('modal-details').innerHTML = u.details.map(d => `
      <div class="modal-detail-item">
        <small>${d.label}</small>
        <p>${d.value}</p>
      </div>
    `).join('');
      document.getElementById('modal').classList.add('active');
    }

    function closeModal() {
      document.getElementById('modal').classList.remove('active');
    }

    document.getElementById('modal').addEventListener('click', e => {
      if (e.target === e.currentTarget) closeModal();
    });

    // Form submit
    function handleSubmit() {
      const btn = document.querySelector('.submit-btn');
      btn.textContent = '✓ Inquiry Submitted — We\'ll Be in Touch';
      btn.style.background = '#2a4a2a';
      btn.style.color = '#7fbd7f';
      setTimeout(() => {
        btn.textContent = 'Request Private Consultation';
        btn.style.background = '';
        btn.style.color = '';
      }, 4000);
    }