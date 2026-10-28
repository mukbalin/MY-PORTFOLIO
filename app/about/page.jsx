import Link from "next/link";
import Toolbox from "../../components/toolbox";
import Reveal from "../../components/reveal";
import Icon from "../../components/icon";
export const metadata = { title: "About" };
const services = [
  {
    title: "FRONT-END DEVELOPMENT",
    subtitle: "RESPONSIVE INTERFACES & WEB EXPERIENCES",
    body: "I build modern websites with HTML, CSS, JavaScript, and Tailwind CSS. My focus is a clear structure, fast interactions, and a layout that feels right on every screen.",
    tags: ["HTML", "CSS", "JAVASCRIPT", "TAILWIND"],
  },
  {
    title: "INTERACTIVE EXPERIENCES",
    subtitle: "SMALL DETAILS. A BIG DIFFERENCE.",
    body: "From a responsive navigation menu to purposeful animation, I enjoy bringing interfaces to life. I use React and Next.js in this portfolio to turn reusable components into a smooth experience.",
    tags: ["REACT", "NEXT.JS", "ANIMATION"],
  },
  {
    title: "UI / UX DESIGN",
    subtitle: "THOUGHTFUL DESIGN & NATURAL INTERACTIONS",
    body: "I care about how a website feels to use. I focus on visual hierarchy, readable content, consistent spacing, and accessible controls that help people find what they need.",
    tags: ["UI / UX", "ACCESSIBILITY", "RESPONSIVE DESIGN"],
  },
];
export default function About() {
  return (
    <main id="main" className="inner-page about-page">
      <Reveal>
        <section className="services-layout page-shell">
          <div className="section-intro">
            <p className="eyebrow">01 / THE CRAFT</p>
            <h1>
              WHAT I <span>DO</span>
            </h1>
            <div className="heading-rule" />
            <p className="intro-description">
              Good design gets your attention.
              <br />A great experience makes you stay.
            </p>
          </div>
          <div className="service-accordions">
            {services.map((s, i) => (
              <details
                className="service-panel frame"
                key={s.title}
                open={i === 0}
              >
                <summary>
                  <span className="service-number">0{i + 1}</span>
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.subtitle}</small>
                  </span>
                  <span className="accordion-toggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="service-body">
                  <p>{s.body}</p>
                  <div className="tech-chips">
                    {s.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section className="about-story page-shell" data-reveal>
          <p className="eyebrow">02 / THE PERSON</p>
          <div className="story-grid">
            <h2>
              ABOUT <span>ME</span>
            </h2>
            <div>
              <p>
                I&apos;m <strong>Mukhtar Bello</strong> — Mukbal for short. A
                web developer and Software Engineering student who enjoys
                turning ideas into useful digital experiences.
              </p>
              <p>
                I work with HTML, CSS, JavaScript, and Tailwind CSS to create
                websites that are responsive, clean, and easy to use. I&apos;m
                drawn to the details: the right spacing, the smooth transition,
                the interaction that just makes sense.
              </p>
              <p>
                My goal is to keep learning, create meaningful work, and help
                businesses build a strong presence online.
              </p>
              <a className="text-link" href="/Mukhtar_Bello_CV.pdf" download>
                DOWNLOAD MY CV
                <Icon name="download" size={16} />
              </a>
            </div>
          </div>
        </section>
        <section className="journey-section page-shell" data-reveal>
          <div className="journey-grid">
            <div>
              <p className="eyebrow">03 / ALWAYS EVOLVING</p>
              <h2>
                MY JOURNEY &amp;
                <br />
                <span>EXPERIENCE</span>
              </h2>
              <Link href="/contact" className="text-link">
                LET&apos;S MAKE SOMETHING
                <Icon name="diagonal" size={16} />
              </Link>
            </div>
            <div className="journey-list">
              <article>
                <span className="timeline-marker" />
                <div className="timeline-top">
                  <h3>Learning &amp; Growing</h3>
                  <span>NOW</span>
                </div>
                <p className="timeline-meta">SELF-DEVELOPMENT</p>
                <p>
                  Exploring web technologies and improving my skills through
                  projects, practice, and a curiosity for how things work.
                </p>
              </article>
              <article>
                <span className="timeline-marker" />
                <div className="timeline-top">
                  <h3>Web Development</h3>
                  <span>ONGOING</span>
                </div>
                <p className="timeline-meta">PERSONAL PROJECTS</p>
                <p>
                  Building responsive interfaces and experimenting with
                  animation, reusable components, and user-friendly experiences.
                </p>
              </article>
              <article>
                <span className="timeline-marker" />
                <div className="timeline-top">
                  <h3>Software Engineering</h3>
                  <span>STUDYING</span>
                </div>
                <p className="timeline-meta">EDUCATION</p>
                <p>
                  Developing a foundation in programming, problem-solving, and
                  the principles behind reliable software.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="stack-section page-shell" id="toolbox" data-reveal>
          <div className="section-title">
            <p className="eyebrow">04 / MY TOOLKIT</p>
            <h2>
              TECH <span>STACK</span>
            </h2>
          </div>
          <Toolbox />
        </section>
        <section className="strengths-section page-shell" data-reveal>
          <div className="section-title">
            <h2>
              CORE <span>STRENGTHS</span>
            </h2>
          </div>
          <div className="strengths-grid">
            {[
              [
                "code",
                "Problem Solving",
                "Breaking down a challenge and working toward a clear, practical solution.",
              ],
              [
                "globe",
                "Responsive Thinking",
                "Considering every screen size from the very first layout decision.",
              ],
              [
                "book",
                "Always Learning",
                "Building, reflecting, and applying something new with each project.",
              ],
              [
                "check",
                "Attention to Detail",
                "Giving typography, spacing, and interactions the care they deserve.",
              ],
            ].map(([icon, title, body]) => (
              <article className="strength-card frame" key={title}>
                <Icon name={icon} size={24} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
    </main>
  );
}
