import { createContext, useContext, type ReactNode } from "react";
import { useCounter, type Counter } from "@/hooks/useCounter";

// Același useCounter de la pasul 11, dar apelat O SINGURĂ DATĂ, în provider.
// Toate componentele din interior citesc aceeași valoare, deci un click oriunde se vede peste tot.
const SharedCounterContext = createContext<Counter | undefined>(undefined);

export function SharedCounterProvider({ children }: { children: ReactNode }) {
  const counter = useCounter(0, { min: 0 });
  return <SharedCounterContext.Provider value={counter}>{children}</SharedCounterContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSharedCounter(): Counter {
  const context = useContext(SharedCounterContext);
  if (!context) {
    throw new Error("useSharedCounter trebuie folosit în interiorul <SharedCounterProvider>.");
  }
  return context;
}
