
import { Link } from 'react-router-dom';
import { uiBackground, bentoCard } from '../lib/helper';

const NotFound = () => {
  return (
    <div className={`min-h-screen w-screen flex flex-col items-center justify-center ${uiBackground} p-6 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
      <div className={`${bentoCard} max-w-md w-full text-center py-16 px-8 flex flex-col items-center`}>
        
        {/* Large 404 Text */}
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600 mb-2">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        {/* Home Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;