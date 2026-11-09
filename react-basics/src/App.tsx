import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/demos/Counter";
import { CounterClass } from "@/demos/CounterClass";
import { LiftingState } from "@/demos/LiftingState";
import { Timer } from "@/demos/Timer";
import { PureFunctions } from "@/demos/PureFunctions";
import { PrettierFormat } from "@/demos/PrettierFormat";
import { DemoMenu } from "@/demos/DemoMenu";
import { PathAlias } from "@/demos/PathAlias";
import { TailwindSetup } from "@/demos/TailwindSetup";
import { ShadcnSetup } from "@/demos/ShadcnSetup";
import { CustomHook } from "@/demos/CustomHook";

type Demo = {
  id: string;
  step: number;
  title: string;
  element: React.ReactNode;
};

function DemoTab({ demo, isActive, onClick }: { demo: Demo; isActive: boolean; onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      aria-pressed={isActive}
      variant={isActive ? "default" : "secondary"}
      size="sm"
      className="relative overflow-visible mr-2"
    >
      {demo.title}
      <span
        aria-hidden
        className={"absolute -right-2 -top-2 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs bg-black text-white"}
      >
        {demo.step}
      </span>
    </Button>
  );
}

export default function App() {
  const demos: Demo[] = [
    { id: "counter", step: 1, title: "Counter", element: <Counter /> },
    { id: "counter-class", step: 3, title: "Counter (class)", element: <CounterClass /> },
    { id: "timer", step: 5, title: "Timer", element: <Timer /> },
    { id: "pure", step: 4, title: "Pure functions", element: <PureFunctions /> },
    { id: "lifting", step: 6, title: "Lifting state", element: <LiftingState /> },
    { id: "prettier", step: 5, title: "Prettier", element: <PrettierFormat /> },
    { id: "path-alias", step: 8, title: "Path alias", element: <PathAlias /> },
    { id: "tailwind", step: 9, title: "Tailwind setup", element: <TailwindSetup /> },
    { id: "shadcn", step: 10, title: "shadcn/ui (Button)", element: <ShadcnSetup /> },
    { id: "menu-demo", step: 7, title: "Demo menu", element: <DemoMenu /> },
    { id: "custom-hook", step: 11, title: "Custom hook", element: <CustomHook /> },
  ];

  const [activeId, setActiveId] = useState<string>(demos[0].id);
  const active = demos.find(d => d.id === activeId) ?? demos[0];

  return (
    <div className="app-shell">
      <nav style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }} aria-label="Demo navigation">
        {demos.map(d => (
          <DemoTab key={d.id} demo={d} isActive={d.id === activeId} onClick={() => setActiveId(d.id)} />
        ))}
      </nav>

      <main style={{ padding: "1rem" }}>
        <h1>
          Pas {active.step} — {active.title}
        </h1>
        <div>{active.element}</div>
      </main>
    </div>
  );
}
