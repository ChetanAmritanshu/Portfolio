import { AudioAnchor } from "~/components/AudioAnchor";
import { assetUrl } from "~/lib/deployment";

export default function NotFound() {
  return (
    <main className="error-screen" id="main-content">
      <p className="eyebrow">SYSTEM // ROUTE ERROR</p>
      <h1>Signal lost.</h1>
      <p>The requested interface could not be loaded.</p>
      <AudioAnchor eventName="navigation:back" href={assetUrl("")}>Return home</AudioAnchor>
    </main>
  );
}
