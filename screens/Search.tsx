
import React, { useState } from 'react';

const Search: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tokens');

  return (
    <div className="flex gap-0 max-w-[1200px] mx-auto w-full">
      <div className="flex-1 min-w-0 border-x border-white/10 min-h-screen pb-24 relative">
        <header className="sticky top-0 z-10 bg-black pt-6 px-8 border-b border-white/5">
          <div className="relative mb-6">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">search</span>
            <input 
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[15px] placeholder:text-zinc-600 text-white outline-none focus:ring-1 focus:ring-primary/20" 
              placeholder="Tokens" 
              type="text" 
            />
          </div>

          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {['All', 'Users', 'Posts', 'Tokens', 'Communities'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[15px] font-bold transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-primary' : 'text-zinc-500 hover:text-white'}`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />}
              </button>
            ))}
          </div>
        </header>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              <h2 className="text-xl font-black">Trending Solana Tokens</h2>
            </div>
            <div className="flex bg-white/[0.03] border border-white/5 rounded-lg p-1">
              <button className="px-4 py-1.5 text-[11px] font-black bg-primary text-black rounded-md">24H</button>
              <button className="px-4 py-1.5 text-[11px] font-black text-zinc-500 hover:text-white">7D</button>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="text-[10px] text-zinc-600 font-black uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Token</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">24H Change</th>
                  <th className="px-6 py-4">Market Cap</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <TokenRow symbol="WIF" name="dogwifhat" price="$2.34" change="+12.54%" mcap="$2.34B" isPositive />
                <TokenRow symbol="BONK" name="Bonk" price="$0.000021" change="-4.21%" mcap="$1.42B" isPositive={false} />
                <TokenRow symbol="POPCAT" name="Popcat" price="$0.452" change="+25.80%" mcap="$450.2M" isPositive />
                <TokenRow symbol="MEW" name="cat in a dogs world" price="$0.0032" change="+1.24%" mcap="$320.1M" isPositive />
                <TokenRow symbol="JUP" name="Jupiter" price="$1.08" change="-0.85%" mcap="$1.46B" isPositive={false} />
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating Quick Swap Button */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 ml-36 z-30">
          <button className="bg-primary text-black px-8 py-4 rounded-full font-black text-[15px] flex items-center gap-3 shadow-[0_10px_40px_rgba(19,236,109,0.5)] hover:scale-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
            Quick Swap
          </button>
        </div>
      </div>

      <SearchAside />
    </div>
  );
};

const TokenRow = ({ symbol, name, price, change, mcap, isPositive }: any) => (
  <tr className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
    <td className="px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="size-10 bg-zinc-800 rounded-full flex items-center justify-center font-black text-[10px] text-primary border border-white/5 overflow-hidden">
           <div className="size-full bg-cover" style={{backgroundImage: `url(https://picsum.photos/seed/${symbol}/100)`}}></div>
        </div>
        <div>
          <p className="font-black text-white text-[15px]">${symbol}</p>
          <p className="text-[11px] text-zinc-500 font-medium">{name}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-5 font-bold text-white">{price}</td>
    <td className="px-6 py-5">
      <span className={`px-2 py-1 rounded-md text-[11px] font-black ${isPositive ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
        {change}
      </span>
    </td>
    <td className="px-6 py-5 font-bold text-zinc-400">{mcap}</td>
    <td className="px-6 py-5 text-right">
      <button className="text-primary text-sm font-black hover:underline">Trade</button>
    </td>
  </tr>
);

const SearchAside = () => (
  <aside className="w-80 hidden lg:flex flex-col gap-8 sticky top-0 h-screen py-8 px-6 shrink-0">
    <div>
      <h3 className="text-xl font-black mb-6">Trending Communities</h3>
      <div className="space-y-4">
        <CommunityCard label="MEME MAGIC" name="Solana Summer 2024" members="12.4k" online="842" />
        <CommunityCard label="TRADING" name="Degen Alpha Calls" members="45.2k" online="3.1k" />
        <CommunityCard label="DEV" name="Anchor Framework Tips" members="8.9k" online="152" />
      </div>
    </div>

    <div className="mt-auto space-y-4">
       <div className="flex flex-wrap gap-4 text-[10px] text-zinc-600 font-black uppercase tracking-widest">
         <a href="#">About</a>
         <a href="#">Privacy</a>
         <a href="#">Terms</a>
         <a href="#">Cookies</a>
       </div>
       <p className="text-[10px] text-zinc-700 font-black uppercase tracking-widest">© 2024 WAVE</p>
    </div>
  </aside>
);

const CommunityCard = ({ label, name, members, online }: any) => (
  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-all cursor-pointer group">
    <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1 group-hover:text-white transition-colors">{label}</p>
    <h4 className="font-black text-white mb-2">{name}</h4>
    <p className="text-[11px] text-zinc-600 font-medium">
      {members} members • <span className="text-zinc-500">{online} online</span>
    </p>
  </div>
);

export default Search;
