
import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
const { useNavigate } = ReactRouterDom;

const RightAside: React.FC = () => {
  return (
    <aside className="w-80 hidden lg:flex flex-col gap-6 sticky top-0 h-screen py-4 overflow-y-auto px-4 shrink-0 font-display">
      <div className="relative group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">search</span>
        <input 
          className="w-full bg-white/[0.03] border border-white/10 rounded-full py-3 pl-12 pr-4 text-[15px] placeholder:text-zinc-600 text-white outline-none focus:ring-1 focus:ring-primary/30 transition-all focus:bg-white/[0.05]" 
          placeholder="Search WAVE" 
          type="text" 
        />
      </div>

      <div className="bg-[#050505] rounded-3xl border border-white/5 overflow-hidden">
        <h3 className="px-6 py-5 font-black text-xl tracking-tight text-white uppercase tracking-tighter">What's Trending</h3>
        <div className="flex flex-col">
          <TrendItem category="Trending in Solana" title="$WAVE" count="125K Posts" />
          <TrendItem category="Crypto • Trending" title="#BreakPoint2024" count="42.1K Posts" />
          <TrendItem category="NFT • Trending" title="Mad Lads" count="12.5K Posts" />
          <button className="px-6 py-4 text-primary text-sm font-black hover:bg-white/5 transition-all text-left">Show more</button>
        </div>
      </div>

      <div className="bg-[#050505] rounded-3xl border border-white/5 overflow-hidden">
        <h3 className="px-6 py-5 font-black text-xl tracking-tight text-white uppercase tracking-tighter">Who to follow</h3>
        <div className="px-6 flex flex-col gap-6 pb-6">
          <FollowItem name="toly.sol" handle="aeyakovenko" avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCkR7ElegqF7scESSSmgl7bqD6yfavqJLo5q42JstK7gcaqN6Bfz95LATHR90QBlNymc45Ky7b5p_dykPVID9PDe-grXj5hiv8A-CQ7rJTH-tVnZG_X3OUMdYvQsR55W3yLIF4gKIDJJVk30MUUG_faB8Y2JQ-1UIt1UMPCWUEkLbXRXOXp30GlrTownYhlQxa8TU-nazv7WErvtE6Fdz8WcXHelYSyksxV6ym84GiOJ36oiNHzgGunfqzb9AiSF-vFoby15T_LdL2a" />
          <FollowItem name="Solana Founda..." handle="solanafindn" avatar="https://picsum.photos/seed/solana/200" />
        </div>
      </div>

      <footer className="px-6 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-600 mt-2 font-bold uppercase tracking-widest">
        <a className="hover:underline" href="#">Terms of Service</a>
        <a className="hover:underline" href="#">Privacy Policy</a>
        <a className="hover:underline" href="#">Cookie Policy</a>
        <a className="hover:underline" href="#">Ads Info</a>
        <p className="w-full mt-2">© 2024 WAVE Corp.</p>
      </footer>
    </aside>
  );
};

const TrendItem = ({ category, title, count }: any) => (
  <div className="px-6 py-4 hover:bg-white/5 transition-all cursor-pointer group">
    <div className="flex items-center justify-between mb-0.5">
      <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-widest">{category}</p>
      <span className="material-symbols-outlined text-zinc-700 text-sm opacity-0 group-hover:opacity-100 transition-opacity">more_horiz</span>
    </div>
    <p className="font-black text-white text-[15px] mb-0.5">{title}</p>
    <p className="text-[11px] text-zinc-600 font-medium">{count}</p>
  </div>
);

const FollowItem = ({ name, handle, avatar }: any) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-3 group">
      <div 
        onClick={() => navigate(`/profile/${handle}`)}
        className="flex items-center gap-3 min-w-0 cursor-pointer"
      >
        <img src={avatar} className="size-11 rounded-full object-cover border border-white/10 group-hover:border-primary transition-all" alt={name} />
        <div className="min-w-0">
          <p className="text-[14px] font-black truncate text-white group-hover:text-primary transition-colors">{name}</p>
          <p className="text-[11px] text-zinc-500 truncate font-mono">@{handle}</p>
        </div>
      </div>
      <button className="bg-white text-black px-5 py-2 rounded-full text-xs font-black hover:brightness-110 active:scale-95 transition-all shrink-0">Follow</button>
    </div>
  );
};

export default RightAside;
