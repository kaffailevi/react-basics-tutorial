import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Pasul activ din meniu este o valoare de care are nevoie toată aplicația: meniul de sus, titlul, dropdown-ul
// din lecția de context. Fără context ar trebui pasat prin props din nivel în nivel („prop drilling").
// Contextul îl face accesibil oricărei componente din interiorul provider-ului, fără props intermediare.

export type StepInfo = {
  id: string;
  step: number;
  title: string;
};

type ActiveStepValue = {
  activeId: string;
  setActiveId: (id: string) => void;
  steps: StepInfo[];
};

const STORAGE_KEY = "activeStepId";

// Valoarea implicită e undefined: așa ne dăm seama imediat dacă cineva folosește hook-ul în afara provider-ului.
const ActiveStepContext = createContext<ActiveStepValue | undefined>(undefined);

// Citim o singură dată, la prima randare. Un id salvat care nu mai există (pas redenumit/șters) e ignorat.
function readStoredId(steps: StepInfo[]): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return steps.some(step => step.id === stored) ? (stored as string) : steps[0].id;
  } catch {
    // localStorage poate lipsi (fereastră privată, setări de browser) — aplicația trebuie să meargă oricum.
    return steps[0].id;
  }
}

export function ActiveStepProvider({ steps, children }: { steps: StepInfo[]; children: ReactNode }) {
  // În spate tot un useState este: contextul doar îl face vizibil pentru tot arborele.
  // Funcția din useState rulează doar la montare, deci nu citim localStorage la fiecare randare.
  const [activeId, setActiveId] = useState(() => readStoredId(steps));

  // Efect: de fiecare dată când se schimbă pasul activ, îl salvăm, ca să supraviețuiască unui refresh.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, activeId);
    } catch {
      // ignorăm: fără persistență aplicația funcționează, doar că pornește de la primul pas
    }
  }, [activeId]);

  return <ActiveStepContext.Provider value={{ activeId, setActiveId, steps }}>{children}</ActiveStepContext.Provider>;
}

// Hook-ul de consum stă lângă provider (convenția proiectului pentru src/context/).
// eslint-disable-next-line react-refresh/only-export-components
export function useActiveStep(): ActiveStepValue {
  const context = useContext(ActiveStepContext);
  if (!context) {
    throw new Error("useActiveStep trebuie folosit în interiorul <ActiveStepProvider>.");
  }
  return context;
}
