/**
 * ============================================================================
 * A.P. INTERIOR & HOME DECORATION - CORE JAVASCRIPT
 * "Coloring Dreams, Designing Spaces" - Kolkata Luxury Interiors
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME CONTROLLER (Dark / Light Mode with Persistence)
  // --------------------------------------------------------------------------
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('ap_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ap_theme', theme);

    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fas fa-sun';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
          btn.setAttribute('title', 'Switch to Light Mode');
        } else {
          icon.className = 'fas fa-moon';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
          btn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    });
  }

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast('Theme Updated', `Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} luxury mode`, 'fas fa-adjust');
    });
  });

  // --------------------------------------------------------------------------
  // 2. STICKY HEADER & SCROLL BEHAVIOR
  // --------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 3. MOBILE DRAWER NAVIGATION
  // --------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerClose = document.querySelector('.drawer-close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('open');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 4. PORTFOLIO FILTERING
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || category?.includes(filterValue)) {
            card.classList.remove('hide');
            card.style.animation = 'fadeInStep 0.4s ease forwards';
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. PROJECT LIGHTBOX MODAL
  // --------------------------------------------------------------------------
  const modalBackdrop = document.querySelector('.project-modal-backdrop');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  if (modalBackdrop) {
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title') || card.querySelector('.project-title')?.textContent || 'Bespoke Residence';
        const category = card.getAttribute('data-category-label') || card.querySelector('.project-category-tag')?.textContent || 'Luxury Interior';
        const imgSrc = card.querySelector('img')?.getAttribute('src') || '';
        const desc = card.getAttribute('data-desc') || 'A comprehensive bespoke interior transformation executed with architectural craftsmanship, custom millwork, curated lighting, and premium Italian marble.';
        const area = card.getAttribute('data-area') || '2,850 Sq. Ft.';
        const style = card.getAttribute('data-style') || 'Modern Classical';
        const client = card.getAttribute('data-client') || 'Private Residence, Kolkata';

        const modalImg = modalBackdrop.querySelector('.modal-image-col img');
        const modalCat = modalBackdrop.querySelector('.modal-category');
        const modalTitle = modalBackdrop.querySelector('.modal-title');
        const modalDesc = modalBackdrop.querySelector('.modal-desc');
        const modalArea = modalBackdrop.querySelector('[data-modal-area]');
        const modalStyle = modalBackdrop.querySelector('[data-modal-style]');
        const modalClient = modalBackdrop.querySelector('[data-modal-client]');

        if (modalImg) modalImg.src = imgSrc;
        if (modalCat) modalCat.textContent = category;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalArea) modalArea.textContent = area;
        if (modalStyle) modalStyle.textContent = style;
        if (modalClient) modalClient.textContent = client;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. BEFORE & AFTER TRANSFORMATION SLIDER
  // --------------------------------------------------------------------------
  const sliderContainer = document.querySelector('.split-slider-container');
  const sliderBefore = document.querySelector('.split-slider-before');
  const sliderHandle = document.querySelector('.slider-handle-bar');

  if (sliderContainer && sliderBefore && sliderHandle) {
    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = sliderContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      const percentage = (offsetX / rect.width) * 100;

      sliderBefore.style.width = `${percentage}%`;
      sliderHandle.style.left = `${percentage}%`;
    };

    sliderContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support for mobile & tablet
    sliderContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // --------------------------------------------------------------------------
  // 7. INTERACTIVE COST ESTIMATOR / INSTANT CALCULATOR
  // --------------------------------------------------------------------------
  const calcForm = document.getElementById('interiorCostEstimator');
  if (calcForm) {
    const priceDisplay = document.getElementById('calcEstimatedTotal');
    const summaryBhk = document.getElementById('summaryBhk');
    const summaryTier = document.getElementById('summaryTier');
    const summaryAddons = document.getElementById('summaryAddons');

    const updateCalculator = () => {
      const bhkEl = calcForm.querySelector('input[name="bhk"]:checked');
      const tierEl = calcForm.querySelector('input[name="tier"]:checked');
      const addonEls = calcForm.querySelectorAll('input[name="addon"]:checked');

      if (!bhkEl || !tierEl) return;

      const bhk = bhkEl.value; // '1bhk', '2bhk', '3bhk', '4bhk'
      const tier = tierEl.value; // 'essential', 'premium', 'luxury'

      // Base estimates in Lakhs (INR)
      const baseRates = {
        '1bhk': { essential: [4.2, 5.8], premium: [6.5, 8.5], luxury: [10.0, 14.5] },
        '2bhk': { essential: [7.5, 9.8], premium: [11.0, 14.5], luxury: [17.0, 24.0] },
        '3bhk': { essential: [11.0, 14.5], premium: [16.5, 21.0], luxury: [26.0, 38.0] },
        '4bhk': { essential: [16.0, 21.0], premium: [24.0, 32.0], luxury: [39.0, 60.0] },
      };

      let [minPrice, maxPrice] = baseRates[bhk][tier];

      // Addons additions in Lakhs
      let addonCount = 0;
      addonEls.forEach(el => {
        addonCount++;
        const cost = parseFloat(el.getAttribute('data-cost') || '1.0');
        minPrice += cost;
        maxPrice += cost * 1.35;
      });

      if (priceDisplay) {
        priceDisplay.textContent = `₹${minPrice.toFixed(1)}L - ₹${maxPrice.toFixed(1)}L`;
      }

      if (summaryBhk) {
        const bhkLabels = { '1bhk': '1 BHK Apartment', '2bhk': '2 BHK Apartment', '3bhk': '3 BHK Luxury Home', '4bhk': '4 BHK / Villa' };
        summaryBhk.textContent = bhkLabels[bhk] || bhk;
      }

      if (summaryTier) {
        const tierLabels = { 'essential': 'Minimalist Classic', 'premium': 'Premium Contemporary', 'luxury': 'Ultra-Luxury Bespoke' };
        summaryTier.textContent = tierLabels[tier] || tier;
      }

      if (summaryAddons) {
        summaryAddons.textContent = addonCount > 0 ? `${addonCount} Custom Module${addonCount > 1 ? 's' : ''}` : 'None Selected';
      }
    };

    calcForm.addEventListener('change', updateCalculator);
    updateCalculator(); // initialize
  }

  // --------------------------------------------------------------------------
  // 8. FAQ ACCORDION INTERACTION
  // --------------------------------------------------------------------------
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const isActive = currentItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        const btn = item.querySelector('.accordion-header');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        currentItem.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 9. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  window.showToast = function(title, message, iconClass = 'fas fa-check-circle') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'luxury-toast';
    toast.innerHTML = `
      <div class="toast-icon"><i class="${iconClass}"></i></div>
      <div class="toast-body">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Remove after 4.2 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4200);
  };

  // --------------------------------------------------------------------------
  // 10. FORM SUBMISSION HANDLERS WITH VALIDATION
  // --------------------------------------------------------------------------

  // A. Hero Quick Consultation Form
  const heroQuoteForm = document.getElementById('quoteForm');
  if (heroQuoteForm) {
    heroQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = heroQuoteForm.querySelector('input[type="text"]');
      const phoneInput = heroQuoteForm.querySelector('input[type="tel"]');
      const submitBtn = heroQuoteForm.querySelector('button[type="submit"]');

      if (!nameInput?.value.trim()) {
        showToast('Required Field', 'Please provide your name', 'fas fa-exclamation-circle');
        return;
      }

      if (!phoneInput?.value.trim() || phoneInput.value.trim().length < 8) {
        showToast('Invalid Phone', 'Please provide a valid phone number', 'fas fa-exclamation-circle');
        return;
      }

      // Simulate sending
      const origText = submitBtn ? submitBtn.textContent : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = origText;
        }
        showToast(
          'Consultation Requested!',
          `Thank you ${nameInput.value.trim()}, our principal architect in Kolkata will contact you within 24 hours.`,
          'fas fa-check-circle'
        );
        heroQuoteForm.reset();
      }, 900);
    });
  }

  // B. Inner Contact Page Form
  const contactForm = document.getElementById('contactPageForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Consultation Inquiry';
        }
        showToast(
          'Inquiry Received!',
          'Your project brief has been forwarded to our Kolkata studio. We look forward to meeting you.',
          'fas fa-envelope-open-text'
        );
        contactForm.reset();
      }, 1000);
    });
  }

  // C. Newsletter Subscription Form
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.includes('@')) {
        showToast(
          'Subscribed to Atelier Journal',
          'Thank you for joining our private architecture & design digest.',
          'fas fa-gem'
        );
        form.reset();
      }
    });
  });

  // --------------------------------------------------------------------------
  // 11. DEDICATED MULTI-STEP QUOTE WIZARD (quote.html)
  // --------------------------------------------------------------------------
  const quoteWizardForm = document.getElementById('multiStepQuoteForm');
  if (quoteWizardForm) {
    let currentStep = 1;
    const totalSteps = 4;

    const stepPanes = document.querySelectorAll('.wizard-section-pane');
    const stepNodes = document.querySelectorAll('.wizard-step-node');
    const btnNext = document.getElementById('wizardNextBtn');
    const btnPrev = document.getElementById('wizardPrevBtn');
    const liveEstimateTag = document.getElementById('wizardLivePrice');

    function updateWizardUI() {
      stepPanes.forEach((pane, idx) => {
        if (idx + 1 === currentStep) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });

      stepNodes.forEach((node, idx) => {
        const stepNum = idx + 1;
        node.classList.remove('active', 'completed');
        if (stepNum === currentStep) {
          node.classList.add('active');
        } else if (stepNum < currentStep) {
          node.classList.add('completed');
        }
      });

      if (btnPrev) {
        btnPrev.style.display = currentStep === 1 ? 'none' : 'inline-flex';
      }

      if (btnNext) {
        if (currentStep === totalSteps) {
          btnNext.innerHTML = '<i class="fas fa-check-circle"></i> Confirm & Get Free 3D Plan';
        } else {
          btnNext.innerHTML = 'Next Step <i class="fas fa-arrow-right"></i>';
        }
      }

      calculateWizardEstimate();
    }

    function calculateWizardEstimate() {
      const propType = quoteWizardForm.querySelector('input[name="quotePropType"]:checked')?.value || '2bhk';
      const finishTier = quoteWizardForm.querySelector('input[name="quoteTier"]:checked')?.value || 'premium';
      const checkedScopes = quoteWizardForm.querySelectorAll('input[name="quoteScope"]:checked');

      const baseEstimates = {
        '1bhk': { essential: 4.5, premium: 7.2, luxury: 11.5 },
        '2bhk': { essential: 8.0, premium: 12.5, luxury: 19.5 },
        '3bhk': { essential: 12.0, premium: 18.0, luxury: 29.0 },
        'villa': { essential: 18.0, premium: 28.0, luxury: 45.0 }
      };

      let base = baseEstimates[propType]?.[finishTier] || 10.0;
      let addonCost = checkedScopes.length * 1.25;
      let totalEstMin = (base + addonCost).toFixed(1);
      let totalEstMax = ((base + addonCost) * 1.35).toFixed(1);

      if (liveEstimateTag) {
        liveEstimateTag.textContent = `₹${totalEstMin}L - ₹${totalEstMax}L`;
      }
    }

    quoteWizardForm.addEventListener('change', calculateWizardEstimate);

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          currentStep++;
          updateWizardUI();
          window.scrollTo({ top: quoteWizardForm.offsetTop - 120, behavior: 'smooth' });
        } else {
          // Final Submit
          const nameInput = document.getElementById('quoteClientName');
          const phoneInput = document.getElementById('quoteClientPhone');

          if (!nameInput?.value.trim() || !phoneInput?.value.trim()) {
            showToast('Required Info', 'Please enter your contact details', 'fas fa-exclamation-circle');
            return;
          }

          btnNext.disabled = true;
          btnNext.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finalizing estimate...';

          setTimeout(() => {
            btnNext.disabled = false;
            showToast(
              'Detailed Estimate Generated!',
              `Your customized estimate and 3D consultation appointment have been sent to your WhatsApp and email.`,
              'fas fa-award'
            );
            currentStep = 1;
            quoteWizardForm.reset();
            updateWizardUI();
          }, 1200);
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateWizardUI();
          window.scrollTo({ top: quoteWizardForm.offsetTop - 120, behavior: 'smooth' });
        }
      });
    }

    updateWizardUI();
  }

});
