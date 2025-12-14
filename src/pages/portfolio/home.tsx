import { useEffect, useRef } from "react";
import { bentoCard } from "../../lib/helper";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        // Prevent vertical page scroll when scrolling this container
        e.preventDefault();
        // Translate vertical scroll to horizontal scroll
        el.scrollLeft += e.deltaY;
      };
      
      // Use non-passive listener to allow preventDefault
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  const skills = [
    { name: "React", icon: "https://cdn.simpleicons.org/react" },
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
    { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
    { name: "Android Studio", icon: "https://cdn.simpleicons.org/androidstudio" },
    { name: "Arch Linux", icon: "https://cdn.simpleicons.org/archlinux" },
    { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode" },
    { name: "Krita", icon: "https://cdn.simpleicons.org/krita" },
    { name: "Unity", icon: "https://cdn.simpleicons.org/unity" },
    { name: "Cisco Packet Tracer", icon: "https://cdn.simpleicons.org/cisco" },
    { name: "C#", icon: "https://cdn.simpleicons.org/csharp" },
    { name: "Python", icon: "https://cdn.simpleicons.org/python" },
    { name: "Shell", icon: "https://cdn.simpleicons.org/gnubash" },
    { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
    { name: "Git", icon: "https://cdn.simpleicons.org/git" },
    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
    { name: "Vite", icon: "https://cdn.simpleicons.org/vite" },
    { name: "FL Studio", icon: "https://cdn.simpleicons.org/flstudio" },
    { name: "SoundCloud", icon: "https://cdn.simpleicons.org/soundcloud" },
    { name: "YouTube", icon: "https://cdn.simpleicons.org/youtube" }
  ];

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 p-8 transition-colors duration-300">
      
      {/* Injecting styles for the scrolling animation and hiding scrollbars */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      
      {/* The Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full animate-in fade-in duration-700">
        
        {/* Main Identity Card - Spans 2 Columns */}
        <div className={`${bentoCard} md:col-span-2 flex flex-col justify-center`}>
          <div className="flex items-center gap-3 mb-2">
             <span className="inline-block px-2 py-0.5 rounded-md bg-red-500/10 text-red-500 text-[10px] font-bold border border-red-500/20 uppercase tracking-wider">WIP</span>
             <h1 className="text-4xl font-bold text-slate-800 dark:text-white">M3galodon</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Rhythm game enthusiast, aspiring music composer, and developer.
          </p>
          <div className="mt-4 flex gap-2">
             <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-sm font-medium">Artcore</span>
             <span className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-sm font-medium">Rhythm Games</span>
             <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-sm font-medium">Web Dev</span>
          </div>
        </div>

        {/* Profile / Navigation Card */}
        <div className={`${bentoCard} flex flex-col items-center justify-center text-center group cursor-pointer`}>
          <a href="/about" className="flex flex-col items-center w-full h-full justify-center">
            {/* Replaced Emoji with Image */}
            <img 
              src="https://github.com/M3galodn81.png" 
              alt="M3galodon Profile"
              className="h-24 w-24 rounded-full mb-4 object-cover shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-white/50 dark:border-white/10"
            />
            <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
                View Full Profile →
            </span>
          </a>
        </div>

        {/* Projects Link Card - Col 1 Row 2 */}
        <a href="/projects" className={`${bentoCard} block hover:scale-[1.02] active:scale-[0.98] group`}>
          <div className="flex justify-between items-start">
             <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider">Repositories</h3>
             <span className="text-indigo-400 text-xl group-hover:translate-x-1 transition-transform">↗</span>
          </div>
          <p className="text-4xl font-bold text-slate-800 dark:text-white mt-2">Code</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Check out my recent GitHub activity</p>
        </a>

        {/* Music Link Card - Col 2 Row 2 (NEW) */ }
        <a href="/music" className={`${bentoCard} block hover:scale-[1.02] active:scale-[0.98] group`}>
          <div className="flex justify-between items-start">
             <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider">Tracks</h3>
             <span className="text-orange-400 text-xl group-hover:translate-x-1 transition-transform">↗</span>
          </div>
          <p className="text-4xl font-bold text-slate-800 dark:text-white mt-2">Music</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Listen to my music releases</p>
        </a>

        {/* Status / Quote Card - Col 3 Row 2 */}
        <div className={`${bentoCard} flex flex-col justify-center`}>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Status</h3>
          <p className="text-slate-600 dark:text-slate-300 italic text-sm">
            "Rarely playing because of college hell, but currently trying to figure out how to make better Artcore music."
          </p>
        </div>

        {/* Tech Stack Carousel - Spans 3 Columns (Full Width) */}
        <div className={`${bentoCard} md:col-span-3 overflow-hidden flex flex-col justify-center py-8`}>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 text-center">Tech & Tools</h3>
            
            {/* Changed overflow-hidden to overflow-x-auto and added no-scrollbar */}
            <div 
              ref={scrollRef}
              className="w-full inline-flex flex-nowrap overflow-x-auto no-scrollbar [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] cursor-grab active:cursor-grabbing"
            >
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-3 animate-scroll pause-on-hover">
                    {/* Duplicate list for infinite scroll effect */}
                    {[...skills, ...skills].map((skill, i) => (
                        // Added flex-shrink-0 to prevent squishing
                        <li key={i} className="flex-shrink-0">
                            {/* Increased padding (px-6) and set text-sm to fix overflow look */}
                            <span className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-indigo-50 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium whitespace-nowrap shadow-sm hover:bg-white/80 dark:hover:bg-white/10 transition-colors select-none">
                                {skill.icon && (
                                  <img 
                                    src={skill.icon} 
                                    alt="" 
                                    className="w-4 h-4 object-contain" 
                                    loading="lazy"
                                  />
                                )}
                                {skill.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        
      </div>
    </div>
  );
}