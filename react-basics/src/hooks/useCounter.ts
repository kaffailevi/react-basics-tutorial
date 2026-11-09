import { useCallback, useState } from "react";

type UseCounterOptions = {
  min?: number;
  max?: number;
  step?: number;
};

// Un custom hook este o funcție obișnuită al cărei nume începe cu `use` și care apelează alte hook-uri.
// De ce există: logica de „numărătoare cu limite" se repeta în mai multe componente; acum stă într-un singur loc.
// Important: fiecare componentă care apelează useCounter primește PROPRIUL ei state — hook-ul împarte logica,
// nu datele. Pentru date comune între componente avem nevoie de context (pasul următor).
export function useCounter(initial = 0, { min = -Infinity, max = Infinity, step = 1 }: UseCounterOptions = {}) {
  const [count, setCount] = useState(initial);

  // useCallback păstrează aceeași referință de funcție între randări, cât timp limitele nu se schimbă.
  // Așa, componentele care primesc funcțiile prin props nu văd o „funcție nouă" la fiecare randare.
  const increment = useCallback(() => setCount(current => Math.min(max, current + step)), [max, step]);
  const decrement = useCallback(() => setCount(current => Math.max(min, current - step)), [min, step]);
  const reset = useCallback(() => setCount(initial), [initial]);

  // Hook-ul decide ce întoarce: aici un obiect, ca apelantul să aleagă prin destructuring ce îi trebuie.
  return { count, increment, decrement, reset, canIncrement: count < max, canDecrement: count > min };
}

export type Counter = ReturnType<typeof useCounter>;
