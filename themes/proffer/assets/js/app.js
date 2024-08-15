// Cache DOM elements
const mainHeader = document.querySelector('[data-header]');
const mobileNavigationTrigger = document.querySelector('[data-navigation-toggle]');
const mobileNavigation = document.querySelector('[data-navigation-list]');
const fadeIns = document.querySelectorAll('.gsap-fade-in');
const circleWrap = document.querySelector('.hero__outer-circle-wrap');
const circle = document.querySelector('.hero__outer-circle');
const image = document.querySelector('.hero__image');
const bar = document.querySelector('.bar');

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Function to generate a random number within a range
function getRandom(min, max) {
  return gsap.utils.random(min, max);
}

// Create a GSAP timeline
const tl = gsap.timeline();

gsap.set(circleWrap, {
  opacity: 0
});

// Add animations to the timeline
tl.fromTo(bar,
  { height: '0%' }, // Start from 0 height
  {
    height: '100%', // End at 100% height
    duration: 1, // Duration of the animation
    ease: 'power1.out' // Easing function
  })
  .to(circleWrap,
    {
      opacity: 1, // Fade in the circleWrap
      duration: 1, // Duration of the fade-in animation
      ease: 'power1.out', // Easing function
    },
    '-=1' // Start the circleWrap animation 0.5 seconds before the bar animation ends
  );

// Center the circle initially and ensure correct transform origin
gsap.set(circle, {
  xPercent: -50,
  yPercent: -50,
  x: "50%",
  y: "50%",
  transformOrigin: "center center"
});

// Scale-in animation for the circle on page load
gsap.from(circle, {
  scale: 0, // Start scaled down
  duration: 1.5, // Duration of the scaling animation
  ease: "power1.out", // Easing function
  transformOrigin: "center center", // Ensure scaling from the center
  immediateRender: true // Ensures the animation starts immediately on page load
});

// Circle animation with random values, centered
gsap.fromTo(circle,
  {
    scale: 1,
    backgroundColor: '#fff',
    boxShadow: '0 0 20px rgba(255, 104, 63, 0.5)', // Initial shadow
    x: 0, // No horizontal movement
    y: 0  // No vertical movement
  },
  {
    scale: () => getRandom(1.1, 1.3), // Randomize scale
    backgroundColor: '#f20',
    boxShadow: '0 0 60px rgba(255, 104, 63, 1)', // End shadow
    x: () => getRandom(-10, 10), // Constrain horizontal movement
    y: () => getRandom(-10, 10), // Constrain vertical movement
    duration: () => getRandom(1.8, 2.2), // Randomize duration
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    transformOrigin: "center center" // Ensure scaling from the center
  }
);

gsap.fromTo(mainHeader,
  { opacity: 1 },
  {
    opacity: 0,
    scrollTrigger: {
      trigger: mainHeader,
      start: 'top top',
      end: '+=200%',
      scrub: true,
      onComplete: () => {
        mainHeader.style.opacity = '0'; // Keep it hidden
        mainHeader.classList.add('main-header--faded');
      },
      onUpdate: self => {
        if (self.progress < 1) {
          mainHeader.classList.remove('main-header--faded');
        }
      }
    },
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

// Function to trigger the fade-in animation
const triggerAnimation = (element) => {
  // GSAP animation setup
  gsap.fromTo(element,
    { opacity: 0, y: 30 }, // Start state
    { opacity: 1, y: 0, duration: 1 }
  );
};

// Handle focus event
if (fadeIns.length > 0) {
  fadeIns.forEach((fadeIn) => {
    // Initially set visibility to visible but not change opacity
    gsap.set(fadeIn, { visibility: 'visible' });

    // Set up GSAP animation without scrollTrigger
    gsap.fromTo(fadeIn,
      { opacity: 0, y: 30 }, // Start state
      { opacity: 1, y: 0, duration: 1, paused: true } // End state, initially paused
    );

    // Trigger animation on focus
    fadeIn.addEventListener('focus', () => {
      // Manually play the animation
      gsap.fromTo(fadeIn,
        { opacity: 0, y: 30 }, // Start state
        { opacity: 1, y: 0, duration: 1 }
      );
    });
  });
}

// Handle animation and focus event
if (fadeIns.length > 0) {
  fadeIns.forEach((fadeIn) => {
    // Initially set visibility to visible but not change opacity
    gsap.set(fadeIn, { visibility: 'visible' });

    // GSAP animation setup (for initial viewport-based triggering)
    gsap.fromTo(fadeIn,
      { opacity: 0, y: 30 }, // Start state
      { opacity: 1, y: 0, duration: 1,
        scrollTrigger: {
          trigger: fadeIn,
          start: 'top 90%',
          end: 'bottom top',
          once: true,
        }
      }
    );

    // Trigger animation on focus
    fadeIn.addEventListener('focus', () => {
      // Trigger the animation
      triggerAnimation(fadeIn);
    });
  });
}


// Smooth rotation for the circle
gsap.to(circle, {
  rotation: 360, // Rotate 360 degrees
  duration: 100, // Slow rotation over 100 seconds
  repeat: -1, // Repeat indefinitely
  ease: "none", // Linear rotation
  yoyo: true // Reverse direction
});

// ** Navigation Functions **

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
