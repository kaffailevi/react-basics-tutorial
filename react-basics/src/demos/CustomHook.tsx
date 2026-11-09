// Pas 11 — custom hook (useCounter).
// Până acum fiecare counter își scria singur useState + funcțiile de plus/minus. Pasul acesta mută logica
// într-un hook propriu, ca să vedem că un hook se poate refolosi ca orice funcție.
// Ce trebuie reținut: aceeași logică, dar state separat pentru fiecare apel al hook-ului.
import { Button } from "@/components/ui/button";
import { LessonExercise } from "@/components/LessonExercise";
import { useCounter, type Counter } from "@/hooks/useCounter";

const PRICE_CHILD = 10;
const PRICE_ADULT = 25;

type TicketRowProps = {
  label: string;
  price: number;
  counter: Counter;
};

// Rândul nu știe nimic despre useState: primește prin props tot ce întoarce hook-ul.
function TicketRow({ label, price, counter }: TicketRowProps) {
  const { count, increment, decrement, canIncrement, canDecrement } = counter;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
      <div>
        <p className="m-0 font-semibold">{label}</p>
        <p className="m-0 text-sm text-muted-foreground">{price} RON / bilet</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={!canDecrement}
          aria-label={`Scade ${label}`}
        >
          −
        </Button>
        <span className="w-8 text-center text-xl font-bold tabular-nums" aria-live="polite">
          {count}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={!canIncrement}
          aria-label={`Crește ${label}`}
        >
          +
        </Button>
      </div>
    </div>
  );
}

export function CustomHook() {
  // Două apeluri ale aceluiași hook = două stări independente.
  const children = useCounter(0, { min: 0, max: 10 });
  const adults = useCounter(1, { min: 0, max: 10 });

  // Totalul nu e state: se derivă la fiecare randare din cele două valori.
  const total = children.count * PRICE_CHILD + adults.count * PRICE_ADULT;

  return (
    <section className="demo-card" aria-label="Custom hook demo">
      <h2>Bilete la muzeu — un hook, două numărători</h2>
      <p className="demo-copy">
        Ambele rânduri folosesc <code>useCounter</code>. Dacă apeși + la „Copii", numărul de adulți nu se schimbă:
        hook-ul împarte <em>logica</em>, nu <em>datele</em>.
      </p>

      <div className="grid gap-3">
        <TicketRow label="Copii" price={PRICE_CHILD} counter={children} />
        <TicketRow label="Adulți" price={PRICE_ADULT} counter={adults} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="demo-value m-0" aria-live="polite">
          Total: {total} RON
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            children.reset();
            adults.reset();
          }}
        >
          Resetează
        </Button>
      </div>

      <pre className="demo-code">{`// cod de reținut
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}

const children = useCounter(0); // state propriu
const adults = useCounter(1);   // alt state, independent`}</pre>

      <LessonExercise>
        Adaugă un rând „Seniori" (15 RON). Ar trebui să-ți ajungă o linie cu <code>useCounter</code> și una cu{" "}
        <code>&lt;TicketRow /&gt;</code>. Apoi gândește-te: ce ar trebui să faci ca toate rândurile să împartă{" "}
        <em>același</em> număr? (Răspunsul vine la pasul 12.)
      </LessonExercise>
    </section>
  );
}

export default CustomHook;
