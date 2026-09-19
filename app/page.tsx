import { AccessDock } from "~/components/AccessDock";
import { CommandEnvironment } from "~/components/CommandEnvironment";
import { IdentityHud } from "~/components/IdentityHud";
import { ProfileHud } from "~/components/ProfileHud";
import { ProjectSelector } from "~/components/ProjectSelector";
import { SiteHeader } from "~/components/SiteHeader";
import { SubjectSlot } from "~/components/SubjectSlot";

export default function Home() {
  return (
    <div className="command-shell" id="home">
      <CommandEnvironment />

      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="hero-command" aria-label="Chetan Amritanshu engineering profile">
          <IdentityHud />
          <SubjectSlot />
          <ProfileHud />
          <a className="primary-command" href="#systems">
            <span>Explore systems</span>
            <i aria-hidden="true">›</i>
          </a>
        </section>

        <ProjectSelector />
        <AccessDock />
      </main>
    </div>
  );
}
