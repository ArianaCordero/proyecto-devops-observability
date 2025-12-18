import { useEffect, useMemo, useState } from "react";
const KEY = "devopscrud_theme";
export function useTheme(){
  const preferred = useMemo(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    return mq && mq.matches ? "light" : "dark";
  }, []);
  const [theme, setTheme] = useState(preferred);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);
  return { theme, toggle: () => setTheme(t => t === "dark" ? "light" : "dark") };
}
