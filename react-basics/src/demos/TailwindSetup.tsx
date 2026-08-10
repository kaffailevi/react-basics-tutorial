// Pas 9 — TailwindSetup
// Demonstrează utility-first + tokeni temă vs stil inline hardcodate.
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function InlineCard() {
  const dark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const bg = dark ? "#171717" : "#fafafa";
  const fg = dark ? "#f8f8f8" : "#0f172a";

  return (
    <div style={{ background: bg, color: fg, padding: 16, borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)" }}>
      <h3 style={{ marginTop: 0 }}>Card (stil inline)</h3>
      <p>Aceasta este o versiune stilizată cu culori hardcodate în componentă.</p>
      <Button style={{ background: "#2563eb", color: "#fff", padding: "8px 12px", borderRadius: 8 }}>Acțiune</Button>
    </div>
  );
}

function TokenCard() {
  return (
    <div className="bg-card text-foreground p-md rounded-md" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
      <h3 style={{ marginTop: 0 }}>Card (utilitare / tokeni)</h3>
      <p>Aceasta folosește utilitare care citesc tokenii din `:root` / `.dark`.</p>
      <Button className="bg-primary text-primary-foreground p-sm rounded-md">Acțiune</Button>
    </div>
  );
}

export function TailwindSetup() {
  const [useTailwind, setUseTailwind] = useState(true);

  return (
    <section className="demo-card">
      <h2>Tailwind utility tokens — demo</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <Button variant={!useTailwind ? "default" : "secondary"} onClick={() => setUseTailwind(false)} aria-pressed={!useTailwind}>
          Stil inline hardcodate
        </Button>
        <Button variant={useTailwind ? "default" : "secondary"} onClick={() => setUseTailwind(true)} aria-pressed={useTailwind}>
          Utilitare + tokeni
        </Button>
        <div style={{ marginLeft: "auto" }}>
          <ThemeToggle />
        </div>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <strong>Versiunea activă</strong>
        </div>

        <div>{useTailwind ? <TokenCard /> : <InlineCard />}</div>

        <div>
          <h3>Explicație</h3>
          <p>
            Versiunea cu <em>stil inline</em> folosește culori fixe; dacă comuți tema la `.dark` ea nu se adaptează —
            rămâne albă sau neagră conform valorilor hardcodate. Varianta cu tokeni citește variabilele CSS definite în
            `:root` / `.dark` și se schimbă automat când tema se schimbă.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TailwindSetup;
