// Pas 5 — formatarea cu Prettier.
// Pasul acesta există ca să fixeze forma codului din proiect, nu ca să adauge logică de UI.
// Ideea este simplă: formatarea se aplică automat la salvare și se poate verifica și în terminal.

const matrixExample = `// prettier-ignore
const matrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];`;

const jsxExample = `{/* prettier-ignore */}
<TableLikeRow />`;

export function PrettierFormat() {
  return (
    <section className="lesson-text" aria-labelledby="prettier-format-title">
      <header className="lesson-text__header">
        <p className="lesson-kicker">Configurare de proiect</p>
        <h1 id="prettier-format-title">Prettier formatează automat codul</h1>
        <p>
          Am setat un formatter unic pentru proiect, ca toată grupa să obțină aceeași formă a codului fără discuții de
          gust la code review.
        </p>
      </header>

      <div className="lesson-text__grid">
        <article className="lesson-card">
          <h2>Ce am activat</h2>
          <ul>
            <li>
              Prettier cu reguli fixe: semicolon-uri, ghilimele duble, lățime de 120 de caractere și paranteze scurte la
              arrow functions.
            </li>
            <li>
              Pluginul <span>prettier-plugin-tailwindcss</span>, deja pregătit pentru pasul în care apare Tailwind.
            </li>
            <li>Formatare la salvare în VS Code, prin setări salvate în proiect.</li>
            <li>Două comenzi de terminal: una scrie fișierele, una doar verifică.</li>
          </ul>
        </article>

        <article className="lesson-card">
          <h2>Ce înseamnă fiecare setare</h2>
          <ul>
            <li>
              <strong>editor.formatOnSave</strong> aplică formatter-ul automat când salvezi fișierul.
            </li>
            <li>
              <strong>editor.defaultFormatter</strong> spune VS Code să folosească Prettier ca formatter implicit.
            </li>
            <li>
              <strong>format</strong> rescrie fișierele cu stilul definit în proiect.
            </li>
            <li>
              <strong>format:check</strong> verifică dacă fișierele respectă stilul, fără să modifice nimic.
            </li>
          </ul>
        </article>
      </div>

      <article className="lesson-card lesson-card--wide">
        <h2>Cum oprești formatarea doar pentru un bloc</h2>
        <p>
          În JS și TS, <strong>// prettier-ignore</strong> pus imediat înaintea unei declarații spune lui Prettier să
          lase exact nodul următor așa cum este scris. Nu există un interval de tip &ldquo;ignoră de aici până
          aici&rdquo; pentru JS. Directiva de tip start/end funcționează în Markdown, YAML și HTML, nu aici.
        </p>
        <pre>
          <code>{matrixExample}</code>
        </pre>
        <p>
          În JSX, forma este <strong>{"{/* prettier-ignore */}"}</strong> și se aplică elementului următor. Folosește
          asta rar și cu motiv clar, de exemplu pentru matrice sau tabele de valori aliniate în coloane.
        </p>
        <pre>
          <code>{jsxExample}</code>
        </pre>
      </article>
    </section>
  );
}
