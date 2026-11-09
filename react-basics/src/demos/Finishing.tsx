// Pas 13 — finisaje (UI uniform).
// Aplicația a crescut pas cu pas, iar fiecare ecran a ajuns să arate puțin altfel: butoane vechi, div-uri aliniate
// de mână, culori scrise direct. Pasul acesta fixează regulile prin care toată aplicația arată la fel.
// Ce trebuie reținut: niciun <button> „clasic" și nicio culoare hardcodată — doar componente și tokeni comuni.
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LessonExercise } from "@/components/LessonExercise";

const RULES = [
  "Butoanele sunt mereu <Button> din components/ui, cu o variantă (default, secondary, outline, ghost, link).",
  "Culorile vin din tokeni (bg-card, text-foreground, border-border, bg-primary), deci merg și în dark mode.",
  "Spațierea folosește scala Tailwind (gap-2, gap-4, p-4), nu margin-uri puse de mână pe fiecare element.",
  "Câmpurile (input, select, checkbox) au aceeași înălțime, bordură și focus ring ca butoanele.",
  "Fiecare lecție stă într-un card (demo-card), cu titlu, explicație, exemplu și exercițiu.",
];

function BeforeExample() {
  // Intenționat „greșit": stil inline și culori fixe — exact ce elimină pasul acesta.
  return (
    <div style={{ background: "#ffffff", padding: 10, border: "1px solid #ddd" }}>
      <p style={{ color: "#333", marginTop: 0 }}>Salvezi modificările?</p>
      <button style={{ background: "#2563eb", color: "white", border: "none", padding: "4px 10px" }}>
        Salvează
      </button>{" "}
      <button style={{ marginLeft: 3 }}>Anulează</button>
    </div>
  );
}

function AfterExample() {
  return (
    <div className="grid gap-3 rounded-lg border border-border bg-card p-4">
      <p className="m-0 text-foreground">Salvezi modificările?</p>
      <div className="flex flex-wrap gap-2">
        <Button>Salvează</Button>
        <Button variant="outline">Anulează</Button>
      </div>
    </div>
  );
}

export function Finishing() {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <section className="demo-card" aria-label="Finisaje demo">
      <h2>Aceeași interfață peste tot</h2>
      <p className="demo-copy">
        Comută între cele două variante și apoi schimbă tema din colțul din dreapta sus: varianta „înainte" rămâne albă
        și cu butoane diferite, varianta „după" se adaptează singură.
      </p>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Alege varianta">
        <Button
          variant={!showAfter ? "default" : "outline"}
          aria-pressed={!showAfter}
          onClick={() => setShowAfter(false)}
        >
          Înainte
        </Button>
        <Button variant={showAfter ? "default" : "outline"} aria-pressed={showAfter} onClick={() => setShowAfter(true)}>
          După
        </Button>
      </div>

      {showAfter ? <AfterExample /> : <BeforeExample />}

      <div className="grid gap-2">
        <h3 className="m-0">Regulile aplicate în tot proiectul</h3>
        <ol className="m-0 grid list-decimal gap-1.5 pl-5 text-muted-foreground">
          {RULES.map(rule => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </div>

      <pre className="demo-code">{`// cod de reținut
<Button variant="outline">Anulează</Button>             // nu <button style={...}>
<div className="flex gap-2 rounded-lg border border-border bg-card p-4">  // nu style={{ padding: 10 }}`}</pre>

      <LessonExercise>
        Caută în proiect cu <code>style=&#123;&#123;</code> și cu <code>&lt;button</code>. Pentru fiecare rezultat care
        nu e un exemplu intenționat „înainte", înlocuiește-l cu clase Tailwind sau cu <code>&lt;Button&gt;</code>, apoi
        verifică ecranul în ambele teme.
      </LessonExercise>
    </section>
  );
}

export default Finishing;
