import React from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ActiveStepProvider, useActiveStep, type StepInfo } from "@/context/ActiveStepContext";
import { cn } from "@/lib/utils";
import { Counter } from "@/demos/Counter";
import { CounterClass } from "@/demos/CounterClass";
import { PureFunctions } from "@/demos/PureFunctions";
import { PrettierFormat } from "@/demos/PrettierFormat";
import { Timer } from "@/demos/Timer";
import { LiftingState } from "@/demos/LiftingState";
import { DemoMenu } from "@/demos/DemoMenu";
import { PathAlias } from "@/demos/PathAlias";
import { TailwindSetup } from "@/demos/TailwindSetup";
import { ShadcnSetup } from "@/demos/ShadcnSetup";
import { CustomHook } from "@/demos/CustomHook";
import { ContextDemo } from "@/demos/ContextDemo";
import { Finishing } from "@/demos/Finishing";

type Demo = StepInfo & {
  element: React.ReactNode;
};

// Registrul pașilor: singurul loc în care se adaugă o lecție nouă, în ordinea în care au fost construite.
const demos: Demo[] = [
  { id: "counter", step: 1, title: "useState (Counter)", element: <Counter /> },
  { id: "counter-class", step: 2, title: "Counter (class)", element: <CounterClass /> },
  { id: "pure", step: 3, title: "Pure functions", element: <PureFunctions /> },
  { id: "prettier", step: 4, title: "Prettier", element: <PrettierFormat /> },
  { id: "timer", step: 5, title: "useEffect (Timer)", element: <Timer /> },
  { id: "lifting", step: 6, title: "Lifting state", element: <LiftingState /> },
  { id: "menu-demo", step: 7, title: "Demo menu", element: <DemoMenu /> },
  { id: "path-alias", step: 8, title: "Path alias", element: <PathAlias /> },
  { id: "tailwind", step: 9, title: "Tailwind setup", element: <TailwindSetup /> },
  { id: "shadcn", step: 10, title: "shadcn/ui (Button)", element: <ShadcnSetup /> },
  { id: "custom-hook", step: 11, title: "Custom hook", element: <CustomHook /> },
  { id: "context", step: 12, title: "Context API", element: <ContextDemo /> },
  { id: "finishing", step: 13, title: "Finisaje", element: <Finishing /> },
];

function DemoTab({ demo, isActive, onClick }: { demo: Demo; isActive: boolean; onClick: () => void }) {
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

// Shell-ul nu mai ține pasul activ în propriul useState: îl citește din context, ca oricare altă componentă.
function Shell() {
  const { activeId, setActiveId } = useActiveStep();
  const active = demos.find(d => d.id === activeId) ?? demos[0];

  return (
    <div className="app-shell">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="m-0 text-xs font-bold tracking-[0.16em] text-primary uppercase">React Basics</p>
          <p className="m-0 text-sm text-muted-foreground">Un concept pe pas — de la useState la context.</p>
        </div>
        <ThemeToggle />
      </header>

      <nav className="flex flex-wrap gap-2 border-b border-border pb-4" aria-label="Pașii lecției">
        {demos.map(d => (
          <DemoTab key={d.id} demo={d} isActive={d.id === active.id} onClick={() => setActiveId(d.id)} />
        ))}
      </nav>

      <main className="grid gap-4">
        <h1 className="m-0">
          Pas {active.step} — {active.title}
        </h1>
        {active.element}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ActiveStepProvider steps={demos}>
      <Shell />
    </ActiveStepProvider>
  );
}
