// Pas 9 — TailwindSetup
// Demonstrează utility-first + tokeni temă vs stil inline hardcodate.
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Exemplul „înainte" rămâne intenționat cu stil inline: el este ce comparăm.
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
    <div className="grid gap-3 rounded-md border border-border bg-card p-md text-foreground">
      <h3 className="m-0">Card (utilitare / tokeni)</h3>
      <p className="m-0">Aceasta folosește utilitare care citesc tokenii din `:root` / `.dark`.</p>
      <Button className="justify-self-start">Acțiune</Button>
    </div>
  );
}

export function TailwindSetup() {
  const [useTailwind, setUseTailwind] = useState(true);

  return (
    <section className="demo-card">
      <h2>Tailwind utility tokens — demo</h2>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={!useTailwind ? "default" : "outline"}
          onClick={() => setUseTailwind(false)}
          aria-pressed={!useTailwind}
        >
          Stil inline hardcodate
        </Button>
        <Button
          variant={useTailwind ? "default" : "outline"}
          onClick={() => setUseTailwind(true)}
          aria-pressed={useTailwind}
        >
          Utilitare + tokeni
        </Button>
      </div>

      <div className="grid gap-3">
        <strong>Versiunea activă</strong>

        {useTailwind ? <TokenCard /> : <InlineCard />}

        <div className="grid gap-2">
          <h3 className="m-0">Explicație</h3>
          <p className="demo-copy">
            Versiunea cu <em>stil inline</em> folosește culori fixe; dacă comuți tema (butonul din dreapta sus) ea nu se
            adaptează — rămâne albă sau neagră conform valorilor hardcodate. Varianta cu tokeni citește variabilele CSS
            definite în `:root` / `.dark` și se schimbă automat când tema se schimbă.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TailwindSetup;
