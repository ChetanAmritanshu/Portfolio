import { profile } from "~/content/profile";

export function IdentityHud() {
  return (
    <section className="identity-hud hud-panel" aria-labelledby="identity-title">
      <div className="hud-cap">
        <span>Identity // 001</span>
        <span className="signal-bars" aria-hidden="true">▰▰▰▱</span>
      </div>
      <p className="eyebrow">Engineering command profile</p>
      <h1 id="identity-title">
        <span>{profile.name.split(" ")[0]}</span>
        {profile.name.split(" ")[1]}
      </h1>
      <ul className="role-stack" aria-label="Professional roles">
        {profile.roles.map((role, index) => (
          <li key={role}>
            <span>0{index + 1}</span>
            {role}
          </li>
        ))}
      </ul>
      <p className="identity-statement">
        Designing systems that remain predictable when traffic, failure, and ambiguity arrive together.
      </p>
      <div className="hud-coordinate" aria-hidden="true">REGION // INDIA</div>
    </section>
  );
}
