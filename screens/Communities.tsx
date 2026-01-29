
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_COMMUNITIES } from '../constants';
import { Community } from '../types';

const Communities: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase text-glow">Community Hub</h1>
          <p className="text-zinc-500 font-medium tracking-wide">Explore and join the top Solana-powered movements.</p>
        </div>
        <Link to="/create-community" className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-xl font-bold hover:brightness-110 shadow-lg shadow-primary/20 transition-all">
          <span className="material-symbols-outlined">add</span>
          New Hub
        </Link>
      </header>

      <section className="mb-12">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-2">
          <span className="w-8 h-px bg-primary" />
          Protocol Featured
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_COMMUNITIES.map(comm => (
            <CommunityCard key={comm.id} comm={comm} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            Recently Created
          </h3>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-tighter text-glow">Live Discovery</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <ListHub 
            name="$MOONCAT Alpha" 
            time="2m ago" 
            desc="The first feline-focused alpha group on Solana. Low supply, high energy."
            members="142"
          />
          <ListHub 
            name="Solana Degens VIP" 
            time="15m ago" 
            desc="Exclusive signals and early access to new token pairs before they trend."
            members="89"
          />
        </div>
      </section>
    </div>
  );
};

const CommunityCard: React.FC<{ comm: Community }> = ({ comm }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/community/${comm.id}`)}
      className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/40 transition-all cursor-pointer shadow-xl"
    >
      <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${comm.banner})` }} />
      <div className="p-6 -mt-10 relative z-10">
        <div className="flex items-end justify-between mb-4">
          <img src={comm.avatar} className="size-20 rounded-2xl border-4 border-zinc-900 object-cover shadow-2xl" alt="Avatar" />
          <button 
            onClick={(e) => { e.stopPropagation(); /* Join logic */ }}
            className="bg-white text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-primary transition-all"
          >
            Join
          </button>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{comm.name}</h4>
          {comm.isVerified && <span className="material-symbols-outlined text-primary text-lg fill-1">verified</span>}
        </div>
        <p className="text-zinc-500 text-sm font-medium mb-4 line-clamp-1">{comm.description}</p>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <span>{comm.members} Members</span>
          <span className="text-primary text-glow">{comm.online} Online</span>
        </div>
      </div>
    </div>
  );
};

const ListHub = ({ name, time, desc, members }: any) => (
  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center gap-6 group cursor-pointer shadow-lg">
    <div className="size-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-primary text-3xl">hub</span>
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-1">
        <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{name}</h4>
        <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] text-white/40 rounded uppercase font-bold">{time}</span>
      </div>
      <p className="text-zinc-500 text-sm font-medium">{desc}</p>
    </div>
    <div className="text-left md:text-right shrink-0">
      <p className="text-primary font-bold text-lg text-glow">{members}</p>
      <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest">Holders</p>
    </div>
  </div>
);

export default Communities;
