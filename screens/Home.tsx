
import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import RightAside from '../components/RightAside';
import { MOCK_POSTS, MOCK_USER } from '../constants';
import { useWallet } from '../App';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('for-you');
  const { walletAddress, connect, isConnecting } = useWallet();

  return (
    <div className="flex gap-0 max-w-[1200px] mx-auto w-full">
      <div className="flex-1 min-w-0 border-x border-white/10 min-h-screen">
        <header className="sticky top-0 z-10 bg-black border-b border-white/5">
          <div className="flex h-14">
            <button 
              onClick={() => setActiveTab('for-you')}
              className={`flex-1 flex flex-col items-center justify-center relative transition-colors ${activeTab === 'for-you' ? 'text-white' : 'text-zinc-500 hover:bg-white/5'}`}
            >
              <span className="text-sm font-bold">For You</span>
              {activeTab === 'for-you' && <div className="absolute bottom-0 w-16 h-1 bg-primary rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('following')}
              className={`flex-1 flex flex-col items-center justify-center transition-colors ${activeTab === 'following' ? 'text-white' : 'text-zinc-500 hover:bg-white/5'}`}
            >
              <span className="text-sm font-bold">Following</span>
              {activeTab === 'following' && <div className="absolute bottom-0 w-16 h-1 bg-primary rounded-full hidden" />}
            </button>
          </div>
        </header>

        {/* Conditional Content: Connection Prompt */}
        {!walletAddress ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 border-b border-white/5">
             <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <div className="size-12 bg-white/5 rounded-full flex items-center justify-center">
                   <span className="material-symbols-outlined text-primary text-3xl">waves</span>
                </div>
             </div>
             <h2 className="text-2xl font-black mb-3">Ride the wave</h2>
             <p className="text-zinc-500 text-center text-[15px] leading-relaxed max-w-sm mb-8">
               Connect your Solana wallet to start riding the wave, posting, and interacting with the community.
             </p>
             <button 
               onClick={connect}
               disabled={isConnecting}
               className="bg-primary text-black px-12 py-3.5 rounded-full font-black text-[15px] shadow-[0_0_30px_rgba(19,236,109,0.4)] hover:scale-105 active:scale-95 transition-all"
             >
               {isConnecting ? 'Connecting...' : 'Connect Wallet'}
             </button>
          </div>
        ) : (
          <div className="p-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex gap-4">
              <img src={MOCK_USER.avatar} className="size-11 rounded-full object-cover border border-white/10" alt="Avatar" />
              <div className="flex-1">
                <textarea 
                  className="w-full bg-transparent border-none focus:ring-0 text-xl placeholder:text-zinc-700 resize-none pt-2 text-white" 
                  placeholder="What's happening?" 
                  rows={2}
                />
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
                  <div className="flex gap-2 text-primary">
                    <IconButton icon="image" />
                    <IconButton icon="gif_box" />
                    <IconButton icon="poll" />
                    <IconButton icon="sentiment_satisfied" />
                  </div>
                  <button className="bg-primary text-black px-6 py-1.5 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                    Wave
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col">
          {MOCK_POSTS.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <RightAside />
    </div>
  );
};

const IconButton = ({ icon }: { icon: string }) => (
  <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
    <span className="material-symbols-outlined text-[22px]">{icon}</span>
  </button>
);

export default Home;
