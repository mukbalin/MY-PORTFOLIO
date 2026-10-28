"use client";
import { useState } from "react";
import Icon from "./icon";
export default function ContactForm() {
  const [composed, setComposed] = useState(false);
  function compose(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    window.location.href = `mailto:mukhtarmuki123@gmail.com?subject=${encodeURIComponent(String(data.get("subject")))}&body=${encodeURIComponent(String(data.get("message")) + "\n\nFrom: " + data.get("name") + "\nReply to: " + data.get("email"))}`;
    setComposed(true);
  }
  return (
    <form onSubmit={compose} className="contact-form">
      <label htmlFor="name">
        <span>
          <Icon name="code" size={14} />
          Your name
        </span>
        <input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          required
          maxLength={120}
        />
      </label>
      <label htmlFor="email">
        <span>
          <Icon name="mail" size={14} />
          Your email
        </span>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          maxLength={254}
        />
      </label>
      <label htmlFor="subject">
        <span>
          <Icon name="arrow" size={14} />
          Subject
        </span>
        <input
          id="subject"
          name="subject"
          placeholder="Let’s work together"
          required
          maxLength={180}
        />
      </label>
      <label htmlFor="message">
        <span>
          <Icon name="book" size={14} />
          Message
        </span>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="A little about what you have in mind..."
          required
          maxLength={4000}
        />
      </label>
      <button type="submit" className="button gradient-button">
        <Icon name="diagonal" size={16} />
        Open email draft
      </button>
      <p className="form-note" role="status">
        {composed
          ? "Your email app was requested. Send the draft there to get in touch."
          : "Opens your email app with a draft ready to send."}
      </p>
    </form>
  );
}
