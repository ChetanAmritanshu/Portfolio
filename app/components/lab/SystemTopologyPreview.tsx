export function SystemTopologyPreview() {
  return (
    <svg
      aria-hidden="true"
      className="lab-preview lab-preview--topology"
      viewBox="0 0 420 210"
    >
      <path className="lab-connector" d="M91 62H164M256 62H329M210 88V135M256 161H329" />
      <path className="lab-connector lab-connector--signal" d="M91 62H164M256 62H329M210 88V135M256 161H329" />

      <g className="lab-node lab-node--focus" transform="translate(28 36)">
        <rect width="63" height="52" rx="3" />
        <text x="31.5" y="31">API</text>
      </g>
      <g className="lab-node" transform="translate(164 36)">
        <rect width="92" height="52" rx="3" />
        <text x="46" y="31">CACHE</text>
      </g>
      <g className="lab-node lab-node--database" transform="translate(329 36)">
        <rect width="63" height="52" rx="3" />
        <text x="31.5" y="31">DB</text>
      </g>
      <g className="lab-node" transform="translate(164 135)">
        <rect width="92" height="52" rx="3" />
        <text x="46" y="31">QUEUE</text>
      </g>
      <g className="lab-node" transform="translate(329 135)">
        <rect width="63" height="52" rx="3" />
        <text x="31.5" y="31">WORKERS</text>
      </g>

      <circle className="lab-packet lab-packet--a" cx="91" cy="62" r="3" />
      <circle className="lab-packet lab-packet--b" cx="210" cy="88" r="3" />
      <circle className="lab-packet lab-packet--c" cx="256" cy="161" r="3" />
      <circle className="lab-failure-signal" cx="361" cy="36" r="3" />
    </svg>
  );
}
