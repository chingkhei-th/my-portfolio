// Function for Hamburger icon
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Function to send me to the next section when click on the arrow icon
const sections = ['about', 'experience', 'projects', 'contact'];
const arrow = document.querySelector('.arrow');
let currentSectionIndex = 0;

function scrollToNextSection() {
  const nextSectionIndex = currentSectionIndex + 1 < sections.length ? currentSectionIndex + 1 : 0;
  const nextSection = sections[nextSectionIndex];
  document.getElementById(nextSection).scrollIntoView({ behavior: 'smooth' });
  currentSectionIndex = nextSectionIndex;
}

function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = sections.indexOf(entry.target.id);
      if (index !== -1) {
        currentSectionIndex = index;
        arrow.style.display = index < sections.length - 1 ? 'block' : 'none'; // Hide arrow on the last section
      }
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5
});

sections.forEach(section => {
  const sectionElement = document.getElementById(section);
  if (sectionElement) {
    observer.observe(sectionElement);
  }
});

function handleScroll() {
  let showArrow = false;
  sections.forEach(section => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect();
      if (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      ) {
        showArrow = true;
      }
    }
  });

  arrow.style.display = showArrow && currentSectionIndex < sections.length - 1 ? 'block' : 'none';
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
window.addEventListener('hashchange', handleScroll);