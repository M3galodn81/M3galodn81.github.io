import { useState } from "react";
import { Link } from "react-router-dom";
import { bentoCard } from "../../lib/helper";
import { Check, Copy, Globe, Music } from "lucide-react";

export default function Home() {
  

  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('r3alit.music@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 p-8 transition-colors duration-300">
                  
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
          <div className="mt-4 flex flex-wrap gap-2">
             <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-sm font-medium whitespace-nowrap">Artcore</span>
             <span className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-sm font-medium whitespace-nowrap">Rhythm Games</span>
             <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-sm font-medium whitespace-nowrap">Web Dev</span>
          </div>
        </div>

        {/* Profile / Navigation Card */}
        <div className={`${bentoCard} flex flex-col items-center justify-center text-center group cursor-pointer`}>
          <Link to="/about" className="flex flex-col items-center w-full h-full justify-center">
            {/* Replaced Emoji with Image */}
            <img 
              src="/src/assets/avatar.png" 
              alt="M3galodon Profile"
              className="h-24 w-24 rounded-full mb-4 object-cover shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-white/50 dark:border-white/10"
            />
            <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
                View Full Profile →
            </span>
          </Link>
        </div>

        {/* Projects Link Card - Col 1 Row 2 */}
        <Link to="/projects" className={`${bentoCard} block hover:scale-[1.02] active:scale-[0.98] group`}>
          <div className="flex justify-between items-start">
             <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider">Repositories</h3>
             <span className="text-indigo-400 text-xl group-hover:translate-x-1 transition-transform">↗</span>
          </div>
          <p className="text-4xl font-bold text-slate-800 dark:text-white mt-2">Code</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Check out my recent GitHub activity</p>
        </Link>

        {/* Music Link Card - Col 2 Row 2 (NEW) */ }
        <Link to="/music" className={`${bentoCard} block hover:scale-[1.02] active:scale-[0.98] group`}>
          <div className="flex justify-between items-start">
             <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider">Tracks</h3>
             <span className="text-orange-400 text-xl group-hover:translate-x-1 transition-transform">↗</span>
          </div>
          <p className="text-4xl font-bold text-slate-800 dark:text-white mt-2">Music</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Listen to my music releases</p>
        </Link>

        {/* Status / Quote Card - Col 3 Row 2 */}
        <div className={`${bentoCard} flex flex-col justify-center`}>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Status</h3>
          <p className="text-slate-600 dark:text-slate-300 italic text-sm">
            "Rarely playing because of college hell, but currently trying to figure out how to make better Artcore music."
          </p>
        </div>
        
        {/* Music Links */}
        <div className={`${bentoCard} flex flex-col`}>
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
             <Music className="w-5 h-5 text-indigo-500" /> Music
           </h3>
           <div className="space-y-3 flex-1">
              <a href="https://soundcloud.com/m3galodn81" target="_blank" rel="noreferrer" className="block p-3 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-white/50 dark:border-white/10">
                 <div className="font-semibold text-slate-800 dark:text-white">Soundcloud</div>
                 <div className="text-xs text-slate-500 dark:text-slate-400">Releases before Youtube.</div>
              </a>
              <a href="https://www.youtube.com/@M3galodon_Music" target="_blank" rel="noreferrer" className="block p-3 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-white/50 dark:border-white/10">
                 <div className="font-semibold text-slate-800 dark:text-white">Music Channel</div>
                 <div className="text-xs text-slate-500 dark:text-slate-400">Just music videos.</div>
              </a>
              <a href="https://docs.google.com/spreadsheets/d/1Rpqv-e82a0Z6oZRdm69rigbyMULOteKr3xZliwpZpbY/edit?usp=sharing" target="_blank" rel="noreferrer" className="block p-3 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-white/50 dark:border-white/10">
                 <div className="font-semibold text-slate-800 dark:text-white">Track Permissions</div>
                 <div className="text-xs text-slate-500 dark:text-slate-400">Usage rights list.</div>
              </a>
              <button onClick={copyEmail} className="w-full text-left p-3 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-white/50 dark:border-white/10 relative group">
                 <div className="font-semibold text-slate-800 dark:text-white flex justify-between items-center">
                    Email
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
                 </div>
                 <div className="text-xs text-slate-500 dark:text-slate-400">r3alit.music@gmail.com</div>
              </button>
           </div>
        </div>

        {/* Social Links */}
        <div className={`${bentoCard} flex flex-col`}>
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
             <Globe className="w-5 h-5 text-blue-400" /> Socials
           </h3>
           <div className="space-y-3 flex-1">
              <a href="https://www.youtube.com/@M3galodon_Offical" target="_blank" rel="noreferrer" className="block p-3 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-white/50 dark:border-white/10">
                 <div className="font-semibold text-slate-800 dark:text-white">Main Channel</div>
                 <div className="text-xs text-slate-500 dark:text-slate-400">Tetris & fanmade charts.</div>
              </a>
              <a href="https://x.com/M3galodnOffical" target="_blank" rel="noreferrer" className="block p-3 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-white/50 dark:border-white/10">
                 <div className="font-semibold text-slate-800 dark:text-white">Twitter / X</div>
                 <div className="text-xs text-slate-500 dark:text-slate-400">Rarely active.</div>
              </a>
              <div className="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 cursor-default">
                 <div className="font-semibold text-slate-800 dark:text-white">Discord</div>
                 <div className="text-xs text-slate-500 dark:text-slate-400">surtr_gaming</div>
              </div>
           </div>
        </div>



        
      </div>
    </div>
  );
}