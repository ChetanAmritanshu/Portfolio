import { externalLinks } from "~/content/profile";

const skills = ["Go", "C++", "Java", "Python", "Kafka", "Redis", "PostgreSQL", "gRPC", "Linux", "AWS"];

export function AccessDock() {
  return (
    <footer className="access-dock" id="contact">
      <div id="arsenal">
        <p className="eyebrow">Core arsenal</p>
        <ul aria-label="Core technologies">
          {skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
      </div>
      <div className="access-links">
        <p className="eyebrow">Direct access</p>
        <div>
          {externalLinks.map((link) =>
            link.href ? (
              <a key={link.kind} href={link.href}>{link.label}</a>
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
