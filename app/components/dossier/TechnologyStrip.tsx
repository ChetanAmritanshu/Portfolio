export function TechnologyStrip({ technology }: { technology: readonly string[] }) {
  return <ul className="technology-strip" aria-label="Technology">{technology.map((item) => <li key={item}>{item}</li>)}</ul>;
}
