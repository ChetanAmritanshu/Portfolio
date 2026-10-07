import Link from "next/link";

import { externalLinks, profile } from "~/content/profile";

const skills = ["Go", "C++", "Java", "Python", "Kafka", "Redis", "PostgreSQL", "gRPC", "Linux", "AWS"];

export function AccessDock() {
  return (
    <footer className="access-dock" id="contact">
      <div id="arsenal">
        <p className="eyebrow">Core arsenal</p>
        <ul aria-label="Core technologies">
          {skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
        <div className="competitive-record">
          <p className="eyebrow">Competitive record</p>
          <strong>Codeforces Expert // CodeChef 4-Star</strong>
          <ul aria-label="Verified competitive programming achievements">
            {profile.competitiveAchievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
          </ul>
        </div>
      </div>
      <div className="access-links">
        <p className="eyebrow">Direct access</p>
        <div>
          {externalLinks.map((link) =>
            link.kind === "resume" ? (
              <Link key={link.kind} href="/resume/" aria-label="Open interactive resume dossier">
                Resume<small>Decoded dossier</small>
              </Link>
            ) : link.href ? (
              <a key={link.kind} href={link.href} target={link.newTab ? "_blank" : undefined} rel={link.newTab ? "noopener noreferrer" : undefined} aria-label={link.ariaLabel}>
                {link.label}<small>{link.detail}</small>
              </a>
            ) : (
              <span key={link.kind} aria-label={`${link.label} link pending`}>
                {link.label}<small>Pending verified URL</small>
              </span>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
