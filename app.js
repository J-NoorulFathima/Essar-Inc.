document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // SPA CLIENT-SIDE ROUTER
  // ============================================================
  const routes = {
    'home': { viewId: 'view-home', bodyClass: 'page-home', title: 'Essar Inc. — Premium Brand Storytelling. Engineered for Global ESG Compliance.' },
    'workflow': { viewId: 'view-workflow', bodyClass: 'page-workflow', title: 'Essar Inc. — How We Built a Zero-Travel Production Ecosystem' },
    'ledger': { viewId: 'view-ledger', bodyClass: 'page-ledger', title: 'Essar Inc. — Green Ledger & ISO 14067 Boundary Framework' },
    'about': { viewId: 'view-about', bodyClass: 'page-about', title: 'Essar Inc. — Exceptional Art. Zero Compromise.' },
    'contact': { viewId: 'view-contact', bodyClass: 'page-contact', title: 'Essar Inc. — Shield Your Film Making. Elevate Your Story.' }
  };

    const defaultRoute = 'home';
  function router() {
    let hash = window.location.hash.substring(1) || defaultRoute;
    if (!routes[hash]) {
      hash = defaultRoute;
    }
    const route = routes[hash];
    // Hide all views, show active
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active-view');
    });
    const activeView = document.getElementById(route.viewId);
    if (activeView) {
      activeView.classList.add('active-view');
    }



      // Set page body class for styling theme shifts
    document.body.className = '';
    document.body.classList.add(route.bodyClass);
    // Update browser title
    document.title = route.title;
    // Update desktop nav links
    document.querySelectorAll('.primary-nav a').forEach(link => {
      const hrefHash = link.getAttribute('href').substring(1);
      if (hrefHash === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

        // Update mobile nav panel links
    document.querySelectorAll('.nav-mobile-panel a').forEach(link => {
      const hrefHash = link.getAttribute('href').substring(1);
      if (hrefHash === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

        // Close mobile menu panel if open
    const header = document.getElementById('siteHeader');
    const toggle = document.getElementById('navToggle');
    if (header && header.classList.contains('menu-open')) {
      header.classList.remove('menu-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
    // Trigger animations or simulations depending on page
    if (hash === 'workflow') {
      startQueueSimulation();
    }
  }

    // Bind Router Events
  window.addEventListener('hashchange', router);
  router(); // Run on load
  // ============================================================
  // MOBILE NAVIGATION DRAWER
  // ============================================================
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('navToggle');
  if (toggle && header) {
        toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
  // Adjust header state when resizing window
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && header.classList.contains('menu-open')) {
      header.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

    // ============================================================
  // TOAST NOTIFICATIONS HELPER
  // ============================================================
  const toastContainer = document.getElementById('toast-container') || (() => {
    const el = document.createElement('div');
    el.id = 'toast-container';
    document.body.appendChild(el);
    return el;
  })();

    function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : 'toast-info'}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    // Auto-remove toast from DOM after animations complete
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

    // ============================================================
  // WORKFLOW: ANIMATED QUEUE SIMULATION
  // ============================================================
  let queueInterval = null;
  function startQueueSimulation() {
    // Clear any active simulations first
    if (queueInterval) clearInterval(queueInterval);
    const progressBars = document.querySelectorAll('.queue-bar i');
    const etaSuffixes = document.querySelectorAll('.queue-row .qmeta .eta');

       // Reset and initialize progress randomly
    const progressData = Array.from(progressBars).map((bar, idx) => {
      let initVal = parseFloat(bar.style.width) || (30 + Math.random() * 50);
      bar.style.width = `${initVal}%`;
      return {
        element: bar,
        etaElement: etaSuffixes[idx],
        val: initVal,
        baseText: etaSuffixes[idx] ? etaSuffixes[idx].textContent.split('·')[0].trim() : ''
      };
    });

        // Run active progress increment simulator
    queueInterval = setInterval(() => {
      progressData.forEach(barObj => {
        if (barObj.val >= 100) {
          barObj.val = 0; // restart
        } else {
          barObj.val += Math.random() * 2.5;
          if (barObj.val > 100) barObj.val = 100;
        }

                barObj.element.style.width = `${Math.floor(barObj.val)}%`;
        // Update ETA string
        if (barObj.etaElement) {
          const roundedVal = Math.floor(barObj.val);
          if (roundedVal === 100) {
            barObj.etaElement.textContent = `100% · Completed`;
          } else {
                        // Adjust ETA timer mock seconds
            const estSeconds = Math.max(10, Math.floor((100 - roundedVal) * 15));
            const minutes = Math.floor(estSeconds / 60);
            const seconds = estSeconds % 60;
            const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            barObj.etaElement.textContent = `${roundedVal}% · ETA 00:${timeStr}`;
          }
        }
      });
    }, 1500);
  }

    // ============================================================
  // ABOUT US: CUSTOM VIDEO PLAYER WITH UPLOAD INTERACTIVE MOCKS
  // ============================================================
  const video = document.getElementById('anthemVideo');
  const mediaWrap = document.getElementById('videoMedia');
  const placeholder = document.getElementById('mediaPlaceholder');
  const videoUpload = document.getElementById('videoUpload');
  const coverUpload = document.getElementById('coverUpload');

    const ctrlPlay = document.getElementById('ctrlPlay');
  const ctrlMute = document.getElementById('ctrlMute');
  const ctrlTime = document.getElementById('ctrlTime');
  const ctrlBar = document.getElementById('ctrlBar');
  const ctrlFill = document.getElementById('ctrlFill');
  const ctrlKnob = document.getElementById('ctrlKnob');
  const ctrlFullscreen = document.getElementById('ctrlFullscreen');
  const mainPlayBtn = document.getElementById('mainPlayBtn');

    const playIcon  = '<svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M0 0L14 8L0 16V0Z"/></svg>';
  const pauseIcon = '<svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><rect x="0" y="0" width="5" height="16"/><rect x="9" y="0" width="5" height="16"/></svg>';
  const muteOnIcon  = '<svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M1 6h3l5-4v12l-5-4H1V6z"/><path d="M12 5.5a3.5 3.5 0 0 1 0 5"/></svg>';
  const muteOffIcon = '<svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M1 6h3l5-4v12l-5-4H1V6z"/><path d="M13 5l4 6M17 5l-4 6"/></svg>';

    function hidePlaceholder() {
    if (placeholder) placeholder.style.display = 'none';
  }
  function formatTime(t) {
    if (!isFinite(t) || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  if (videoUpload) {
    videoUpload.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      video.src = url;
      video.load();
      hidePlaceholder();
      showToast(`Video successfully loaded: ${file.name}`, 'success');
    });
  }

    if (coverUpload) {
    coverUpload.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      video.poster = url;
      hidePlaceholder();
      showToast(`Poster cover successfully updated`, 'success');
    });
  }
  function togglePlay() {
    if (!video.src) {
      videoUpload.click();
      return;
    }
    if (video.paused) {
      video.play().catch(err => {
        showToast("Error starting playback: Load a valid video file", "info");
      });
    } else {
      video.pause();
    }
  }

    if (ctrlPlay) ctrlPlay.addEventListener('click', togglePlay);
  if (mainPlayBtn) {
    mainPlayBtn.addEventListener('click', togglePlay);
    mainPlayBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    });
  }

    if (video) {
    video.addEventListener('play', () => {
      if (ctrlPlay) ctrlPlay.innerHTML = pauseIcon;
      if (mainPlayBtn) mainPlayBtn.innerHTML = pauseIcon;
    });
    video.addEventListener('pause', () => {
      if (ctrlPlay) ctrlPlay.innerHTML = playIcon;
      if (mainPlayBtn) mainPlayBtn.innerHTML = playIcon;
    });
    video.addEventListener('loadedmetadata', () => {
      if (ctrlTime) ctrlTime.innerHTML = `${formatTime(0)}&nbsp;/&nbsp;${formatTime(video.duration)}`;
    });

        video.addEventListener('timeupdate', () => {
      const pct = video.duration ? (video.currentTime / video.duration) * 100 : 0;
      if (ctrlFill) ctrlFill.style.width = `${pct}%`;
      if (ctrlKnob) ctrlKnob.style.left = `${pct}%`;
      if (ctrlTime) ctrlTime.innerHTML = `${formatTime(video.currentTime)}&nbsp;/&nbsp;${formatTime(video.duration)}`;
    });
  }
  if (ctrlMute) {
    ctrlMute.addEventListener('click', () => {
      video.muted = !video.muted;
      ctrlMute.innerHTML = video.muted ? muteOffIcon : muteOnIcon;
    });
  }

    function seekFromEvent(e) {
    if (!video.duration) return;
    const rect = ctrlBar.getBoundingClientRect();
    const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
    let pct = (clientX - rect.left) / rect.width;
    pct = Math.min(1, Math.max(0, pct));
    video.currentTime = pct * video.duration;
  }
  let seeking = false;
  if (ctrlBar) {
    ctrlBar.addEventListener('mousedown', (e) => { seeking = true; seekFromEvent(e); });
    window.addEventListener('mousemove', (e) => { if (seeking) seekFromEvent(e); });
    window.addEventListener('mouseup', () => { seeking = false; });
    ctrlBar.addEventListener('touchstart', (e) => { seeking = true; seekFromEvent(e); });
    window.addEventListener('touchmove', (e) => { if (seeking) seekFromEvent(e); });
    window.addEventListener('touchend', () => { seeking = false; });
  }

    if (ctrlFullscreen && mediaWrap) {
    ctrlFullscreen.addEventListener('click', () => {
      if (mediaWrap.requestFullscreen) mediaWrap.requestFullscreen();
      else if (mediaWrap.webkitRequestFullscreen) mediaWrap.webkitRequestFullscreen();
    });
  }

    // ============================================================
  // CONTACT FORM: INTERACTIVE TIER CARDS & INPUT VALIDATION
  // ============================================================
  const msgBox = document.getElementById('msgBox');
  const countDisplay = document.getElementById('count');
  if (msgBox && countDisplay) {
    msgBox.addEventListener('input', () => {
      countDisplay.textContent = msgBox.value.length;
    });
  }

    // Interactive Checklist Toggles (Cards behave like big checkbox wrappers)
  document.querySelectorAll('.check-card').forEach(card => {
    const cb = card.querySelector('input[type="checkbox"]');
    
    // Sync UI to initial checked state
    if (cb && cb.checked) card.classList.add('checked');
    card.addEventListener('click', (e) => {
      // Avoid infinite loop if clicking checkbox itself
      if (e.target !== cb) {
        cb.checked = !cb.checked;
      }
      card.classList.toggle('checked', cb.checked);
    });
  });

    // Interactive Tier Selectors
  document.querySelectorAll('.tier-card').forEach(card => {
    const cb = card.querySelector('input[type="checkbox"]');
    // Sync UI to initial checked state
    if (cb && cb.checked) card.classList.add('checked');
    card.addEventListener('click', (e) => {
      if (e.target !== cb) {
        cb.checked = !cb.checked;
      }
      card.classList.toggle('checked', cb.checked);
    });
  });

    // Form Submit Handler
  const contactForm = document.querySelector('#view-contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Read values
      const nameInput = contactForm.querySelector('input[placeholder="Full Name"]');
      const companyInput = contactForm.querySelector('input[placeholder="Company Name & Website"]');

            if (!nameInput.value.trim()) {
        showToast("Please enter your name", "info");
        nameInput.focus();
        return;
      }
      if (!companyInput.value.trim()) {
        showToast("Please enter your company details", "info");
        companyInput.focus();
        return;
      }

            // Successful mock submission
      showToast(`Thank you, ${nameInput.value}! Your Green Ledger Blueprint request has been logged.`, 'success');
      contactForm.reset();
      
      // Reset checklist card styles
      document.querySelectorAll('.check-card, .tier-card').forEach(card => {
        card.classList.remove('checked');
        const cb = card.querySelector('input[type="checkbox"]');
        if (cb) cb.checked = false;
      });
      if (countDisplay) countDisplay.textContent = '0';
    });
  }

    // ============================================================
  // MOCK INTERACTION HANDLERS (Toasts on button clicks)
  // ============================================================
  
  // Download Green Ledger PDF Button
  document.querySelectorAll('.dl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast("Generating audit-ready Green Ledger PDF... Download starting.", "success");
    });
  });

    // General Portfolio items mock
  document.querySelectorAll('.case-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.case-title') ? card.querySelector('.case-title').textContent : 'Campaign';
      showToast(`Opening case details: ${title}`, "info");
    });
  });

  // Quick download icons on workflow page
  document.querySelectorAll('.video-meta a.btn-solid-sage').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast("Mock download initiated for final cinematic render asset.", "success");
    });
  });

  // ============================================================
  // INTERACTIVE EFFECTS: SCROLL REVEAL & COUNT-UP
  // ============================================================
  const selectorsToReveal = [
    '.hero-home .hero-grid h1', '.hero-home .hero-grid p', '.hero-home .hero-grid a',
    '.liability-grid > div', '.compare-card',
    '.process-col', '.audit-grid > div', '.ledger-card', '.banner-card',
    '.workflow-hero h1', '.workflow-hero p', '.cd-panel',
    '.step-copy', '.local-node-media', '.dashboard-card', '.video-card', '.ledger-mini', '.cta-banner',
    '#view-ledger .hero-right', '.formula-box', '.table .row', '.ledger-item',
    '#view-about .hero h1', '#view-about .hero p', '.video-panel', '.case-card', '.cta-box-horizontal',
    '#view-contact .hero', 'form .step', '.contact-panel'
  ];

  selectorsToReveal.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal-on-scroll');
    });
  });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // If it's a stats card or contains counters, trigger counter animation
      if (entry.target.classList.contains('ledger-card') || 
          entry.target.classList.contains('ledger-mini') ||
          entry.target.classList.contains('emissions-box') ||
          entry.target.classList.contains('stat-box') ||
          entry.target.classList.contains('dashboard-card') ||
          entry.target.classList.contains('case-card')) {
        animateStatsIn(entry.target);
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // Helper function to animate numbers counting up
function animateStatsIn(container) {
  const valueElements = container.querySelectorAll('.v, .big, .stat-value, .row-value');
    valueElements.forEach(el => {
      if (el.dataset.animated) return;
      el.dataset.animated = 'true';
      
      let rawText = '';
      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          rawText += node.textContent;
        }
      });
      rawText = rawText.trim();
      
      const numMatch = rawText.match(/[\d\.]+/);
      if (!numMatch) return;
      const targetVal = parseFloat(numMatch[0]);
      const decimals = (numMatch[0].split('.')[1] || []).length;
      
      let startVal = 0;
      const duration = 1200; // 1.2 seconds
      const startTime = performance.now();
      
      function updateVal(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress * (2 - progress); // easeOutQuad
        const currentVal = startVal + easeProgress * targetVal;
        
        let replaced = false;
        el.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && !replaced) {
            const valStr = currentVal.toFixed(decimals);
            node.textContent = rawText.replace(numMatch[0], valStr);
            replaced = true;
          }
        });
        
        if (progress < 1) {
          requestAnimationFrame(updateVal);
        }
      }
      requestAnimationFrame(updateVal);
    });
  }
});


// Compare Card Live Animation
const compareCard = document.querySelector('.compare-card');
if (compareCard) {
  let side = 'right';
  compareCard.classList.add('highlight-right'); // Start highlighted on Essar side
  setInterval(() => {
    if (side === 'right') {
      compareCard.classList.remove('highlight-right');
      compareCard.classList.add('highlight-left');
      side = 'left';
    } else {
      compareCard.classList.remove('highlight-left');
      compareCard.classList.add('highlight-right');
      side = 'right';
    }
  }, 4000); // Toggle every 4 seconds
}
