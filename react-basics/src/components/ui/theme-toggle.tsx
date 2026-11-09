import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "theme";

// Clasa `.dark` e pusă deja de scriptul mic din index.html înainte de prima randare (fără „flash" alb).
// Componenta doar citește starea curentă, o schimbă și o ține minte pentru următoarea vizită.
export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      // fără localStorage tema funcționează, doar nu e ținută minte
    }
  }, [dark]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setDark(d => !d)}
      aria-pressed={dark}
      aria-label={dark ? "Comută pe tema luminoasă" : "Comută pe tema întunecată"}
      title={dark ? "Temă luminoasă" : "Temă întunecată"}
    >
      {dark ? "🌙" : "☀️"}
    </Button>
  );
}

export default ThemeToggle;
