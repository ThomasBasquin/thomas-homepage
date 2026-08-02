/**
 * Rendu client de la page /status : va chercher le snapshot JSON généré
 * côté serveur toutes les 2h et l'affiche. Pas de fetch au build : la
 * donnée est trop volatile pour être figée dans le HTML statique.
 */

export {};

type Site = { label: string; domain: string; status: string };
type Payload = { generated_at: string; sites: Site[] };

const STATE_LABELS: Record<string, string> = {
  up: "En ligne",
  down: "Hors ligne",
  retired: "Retiré",
};

const list = document.querySelector<HTMLUListElement>("[data-status-list]");
const updated = document.querySelector<HTMLParagraphElement>(
  "[data-status-updated]"
);

async function init(): Promise<void> {
  if (!list) return;
  try {
    const res = await fetch("/status.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    render((await res.json()) as Payload);
  } catch {
    if (updated) {
      updated.textContent = "Impossible de charger le statut des sites.";
    }
  }
}

function render(data: Payload): void {
  if (!list) return;

  if (updated) {
    updated.textContent = `Dernière vérification : ${new Intl.DateTimeFormat(
      "fr-FR",
      { dateStyle: "medium", timeStyle: "short" }
    ).format(new Date(data.generated_at))}`;
  }

  list.replaceChildren(
    ...data.sites.map((site) => {
      const item = document.createElement("li");
      item.className = "status-item";
      item.dataset.status = site.status;

      const dot = document.createElement("span");
      dot.className = "status-dot";
      dot.setAttribute("aria-hidden", "true");

      const label = document.createElement("div");
      label.className = "status-label";

      const link = document.createElement("a");
      link.href = `https://${site.domain}`;
      link.rel = "noopener";
      link.target = "_blank";
      link.textContent = site.label;

      const domain = document.createElement("span");
      domain.className = "status-domain";
      domain.textContent = site.domain;

      label.append(link, domain);

      const state = document.createElement("span");
      state.className = "status-state";
      state.textContent = STATE_LABELS[site.status] ?? site.status;

      item.append(dot, label, state);
      return item;
    })
  );
}

void init();
