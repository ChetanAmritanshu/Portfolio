"use client";

import Link from "next/link";

import { dispatchAudioEvent } from "~/audio/events";
import { externalLinks } from "~/content/profile";
import { SoundToggle } from "./SoundToggle";

const navigation: ReadonlyArray<{ label: string; to: string | null; detail?: string }> = [
  { label: "Home", to: "/#home" },
  { label: "Systems", to: "/#systems", detail: "Projects" },
  { label: "Experience", to: "/#profile" },
  { label: "Arsenal", to: "/#arsenal", detail: "Skills" },
  { label: "Logs", to: null, detail: "Writing" },
  { label: "Contact", to: "/#contact" },
];

export function SiteHeader() {
  const resume = externalLinks.find((link) => link.kind === "resume");

  return (
    <header className="site-header">
      <Link
        className="brand-lockup"
        href="/"
        aria-label="Chetan Amritanshu, home"
        onClick={() => dispatchAudioEvent({ name: "navigation:enter" })}
        onFocus={() => dispatchAudioEvent({ name: "ui:focus" })}
        onPointerEnter={() => dispatchAudioEvent({ name: "ui:hover" })}
      >
        <span className="brand-sigil" aria-hidden="true">
          CA
        </span>
        <span className="brand-copy">
          <b>Chetan</b>
          <small>Command interface</small>
        </span>
      </Link>

      <nav className="primary-nav" aria-label="Primary navigation">
        {navigation.map((item, index) =>
          item.to ? (
            <Link
              className={index === 0 ? "is-active" : ""}
              key={item.label}
              href={item.to}
              onClick={() => dispatchAudioEvent({ name: "navigation:enter" })}
              onFocus={() => dispatchAudioEvent({ name: "ui:focus" })}
              onPointerEnter={() => dispatchAudioEvent({ name: "ui:hover" })}
            >
              <span>{item.label}</span>
              {item.detail ? <small>{item.detail}</small> : null}
            </Link>
          ) : (
            <span className="nav-unavailable" key={item.label} aria-disabled="true">
              <span>{item.label}</span>
              <small>{item.detail} pending</small>
            </span>
          ),
        )}
      </nav>

      <div className="header-actions">
        {resume?.href ? (
          <a href={resume.href} target="_blank" rel="noopener noreferrer" aria-label={resume.ariaLabel}>Resume</a>
        ) : (
          <span className="link-placeholder" aria-label="Resume link pending">
            Resume // Pending
          </span>
        )}
        <SoundToggle />
      </div>
    </header>
  );
}
