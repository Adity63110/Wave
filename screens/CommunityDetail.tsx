
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COMMUNITIES, MOCK_POSTS, MOCK_USER } from '../constants';
import PostCard from '../components/PostCard';

const CommunityDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('FEED');

  // For demo, we default to WIF if not found
  const community = MOCK_COMMUNITIES.find(c => c.id === id) || MOCK_COMMUNITIES[1];

  return (
    <div className="flex gap-0 max-w-[1200px] mx-auto w-full">
      <div className="flex-1 min-w-0 border-x border-white/10 min-h-screen pb-20">
        {/* Banner Section */}
        <div className="relative h-64 w-full">
          <img 
            src={community.banner} 
            className="w-full h-full object-cover" 
            alt="Banner" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          {/* Avatar and Basic Info */}
          <div className="absolute -bottom-16 left-8 flex items-end gap-6">
            <div className="size-36 rounded-3xl bg-black p-1 border border-primary/20 shadow-[0_0_30px_rgba(19,236,109,0.3)]">
              <img src={community.avatar} className="w-full h-full rounded-2xl object-cover" alt="Avatar" />
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black text-white">{community.name}</h1>
                <span className="material-symbols-outlined text-primary text-xl fill-1">verified</span>
              </div>
              <p className="text-zinc-400 font-bold mb-2">@{community.handle}</p>
              <p className="text-sm text-zinc-300 font-medium italic mb-2 max-w-md">{community.description}</p>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest">
                <span className="text-white">{community.members} Members</span>
                <span className="text-primary flex items-center gap-1.5">
                  <span className="size-1.5 bg-primary rounded-full animate-pulse" />
                  {community.online} Online
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-8 flex gap-3">
             <button className="flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl font-bold text-sm hover:bg-white/20 transition-all">
               <span className="material-symbols-outlined text-lg">share</span> Share
             </button>
             <button className="px-8 py-2.5 bg-white text-black rounded-xl font-black text-sm hover:brightness-110 transition-all shadow-xl">
               Join Community
             </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-24 px-8 grid grid-cols-4 gap-4">
          <MarketStatCard label="PRICE USD" value="$2.45" change="+0.5%" isPositive />
          <MarketStatCard label="24H PERFORMANCE" value="+12.5%" icon="trending_up" isPositive />
          <MarketStatCard label="MARKET CAP" value="$2.4B" detail="CAP RANK #12" />
          <MarketStatCard label="24H VOLUME" value="$150.2M" change="-5.2%" isPositive={false} />
        </div>

        {/* Navigation & Feed */}
        <div className="mt-10">
          <div className="flex items-center justify-between px-8 border-b border-white/5 pb-2">
            <div className="flex gap-1 bg-white/[0.03] border border-white/5 p-1 rounded-2xl">
              {['FEED', 'ABOUT', 'MEMBERS', 'ANALYTICS'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2 rounded-xl text-[11px] font-black tracking-widest transition-all ${activeTab === tab ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative group">
               <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-sm">search</span>
               <input 
                 className="bg-white/[0.03] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs placeholder:text-zinc-600 outline-none w-64 focus:ring-1 focus:ring-primary/20" 
                 placeholder="Search tokens & communities..."
               />
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Community Composer */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
              <div className="flex gap-4">
                <img src={MOCK_USER.avatar} className="size-11 rounded-full object-cover" alt="" />
                <div className="flex-1">
                  <textarea 
                    className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder:text-zinc-600 resize-none pt-2 text-white" 
                    placeholder={`Post a wave to $${community.handle} community...`}
                    rows={2}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2 text-zinc-500">
                      <IconButton icon="image" />
                      <IconButton icon="gif_box" />
                      <IconButton icon="poll" />
                      <IconButton icon="sentiment_satisfied" />
                    </div>
                    <button className="bg-primary text-black px-8 py-2.5 rounded-xl font-black text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                      Post Wave
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {MOCK_POSTS.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="w-80 hidden lg:flex flex-col gap-8 sticky top-0 h-screen py-8 px-6 shrink-0 overflow-y-auto">
        <div>
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-6">ECOSYSTEM</h3>
          <div className="grid grid-cols-2 gap-3">
             <EcosystemLink icon="trending_up" label="DEXSCREENER" />
             <EcosystemLink icon="grid_view" label="SOLSCAN" />
             <EcosystemLink icon="chat_bubble" label="TWITTER" />
             <EcosystemLink icon="send" label="TELEGRAM" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">CONTRACT ADDRESS</h3>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white/[0.05] transition-all">
             <span className="text-[11px] font-mono text-zinc-400 truncate">EKp...77Lp</span>
             <span className="material-symbols-outlined text-sm text-primary">content_copy</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

const MarketStatCard = ({ label, value, change, icon, isPositive, detail }: any) => (
  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-all group">
    <div className="flex items-center justify-between mb-2">
      <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">{label}</p>
      {icon && <span className="material-symbols-outlined text-primary text-lg">{icon}</span>}
    </div>
    <div className="flex items-end gap-3">
      <h4 className="text-2xl font-black tracking-tighter text-white">{value}</h4>
      {change && (
        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${isPositive ? 'bg-primary/10 text-primary border-primary/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
          {change} {isPositive ? '↗' : '↘'}
        </span>
      )}
    </div>
    {detail && <p className="text-[10px] text-zinc-600 font-bold mt-1 uppercase tracking-tighter">{detail}</p>}
  </div>
);

const EcosystemLink = ({ icon, label }: any) => (
  <button className="flex flex-col items-center justify-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-primary/5 hover:border-primary/30 transition-all group">
    <span className="material-symbols-outlined text-primary text-xl mb-2 group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-[9px] font-black text-zinc-500 group-hover:text-white transition-colors">{label}</span>
  </button>
);

const IconButton = ({ icon }: { icon: string }) => (
  <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
    <span className="material-symbols-outlined text-[20px]">{icon}</span>
  </button>
);

export default CommunityDetail;
