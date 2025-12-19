import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { uiBackground, uiGlass, uiBorder, uiShadow } from '../../lib/helper';
import MarkdownRenderer from '../../components/Markdown/MarkdownRenderer';

// Load files lazily
const markdownFiles = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default' });

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<{ metadata: any, content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const path = `/src/posts/${slug}.md`;

    const loadPost = async () => {
      if (markdownFiles[path]) {
        try {
            const raw = await markdownFiles[path]() as string;
            
            // Parse Frontmatter manually
            const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
            
            if (match) {
                const metaBlock = match[1];
                const contentBody = match[2];
                
                const metadata: any = {};
                metaBlock.split('\n').forEach(line => {
                    const [key, ...v] = line.split(':');
                    if(key) {
                        let val = v.join(':').trim();
                        if (val.startsWith('"') || val.startsWith("'")) val = val.slice(1, -1);
                        metadata[key.trim()] = val;
                    }
                });

                setPost({ metadata, content: contentBody });
            } else {
                setPost({ metadata: { title: slug }, content: raw });
            }
        } catch (e) {
            console.error(e);
            setPost(null);
        }
      } else {
        setPost(null);
      }
      setLoading(false);
    };

    loadPost();
  }, [slug]);

  if (loading) return <div className={`min-h-screen w-screen flex items-center justify-center ${uiBackground} text-slate-500`}>Loading...</div>;
  if (!post) return <div className={`min-h-screen w-screen flex items-center justify-center ${uiBackground} text-slate-500`}>Post not found.</div>;

  return (
    <div className={`min-h-screen w-screen flex flex-col items-center ${uiBackground} p-4 md:p-8 transition-colors duration-300 animate-in fade-in duration-500`}>
      
      <div className="max-w-5xl w-full mb-8 flex justify-between items-end">
        <div className="max-w-[70%] md:max-w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2 break-words leading-tight">
            {post.metadata.title || 'Untitled Post'}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-lg">
            {post.metadata.author} • {post.metadata.date}
          </p>
        </div>
        <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline mb-2 shrink-0">
          &larr; Back 
        </Link>
      </div>

      <div className={`w-full max-w-5xl ${uiGlass} ${uiBorder} ${uiShadow} p-6 md:p-10 mb-8`}>
        
        {post.metadata.image && (
          <div className="relative mb-10 w-full overflow-hidden rounded-xl border border-white/20 shadow-md">
            <img 
              src={post.metadata.image} 
              alt={post.metadata.title} 
              className="w-full h-auto max-h-[500px] object-cover" 
            />
          </div>
        )}

        <div className="mx-auto">
          {/* Enhanced Prose Styles */}
          <article>
            <MarkdownRenderer content={post.content} />
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;