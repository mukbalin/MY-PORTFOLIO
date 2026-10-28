"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import portrait from "../public/profile.jpg";
import Icon from "./icon";
function Preview() {
  return (
    <div className="project-art" aria-hidden="true">
      <div className="mini-site-nav">
        <strong>MB.</strong>
        <span>ABOUT &nbsp; PROJECTS &nbsp; CONTACT</span>
      </div>
      <div className="mini-site-body">
        <div>
          <small>HELLO, WORLD.</small>
          <strong>
            MUKHTAR
            <br />
            <em>BELLO</em>
          </strong>
        </div>
        <div className="mini-site-portrait">
          <Image src={portrait} alt="" sizes="225px" />
        </div>
        <div className="mini-site-role">
          WEB
          <br />
          <span>DEVELOPER</span>
        </div>
      </div>
      <div className="mini-site-bottom">
        <span>IDEAS INTO EXPERIENCES</span>
        <span>01 / 04</span>
      </div>
    </div>
  );
}
export default function ProjectCards() {
  const dialog = useRef(null);
  return (
    <>
      <div className="work-grid">
        <article className="work-card">
          <div className="work-heading">
            <span className="work-number">01</span>
            <div>
              <p className="eyebrow">FRONT-END / CREATIVE DEVELOPMENT</p>
              <h2>
                PERSONAL <span>PORTFOLIO</span>
              </h2>
            </div>
          </div>
          <button
            className="project-open frame"
            type="button"
            onClick={() => dialog.current.showModal()}
            aria-label="View personal portfolio details"
          >
            <Preview />
            <span className="project-hover">
              <Icon name="diagonal" size={22} />
              EXPLORE PROJECT
            </span>
          </button>
          <div className="work-bottom">
            <div className="tech-chips">
              <span>NEXT.JS</span>
              <span>REACT</span>
              <span>TAILWIND CSS</span>
            </div>
            <button
              type="button"
              className="text-link"
              onClick={() => dialog.current.showModal()}
            >
              VIEW DETAILS
              <Icon name="diagonal" size={16} />
            </button>
          </div>
        </article>
        <article className="next-project frame">
          <span className="project-orbit" aria-hidden="true">
            <i />
          </span>
          <p className="eyebrow">THE NEXT CHAPTER</p>
          <h2>
            YOUR IDEA.
            <br />
            <span>OUR NEXT BUILD.</span>
          </h2>
          <p>
            A new website, a fresh perspective, or an idea waiting to happen.
            Let&apos;s make it real.
          </p>
          <Link href="/contact" className="button primary-button">
            START A CONVERSATION
            <Icon name="diagonal" size={16} />
          </Link>
        </article>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
      >
        <button
          className="dialog-close"
          type="button"
          onClick={() => dialog.current.close()}
          aria-label="Close project details"
        >
          <Icon name="close" size={22} />
        </button>
        <p className="eyebrow">PROJECT 01 / PERSONAL WEBSITE</p>
        <h2 id="project-dialog-title">
          PERSONAL <span>PORTFOLIO</span>
        </h2>
        <Preview />
        <p>
          A responsive Next.js portfolio built to bring my work and personality
          together. It includes a pointer-responsive starfield, accessible
          service accordions, searchable skills, and a contact form that opens
          an email draft.
        </p>
        <div className="tech-chips">
          <span>NEXT.JS</span>
          <span>REACT</span>
          <span>TAILWIND CSS</span>
          <span>CANVAS</span>
        </div>
        <Link
          href="/"
          className="button primary-button"
          onClick={() => dialog.current.close()}
        >
          EXPLORE LIVE SITE
          <Icon name="diagonal" size={17} />
        </Link>
      </dialog>
    </>
  );
}
