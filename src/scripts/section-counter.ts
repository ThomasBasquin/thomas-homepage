/**
 * Repérage dans la page : la barre prend son filet une fois le hero dépassé,
 * et affiche le numéro de la section projet en cours de lecture.
 *
 * Le rootMargin réduit la racine à une bande horizontale au centre du
 * viewport : une seule section peut l'occuper à la fois.
 */

export {};

const header = document.querySelector<HTMLElement>("[data-header]");
const counter = document.querySelector<HTMLElement>("[data-counter]");
const hero = document.querySelector<HTMLElement>(".hero");
const sections = Array.from(
  document.querySelectorAll<HTMLElement>("[data-showcase]")
);

if (header && hero && "IntersectionObserver" in window) {
  new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle("is-stuck", (entry?.intersectionRatio ?? 1) < 0.4);
    },
    { threshold: [0, 0.4, 1] }
  ).observe(hero);
}

if (counter && sections.length > 0 && "IntersectionObserver" in window) {
  const total = String(sections.length).padStart(2, "0");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const num = (entry.target as HTMLElement).dataset.showcase ?? "";
        if (entry.isIntersecting) {
          counter.textContent = `${num} / ${total}`;
        } else if (counter.textContent?.startsWith(num)) {
          counter.textContent = "";
        }
      }
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  for (const section of sections) observer.observe(section);
}
