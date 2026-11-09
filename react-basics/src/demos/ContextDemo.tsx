// Pas 12 — Context API (stare globală).
// useState și custom hook-urile țin state LOCAL: fiecare componentă are copia ei. Unele valori sunt însă ale
// întregii aplicații (pasul activ, tema, utilizatorul curent). Pasul acesta arată cum le facem globale cu
// createContext + Provider + un hook de consum, și cum supraviețuiesc unui refresh prin localStorage.
import { Button } from "@/components/ui/button";
import { LessonExercise } from "@/components/LessonExercise";
import { useActiveStep } from "@/context/ActiveStepContext";
import { SharedCounterProvider, useSharedCounter } from "@/context/SharedCounterContext";
import { useCounter } from "@/hooks/useCounter";

// Componenta nu primește nicio prop, și totuși știe care e pasul activ și îl poate schimba.
function StepPicker() {
  const { activeId, setActiveId, steps } = useActiveStep();

  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium">Sari la pasul</span>
      <select
        className="demo-input"
        value={activeId}
        onChange={event => setActiveId(event.target.value)}
        aria-label="Alege pasul activ"
      >
        {steps.map(step => (
          <option key={step.id} value={step.id}>
            Pas {step.step} — {step.title}
          </option>
        ))}
      </select>
    </label>
  );
}

// Fiecare panou apelează useCounter separat: două state-uri independente.
function LocalPanel({ label }: { label: string }) {
  const { count, increment } = useCounter(0);
  return <CounterPanel label={label} count={count} onIncrement={increment} />;
}

// Fiecare panou citește ACELAȘI counter din context.
function SharedPanel({ label }: { label: string }) {
  const { count, increment } = useSharedCounter();
  return <CounterPanel label={label} count={count} onIncrement={increment} />;
}

function CounterPanel({ label, count, onIncrement }: { label: string; count: number; onIncrement: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold tabular-nums" aria-live="polite">
          {count}
        </span>
        <Button size="sm" onClick={onIncrement}>
          +1
        </Button>
      </div>
    </div>
  );
}

export function ContextDemo() {
  return (
    <section className="demo-card" aria-label="Context API demo">
      <h2>O valoare, citită de oriunde</h2>
      <p className="demo-copy">
        Dropdown-ul de mai jos și meniul de sus sunt două componente diferite, dar folosesc același context. Alege alt
        pas: se schimbă și meniul, și lecția afișată. Dă refresh: rămâi pe pasul ales (e salvat în localStorage sub
        cheia <code>activeStepId</code>).
      </p>

      <StepPicker />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <h3 className="m-0 text-base font-semibold">Local — useCounter în fiecare panou</h3>
          <LocalPanel label="Panoul A" />
          <LocalPanel label="Panoul B" />
          <p className="m-0 text-sm text-muted-foreground">Click pe A nu schimbă B: fiecare are state-ul lui.</p>
        </div>

        <SharedCounterProvider>
          <div className="grid gap-2">
            <h3 className="m-0 text-base font-semibold">Global — un counter în context</h3>
            <SharedPanel label="Panoul A" />
            <SharedPanel label="Panoul B" />
            <p className="m-0 text-sm text-muted-foreground">Click oriunde, cresc amândouă: citesc aceeași valoare.</p>
          </div>
        </SharedCounterProvider>
      </div>

      <pre className="demo-code">{`// cod de reținut
const ActiveStepContext = createContext<Value | undefined>(undefined);

function ActiveStepProvider({ children }) {
  const [activeId, setActiveId] = useState(() => localStorage.getItem("activeStepId") ?? "counter");
  useEffect(() => localStorage.setItem("activeStepId", activeId), [activeId]);
  return <ActiveStepContext.Provider value={{ activeId, setActiveId }}>{children}</ActiveStepContext.Provider>;
}

const { activeId, setActiveId } = useContext(ActiveStepContext); // oriunde în arbore`}</pre>

      <LessonExercise>
        Deschide DevTools › Application › Local Storage și urmărește cheia <code>activeStepId</code> în timp ce schimbi
        pașii. Apoi mută <code>&lt;SharedCounterProvider&gt;</code> în <code>App.tsx</code>, în jurul întregii
        aplicații: ce se întâmplă cu valoarea counter-ului când pleci pe alt pas și te întorci?
      </LessonExercise>
    </section>
  );
}

export default ContextDemo;
