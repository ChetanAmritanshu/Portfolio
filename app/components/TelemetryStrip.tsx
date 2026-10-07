const primarySignals = ["Backend", "Distributed Systems", "Golang", "GenAI"];
const telemetry = [
  ["LLD Lab", "50/50"],
  ["HLD Lab", "Active"],
  ["CP", "Expert"],
  ["Systems", "Online"],
] as const;

export function TelemetryStrip() {
  return (
    <aside className="telemetry-strip" aria-label="Engineering telemetry">
      <ul className="telemetry-primary">
        {primarySignals.map((signal) => <li key={signal}>{signal}</li>)}
      </ul>
      <dl className="telemetry-secondary">
        {telemetry.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
