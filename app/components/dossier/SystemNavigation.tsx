import { AudioAnchor } from "~/components/AudioAnchor";
import type { Project } from "~/content/types";
import { assetUrl } from "~/lib/deployment";

export function SystemNavigation({ previous, next }: { previous: Project; next: Project }) {
  return <nav className="system-navigation" aria-label="System dossiers">
    <AudioAnchor eventName="navigation:back" href={assetUrl(`systems/${previous.slug}/`)}><span>Previous system</span><b>← {previous.shortTitle}</b></AudioAnchor>
    <AudioAnchor eventName="system:exit" href={assetUrl("#systems")}><span>Command interface</span><b>Return to systems</b></AudioAnchor>
    <AudioAnchor eventName="navigation:enter" href={assetUrl(`systems/${next.slug}/`)}><span>Next system</span><b>{next.shortTitle} →</b></AudioAnchor>
  </nav>;
}
