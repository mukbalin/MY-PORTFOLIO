"use client";
import { useState, useRef, useEffect } from "react";
import Icon from "./icon";
const tools = [
  {
    name: "HTML",
    mark: "5",
    color: "#e6552d",
    category: "Frontend",
    detail: "Semantic structure",
  },
  {
    name: "CSS",
    mark: "3",
    color: "#2965f1",
    category: "Frontend",
    detail: "Layouts & animation",
  },
  {
    name: "JavaScript",
    mark: "JS",
    color: "#d5ae16",
    category: "Frontend",
    detail: "Interactive experiences",
  },
  {
    name: "Responsive design",
    mark: "↔",
    color: "#36a4a8",
    category: "Frontend",
    detail: "Every screen, considered",
  },
  {
    name: "Tailwind CSS",
    mark: "~",
    color: "#0eabc3",
    category: "Frameworks",
    detail: "Utility-first styling",
  },
  {
    name: "React",
    mark: "⚛",
    color: "#169bbd",
    category: "Frameworks",
    detail: "Component-based interfaces",
  },
  {
    name: "Next.js",
    mark: "N",
    color: "#dbeaf0",
    category: "Frameworks",
    detail: "This portfolio’s foundation",
  },
  {
    name: "Git",
    mark: "◇",
    color: "#ef5631",
    category: "Workflow",
    detail: "Version control",
  },
  {
    name: "UI/UX",
    mark: "✳",
    color: "#a05be3",
    category: "Workflow",
    detail: "Thoughtful user journeys",
  },
  {
    name: "Problem solving",
    mark: "{ }",
    color: "#e78e27",
    category: "Workflow",
    detail: "Ideas into solutions",
  },
];
const categories = ["Frontend", "Frameworks", "Workflow", "All tools"];
export default function Toolbox() {
  const searchRef = useRef(null);
  useEffect(() => {
    function shortcut(event) {
      if (
        event.key === "/" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !event.target.closest('input,textarea,[contenteditable="true"]')
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);
  const [category, setCategory] = useState("Frontend"),
    [query, setQuery] = useState("");
  const visible = tools.filter(
    (t) =>
      (category === "All tools" || t.category === category) &&
      t.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="toolbox-content">
      <div
        className="tool-filters"
        role="group"
        aria-label="Technology categories"
      >
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <label className="tool-search">
        <Icon name="search" size={16} />
        <input
          ref={searchRef}
          aria-label="Search technologies"
          placeholder="Find a technology..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <kbd>/</kbd>
      </label>
      <div className="tools-grid" aria-live="polite">
        {visible.length ? (
          visible.map((t) => (
            <article className="tool-card" key={t.name}>
              <span
                className="tool-mark"
                style={{ "--tool-color": t.color }}
                aria-hidden="true"
              >
                {t.mark}
              </span>
              <h3>{t.name}</h3>
              <p>{t.detail}</p>
            </article>
          ))
        ) : (
          <p className="empty-tools">
            No matches. Try another technology or category.
          </p>
        )}
      </div>
      <p className="toolbox-note">
        Always learning. Always adding to the toolkit.
      </p>
    </div>
  );
}
