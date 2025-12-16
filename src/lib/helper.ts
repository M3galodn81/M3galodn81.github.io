// 1. The Glass Background & Blur
// Light: White glass | Dark: Darker black glass
export const uiGlass = "bg-white/15 dark:bg-black/40 backdrop-blur-[20px]";

// 2. The Border & Radius
// Light: White border | Dark: Faint white border
export const uiBorder = "rounded-[20px] border border-white/30 dark:border-white/10";

// 3. The Complex Shadow
// Adjusted shadows for dark mode to be more subtle but visible
export const uiShadow = "shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_10px_5px_rgba(255,255,255,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.05),inset_0_0_10px_5px_rgba(255,255,255,0.05)]";

// 4. The Edge Highlights
// Pseudo-elements need specific dark mode overrides for gradients
export const uiHighlights = `
  relative overflow-hidden
  before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px]
  before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent
  dark:before:via-white/20
  after:content-[''] after:absolute after:top-0 after:left-0 after:w-[1px] after:h-full
  after:bg-gradient-to-b after:from-white/80 after:via-transparent after:to-white/30
  dark:after:from-white/20 dark:after:to-white/5
`;

// 5. The Main Bento Card Class
export const bentoCard = `
  ${uiGlass}
  ${uiBorder}
  ${uiShadow}
  ${uiHighlights}
  p-6
  transition-all
  duration-300
  hover:-translate-y-1
  hover:shadow-[0_16px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(255,255,255,0.2),inset_0_0_10px_5px_rgba(255,255,255,0.2)]
  dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_10px_5px_rgba(255,255,255,0.1)]
`;


export const uiBackground = "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 transition-colors duration-300";


// Container for list items (VLANs, Interfaces)
export const configRowBase = "flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-end bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 transition-colors";

// Standard input styles for the config forms
export const configInput = "bg-white/50 dark:bg-black/20 h-9";

// Small input for tables (ID, VLAN numbers)
export const configInputSmall = "h-8 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800";