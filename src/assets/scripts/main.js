const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Años transcurridos desde la fecha indicada (YYYY-MM), para que el CV no se quede desactualizado
function yearsSince(value) {
  const [year, month] = value.split("-").map(Number);
  const now = new Date();
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return Math.floor(months / 12);
}

// Cuenta desde 0 hasta el valor final
function countUp(el, target, duration = 1200) {
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

document.querySelectorAll("[data-years-since]").forEach((el) => {
  const years = yearsSince(el.dataset.yearsSince);
  if (!reducedMotion && el.closest(".highlights")) {
    el.textContent = "0";
    setTimeout(() => countUp(el, years), 500);
    // Si se imprime antes de que acabe la cuenta, que salga el valor final
    window.addEventListener("beforeprint", () => (el.textContent = years));
  } else {
    el.textContent = years;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("printCv").addEventListener("click", () => window.print());

// Marca en la navegación la sección visible
const navLinks = document.querySelectorAll(".nav a");
const observer = new IntersectionObserver(
  (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

document.querySelectorAll("main .section").forEach((section) => observer.observe(section));

// Aparición de tarjetas al hacer scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
        // Tras aparecer, sin retardo para que el hover responda al instante
        setTimeout(() => entry.target.style.removeProperty("--reveal-delay"), 1500);
      });
  },
  { rootMargin: "0px 0px -10% 0px" }
);

document.querySelectorAll(".highlights li, .job, .degree, #experiencia .section__title, #formacion .section__title").forEach((el) => {
  el.classList.add("reveal");
  const index = [...el.parentElement.children].indexOf(el);
  if (el.matches(".highlights li, .degree")) el.style.setProperty("--reveal-delay", `${0.4 + index * 0.1}s`);
  revealObserver.observe(el);
});

// La línea del timeline se rellena según avanza el scroll
const timeline = document.querySelector(".timeline");
let ticking = false;

function updateTimeline() {
  const rect = timeline.getBoundingClientRect();
  const progress = (window.innerHeight * 0.6 - rect.top) / rect.height;
  timeline.style.setProperty("--progress", Math.min(Math.max(progress, 0), 1).toFixed(3));
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateTimeline);
    }
  },
  { passive: true }
);
updateTimeline();
