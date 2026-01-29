
import React from 'react';
import PostCard from '../components/PostCard';
import { MOCK_POSTS } from '../constants';

const Bookmarks: React.FC = () => {
  return (
    <div className="flex max-w-[1200px] mx-auto w-full">
      <div className="flex-1 border-x border-white/10 min-h-screen">
        <header className="p-8 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-3xl font-black tracking-tight mb-2">Your Bookmarks</h2>
          <p className="text-zinc-500 font-medium mb-6">Organize and track your Solana alpha.</p>
          <div className="relative mb-6">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">search</span>
            <input className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Search your saved posts..." />
          </div>
          <div className="flex gap-8">
            <button className="text-primary font-bold border-b-2 border-primary pb-1">All</button>
            <button className="text-zinc-500 font-bold hover:text-white transition-colors">Alpha</button>
            <button className="text-zinc-500 font-bold hover:text-white transition-colors">Charts</button>
            <button className="text-zinc-500 font-bold hover:text-white transition-colors">Memes</button>
          </div>
        </header>
        <div className="flex flex-col">
          {MOCK_POSTS.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
      
      <aside className="w-80 hidden xl:flex flex-col p-8 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold uppercase tracking-tight">Folders</h3>
            <button className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors">
              <span className="material-symbols-outlined">create_new_folder</span>
            </button>
          </div>
          <div className="space-y-1">
            <FolderItem icon="folder" label="All Bookmarks" count={244} active />
            <FolderItem icon="rocket_launch" label="Alpha Calls" count={56} />
            <FolderItem icon="mood" label="Memes" count={128} />
            <FolderItem icon="account_balance" label="DeFi / SOL" count={32} />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-xs text-zinc-500 font-black uppercase tracking-[0.2em] mb-4">Trending Tags</p>
          <div className="space-y-4">
            <TrendingTag name="#SolanaSummer" count="12.5k" />
            <TrendingTag name="$WIF Ecosystem" count="14.2k" />
            <TrendingTag name="Jupiter Perps" count="2.1k" />
          </div>
        </div>
      </aside>
    </div>
  );
};

const FolderItem = ({ icon, label, count, active }: any) => (
  <button className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-primary/10 text-primary' : 'hover:bg-white/5 text-zinc-400 hover:text-white'}`}>
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-lg">{icon}</span>
      <span className="font-bold">{label}</span>
    </div>
    <span className="text-[10px] bg-black px-2 py-0.5 rounded border border-white/5 font-black">{count}</span>
  </button>
);

const TrendingTag = ({ name, count }: any) => (
  <div className="group cursor-pointer">
    <p className="text-white font-bold group-hover:text-primary transition-colors">{name}</p>
    <p className="text-xs text-zinc-600 font-medium">{count} waves today</p>
  </div>
);

export default Bookmarks;
