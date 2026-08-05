import { Component } from "react";

type CounterClassState = {
  count: number;
};

// Pas 3 — counter cu clasă.
// Aici se vede mai explicit ciclul: schimb stare -> React cheamă din nou render() -> UI-ul se actualizează.
// Pentru cine vine din OOP/Java, legătura dintre stare și randare e mai ușor de urmărit decât la hooks.
// Totuși, în cod nou preferăm funcții + hooks: sunt mai scurte, mai clare și sunt stilul recomandat azi.
export class CounterClass extends Component<{}, CounterClassState> {
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
      <section className="counter-demo" aria-label="Counter demo">
        <p className="counter-value" aria-live="polite">
          {count}
        </p>
        <div className="counter-actions">
          <button type="button" onClick={this.increment}>
            Crește cu 1
          </button>
          <button type="button" onClick={this.decrement}>
            Scade cu 1
          </button>
          <button type="button" onClick={this.reset}>
            Resetează la zero
          </button>
        </div>
      </section>
    );
  }
}
