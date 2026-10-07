export function ObjectModelPreview() {
  return (
    <svg
      aria-hidden="true"
      className="lab-preview lab-preview--object"
      viewBox="0 0 420 210"
    >
      <path className="lab-connector" d="M210 61V87M210 123V149M120 105H170M250 105H300" />
      <path className="lab-connector lab-connector--signal" d="M210 61V87M210 123V149" />

      <g className="lab-node lab-node--interface" transform="translate(157 25)">
        <rect width="106" height="36" rx="3" />
        <text x="53" y="22">«INTERFACE»</text>
      </g>
      <g className="lab-node lab-node--focus" transform="translate(170 87)">
        <rect width="80" height="36" rx="3" />
        <text x="40" y="22">STRATEGY</text>
      </g>
      <g className="lab-node" transform="translate(128 149)">
        <rect width="164" height="36" rx="3" />
        <text x="82" y="22">CONCRETE STRATEGY</text>
      </g>
      <g className="lab-node lab-node--satellite" transform="translate(54 87)">
        <rect width="66" height="36" rx="3" />
        <text x="33" y="22">CLIENT</text>
      </g>
      <g className="lab-node lab-node--satellite" transform="translate(300 87)">
        <rect width="66" height="36" rx="3" />
        <text x="33" y="22">CONTEXT</text>
      </g>

      <circle className="lab-packet lab-packet--object-a" cx="210" cy="61" r="3" />
      <circle className="lab-packet lab-packet--object-b" cx="210" cy="123" r="3" />
    </svg>
  );
}
