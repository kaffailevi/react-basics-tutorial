import React, { useState } from "react";
import { Counter } from "./demos/Counter";
import { CounterClass } from "./demos/CounterClass";
import { LiftingState } from "./demos/LiftingState";
import { Timer } from "./demos/Timer";
import { PureFunctions } from "./demos/PureFunctions";
import { PrettierFormat } from "./demos/PrettierFormat";
import { DemoMenu } from "./demos/DemoMenu";

type Demo = {
  id: string;
  step: number;
  title: string;
  element: React.ReactNode;
};

function DemoTab({ demo, isActive, onClick }: { demo: Demo; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      style={{ position: "relative", padding: "0.6rem 1rem", marginRight: "0.5rem" }}
      className={isActive ? "demo-tab demo-tab--active" : "demo-tab"}
    >
      {demo.title}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: -6,
          top: -6,
          width: 26,
          height: 26,
          borderRadius: 13,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#222",
          color: "#fff",
          fontSize: "0.75rem",
        }}
      >
        {demo.step}
      </span>
    </button>
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
    { id: "menu-demo", step: 7, title: "Demo menu", element: <DemoMenu /> },
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
