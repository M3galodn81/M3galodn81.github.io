import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import Home from "./pages/portfolio/home";
import About from "./pages/portfolio/about";
import Projects from "./pages/portfolio/projects";
import Music from "./pages/portfolio/music";

function App() {
  // 1. Initialize state from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("theme") === "dark" || 
         (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        return "dark";
      }
    }
    return "light";
  });

  // 2. Apply the 'dark' class to the HTML element whenever theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      // Optional: Add a dark background to body to override page gradients if needed
      document.body.classList.add("bg-slate-950"); 
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("bg-slate-950");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3. Toggle Handler
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="w-full min-h-screen relative">
      {/* Theme Toggle Button - Fixed to Top Right */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg transition-all hover:scale-110 active:scale-95 group"
        aria-label="Toggle Theme"
      >
        {theme === "light" ? (
          <Moon className="w-6 h-6 text-slate-700 group-hover:text-indigo-600" />
        ) : (
          <Sun className="w-6 h-6 text-yellow-300 group-hover:text-yellow-400" />
        )}
      </button>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;