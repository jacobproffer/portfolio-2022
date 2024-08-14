const fadeIns = document.querySelectorAll('.gsap-fade-in');
const circle = document.querySelector('.hero__outer-circle');
const images = document.querySelectorAll('.hero__image');

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
    scale: 1, // Start scale
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
  },
  {
    scale: 1.2, // End scale
    backgroundColor: '#f20',
    boxShadow: '0 0 20px rgba(0,0,0,0.8)',
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  }
);

// Fade out the circle on scroll
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

// Function to generate a random number within a range
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

if (images.length > 0) {
  // Apply random animations to each image
  images.forEach((image, index) => {
    const randomDelay = getRandom(0, 1); // Random delay between 0 and 1 seconds
    const randomOpacity = getRandom(0.5, 1); // Random opacity between 0.5 and 1
    const randomColor = `rgba(${Math.floor(getRandom(0, 256))}, ${Math.floor(getRandom(0, 256))}, ${Math.floor(getRandom(0, 256))}, ${Math.random()})`; // Random color

    gsap.fromTo(image,
      {
        opacity: 1,
        filter: `drop-shadow(0 0 10px rgba(0,0,0,0.5))`
      },
      {
        opacity: randomOpacity,
        filter: `drop-shadow(0 0 10px ${randomColor})`,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: randomDelay // Add a random delay
      }
    );
  });
}
