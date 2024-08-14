const fadeIns = document.querySelectorAll('.gsap-fade-in');
const circle = document.querySelector('.hero__outer-circle');
const image = document.querySelector('.hero__image');

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: 'main',
  start: 'top top',
  end: 'max',
});

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
    })
  });
}

gsap.fromTo(circle,
  {
    scale: 1,
    backgroundColor: '#fff',
    boxShadow: '0 0 20px rgba(255, 104, 63, 0.5)', // Initial shadow: larger and more pronounced
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0
  },
  {
    scale: getRandom(1.1, 1.3), // Slightly randomize the scaling
    backgroundColor: '#f20',
    boxShadow: '0 0 60px rgba(255, 104, 63, 1)', // End shadow: even larger and more intense
    x: `+=${getRandom(8, 12)}`, // Randomize the horizontal shift
    y: `+=${getRandom(3, 7)}`, // Randomize the vertical shift
    duration: getRandom(1.8, 2.2), // Slightly randomize the duration
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  }
);

gsap.fromTo(circle,
  {
    opacity: 1, // Start fully visible
  },
  {
    opacity: 0, // End fully transparent
    scrollTrigger: {
      trigger: circle,
      start: 'top center', // When the top of the circle hits the center of the viewport
      end: 'bottom top', // When the bottom of the circle hits the top of the viewport
      scrub: true, // Smooth transition based on scroll position
    },
    duration: 1.5,
    ease: "power1.inOut"
  }
);

gsap.to(circle, {
  duration: 0.5,
  attr: { filter: 'url(#distortionFilter)' }, // Apply the SVG filter
  repeat: -1,
  yoyo: true,
  ease: "power2.inOut",
  repeatDelay: 0.5 // Delay between glitches
});

// Function to generate a random number within a range
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Apply and animate SVG distortion filter
gsap.to(image, {
  duration: 0.4,
  attr: { filter: 'url(#distortionFilter)' }, // Apply the SVG filter
  repeat: -1,
  yoyo: true,
  ease: "power2.inOut",
});
