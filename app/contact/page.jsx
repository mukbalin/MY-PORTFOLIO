import SocialLinks from "../../components/social-links";
import ContactForm from "../../components/contact-form";
import CopyEmail from "../../components/copy-email";
import Icon from "../../components/icon";
export const metadata = { title: "Contact" };
export default function Contact() {
  return (
    <main id="main" className="inner-page contact-page page-shell">
      <div className="page-heading">
        <p className="eyebrow">GOOD THINGS START WITH A CONVERSATION</p>
        <h1>
          LET&apos;S <span>CONNECT</span>
        </h1>
        <div className="heading-rule" />
      </div>
      <div className="contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
          <h2>
            YOUR NEXT IDEA.
            <br />
            <span>LET&apos;S BUILD IT.</span>
          </h2>
          <p>
            Tell me what you&apos;re working on. I&apos;d love to help bring it
            to life with a thoughtful, responsive website.
          </p>
          <div className="contact-detail">
            <span className="mini-label">EMAIL</span>
            <CopyEmail />
            <a className="text-link" href="mailto:mukhtarmuki123@gmail.com">
              OPEN EMAIL APP
              <Icon name="diagonal" size={15} />
            </a>
          </div>
          <div className="contact-detail">
            <span className="mini-label">FIND ME ONLINE</span>
            <SocialLinks />
          </div>
          <div className="contact-detail">
            <span className="mini-label">FOCUS</span>
            <p>Web development &amp; interactive experiences</p>
          </div>
          <a href="/Mukhtar_Bello_RESUME.pdf" download className="text-link">
            DOWNLOAD RESUME
            <Icon name="download" size={16} />
          </a>
        </div>
        <div className="frame contact-form-frame">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
