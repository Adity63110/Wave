
import React, { useState } from 'react';
import { useWallet } from '../App';

const SetupProfile: React.FC = () => {
  const { walletAddress, completeProfile } = useWallet();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <div className="w-full max-w-md space-y-12">
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="size-32 rounded-full border-2 border-dashed border-primary flex flex-col items-center justify-center text-primary group-hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-4xl mb-1">add_a_photo</span>
            </div>
            <div className="absolute bottom-1 right-1 bg-primary text-black size-8 rounded-full flex items-center justify-center border-4 border-black">
              <span className="material-symbols-outlined text-lg font-bold">edit</span>
            </div>
          </div>
          <p className="mt-4 text-primary text-[10px] font-black uppercase tracking-[0.2em]">Upload Avatar</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex items-center gap-3">
             <span className="material-symbols-outlined text-primary text-xl">account_balance_wallet</span>
             <span className="text-primary/80 font-mono text-sm">Connected: {walletAddress}</span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-primary font-bold">@</span>
              </div>
              <input 
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-10 pr-4 text-white font-medium focus:ring-1 focus:ring-primary focus:bg-white/[0.05] outline-none transition-all placeholder:text-zinc-600" 
                placeholder="degen_king"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-zinc-400">Bio</label>
              <span className="text-[10px] text-zinc-600 font-bold">{bio.length}/160</span>
            </div>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
              rows={4}
              className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-white font-medium focus:ring-1 focus:ring-primary focus:bg-white/[0.05] outline-none transition-all resize-none placeholder:text-zinc-600" 
              placeholder="What's your story?"
            />
          </div>
        </div>

        <button 
          onClick={completeProfile}
          disabled={!username}
          className="w-full bg-primary text-black py-4 rounded-xl font-black text-lg hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(19,236,109,0.3)] disabled:opacity-50"
        >
          Start Riding the Wave
        </button>
      </div>
    </div>
  );
};

export default SetupProfile;
