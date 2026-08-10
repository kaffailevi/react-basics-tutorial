// Pas 7 — DemoMenu.
// Exemplu mic: tiparul meniului de sus în miniatură. Arată LOCAL vs GLOBAL selection (fără router).
// Sursa unică de adevăr a navigării e ID-ul activ; restul UI-ului se DERIVĂ din el.
import React, { createContext, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Mini = { id: string; step: number; title: string; content: string };

const miniDemos: Mini[] = [
  { id: "m-1", step: 1, title: "Hello", content: "Salut lume" },
  { id: "m-2", step: 2, title: "Form", content: "Un mic formular" },
  { id: "m-3", step: 3, title: "List", content: "O listă scurtă" },
];

// --- Local example: activeId în useState (se pierde la refresh)
export function LocalMiniDemo() {
  const [activeId, setActiveId] = useState<string>(miniDemos[0].id);
  const active = miniDemos.find(d => d.id === activeId) ?? miniDemos[0];

  return (
    <section className="demo-card">
      <h3>Local: useState (se pierde la refresh)</h3>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        {miniDemos.map(d => (
            <Button key={d.id} onClick={() => setActiveId(d.id)} className="relative" variant="secondary" size="sm">
            {d.title}
                <span className="absolute -right-2 -top-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs bg-black text-white">{d.step}</span>
            </Button>
        ))}
      </div>

      <div style={{ padding: "0.5rem", border: "1px solid #eee" }}>
        <strong>
          Pas {active.step} — {active.title}
        </strong>
        <p>{active.content}</p>
      </div>
    </section>
  );
}

// --- Global example: context + localStorage (persistă la refresh)
const STORAGE_KEY = "demo-menu:active";
type GlobalState = { activeId: string; setActiveId: (id: string) => void };
const GlobalContext = createContext<GlobalState | null>(null);

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw || miniDemos[0].id;
    } catch {
      return miniDemos[0].id;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, activeId);
    } catch {
      // ignore
    }
  }, [activeId]);

  return <GlobalContext.Provider value={{ activeId, setActiveId }}>{children}</GlobalContext.Provider>;
}

function useGlobal() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal must be used inside GlobalProvider");
  return ctx;
}

function GlobalMiniDemoContent() {
  const { activeId } = useGlobal();
  const active = miniDemos.find(d => d.id === activeId) ?? miniDemos[0];
  return (
    <div style={{ padding: "0.5rem", border: "1px solid #eee" }}>
      <strong>
        Pas {active.step} — {active.title}
      </strong>
      <p>{active.content}</p>
    </div>
  );
}

function GlobalMiniDemoControls() {
  const { activeId, setActiveId } = useGlobal();
  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
      {miniDemos.map(d => (
          <Button key={d.id} onClick={() => setActiveId(d.id)} aria-pressed={d.id === activeId} className="relative" variant={d.id === activeId ? "default" : "secondary"} size="sm">
          {d.title}
              <span className={d.id === activeId ? "absolute -right-2 -top-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs bg-black text-white" : "absolute -right-2 -top-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs bg-blue-600 text-white"}>{d.step}</span>
          </Button>
      ))}
    </div>
  );
}

export function DemoMenu() {
  return (
    <section className="demo-card" aria-label="Demo menu">
      <h2>Mini meniu — modelul în 15 linii</h2>
      <p className="demo-copy">Un meniu simplu cu butoane și badge pentru numărul pasului.</p>

      <div style={{ display: "grid", gap: "1rem" }}>
        <LocalMiniDemo />

        <GlobalProvider>
          <h3>Global: context + localStorage (persistă la refresh)</h3>
          <GlobalMiniDemoControls />
          <GlobalMiniDemoContent />
        </GlobalProvider>
      </div>

      {/*
        Nota: sursa unică de adevăr a navigării e `activeId`.
        Nu păstrăm în state și lista și elementul selectat — elementul se derivă din id.
      */}
    </section>
  );
}

export default DemoMenu;
