"use client";
import { useEffect, useRef } from "react";
export default function Reveal({ children }) {
  const root = useRef(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const targets = root.current.querySelectorAll("[data-reveal]");

    if (media.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    targets.forEach((target) => {
      target.classList.add("reveal-pending", "reveal-ready");
      observer.observe(target);
    });
    const show = () => {
      if (media.matches) {
        targets.forEach((target) => target.classList.add("is-visible"));
        observer.disconnect();
      }
    };
    media.addEventListener("change", show);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", show);
      targets.forEach((target) =>
        target.classList.remove("reveal-pending", "reveal-ready", "is-visible"),
      );
    };
  }, []);
  return <div ref={root}>{children}</div>;
}
