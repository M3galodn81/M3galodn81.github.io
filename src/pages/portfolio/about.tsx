import { Link } from "react-router-dom";
import { bentoCard } from "../../lib/helper";
import {  Workflow, ExternalLink, Code2, Palette, Shield } from "lucide-react";

export default function About() {

  const devSkills = [
      { name: "React", icon: "https://cdn.simpleicons.org/react" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
      { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss" },
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
      { name: "C#", },
      { name: "Android Studio", icon: "https://cdn.simpleicons.org/androidstudio" },
      { name: "Kotlin", icon: "https://cdn.simpleicons.org/kotlin" },
//     { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
      { name: "Vite", icon: "https://cdn.simpleicons.org/vite" },
      { name: "Python", icon: "https://cdn.simpleicons.org/python" },
      { name: "Git", icon: "https://cdn.simpleicons.org/git" },
      { name: "Arch Linux", icon: "https://cdn.simpleicons.org/archlinux" },
      { name: "Shell", icon: "https://cdn.simpleicons.org/gnubash" },
  ];

  const creativeSkills = [
      { name: "FL Studio"},
      { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
      { name: "Krita", icon: "https://cdn.simpleicons.org/krita" },
      { name: "Unity", icon: "https://cdn.simpleicons.org/unity" },
      { name: "SoundCloud", icon: "https://cdn.simpleicons.org/soundcloud" },
      { name: "YouTube", icon: "https://cdn.simpleicons.org/youtube" },
  ];

  const netSecSkills = [
   //  { name: "Kali Linux", icon: "https://cdn.simpleicons.org/kalilinux" },
    { name: "Wireshark", icon: "https://cdn.simpleicons.org/wireshark" },
    { name: "Nmap",  },
   //  { name: "Burp Suite", icon: "https://cdn.simpleicons.org/burpsuite" },
   //  { name: "Metasploit", icon: "https://cdn.simpleicons.org/metasploit" },
    { name: "Cisco Packet Tracer", icon: "https://cdn.simpleicons.org/cisco" },
   //  { name: "OpenVPN", icon: "https://cdn.simpleicons.org/openvpn" },
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 p-8 transition-colors duration-300 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="max-w-5xl w-full mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">About Me</h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">M3galodon</p>
        </div>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline mb-2">
          &larr; Back Home
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        
        {/* Bio */}
        <div className={`${bentoCard} md:col-span-2`}>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Bio</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            A rhythm game enthusiast who rarely plays because of college hell and an aspiring music composer/producer who likes artcore music but doesn't know how to make artcore. Also a professional wrong grammarist.
          </p>
        </div>

        {/* Avatar Placeholder */}
        <div className={`${bentoCard} flex items-center justify-center bg-indigo-100/50 dark:bg-indigo-900/30`}>
           <img 
              src="https://github.com/M3galodn81.png" 
              alt="M3galodon Profile"
              className="h-32 w-32 rounded-full object-cover shadow-lg border-4 border-white/50 dark:border-white/10"
            />
        </div>

        {/* Development Stack */}
        <div className={`${bentoCard} md:col-span-2`}>
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
             <Code2 className="w-5 h-5 text-blue-500" /> Development
           </h3>
           <div className="flex flex-wrap gap-2">
              {devSkills.map((skill) => (
                <span key={skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-white/5 border border-indigo-50 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                    {skill.icon &&<img src={skill.icon} alt="" className="w-3.5 h-3.5 object-contain" loading="lazy" />}
                    {skill.name}
                </span>
              ))}
           </div>
        </div>

        {/* Creative Stack */}
        <div className={`${bentoCard} md:col-span-1`}>
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
             <Palette className="w-5 h-5 text-pink-500" /> Creative
           </h3>
           <div className="flex flex-wrap gap-2">
              {creativeSkills.map((skill) => (
                <span key={skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-white/5 border border-indigo-50 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                   {skill.icon &&<img src={skill.icon} alt="" className="w-3.5 h-3.5 object-contain" loading="lazy" />}
                    {skill.name}
                </span>
              ))}
           </div>
        </div>

        <div className={`${bentoCard} md:col-span-3`}>
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
             <Shield className="w-5 h-5 text-red-500" /> Network & Security
           </h3>
           <div className="flex flex-wrap gap-2">
              {netSecSkills.map((skill) => (
                <span key={skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-white/5 border border-indigo-50 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-white/80 dark:hover:bg-white/10 transition-colors">
                      {skill.icon &&<img src={skill.icon} alt="" className="w-3.5 h-3.5 object-contain" loading="lazy" />}
                    {skill.name}
                </span>
              ))}
           </div>
        </div>

        {/* Music Links */}
        {/* <div className={`${bentoCard} flex flex-col`}>
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
        </div> */}
              
            
        {/* Social Links*/}
        {/* <div className={`${bentoCard} flex flex-col`}>
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
             <Twitter className="w-5 h-5 text-blue-400" /> Socials
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
        </div> */}

        {/* Rhythm Game Stats */}
        {/* <div className={`${bentoCard} flex flex-col`}>
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
             <Gamepad2 className="w-5 h-5 text-pink-500" /> Games
           </h3>
           <div className="space-y-3 flex-1">
              <div className="flex justify-between items-center p-2 border-b border-slate-100 dark:border-white/5 last:border-0">
                 <span className="font-medium text-slate-700 dark:text-slate-300">Phigros</span>
                 <span className="text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded">15.57 RKS</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-slate-100 dark:border-white/5 last:border-0">
                 <span className="font-medium text-slate-700 dark:text-slate-300">Arcaea</span>
                 <span className="text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded">9.85 PPT</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-slate-100 dark:border-white/5 last:border-0">
                 <span className="font-medium text-slate-700 dark:text-slate-300">CHUNITHM</span>
                 <span className="text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded">14.52</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-slate-100 dark:border-white/5 last:border-0">
                 <span className="font-medium text-slate-700 dark:text-slate-300">vivid/stasis</span>
                 <span className="text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded">9.8k</span>
              </div>
           </div>
        </div>  */}
        
        {/* Work Section */}
        <div className={`${bentoCard} md:col-span-3`}>
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
             <Workflow className="w-5 h-5 text-emerald-500" /> Work
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://github.com/FFF40/JANOARG" target="_blank" rel="noreferrer" className="group p-4 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-white/50 dark:border-white/10 flex justify-between items-center">
                 <div>
                    <div className="font-semibold text-slate-800 dark:text-white">JANOARG</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Offical Charter, Developer, & Artist</div>
                 </div>
                 {/* <img src="/src/assets/Main Logo.svg" alt="JANOARG Logo" className="h-10 w-10" /> */}
                 <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              </a>
           </div>
        </div>

        {/* Other Things */}
        {/* <div className={`${bentoCard} md:col-span-3`}>
           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
             <FileText className="w-5 h-5 text-emerald-500" /> Other Stuff
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://docs.google.com/document/d/14ApziAkfSgNdSwSugsOvrMmV--dY8D_fT0960XTKWa0/edit?usp=sharing" target="_blank" rel="noreferrer" className="group p-4 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-white/50 dark:border-white/10 flex justify-between items-center">
                 <div>
                    <div className="font-semibold text-slate-800 dark:text-white">Phigros Fanmade Charting Guide</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Incomplete guide. Might be outdated by a lot.</div>
                 </div>
                 <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              </a>
           </div>
        </div> */}

      </div>
    </div>
  );
}