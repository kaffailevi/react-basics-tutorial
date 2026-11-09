// Pas 10 — ShadcnSetup
// Demonstrează buton manual vs buton din bibliotecă (copiat în proiect). Codul e al tău.
import { Button } from "@/components/ui/button";

const variants = ["default", "secondary", "outline", "ghost", "link"] as const;

export function ShadcnSetup() {
  return (
    <section className="demo-card">
      <h2>shadcn/ui — comparație componente</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="demo-panel">
          <h3 className="m-0">manual</h3>
          {/* Intenționat un <button> simplu: fără focus ring, fără stare vizuală la disabled. */}
          <div className="flex flex-wrap gap-2">
            <button style={{ padding: "6px 12px", background: "#2563eb", color: "#fff", borderRadius: 6 }}>
              Buton
            </button>
            <button disabled style={{ padding: "6px 12px", background: "#2563eb", color: "#fff", borderRadius: 6 }}>
              Disabled
            </button>
          </div>
          <p className="demo-copy">
            Observați: butonul manual poate părea OK, dar nu are focus ring implicit la Tab, iar disabled nu are
            `cursor-not-allowed` sau stări alternative.
          </p>
        </div>

        <div className="demo-panel">
          <h3 className="m-0">shadcn/ui (Button)</h3>
          <div className="flex flex-wrap gap-2">
            <Button>Buton</Button>
            <Button disabled>Disabled</Button>
          </div>
          <p className="demo-copy">
            Butonul folosește focus ring, stări, `cursor-not-allowed` și accesibilitate gata configurată.
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        <h3 className="m-0">Variante</h3>
        <div className="flex flex-wrap gap-2">
          {variants.map(v => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShadcnSetup;
