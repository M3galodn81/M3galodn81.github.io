import { bentoCard } from "../../lib/helper";

export default function Home() {
  return (
    // Removed bg-gradient classes here to prevent duplication and flashing
    <div className="min-h-screen w-screen flex items-center justify-center p-8">
      
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
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Listen to my Artcore releases</p>
        </a>

        {/* Status / Quote Card - Col 3 Row 2 */}
        <div className={`${bentoCard} flex flex-col justify-center`}>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Status</h3>
          <p className="text-slate-600 dark:text-slate-300 italic text-sm">
            "Rarely playing because of college hell, but currently trying to figure out how to make better Artcore music."
          </p>
        </div>

      </div>
    </div>
  );
}