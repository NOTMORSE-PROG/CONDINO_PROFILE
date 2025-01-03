const aboutModal = document.querySelector(".modal-bio-container");
const openAboutModal = document.querySelector(".open-about-modal");
const closeAboutModal = document.querySelector(".close-about-modal");

const skillsModal = document.querySelector(".modal-skills-container");
const openSkillsModal = document.querySelector(".open-skills-modal");
const closeSkillsModal = document.querySelector(".close-skills-modal");

const projectsModal = document.querySelector(".modal-projects-container");
const openProjectsModal = document.querySelector(".open-projects-modal");
const closeProjectsModal = document.querySelector(".close-projects-modal");

const homeLink = document.querySelector(".navigation ul li a");

const setHomeAsActive = () => {
  homeLink.classList.add("active");
};

const removeHomeActive = () => {
  homeLink.classList.remove("active");
};

const openModal = (modal, link) => {
  const activeModals = document.querySelectorAll(".modal-container.active");
  activeModals.forEach((activeModal) => {
    activeModal.classList.remove("active");
  });

  removeHomeActive();

  document.body.classList.add("modal-active");
  modal.classList.add("active");
  link.classList.add("active");
};

openAboutModal.addEventListener("click", (event) => {
  event.preventDefault();
  openModal(aboutModal, openAboutModal);
});

closeAboutModal.addEventListener("click", () => {
  document.body.classList.remove("modal-active");
  aboutModal.classList.remove("active");
  openAboutModal.classList.remove("active");
  setHomeAsActive();
});

openSkillsModal.addEventListener("click", (event) => {
  event.preventDefault();
  openModal(skillsModal, openSkillsModal);
});

closeSkillsModal.addEventListener("click", () => {
  document.body.classList.remove("modal-active");
  skillsModal.classList.remove("active");
  openSkillsModal.classList.remove("active");
  setHomeAsActive();
});

openProjectsModal.addEventListener("click", (event) => {
  event.preventDefault();
  openModal(projectsModal, openProjectsModal);
});

closeProjectsModal.addEventListener("click", () => {
  document.body.classList.remove("modal-active");
  projectsModal.classList.remove("active");
  openProjectsModal.classList.remove("active");
  setHomeAsActive();
});
