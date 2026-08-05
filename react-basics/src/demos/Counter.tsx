import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  // Componenta este o functie: React o reapeleaza dupa fiecare update de stare ca sa refaca UI-ul.
  // Folosim forma functionala a setter-ului ca fiecare click sa porneasca din valoarea reala, nu dintr-o captura veche.
  return (
    <section className="counter-demo" aria-label="Counter demo">
      <p className="counter-value" aria-live="polite">
        {count}
      </p>
      <div className="counter-actions">
        <button type="button" onClick={() => setCount(c => c + 1)}>
          Crește cu 1
        </button>
        <button type="button" onClick={() => setCount(c => c - 1)}>
          Scade cu 1
        </button>
        <button type="button" onClick={() => setCount(() => 0)}>
          Resetează la zero
        </button>
      </div>
    </section>
  );
}
