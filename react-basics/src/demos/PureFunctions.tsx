import { useState } from "react";
import { Button } from "@/components/ui/button";

const RATE_INITIAL = 5;
const RATE_STEP = 0.05;
const COMISION_PCT = 0.01;
const COMISION_ID = "pure-comision";

// Pas 3 — funcții pure.
// O funcție care citește un const de modul cu o valoare primitivă rămâne pură: acel număr nu se schimbă niciodată.
// Problema apare când citește ceva ce se poate schimba între randări, cum ar fi DOM-ul, props sau state-ul.
// Pentru cine vine din Java: const config = { rate: 5 } nu îngheață obiectul; const blochează doar legătura, ca final.
function pureConvert(ron: number, rate: number) {
  return ron / rate;
}

function impureConvert(ron: number, rate: number) {
  const eur = ron / rate;
  const comisionCheckbox = document.getElementById(COMISION_ID) as HTMLInputElement | null;

  if (comisionCheckbox?.checked) {
    return eur * (1 - COMISION_PCT);
  }

  return eur;
}

export function PureFunctions() {
  const [ron, setRon] = useState(100);
  const [rate, setRate] = useState(RATE_INITIAL);

  const pureEur = pureConvert(ron, rate);
  const impureEur = impureConvert(ron, rate);

  const decreaseRon = () => {
    setRon(currentRon => Math.max(0, currentRon - 10));
  };

  const increaseRon = () => {
    setRon(currentRon => currentRon + 10);
  };

  const decreaseRate = () => {
    setRate(currentRate => Math.max(RATE_STEP, currentRate - RATE_STEP));
  };

  const increaseRate = () => {
    setRate(currentRate => currentRate + RATE_STEP);
  };

  return (
    <section className="fx-demo" aria-label="Conversie valutară cu funcții pure și impure">
      <p className="fx-copy">
        Schimb suma sau cursul și vezi cum se recalculează imediat. Bifează comisionul și rezultatul impure rămâne
        neschimbat până la următorul render.
      </p>

      <div className="fx-grid">
        <article className="fx-card">
          <h2>Suma în RON</h2>
          <p className="fx-value" aria-live="polite">
            {ron} RON
          </p>
          <div className="fx-actions">
            <Button onClick={decreaseRon}>-10</Button>
            <Button variant="secondary" onClick={increaseRon}>
              +10
            </Button>
          </div>
        </article>

        <article className="fx-card">
          <h2>Cursul de schimb</h2>
          <p className="fx-value" aria-live="polite">
            1 EUR = {rate.toFixed(2)} RON
          </p>
          <div className="fx-actions">
            <Button onClick={decreaseRate}>-{RATE_STEP.toFixed(2)}</Button>
            <Button variant="secondary" onClick={increaseRate}>
              +{RATE_STEP.toFixed(2)}
            </Button>
          </div>
        </article>
      </div>

      <label className="fx-check">
        <input id={COMISION_ID} type="checkbox" />
        Aplică comision de 1%
      </label>

      <div className="fx-results">
        <article className="fx-result">
          <h2>Funcție pură</h2>
          <p className="fx-value" aria-live="polite">
            {pureEur.toFixed(2)} EUR
          </p>
          <p className="fx-note">
            Folosește doar {ron} și {rate.toFixed(2)}. React știe când se schimbă, pentru că vin din state.
          </p>
        </article>

        <article className="fx-result fx-result-impure">
          <h2>Funcție impură</h2>
          <p className="fx-value" aria-live="polite">
            {impureEur.toFixed(2)} EUR
          </p>
          <p className="fx-note">
            Citește checkbox-ul direct din DOM. Bifezi comisionul, dar fără render nou afișajul rămâne stale.
          </p>
        </article>
      </div>
    </section>
  );
}
