import ProjectCards from "../../components/project-cards";
export const metadata = { title: "Projects" };
export default function Projects() {
  return (
    <main id="main" className="inner-page projects-page page-shell">
      <div className="page-heading">
        <p className="eyebrow">EXPERIMENTS. DETAILS. REAL EXPERIENCES.</p>
        <h1>
          MY <span>WORK</span>
        </h1>
        <div className="heading-rule" />
        <p>A little curiosity, turned into something you can explore.</p>
      </div>
      <ProjectCards />
      <p className="work-footnote">
        ONE PROJECT AT A TIME. ALWAYS MOVING FORWARD.
      </p>
    </main>
  );
}
