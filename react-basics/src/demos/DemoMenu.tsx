// Pas 7 — DemoMenu.
// Exemplu mic: tiparul meniului de sus în miniatură. Arată LOCAL vs GLOBAL selection (fără router).
// Sursa unică de adevăr a navigării e ID-ul activ; restul UI-ului se DERIVĂ din el.
import React, { createContext, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Mini = { id: string; step: number; title: string; content: string };

const miniDemos: Mini[] = [
  { id: "m-1", step: 1, title: "Hello", content: "Salut lume" },
  { id: "m-2", step: 2, title: "Form", content: "Un mic formular" },
  { id: "m-3", step: 3, title: "List", content: "O listă scurtă" },
];

// Butonul unui mini-pas, la fel în ambele exemple: activul e plin, restul sunt „outline".
function MiniTab({ demo, isActive, onClick }: { demo: Mini; isActive: boolean; onClick: () => void }) {
  return (
    <Button onClick={onClick} aria-pressed={isActive} variant={isActive ? "default" : "outline"} size="sm">
      <span
        aria-hidden
        className={cn(
          "inline-flex size-5 items-center justify-center rounded-full text-[11px] font-bold",
          isActive ? "bg-primary-foreground text-primary" : "bg-muted text-muted-foreground",
        )}
      >
        {demo.step}
      </span>
      {demo.title}
    </Button>
  );
}

function MiniContent({ demo }: { demo: Mini }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <strong>
        Pas {demo.step} — {demo.title}
      </strong>
      <p className="m-0 text-muted-foreground">{demo.content}</p>
    </div>
  );
}

// --- Local example: activeId în useState (se pierde la refresh)
export function LocalMiniDemo() {
  const [activeId, setActiveId] = useState<string>(miniDemos[0].id);
  const active = miniDemos.find(d => d.id === activeId) ?? miniDemos[0];

  return (
    <div className="demo-panel">
      <h3 className="m-0">Local: useState (se pierde la refresh)</h3>
      <div className="flex flex-wrap gap-2">
        {miniDemos.map(d => (
          <MiniTab key={d.id} demo={d} isActive={d.id === activeId} onClick={() => setActiveId(d.id)} />
        ))}
      </div>
      <MiniContent demo={active} />
    </div>
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
  return <MiniContent demo={active} />;
}

function GlobalMiniDemoControls() {
  const { activeId, setActiveId } = useGlobal();
  return (
    <div className="flex flex-wrap gap-2">
      {miniDemos.map(d => (
        <MiniTab key={d.id} demo={d} isActive={d.id === activeId} onClick={() => setActiveId(d.id)} />
      ))}
    </div>
  );
}

export function DemoMenu() {
  return (
    <section className="demo-card" aria-label="Demo menu">
      <h2>Mini meniu — modelul în 15 linii</h2>
      <p className="demo-copy">Un meniu simplu cu butoane și badge pentru numărul pasului.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <LocalMiniDemo />

        <GlobalProvider>
          <div className="demo-panel">
            <h3 className="m-0">Global: context + localStorage (persistă la refresh)</h3>
            <GlobalMiniDemoControls />
            <GlobalMiniDemoContent />
          </div>
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
