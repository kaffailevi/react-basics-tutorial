import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <Button variant="outline" size="icon" onClick={() => setDark(d => !d)} aria-pressed={dark}>
      {dark ? "🌙" : "☀️"}
    </Button>
  );
}

export default ThemeToggle;
