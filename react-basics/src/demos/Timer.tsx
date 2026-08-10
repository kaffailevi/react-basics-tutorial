import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

let subscriptionCount = 0;

// Pas 5 — timer și telemetrie.
// Comentariul de aici explică de ce efectele secundare merg în useEffect și nu în corpul componentei.
export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    console.log("[timer] effect run", { running });

    // useEffect rulează DUPĂ randare și e locul efectelor secundare (timere, fetch, event listeners).
    // Cleanup-ul e apelat înainte de re-rularea efectului și la unmount; fără el, comutarea rapidă ar lăsa
    // mai multe intervale active în paralel (timere „zombie” → memory leak).
    // Efectele NU se scriu în corpul componentei.
    if (!running) {
      console.log("[timer] effect: paused, nothing to start");
      return undefined;
    }

    console.log("[timer] effect: starting interval");
    const id = window.setInterval(() => {
      console.log("[timer] tick", seconds + 1);
      setSeconds(currentSeconds => currentSeconds + 1);
    }, 1000);

    return () => {
      console.log("[timer] cleanup: clearing interval", id);
      window.clearInterval(id);
    };
  }, [running]);

  useEffect(() => {
    subscriptionCount += 1;
    const subscriptionId = subscriptionCount;

    const onBodyClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        console.log(
          `[tracker #${subscriptionId}] non-element click @ ${Math.round(event.pageX)}×${Math.round(event.pageY)}`,
        );
        return;
      }

      const directTextNodes = Array.from(target.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
      const ownText = directTextNodes
        .map(node => node.textContent ?? "")
        .join("")
        .trim();
      const cssLabel = Array.from(target.classList).slice(0, 3).join(" ");
      const label = ownText || cssLabel || "(no text / no classes)";

      console.log(
        `[tracker #${subscriptionId}] ${target.tagName.toLowerCase()} "${label}" @ ${Math.round(event.pageX)}×${Math.round(event.pageY)}`,
      );
    };

    document.body.addEventListener("click", onBodyClick);
    console.log(`[tracker #${subscriptionId}] subscribed (${subscriptionCount} active)`);
  }, []);

  return (
    <section className="demo-card" aria-label="Timer și telemetrie demo">
      <h2>Cronometru</h2>
      <p className="demo-copy">
        Acest exemplu arată cum un timer rulează în efect și cum cleanup-ul se apelează înainte de re-rularea efectului
        sau la unmount.
      </p>

      <p className="demo-value" aria-live="polite">
        {seconds} s
      </p>

      <div className="demo-actions">
              <Button onClick={() => setRunning(true)}>Pornește</Button>
              <Button variant="secondary" onClick={() => setRunning(false)}>
          Pauză
              </Button>
              <Button
                  variant="outline"
          onClick={() => {
            console.log("[timer] reset clicked");
            setRunning(false);
            setSeconds(0);
          }}
        >
          Reset
              </Button>
      </div>

      <p className="demo-copy">
        În consola vei vedea și tracker-ul de click-uri: mesajul citește evenimentul și nu modifică starea.
      </p>
    </section>
  );
}
