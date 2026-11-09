import type { ReactNode } from "react";

// Componentă partajată între pași: fiecare lecție se încheie cu un exercițiu scurt, afișat la fel peste tot.
export function LessonExercise({ children }: { children: ReactNode }) {
  return (
    <aside className="lesson-exercise" aria-label="Exercițiu">
      <strong>Exercițiu</strong>
      <div>{children}</div>
    </aside>
  );
}

export default LessonExercise;
