import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import Home from "./pages/portfolio/home";
import About from "./pages/portfolio/about";
import Projects from "./pages/portfolio/projects";
import Music from "./pages/portfolio/music";
import { uiBackground } from "./lib/helper"; // Import the background style
import DeviceConfiguration from "./pages/netsec/config_gen";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("theme") === "dark" || 
         (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        return "dark";
      }
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      document.body.classList.add("bg-slate-950");
      document.body.classList.remove("bg-indigo-50");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("bg-slate-950");
      document.body.classList.add("bg-indigo-50");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    
    // Use the imported uiBackground here
    <div className={`w-full min-h-screen relative ${uiBackground}`}>
      <Toaster />
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

      <HashRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/music" element={<Music />} />

    <Route path="/config" element={<DeviceConfiguration />} />
  </Routes>
</HashRouter>

    </div>
  );
}

export default App;