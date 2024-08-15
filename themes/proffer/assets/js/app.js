const mainHeader = document.querySelector('[data-header]');
const mobileNavigationTrigger = document.querySelector('[data-navigation-toggle]');
const mobileNavigation = document.querySelector('[data-navigation-list]');
const fadeIns = document.querySelectorAll('.gsap-fade-in');
const circle = document.querySelector('.hero__outer-circle');
const image = document.querySelector('.hero__image');

gsap.registerPlugin(ScrollTrigger);

// Ensure elements start fully visible
gsap.set([mainHeader, circle], { opacity: 1 });

// Fade-out animation for the main header
gsap.fromTo(mainHeader,
  { opacity: 1 }, // Start fully visible
  {
    opacity: 0, // Fade out to fully transparent
    scrollTrigger: {
      trigger: mainHeader,
      start: 'top top',
      end: 'bottom top',
      scrub: true, // Smooth transition based on scroll position
      onUpdate: self => {
        // Add or remove the 'main-header--faded' class based on opacity
        if (self.progress === 1) {
          mainHeader.classList.add('main-header--faded');
        } else {
          mainHeader.classList.remove('main-header--faded');
        }
      }
    },
    duration: 1.5,
    ease: "power1.inOut"
  }
);

// Fade-out animation for the circle
gsap.fromTo(circle,
  { opacity: 1 }, // Start fully visible
  {
    opacity: 0, // Fade out to fully transparent
    scrollTrigger: {
      trigger: circle,
      start: 'top center',
      end: 'bottom top',
      scrub: true, // Smooth transition based on scroll position
    },
    duration: 1.5,
    ease: "power1.inOut"
  }
);

// Fade-in animations
if (fadeIns.length > 0) {
  fadeIns.forEach((fadeIn) => {
    gsap.from(fadeIn, {
      y: 30,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: fadeIn,
        start: 'top 90%',
        end: 'bottom top',
        once: true,
      }
    });
  });
}

// Smooth rotation for circle
gsap.to(circle, {
  rotation: 360, // Rotate 360 degrees
  duration: 100, // Slow rotation over 100 seconds
  repeat: -1, // Repeat indefinitely
  ease: "none", // Linear rotation
  yoyo: true // Reverse direction
});

// Apply SVG filter distortion to circle and image
gsap.to([circle, image], {
  duration: 0.5,
  attr: { filter: 'url(#distortionFilter)' },
  repeat: -1,
  yoyo: true,
  ease: "power2.inOut",
  repeatDelay: 0.5 // Delay between glitches
});

// Navigation focus trapping
function navigationFocus() {
  const focusableElements = mobileNavigation.querySelectorAll('a[href], button');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  mobileNavigation.addEventListener('keydown', function(e) {
    if (e.target === firstFocusableElement && e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      lastFocusableElement.focus();
    } else if (e.target === lastFocusableElement && e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      firstFocusableElement.focus();
    }
  });
}

// Handle escape key to close navigation
function handleEscape() {
  document.addEventListener('keyup', function(e) {
    if (e.key === 'Escape' && mobileNavigation.classList.contains('open')) {
      mobileNavigationTrigger.setAttribute('aria-expanded', 'false');
      mobileNavigationTrigger.focus();
      mobileNavigation.classList.remove('open');
      mainHeader.classList.remove('main-header--navigation-open');
      mobileNavigationTrigger.innerHTML = "Open Menu";
    }
  });
}

// Mobile navigation toggle
mobileNavigationTrigger.addEventListener("click", function() {
  mainHeader.classList.toggle('main-header--navigation-open');
  mobileNavigation.classList.toggle("open");
  this.classList.toggle("nav-open");

  navigationFocus();
  handleEscape();

  if (mobileNavigation.classList.contains('open')) {
    this.setAttribute('aria-expanded', 'true');
    this.innerHTML = "Close Menu";
  } else {
    this.setAttribute('aria-expanded', 'false');
    this.innerHTML = "Open Menu";
  }
});
