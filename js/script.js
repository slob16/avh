// define all UI variable
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');
const featureSliderElement = document.querySelector('.feature-swiper');
const featureProgressDots = document.querySelectorAll('.feature-progress-dot');
const featurePrevButton = document.querySelector('.feature-swiper__arrow--prev');
const featureNextButton = document.querySelector('.feature-swiper__arrow--next');
const rippleButtons = document.querySelectorAll('.feature-slide__cta');
const FEATURE_AUTOPLAY_DELAY = 6000;
const polaroidFigures = document.querySelectorAll('.page-polaroid');
const header = document.querySelector('.header-area');

// load all event listners
allEventListners();

// functions of all event listners
function allEventListners() {
  // toggler icon click event
  if (navToggler) {
    navToggler.addEventListener('click', togglerClick);
  }

  // nav links click event
  navLinks.forEach((elem) => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
  if (navMenu.classList.contains('open')) {
    navToggler.click();
  }
}

// footer year
const currentYear = new Date().getFullYear();
document.querySelectorAll('[data-footer-year]').forEach((el) => {
  el.textContent = currentYear;
});

// Feature slider (Swiper)
function initFeatureSwiper() {
  if (!featureSliderElement || typeof Swiper === 'undefined') return;

  document.documentElement.style.setProperty(
    '--feature-progress-duration',
    `${FEATURE_AUTOPLAY_DELAY}ms`
  );

  const swiper = new Swiper(featureSliderElement, {
    loop: true,
    speed: 900,
    slidesPerView: 1,
    autoplay: {
      delay: FEATURE_AUTOPLAY_DELAY,
      disableOnInteraction: false,
    },
    allowTouchMove: true,
    grabCursor: true,
    simulateTouch: true,
    breakpoints: {
      769: {
        slidesPerView: 1,
        allowTouchMove: true,
      },
    },
  });

  const resetDotAnimation = (dot, active) => {
    dot.classList.toggle('is-active', active);
    dot.classList.remove('is-animating');
    // restart animation
    void dot.offsetWidth;
    if (active) {
      dot.classList.add('is-animating');
    }
  };

  const syncDots = () => {
    const targetIndex = swiper.realIndex % featureProgressDots.length;
    featureProgressDots.forEach((dot, index) => {
      resetDotAnimation(dot, index === targetIndex);
    });
  };

  swiper.on('slideChangeTransitionStart', syncDots);
  syncDots();

  featureProgressDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIndex = Number(dot.dataset.slide) || 0;
      swiper.slideToLoop(slideIndex);
    });
  });

  if (featurePrevButton) {
    featurePrevButton.addEventListener('click', () => swiper.slidePrev());
  }
  if (featureNextButton) {
    featureNextButton.addEventListener('click', () => swiper.slideNext());
  }
}

initFeatureSwiper();

// Ripple buttons
function initRippleButtons() {
  rippleButtons.forEach((button) => {
    const ripple = button.querySelector('span');
    if (!ripple) return;

    const setPosition = (event) => {
      const rect = button.getBoundingClientRect();
      const relX = event.clientX - rect.left;
      const relY = event.clientY - rect.top;
      ripple.style.top = `${relY}px`;
      ripple.style.left = `${relX}px`;
    };

    button.addEventListener('mouseenter', setPosition);
    button.addEventListener('mousemove', setPosition);
    button.addEventListener('mouseout', setPosition);
  });
}

initRippleButtons();

// Polaroid swing
function initPolaroidSwing() {
  if (!polaroidFigures.length) return;
  polaroidFigures.forEach((figure, index) => {
    const angle = (index % 2 === 0 ? 2 : -2) + Math.random();
    const duration = 3 + Math.random() * 2;
    figure.style.setProperty('--swing-angle', `${angle}deg`);
    figure.style.setProperty('--swing-duration', `${duration}s`);
  });
}

initPolaroidSwing();

// Header scroll state (gradient at top, transparent on scroll)
function initHeaderScrollState() {
  if (!header) return;

  const toggleHeaderBackground = () => {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  // run once on load
  toggleHeaderBackground();

  // update on scroll
  window.addEventListener('scroll', toggleHeaderBackground);
}

initHeaderScrollState();

// Step cards flip on click
document.querySelectorAll('.step-card').forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
});
