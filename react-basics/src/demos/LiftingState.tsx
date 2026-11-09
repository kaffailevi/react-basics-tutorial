import { useState } from "react";

type PriceCardProps = {
  label: string;
  amount: number;
  currency: string;
  step?: number;
  onChange: (next: number) => void;
};

// Pas 6 — lifting state.
// Valoarea importantă nu trăiește în două componente diferite; ea trăiește într-un singur loc,
// în părinte. Asta evită să avem două copii care se pot desincroniza.
function PriceCard({ label, amount, currency, step = 1, onChange }: PriceCardProps) {
  return (
    <label className="demo-panel">
      <span className="font-medium">{label}</span>
      <input
        className="demo-input"
        type="number"
        value={amount}
        step={step}
        onChange={event => onChange(Number(event.target.value))}
      />
      <span className="text-sm text-muted-foreground">{currency}</span>
    </label>
  );
}

export function LiftingState() {
  // Singura sursă de adevăr: valoarea trăiește aici, în părinte.
  const [amount, setAmount] = useState(10);
  const rate = 5;

  return (
    <section className="demo-card" aria-label="Lifting state demo">
      <h2>O singură sursă de adevăr</h2>
      <p className="demo-copy">
        Dacă modifici una dintre valorile de mai jos, cealaltă se actualizează automat. Nu există două stări separate
        care să se poată „bate cap în cap".
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <PriceCard label="În RON" amount={amount} currency="RON" onChange={setAmount} />
        <PriceCard
          label="În puncte"
          amount={amount * rate}
          currency="puncte"
          step={rate}
          onChange={next => setAmount(Math.round(next / rate))}
        />
      </div>
    </section>
  );
}
