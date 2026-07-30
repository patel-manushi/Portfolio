/* =====================================================
   TYPING EFFECT
   ===================================================== */

// Texts to display in typing animation
const texts = [
  "Full Stack Developer",
  "Software Developer",
  "UI-Focused Developer"
];

// Typing state variables
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Target element
const typingElement = document.querySelector(".typing");

// Typing animation function
function typeEffect() {
  if (!typingElement) return;

  const currentText = texts[textIndex];

  // Typing characters
  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    // Pause before deleting
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  }
  // Deleting characters
  else {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    // Move to next text
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  const speed = isDeleting ? 60 : 110;
  setTimeout(typeEffect, speed);
}

// Start typing effect
typeEffect();


/* =====================================================
   SCROLL REVEAL ANIMATION
   ===================================================== */

const reveals = document.querySelectorAll(".reveal");

// Intersection Observer for reveal effect
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

// Observe all reveal elements
reveals.forEach(el => revealObserver.observe(el));


/* =====================================================
   SCROLL SPY (ACTIVE NAV LINK)
   ===================================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    const sectionHeight = section.offsetHeight;

    if (
      window.pageYOffset >= sectionTop &&
      window.pageYOffset < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


/* =====================================================
   STAR BACKGROUND (CANVAS ANIMATION)
   ===================================================== */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Star configuration
const stars = [];
const STAR_COUNT = 180;

// Generate stars
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.6,
    dx: (Math.random() - 0.5) * 0.25,
    dy: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.8 + 0.2
  });
}

// Animate stars
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.x += star.dx;
    star.y += star.dy;

    // Wrap around edges
    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

// Start star animation
animateStars();


/* =====================================================
   MOBILE NAVBAR TOGGLE
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("navMenu");

  // Open / close menu on hamburger click
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Close menu when link is clicked
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
});
