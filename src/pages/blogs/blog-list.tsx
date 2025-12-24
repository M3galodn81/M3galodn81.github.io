import { Link } from 'react-router-dom';
import { bentoCard, uiBackground } from '../../lib/helper';

// --- Helper to parse Frontmatter (Metadata) ---
const parseFrontmatter = (content: string) => {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  const metadata: Record<string, any> = {};
  
  if (match) {
    const lines = match[1].split('\n');
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        let value = valueParts.join(':').trim();
        // Remove quotes if present
        if (value.startsWith('"') || value.startsWith("'")) {
            value = value.slice(1, -1);
        }
        // Handle tags array specifically (e.g., [React, TS])
        if (key.trim() === 'tags') {
          metadata[key.trim()] = value.replace(/[\[\]]/g, '').split(',').map(t => t.trim());
        } else {
          metadata[key.trim()] = value;
        }
      }
    });
  }
  return metadata;
};

// 1. Load ALL markdown files eagerly to build the list
const modules = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default', eager: true });

// 2. Transform the raw file content into a posts array
const posts = Object.entries(modules).map(([path, content]) => {
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  const metadata = parseFrontmatter(content as string);
  
  return {
    slug,
    title: metadata.title || 'Untitled',
    excerpt: metadata.excerpt || '',
    date: metadata.date || '',
    author: metadata.author || 'Anonymous',
    image: metadata.image || '',
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by newest


const BlogList = () => {
  return (
    <div className={`min-h-screen w-screen flex flex-col ${uiBackground} font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-20 border-b border-indigo-100/50 dark:border-white/10 bg-white/10 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold tracking-tighter text-slate-800 dark:text-white">
            Posts
          </Link>
          <div className="hidden space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-12 w-full">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white sm:text-5xl">
            Latest Posts
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Thoughts on software engineering, cybersecurity, and building projects.
          </p>
        </div>

        {/* Grid of Posts */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className={`group flex flex-col ${bentoCard} !p-0`}
            >
              {/* Image */}
              <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-white/5">
                {post.image ? (
                    <img 
                    src={post.image} 
                    alt={post.title} 
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-300">No Image</div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 flex-wrap">
                  {post.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="mb-2 text-xl font-bold leading-tight text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                
                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer Meta */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <div>
                    <img src="/avatar.png" className="h-6 w-6 rounded-full bg-slate-200 dark:bg-white/20"/>
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogList;