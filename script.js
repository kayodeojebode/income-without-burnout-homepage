const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const newsletterForm = document.querySelector("#newsletter-form");
const formMessage = document.querySelector("#form-message");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader);

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.classList.toggle("is-active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedToggle = navToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = new FormData(newsletterForm).get("email");
  formMessage.textContent = `Thanks. ${email} is on the starter kit list.`;
  newsletterForm.reset();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

const animatedItems = document.querySelectorAll(
  ".featured-post, .tool-panel, .category-pill, .affiliate-card, .resource-list a, .testimonial-card"
);

animatedItems.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
});

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
