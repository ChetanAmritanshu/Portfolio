import { profile } from "~/content/profile";

export function SubjectSlot() {
  return (
    <div className="subject-stage" aria-label="Replaceable portrait artwork slot">
      <div className="subject-aura" aria-hidden="true" />
      <svg className="subject-placeholder" viewBox="0 0 520 720" role="img" aria-labelledby="subject-title subject-desc">
        <title id="subject-title">Portrait artwork placeholder</title>
        <desc id="subject-desc">An abstract faceless engineering operator silhouette reserved for future custom artwork.</desc>
        <defs>
          <linearGradient id="subject-shell" x1="0" x2="1">
            <stop offset="0" stopColor="#12354b" />
            <stop offset="0.52" stopColor="#101923" />
            <stop offset="1" stopColor="#3c151d" />
          </linearGradient>
          <linearGradient id="subject-edge" x1="0" x2="1">
            <stop offset="0" stopColor="#92e5ff" />
            <stop offset="0.48" stopColor="#dce9ee" stopOpacity=".2" />
            <stop offset="1" stopColor="#e44854" />
          </linearGradient>
        </defs>
        <path className="subject-backplate" d="M260 36 414 124 462 442 374 672H146L58 442l48-318Z" />
        <path fill="url(#subject-shell)" d="M174 252c-24 29-40 78-47 136l-68 112 54 172h294l54-172-68-112c-7-58-23-107-47-136l-42-35h-88Z" />
        <path fill="#111a23" d="M190 93 260 53l70 40 28 92-40 91-58 31-58-31-40-91Z" />
        <path fill="#172632" d="m195 132 65-38 65 38 10 65-41 51h-68l-41-51Z" />
        <path fill="none" stroke="url(#subject-edge)" strokeWidth="3" d="M174 252c-24 29-40 78-47 136l-68 112m287-248c24 29 40 78 47 136l68 112M190 93l70-40 70 40" />
        <path fill="none" stroke="#8edcff" strokeOpacity=".34" d="m110 520 102-44h96l102 44M148 650l29-171m195 171-29-171" />
        <path fill="#8edcff" opacity=".72" d="M205 179h110l-12 15h-86Z" />
        <path fill="#e44854" opacity=".62" d="M292 237h24l-10 17h-27Z" />
      </svg>
      <div className="subject-marker marker-top" aria-hidden="true">SUBJECT // RESERVED</div>
      <div className="subject-marker marker-side" aria-hidden="true">PORTRAIT ASSET 00</div>
      <div className="subject-copy">
        <small>{profile.name}</small>
        <p>{profile.heroStatement[0]}<br />{profile.heroStatement[1]}</p>
      </div>
      <div className="subject-baseline" aria-hidden="true">
        <span>Original artwork slot</span>
        <i />
        <span>Replaceable</span>
      </div>
    </div>
  );
}
