const sections = document.querySelectorAll('.section-block');

window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
      sec.classList.add('active');
    }
  });
});

//animation fade in 
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animation-content");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animation");
      }
    });
  });

  elements.forEach(el => observer.observe(el));
});
