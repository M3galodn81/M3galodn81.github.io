import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { bentoCard } from "../../lib/helper";
import { AlertCircle, ExternalLink, Clock, Activity, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { sampleTracks, generalPermissions, type Track } from "../../lib/discography";

export default function Music() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  
  // SoundCloud Username
  const SC_USERNAME = "m3galodn81";

  useEffect(() => {
    const fetchTracks = async () => {
      await new Promise(resolve => setTimeout(resolve, 800)); // Fake network delay
      setTracks(sampleTracks);
      setLoading(false);
    };

    fetchTracks();
  }, []);

  // Group tracks by year
  const groupedTracks = useMemo(() => {
    const groups: Record<string, Track[]> = {};
    
    const sorted = [...tracks].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    sorted.forEach(track => {
      const year = new Date(track.created_at).getFullYear().toString();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(track);
    });

    return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [tracks]);

  // Helper to determine status and styles
  const getUsageStatus = (p: { use_in_videos: boolean, credit_required: boolean }) => {
    if (!p.use_in_videos) {
      return { 
        label: "No", 
        icon: <XCircle className="w-4 h-4" />,
        colorClass: "text-rose-600 dark:text-rose-400",
        rowClass: "bg-rose-50/50 dark:bg-rose-900/10 hover:bg-rose-100/50 dark:hover:bg-rose-900/20"
      };
    }
    if (p.credit_required) {
      return { 
        label: "Credit Req.", 
        icon: <AlertTriangle className="w-4 h-4" />,
        colorClass: "text-amber-600 dark:text-amber-400",
        rowClass: "bg-amber-50/50 dark:bg-amber-900/10 hover:bg-amber-100/50 dark:hover:bg-amber-900/20"
      };
    }
    return { 
      label: "Yes", 
      icon: <CheckCircle className="w-4 h-4" />,
      colorClass: "text-emerald-600 dark:text-emerald-400",
      rowClass: "bg-emerald-50/50 dark:bg-emerald-900/10 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20"
    };
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 p-8 transition-colors duration-300 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="max-w-5xl w-full mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">Discography</h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Latest uploads on <a href={`https://soundcloud.com/${SC_USERNAME}`} target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">SoundCloud</a>
          </p>
        </div>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline mb-2">
          &larr; Back Home
        </Link>
      </div>

      {/* Licensed Permission */}
      <div className="max-w-5xl w-full mb-8">
        <div className={`${bentoCard} bg-white/40 dark:bg-white/5`}>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-indigo-500" />
            Usage of Licensed/Commissioned Tracks
          </h2>
          <div>All of licensed/ commissioned works are not allowed to be used in other circumstances outside the terms and condition inside the license.
They may not be used in any other context without explicit permission.
Please contact both the rights holder and me to check if the work is allowed to used.
          </div>
        </div>
      </div>

      {/* General Permissions Section */}
      <div className="max-w-5xl w-full mb-8">
        <div className={`${bentoCard} bg-white/40 dark:bg-white/5`}>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-indigo-500" />
            General Usage Permissions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {generalPermissions.map((perm, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-white/50 dark:border-white/5">
                <div className="text-2xl mb-2">{perm.icon}</div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-1">{perm.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {perm.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-5xl w-full flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      )}

      {/* Tracks Table */}
      {!loading && (
        <div className="max-w-5xl w-full">
          <div className={`${bentoCard} overflow-hidden p-0`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400 border-collapse">
                <thead className="bg-slate-100/50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4 w-5/12">Title</th>
                    <th className="px-6 py-4">Genre</th>
                    <th className="px-6 py-4 text-center">BPM</th>
                    <th className="px-6 py-4 text-center">Duration</th>
                    <th className="px-6 py-4 text-right">Allowed Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {groupedTracks.map(([year, yearTracks]) => (
                    <>
                      {/* Year Row */}
                      <tr key={`year-${year}`} className="bg-white/80 dark:bg-white/5 backdrop-blur-sm">
                        <td colSpan={5} className="px-6 py-3 font-bold text-slate-800 dark:text-white text-lg border-b border-slate-100 dark:border-white/5">
                          {year}
                        </td>
                      </tr>
                      {/* Track Rows */}
                      {yearTracks.map((track) => {
                        const status = getUsageStatus(track.permissions);
                        return (
                          <tr 
                            key={track.id} 
                            onClick={() => window.open(track.url, '_blank')}
                            className={`${status.rowClass} transition-colors cursor-pointer group border-l-4 border-transparent hover:border-indigo-500/50`}
                          >
                            <td className="px-6 py-4">
                              <div className="font-medium text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                                {track.title}
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-500 truncate max-w-[300px]">
                                {track.description}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-white/10">
                                {track.genre}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center font-mono text-xs">
                              <div className="flex items-center justify-center gap-1 opacity-70">
                                  <Activity className="w-3 h-3" /> {track.bpm}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center font-mono text-xs">
                              <div className="flex items-center justify-center gap-1 opacity-70">
                                  <Clock className="w-3 h-3" /> {track.duration}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/80 dark:bg-black/30 shadow-sm ${status.colorClass}`}>
                                {status.icon} {status.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}