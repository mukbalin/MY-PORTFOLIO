"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./icon";
const email = "mukhtarmuki123@gmail.com";
export default function CopyEmail({ compact = false }) {
  const [status, setStatus] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email copied");
    } catch {
      setStatus("Copy unavailable — use the email link below.");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 3500);
  }
  return (
    <div className={`copy-email ${compact ? "compact" : ""}`}>
      <button type="button" onClick={copy} aria-label="Copy email address">
        <span>{email}</span>
        <Icon name="copy" size={14} />
      </button>
      <span className="copy-status" role="status" aria-live="polite">
        {status || (compact ? "" : "CLICK TO COPY EMAIL")}
      </span>
    </div>
  );
}
