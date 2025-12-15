import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { bentoCard } from "../../lib/helper";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Your GitHub Username
  const GITHUB_USERNAME = "M3galodn81";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    // Added dark mode gradients to match the theme toggle
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 p-8 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="max-w-5xl w-full mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">My Work</h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Recent repositories from <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">@{GITHUB_USERNAME}</a>
          </p>
        </div>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline mb-2">
          &larr; Back Home
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-5xl w-full flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-5xl w-full p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-2xl border border-red-200 dark:border-red-800 text-center">
          <p>Unable to load projects: {error}</p>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
          {repos.map((repo) => (
            <a 
              key={repo.id} 
              href={repo.html_url}
              target="_blank" 
              rel="noopener noreferrer"
              className={`${bentoCard} flex flex-col h-full group relative`}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {repo.name}
                </h2>
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm bg-white/50 dark:bg-black/20 px-2 py-1 rounded-full">
                  <span className="text-yellow-500">★</span>
                  <span>{repo.stargazers_count}</span>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow line-clamp-3 leading-relaxed">
                {repo.description || "No description provided."}
              </p>
              
              <div className="flex justify-between items-center mt-auto border-t border-slate-100 dark:border-white/10 pt-4">
                <div className="flex flex-wrap gap-2">
                  {repo.language ? (
                    <span className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-md text-sm text-indigo-600 dark:text-indigo-300 font-medium border border-indigo-100 dark:border-indigo-800/50">
                      {repo.language}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No language detected</span>
                  )}
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}