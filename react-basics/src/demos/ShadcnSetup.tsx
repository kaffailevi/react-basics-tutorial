// Pas 10 — ShadcnSetup
// Demonstrează buton manual vs buton din bibliotecă (copiat în proiect). Codul e al tău.
import { Button } from "@/components/ui/button";

export function ShadcnSetup() {
  const variants = ["default", "secondary", "outline", "ghost", "link"] as const;

  return (
    <section className="demo-card">
      <h2>shadcn/ui — comparație componente</h2>

      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h3>manual</h3>
            <Button>Buton</Button>
            <Button disabled style={{ marginLeft: 8 }}>
              Disabled
            </Button>
            <p style={{ marginTop: 8 }}>
              Observați: butonul manual poate părea OK, dar nu are focus ring implicit la Tab, iar disabled nu are
              `cursor-not-allowed` sau stări alternative.
            </p>
          </div>

          <div style={{ flex: 1 }}>
            <h3>shadcn/ui (Button)</h3>
            <Button onClick={() => {}}>Buton</Button>
            <Button disabled style={{ marginLeft: 8 }}>
              Disabled
            </Button>
            <p style={{ marginTop: 8 }}>
              Butonul folosește focus ring, stări, `cursor-not-allowed` și accesibilitate gata configurată.
            </p>
          </div>
        </div>

        <div>
          <h3>Variante</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {variants.map(v => (
              <Button key={v} variant={v as any} onClick={() => {}}>
                {v}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShadcnSetup;
