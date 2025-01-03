document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

window.addEventListener("scroll", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight * 0.75) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hero = document.querySelector(".hero");
  setTimeout(() => {
    hero.style.opacity = "1";
  }, 100);
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    fetch(this.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.getElementById("formContainer").classList.add("d-none");
          document.getElementById("successMessage").classList.remove("d-none");
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while submitting the form.");
      });
  });

function goBack() {
  document.getElementById("successMessage").classList.add("d-none");
  document.getElementById("formContainer").classList.remove("d-none");
  document.getElementById("contactForm").reset();
}
