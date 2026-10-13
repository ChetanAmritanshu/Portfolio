import { engineeringLabs } from "~/content/labs";

import { EngineeringLabCard } from "./lab/EngineeringLabCard";

export function EngineeringLabsSection() {
  return (
    <section className="engineering-labs" id="labs" aria-labelledby="labs-title">
      <header className="labs-heading">
        <div>
          <p className="eyebrow">Technical proof-of-work</p>
          <h2 id="labs-title">Engineering Labs</h2>
        </div>
        <div className="labs-count"><span>{String(engineeringLabs.length).padStart(2, "0")}</span> engineering divisions</div>
      </header>

      <div className="labs-grid">
        {engineeringLabs.map((lab) => <EngineeringLabCard key={lab.slug} lab={lab} />)}
      </div>
    </section>
  );
}
