import Image from "next/image";

import { profile } from "~/content/profile";
import { assetUrl } from "~/lib/deployment";

export function SubjectSlot() {
  return (
    <div className="subject-stage" aria-label={`Portrait of ${profile.name}`}>
      <div className="subject-aura" aria-hidden="true" />
      <div className="subject-frame">
        <div className="subject-image-shell">
          <Image
            alt={`Chetan Amritanshu, backend and distributed systems engineer`}
            className="subject-portrait"
            height={1402}
            priority
            sizes="(max-width: 608px) 86vw, (max-width: 928px) 32rem, 34vw"
            src={assetUrl("images/chetan-hero-portrait.webp")}
            width={1122}
          />
          <div className="subject-lighting" aria-hidden="true" />
          <div className="subject-vignette" aria-hidden="true" />
          <div className="subject-scan" aria-hidden="true">
            <i />
          </div>
        </div>
        <i className="subject-corner corner-nw" aria-hidden="true" />
        <i className="subject-corner corner-ne" aria-hidden="true" />
        <i className="subject-corner corner-sw" aria-hidden="true" />
        <i className="subject-corner corner-se" aria-hidden="true" />
      </div>
      <div className="subject-marker marker-top" aria-hidden="true">SUBJECT // VERIFIED</div>
      <div className="subject-marker marker-side" aria-hidden="true">IDENTITY CAPTURE // 01</div>
      <div className="subject-telemetry subject-telemetry-left" aria-hidden="true">
        <span>SUBJECT // CHETAN AMRITANSHU</span>
        <i />
        <small>IDENTITY // VERIFIED</small>
      </div>
      <div className="subject-telemetry subject-telemetry-right" aria-hidden="true">
        <span>DISTRIBUTED SYSTEMS // ONLINE</span>
        <i />
        <small>SYSTEM TRACE // STABLE</small>
      </div>
      <div className="subject-copy">
        <small>{profile.name}</small>
        <p>{profile.heroStatement[0]}<br />{profile.heroStatement[1]}</p>
      </div>
      <div className="subject-baseline" aria-hidden="true">
        <span>Engineering profile</span>
        <i />
        <span>Live dossier</span>
      </div>
    </div>
  );
}
