
import React, { useState } from 'react';
import RightAside from '../components/RightAside';

const Explore: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pump');

  return (
    <div className="flex gap-0 max-w-[1200px] mx-auto w-full">
      <div className="flex-1 min-w-0 border-x border-white/10 min-h-screen p-8">
        <header className="mb-10">
          <h1 className="text-4xl font-black mb-6 tracking-tight">Explore</h1>
          <div className="flex items-center gap-6 border-b border-white/10 mb-8 overflow-x-auto no-scrollbar">
            <Tab label="Pump Feed" active={activeTab === 'pump'} onClick={() => setActiveTab('pump')} />
            <Tab label="Top Gainers" active={activeTab === 'top'} onClick={() => setActiveTab('top')} />
            <Tab label="New Pairs" active={activeTab === 'new'} onClick={() => setActiveTab('new')} />
            <Tab label="Signals" active={activeTab === 'signals'} onClick={() => setActiveTab('signals')} />
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl">
                <button className="px-5 py-1.5 text-xs font-black bg-white text-black rounded-lg">1h</button>
                <button className="px-5 py-1.5 text-xs font-black text-slate-500 hover:text-white">6h</button>
                <button className="px-5 py-1.5 text-xs font-black text-slate-500 hover:text-white">24h</button>
              </div>
              <FilterButton label="Vol > $500k" />
              <FilterButton label="MCap > $5M" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-sm">settings_input_component</span>
              Filters
            </button>
          </div>
        </header>

        <div className="flex flex-col gap-6">
          <ExploreCard 
            author="@SolanaWhale" 
            time="5m ago" 
            verified 
            content="$WAVE is breaking out of the ascending triangle! 🚀 Massive volume coming in on the 1h chart. Looks like a new ATH is imminent. Don't miss the pump!"
            tokenName="WAVE"
            tokenSymbol="WAVE"
            price="$0.004582"
            change="+12.5%"
            volume="$2.4M"
          />
          <ExploreCard 
            author="@PumpTracker" 
            time="12m ago" 
            content="$PUMP is absolutely parabolic! Volume profile is insane. Expecting more upside as liquidity migrates from older pairs. 🔥🔥"
            tokenName="PUMP Token"
            tokenSymbol="$PUMP"
            price="$0.1245"
            change="+45.2%"
            volume="$12.8M"
            isDanger
          />
        </div>
      </div>
      <RightAside />
    </div>
  );
};

const Tab = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`pb-4 px-2 text-sm font-black transition-all whitespace-nowrap ${active ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
  >
    {label}
  </button>
);

const FilterButton = ({ label }: { label: string }) => (
  <button className="px-4 py-2 text-xs font-black bg-white/5 border border-white/10 text-slate-300 rounded-xl flex items-center gap-2 hover:border-white/30 transition-all">
    {label}
    <span className="material-symbols-outlined text-sm">expand_more</span>
  </button>
);

const ExploreCard = ({ author, time, content, verified, tokenName, tokenSymbol, price, change, volume, isDanger }: any) => (
  <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all">
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="size-11 rounded-xl bg-white/5 bg-cover bg-center grayscale hover:grayscale-0 transition-all cursor-pointer" style={{ backgroundImage: `url(https://picsum.photos/seed/${author}/200)` }}></div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-black text-sm tracking-tight">{author}</p>
              {verified && <span className="material-symbols-outlined text-primary text-[14px] fill-1">verified</span>}
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Alpha Caller • {time}</p>
          </div>
        </div>
        <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined">more_horiz</span></button>
      </div>
      <p className="text-slate-200 text-lg mb-8 leading-relaxed">{content}</p>
      <div className={`bg-white/5 border-2 ${isDanger ? 'border-red-500/40' : 'border-primary/40'} rounded-2xl p-6 relative overflow-hidden group`}>
        <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
          <div className="flex items-center gap-5 flex-1">
            <div className="size-16 rounded-2xl bg-black flex items-center justify-center border border-white/10 shadow-lg">
              <span className={`material-symbols-outlined ${isDanger ? 'text-red-500' : 'text-primary'} text-4xl`}>{isDanger ? 'bolt' : 'waves'}</span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-black">{tokenName}</h3>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">{tokenSymbol}</span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-2xl font-black tracking-tighter text-white">{price}</span>
                <span className={`${isDanger ? 'bg-red-500' : 'bg-primary'} text-black px-2 py-0.5 rounded text-[11px] font-black`}>{change}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 border-l border-white/10 pl-8">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Vol 24h</p>
              <p className="text-base font-black text-white">{volume}</p>
            </div>
            <button className={`${isDanger ? 'bg-red-500' : 'bg-primary'} text-black px-8 py-3 rounded-xl font-black text-sm shadow-xl transition-transform active:scale-95`}>
              BUY
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8 mt-8 border-t border-white/5 pt-6 text-slate-500">
        <button className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-2xl">local_fire_department</span><span className="text-xs font-black">1.2k</span></button>
        <button className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-2xl">rocket_launch</span><span className="text-xs font-black">894</span></button>
        <button className="flex items-center gap-2 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-2xl">favorite</span><span className="text-xs font-black">452</span></button>
      </div>
    </div>
  </div>
);

export default Explore;
