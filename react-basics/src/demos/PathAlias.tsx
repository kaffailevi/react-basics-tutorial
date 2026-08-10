// Pas 8 — PathAlias.
// Arată comparație între import relativ și import cu alias `@/`.
// Motiv: evita `../../../` urât și permite mutarea fișierelor fără rupt importuri.
import { useState } from "react";
import { Button } from "@/components/ui/button";

const importRelative = `import Bubble from "../../../components/chat/message/Bubble";`;
const importAlias = `import Bubble from "@/components/chat/message/Bubble";`;

export function PathAlias() {
  const [useAlias, setUseAlias] = useState(true);

  return (
    <section className="demo-card">
      <h2>Path alias — comparație</h2>
      <p className="demo-copy">Apasă butoanele pentru a vedea cum arată același import înainte și după alias.</p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <Button variant={!useAlias ? "default" : "secondary"} onClick={() => setUseAlias(false)} aria-pressed={!useAlias}>
          Fără alias (relativ)
        </Button>
        <Button variant={useAlias ? "default" : "secondary"} onClick={() => setUseAlias(true)} aria-pressed={useAlias}>
          Cu alias @/
        </Button>
      </div>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        <article style={{ padding: "0.5rem", border: "1px solid #eee" }}>
          <h3>Exemplu import</h3>
          <pre>{useAlias ? importAlias : importRelative}</pre>
        </article>

        <article style={{ padding: "0.5rem", border: "1px solid #eee" }}>
          <h3>De ce avem nevoie de ambele configurații?</h3>
          <p>
            <strong>tsconfig.app.json</strong> (paths) — pentru TypeScript și editor: autocomplete, "go to definition",
            type-check.
          </p>
          <p>
            <strong>vite.config.ts</strong> (resolve.alias) — pentru bundler: rezolvă `@/` la fișierul real la dev și la
            build. Dacă lipsește, IDE-ul poate lucra, dar build-ul va eșua, sau invers.
          </p>
        </article>
      </div>

      {/*
        Comentariu: shadcn/ui și alte librării cer adesea aliasuri. E util acum: mutând fișiere nu mai trebuie să
        rescrii importuri în zeci de fișiere.
      */}
    </section>
  );
}

export default PathAlias;
