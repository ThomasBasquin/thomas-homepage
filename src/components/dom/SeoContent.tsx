import { PROFILE, EXPERIENCE, SKILLS, PROJECTS } from "@/lib/data";

/**
 * A complete, semantic, text-only rendering of the portfolio.
 *
 * The visible experience is a WebGL/canvas journey — most of its content
 * (projects, bio, skill detail) never reaches the DOM, so it's invisible to
 * screen readers and to the many AI/search crawlers that don't execute
 * JavaScript. This component mirrors that same content as clean, structured
 * HTML that is always server-rendered into the page.
 *
 * It's visually hidden with `sr-only` (not `display:none`), so assistive tech
 * and crawlers read it while sighted users get the 3D scene. This is a
 * legitimate text alternative to canvas content, not hidden keyword stuffing —
 * it's the exact same information the animated sections present on scroll.
 */
export default function SeoContent() {
  return (
    <section className="sr-only" aria-label={`À propos de ${PROFILE.name}`}>
      <header>
        <h2>
          {PROFILE.name} — {PROFILE.role}
        </h2>
        <p>{PROFILE.status}</p>
        <p>{PROFILE.bio}</p>
      </header>

      <section aria-label="À propos">
        <h2>À propos</h2>
        <p>{PROFILE.about.lead}</p>
        <p>{PROFILE.about.p2}</p>
        <p>{PROFILE.about.p3}</p>
        <p>Basé en {PROFILE.location}.</p>
      </section>

      <section aria-label="Parcours professionnel">
        <h2>Parcours</h2>
        {EXPERIENCE.map((job) => (
          <article key={job.company}>
            <h3>
              {job.title} — {job.company}
            </h3>
            <p>
              {job.range} · {job.location}
            </p>
            <p>{job.blurb}</p>
            <ul>
              {job.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section aria-label="Projets">
        <h2>Projets</h2>
        {PROJECTS.map((project) => (
          <article key={project.id}>
            <h3>
              {project.link ? (
                <a href={project.link} rel="noopener">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p>
              {project.meta} — {project.tagline}
            </p>
            <p>{project.description}</p>
            <p>Construit avec : {project.tags.join(", ")}.</p>
          </article>
        ))}
      </section>

      <section aria-label="Compétences">
        <h2>Compétences</h2>
        <ul>
          {SKILLS.map((skill) => (
            <li key={skill.num}>
              <strong>{skill.name}:</strong> {skill.items}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Formation">
        <h2>Formation</h2>
        <ul>
          {PROFILE.about.credentials.map((credential, i) => (
            <li key={i}>{credential}</li>
          ))}
        </ul>
      </section>

      <section aria-label="Contact">
        <h2>Contact</h2>
        <p>
          Email :{" "}
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
        <p>Localisation : {PROFILE.location}</p>
        <ul>
          <li>
            <a href={PROFILE.socials.github} rel="noopener">
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </section>
  );
}
