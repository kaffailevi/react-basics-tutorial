import { Component } from "react";
import { Button } from "@/components/ui/button";

type CounterClassState = {
  count: number;
};

// Pas 2 — counter cu clasă.
// Aici se vede mai explicit ciclul: schimb stare -> React cheamă din nou render() -> UI-ul se actualizează.
// Pentru cine vine din OOP/Java, legătura dintre stare și randare e mai ușor de urmărit decât la hooks.
// Totuși, în cod nou preferăm funcții + hooks: sunt mai scurte, mai clare și sunt stilul recomandat azi.
// Componenta nu primește props: Record<string, never> spune exact asta (spre deosebire de `{}`, care acceptă orice).
export class CounterClass extends Component<Record<string, never>, CounterClassState> {
  state: CounterClassState = {
    count: 0,
  };

  increment = () => {
    this.setState(s => ({ count: s.count + 1 }));
  };

  decrement = () => {
    this.setState(s => ({ count: s.count - 1 }));
  };

  reset = () => {
    this.setState(() => ({ count: 0 }));
  };

  render() {
    const { count } = this.state;

    return (
      <section className="demo-card counter-demo" aria-label="Counter class demo">
        <p className="counter-value" aria-live="polite">
          {count}
        </p>
        <div className="counter-actions">
          <Button onClick={this.increment}>Crește cu 1</Button>
          <Button variant="secondary" onClick={this.decrement}>
            Scade cu 1
          </Button>
          <Button variant="outline" onClick={this.reset}>
            Resetează la zero
          </Button>
        </div>
      </section>
    );
  }
}
