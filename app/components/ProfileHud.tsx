import { profile } from "~/content/profile";

export function ProfileHud() {
  return (
    <aside className="profile-hud hud-panel" id="profile" aria-label="Engineering profile">
      <div className="hud-cap">
        <span>System profile</span>
        <span>Live</span>
      </div>
      <dl>
        <div className="profile-status">
          <dt>Status</dt>
          <dd><span className="status-pulse" /> Open to opportunities</dd>
        </div>
        <div>
          <dt>Specialization</dt>
          <dd>Backend / Distributed Systems</dd>
        </div>
        <div>
          <dt>Experience</dt>
          <dd>{profile.experience}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{profile.location}</dd>
        </div>
        <div>
          <dt>Codeforces</dt>
          <dd>{profile.codeforces.rank} // {profile.codeforces.maxRating}</dd>
        </div>
        <div>
          <dt>Current mode</dt>
          <dd>{profile.currentMode}</dd>
        </div>
      </dl>
      <div className="system-readout" aria-label="Interface audio phase 4">
        <span>Interface</span>
        <div><i /></div>
        <strong>Phase 4</strong>
      </div>
    </aside>
  );
}
