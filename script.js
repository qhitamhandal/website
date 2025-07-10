document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const menuToggle = document.getElementById("mobile-menu");
  const navList = document.querySelector(".nav-list");

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navList.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-list li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      navList.classList.remove("active");
    });
  });

  // Sticky Navigation on Scroll
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Tab Functionality for Services Section
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabBtns.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Form Submission Handling (example)
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would typically send the form data to a server
      // For this example, we'll just show an alert
      alert("Thank you for your message! We will get back to you soon.");
      this.reset();
    });
  }

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');

      // Simple validation
      if (emailInput.value && emailInput.value.includes("@")) {
        alert("Thank you for subscribing to our newsletter!");
        emailInput.value = "";
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }

  // Animate elements on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".solution-card, .about-image img, .contact-form, .contact-info",
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  window.addEventListener("load", function () {
    const animatedElements = document.querySelectorAll(
      ".solution-card, .about-image img, .contact-form, .contact-info",
    );
    animatedElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

    animateOnScroll();
  });

  window.addEventListener("scroll", animateOnScroll);
});
