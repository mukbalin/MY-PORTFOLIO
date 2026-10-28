import Image from "next/image";
import Link from "next/link";
import portrait from "../public/profile.jpg";
import Icon from "../components/icon";
export default function Home() {
  return (
    <main id="main" className="landing">
      <div className="landing-coordinates" aria-hidden="true">
        <span>PORTFOLIO / 2026</span>
        <span>CREATIVE DEVELOPMENT</span>
      </div>
      <section className="hero-grid" aria-labelledby="hero-name">
        <div className="hero-name">
          <p className="hero-greeting">Hello! I&apos;m</p>
          <h1 id="hero-name">
            MUKHTAR
            <br />
            <span>BELLO</span>
          </h1>
          <p className="hero-alias">
            ALSO KNOWN AS MUKBAL<span>↗</span>
          </p>
        </div>
        <div className="hero-center">
          <div className="portrait-orbit">
            <span className="orbit-ring" />
            <span className="orbit-point" />
            <div className="hero-portrait">
              <Image
                src={portrait}
                alt="Mukhtar Bello, web developer"
                sizes="(max-width: 600px) 230px, 290px"
                priority
              />
            </div>
            <span className="portrait-cross" aria-hidden="true">
              +
            </span>
          </div>
          <Link className="button primary-button hero-cta" href="/contact">
            GET IN TOUCH
            <Icon name="diagonal" size={17} />
          </Link>
        </div>
        <div className="hero-role">
          <p>Frontend &amp; creative</p>
          <h2>
            WEB
            <br />
            <span>DEVELOPER</span>
          </h2>
          <div className="tech-chips">
            {["HTML", "CSS", "JAVASCRIPT", "REACT", "NEXT.JS", "TAILWIND"].map(
              (t) => (
                <span key={t}>{t}</span>
              ),
            )}
          </div>
        </div>
      </section>
      <div className="landing-bottom">
        <p>
          <span className="status-dot" />
          IDEAS INTO INTERACTIVE EXPERIENCES
        </p>
        <Link href="/about" className="discover-link">
          DISCOVER MY UNIVERSE
          <Icon name="arrow" size={17} />
        </Link>
        <span className="landing-index">01 / 04</span>
      </div>
    </main>
  );
}
