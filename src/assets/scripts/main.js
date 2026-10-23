// Años transcurridos desde la fecha indicada (YYYY-MM), para que el CV no se quede desactualizado
function yearsSince(value) {
  const [year, month] = value.split("-").map(Number);
  const now = new Date();
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return Math.floor(months / 12);
}

document.querySelectorAll("[data-years-since]").forEach((el) => {
  el.textContent = yearsSince(el.dataset.yearsSince);
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
