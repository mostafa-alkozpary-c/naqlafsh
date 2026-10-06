/**
 * نقل عفش الكويت - الجافاسكريبت الرئيسي وتتبع الإحالات الإعلانية
 * رقم الاتصال: 65655775
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Google Conversion Tracking Helper (Google Ads & GA4 & GTM Ready)
  window.dataLayer = window.dataLayer || [];

  function trackConversion(eventName, eventParams) {
    var params = eventParams || {};
    params.event = eventName;
    params.timestamp = new Date().toISOString();

    // Push to Google Tag Manager DataLayer
    window.dataLayer.push(params);

    // Call gtag if available
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    // Call fbq (Meta Pixel) if available
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, params);
    }

    console.log('[Analytics & SEO Conversion Tracked]:', eventName, params);
  }

  // Attach tracking to all Call triggers (Click to Call)
  var callButtons = document.querySelectorAll('a[href^="tel:"]');
  callButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var source = btn.getAttribute('data-track-source') || 'Call Button';
      trackConversion('conversion_call_click', {
        event_category: 'Contact',
        event_label: source,
        phone_number: '65655775'
      });
    });
  });

  // Attach tracking to all WhatsApp triggers
  var whatsappButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]');
  whatsappButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var source = btn.getAttribute('data-track-source') || 'WhatsApp Button';
      trackConversion('conversion_whatsapp_click', {
        event_category: 'Contact',
        event_label: source,
        service_target: 'نقل عفش الكويت'
      });
    });
  });

  // 2. Mobile Menu Drawer
  var mobileToggle = document.getElementById('mobileMenuToggle');
  var mobileDrawer = document.getElementById('mobileNavDrawer');
  var drawerOverlay = document.getElementById('drawerOverlay');
  var drawerClose = document.getElementById('drawerClose');
  var drawerNavLinks = document.querySelectorAll('.drawer-links a');

  function openMobileMenu() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (drawerClose) drawerClose.addEventListener('click', closeMobileMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileMenu);

  drawerNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. FAQ Accordion Toggle
  var faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(function (card) {
    var btn = card.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        var isOpen = card.classList.contains('open');

        // Close other FAQs for clean UX
        faqCards.forEach(function (other) {
          other.classList.remove('open');
        });

        // Toggle clicked
        if (!isOpen) {
          card.classList.add('open');
        }
      });
    }
  });

  // 4. Interactive Gallery Filter & Lightbox
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filterCategory = btn.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        var itemCat = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCat === filterCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal
  var lightbox = document.getElementById('lightboxModal');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      var title = item.querySelector('.gallery-title');

      if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption && title) {
          lightboxCaption.textContent = title.textContent;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // 5. Toast Notification System
  function showToast(message) {
    var toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<span>✓</span> ' + message;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 4000);
  }

  // 6. Simple Contact Form Handling (STRICT: Phone Required, Description Optional)
  var contactForm = document.getElementById('quickContactForm');
  var phoneInput = document.getElementById('clientPhone');
  var descInput = document.getElementById('clientDesc');
  var phoneError = document.getElementById('phoneErrorMsg');
  var successBanner = document.getElementById('formSuccessBanner');

  if (contactForm && phoneInput) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var phoneVal = phoneInput.value.trim();
      var descVal = descInput ? descInput.value.trim() : '';

      // Validate Phone: Must have at least 7-8 digits (Kuwait numbers are 8 digits)
      var cleanPhone = phoneVal.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 8) {
        if (phoneError) {
          phoneError.style.display = 'block';
          phoneError.textContent = 'يرجى إدخال رقم هاتف صحيح مكون من 8 أرقام على الأقل للتواصل معك.';
        }
        phoneInput.focus();
        return;
      }

      if (phoneError) {
        phoneError.style.display = 'none';
      }

      // Track Google Lead Conversion
      trackConversion('conversion_contact_form_lead', {
        event_category: 'Leads',
        event_label: 'Quick Contact Form',
        phone_number: cleanPhone,
        has_description: descVal.length > 0 ? 'yes' : 'no'
      });

      // Display Success Banner
      if (successBanner) {
        successBanner.style.display = 'block';
        successBanner.innerHTML = 'تم استلام رقم هاتفك بنجاح! سيقوم فريق نقل عفش الكويت بالتواصل معك على الرقم: <strong>' + cleanPhone + '</strong> فورا.';
      }

      showToast('تم إرسال طلب التواصل بنجاح! شكراً لك.');

      // Construct WhatsApp message if user wants direct follow-up
      var waText = encodeURIComponent('مرحباً شركة نقل عفش الكويت، أرغب بالتواصل بخصوص خدمة نقل الأثاث. رقم هاتفي: ' + cleanPhone + (descVal ? '\nتفاصيل الطلب: ' + descVal : ''));
      var waUrl = 'https://wa.me/96565655775?text=' + waText;

      // Reset form fields
      phoneInput.value = '';
      if (descInput) descInput.value = '';

      // Optionally offer direct WhatsApp redirect
      setTimeout(function () {
        var confirmWa = confirm('تم تسجيل طلبك! هل تود فتح محادثة فورية عبر الواتساب مع فريق نقل عفش الكويت مباشرة؟');
        if (confirmWa) {
          window.open(waUrl, '_blank');
        }
      }, 1000);
    });
  }

  // Smooth Scrolling for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || !href) return;
      var targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
