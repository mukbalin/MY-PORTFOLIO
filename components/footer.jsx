import SocialLinks from "./social-links";
import Icon from "./icon";
export default function Footer() {
  return (
    <>
      <aside className="side-rail" aria-label="Quick links">
        <SocialLinks compact />
        <a
          href="mailto:mukhtarmuki123@gmail.com"
          aria-label="Email Mukhtar Bello"
        >
          <Icon name="mail" size={18} />
        </a>
        <a href="/Mukhtar_Bello_CV.pdf" download aria-label="Download CV">
          CV
        </a>
        <span />
      </aside>
      <footer className="site-footer">
        <div className="footer-socials">
          <SocialLinks />
        </div>
        <p>
          DESIGNED &amp; DEVELOPED BY <span>MUKHTAR BELLO</span>
        </p>
        <p>
          &copy; 2026 <span className="footer-separator">/</span> BUILT WITH
          INTENTION
        </p>
      </footer>
    </>
  );
}
