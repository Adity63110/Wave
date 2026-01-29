
import React, { useState } from 'react';

const CreateCommunity: React.FC = () => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'token' | 'general' | null>(null);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 w-full">
      <div className="max-w-[600px] w-full bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col gap-3 p-8 border-b border-white/5">
          <div className="flex gap-6 justify-between items-end">
            <p className="text-white text-lg font-bold">Create Community</p>
            <p className="text-primary text-sm font-medium">Step {step} of 3</p>
          </div>
          <div className="rounded-full bg-white/10 h-1.5 w-full">
            <div className="h-1.5 rounded-full bg-primary transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        {step === 1 && (
          <div className="p-8">
            <h2 className="text-3xl font-black mb-2">Select Hub Type</h2>
            <p className="text-zinc-500 mb-8 font-medium">Choose the style of community you want to lead.</p>
            <div className="grid grid-cols-1 gap-4">
              <TypeCard 
                icon="monetization_on" 
                title="Token-Based Hub" 
                desc="Gated by a Solana Mint address. Features live charts and price bots." 
                active={type === 'token'}
                onClick={() => setType('token')}
                recommended
              />
              <TypeCard 
                icon="groups" 
                title="General Social Club" 
                desc="Focused on discussion, news, and hanging out. No token gating required." 
                active={type === 'general'}
                onClick={() => setType('general')}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-black">Identify Hub</h2>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-zinc-400 uppercase tracking-widest">Community Name</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Solana Chasers" />
              <label className="block text-sm font-bold text-zinc-400 uppercase tracking-widest">Bio / Mission</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-1 focus:ring-primary outline-none resize-none" placeholder="What is this wave about?" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-8 text-center space-y-6">
            <div className="size-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/30">
              <span className="material-symbols-outlined text-primary text-4xl">rocket_launch</span>
            </div>
            <h2 className="text-3xl font-black">Ready for Launch?</h2>
            <p className="text-zinc-500 leading-relaxed font-medium">Review your settings. Once created, your community will be discoverable on the main WAVE protocol hub.</p>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-left">
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Visibility</p>
              <p className="text-white font-bold">Public Hub (Standard)</p>
            </div>
          </div>
        )}

        <div className="px-8 py-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
          <button onClick={prevStep} disabled={step === 1} className="text-white/40 hover:text-white font-bold transition-all disabled:opacity-0">Back</button>
          <button 
            onClick={step === 3 ? () => alert('Community Initialized!') : nextStep} 
            disabled={step === 1 && !type}
            className="px-8 py-3 bg-primary text-black font-black rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
          >
            {step === 3 ? 'Initialize Wave' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

const TypeCard = ({ icon, title, desc, active, onClick, recommended }: any) => (
  <div 
    onClick={onClick}
    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all relative ${active ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(19,236,109,0.1)]' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}
  >
    {recommended && <span className="absolute -top-3 right-4 bg-primary text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Best for Alpha</span>}
    <div className="flex gap-4">
      <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${active ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}>
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
        <p className="text-sm text-zinc-500 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

export default CreateCommunity;
