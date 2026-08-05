Titlu: Aplicatie React pentru invatare incrementala

1. Scop
- Aplicatia trebuie sa fie un playground React pentru incepatori in web care cunosc alte limbaje de programare, dar nu au experienta cu JavaScript si React.
- Invatarea trebuie sa fie progresiva: un concept per pas, fara sa se livreze de la inceput codul complet al aplicatiei.
- Utilizatorul trebuie sa poata raspunde clar la intrebarea „din ce este facut proiectul asta” dupa ce parcurge documentatia si pasi de implementare.

2. Public tinta
- Dezvoltatori care vin din Python, Java, C#, Kotlin, JavaScript sau C++.
- Utilizatori care stiu programare, dar vor sa inteleaga fundamentul React si modul in care browserul primeste si afiseaza pagina.

3. Obiective de invatare
- JSX si diferentele fata de HTML.
- Componente functionale si compunerea lor.
- Props si fluxul de date dintre componente.
- State local cu useState.
- Efecte cu useEffect.
- Evenimente si formulare simple.
- Routing de baza.
- Rolul fisierelor generate de scaffold-ul Vite + React + TypeScript.

4. Stack si pornire
- Stack-ul standard este Vite + React + TypeScript.
- Comanda de generare a proiectului este: `npm create vite@latest react-basics -- --template react-ts`.
- Dupa generare se ruleaza `npm install` si apoi `npm run dev`.
- Nu se adauga librarii suplimentare de styling sau componente la inceput.

5. Cum functioneaza pagina
- `index.html` trebuie sa ramana aproape gol si sa contina in principal doar containerul `div#root`.
- Nu exista un server de aplicatie care randeaza pagina gata facuta la fiecare cerere.
- React construieste DOM-ul in browser, pornind din JavaScript-ul inclus in bundle.
- `src/main.tsx` este punctul in care React se leaga de `div#root`.

6. Structura fisierelor generate si rolul lor
- `index.html`: punctul de intrare HTML; gazduieste containerul radacina.
- `src/main.tsx`: punctul de pornire al aplicatiei React; monteaza arborele React in browser.
- `src/App.tsx`: shell-ul principal al aplicatiei; tine registrul demo-urilor si selectia activa, nu continutul complet al lectiilor.
- `src/index.css`: stiluri globale minime.
- `vite.config.ts`: configurarea build-ului si a serverului de dezvoltare Vite.
- `tsconfig.app.json`: configuratia TypeScript pentru codul aplicatiei din browser.
- `tsconfig.node.json`: configuratia TypeScript pentru fisierele de Node.js, cum sunt configurariile si instrumentele de build.
- `package.json`: dependente, scripturi si metadate despre proiect.
- `public/`: fisiere statice livrate ca atare, fara procesare prin React.

7. Structura de cod
- Fiecare concept nou trebuie sa aiba propriul fisier in `src/demos/<Concept>.tsx`.
- `App.tsx` trebuie sa ramana scurt si sa contina doar shell-ul si registrul de demo-uri.
- Un pas nou inseamna un fisier nou in `src/demos/` si o intrare noua in registru.
- `src/components/` este pentru componente partajate intre pasi.
- `src/hooks/` este pentru cate un custom hook per fisier.
- `src/context/` este pentru cate un provider impreuna cu hook-ul lui de consum.
- `src/lib/` este pentru helperi mici.
- Titlul de forma `Pas N — Titlu` este randat de shell-ul din `App.tsx`, nu de demo.

8. Cerinte pedagogice
- Fiecare lectie trebuie sa contina o explicatie scurta, un exemplu practic si un exercitiu scurt.
- Fiecare fisier de demo trebuie sa inceapa cu un comentariu antet de forma `// Pas N — <concept>.`.
- Comentariile din demo-uri trebuie sa explice DE CE exista pasul, nu doar ce face codul.
- Comentariile se scriu in romana.
- Nu se muta exemplul default din `App.tsx` pana cand nu exista un pas explicit pentru asta.

9. Documentatie si automatizare
- `docs/requirements.md` ramane sursa de adevar pentru cerintele de produs si este pastrat in romana.
- `README.md`, `CLAUDE.md` si `.github/copilot-instructions.md` raman in engleza.
- `CLAUDE.md` si `.github/copilot-instructions.md` trebuie sa fie consistente intre ele.
- Daca se folosesc scripturi `sh` pentru sincronizarea instructiunilor, ele trebuie documentate clar: scop, input, output si cum se ruleaza.

10. Criterii de acceptanta
- Exista un README in engleza care explica setup-ul, rolul fisierelor si fluxul de invatare.
- Exista instructiuni in engleza pentru contributori si automatizari.
- Exista conventii explicite pentru organizarea codului pe pasi.
- Exista o cale clara de a creste aplicatia pas cu pas fara a aglomera `App.tsx`.
