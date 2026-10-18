const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const metrics = document.querySelectorAll(".metric-value");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
    navLinks.classList.remove("open");
  }
});

const animateMetrics = () => {
  metrics.forEach((metric) => {
    const target = Number(metric.dataset.target);
    const duration = 1600;
    const startTime = performance.now();

    const update = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      metric.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  });
};

const observer = new IntersectionObserver(
  (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateMetrics();
        observerInstance.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

if (metrics.length > 0) {
  observer.observe(metrics[0]);
}

const form = document.querySelector(".contact-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  alert("Mensagem enviada! Em breve nosso time retornará.");
});
