
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_USER, getUserByHandle, MOCK_CALLS, OTHER_MOCK_USERS } from '../constants';
import { AlphaCall } from '../types';

const Profile: React.FC = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Calls');
  
  const profileHandle = handle || MOCK_USER.handle;
  const user = getUserByHandle(profileHandle);
  const isOwnProfile = profileHandle === MOCK_USER.handle;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [handle]);

  return (
    <div className="flex bg-black min-h-screen font-display">
      <div className="flex-1 border-x border-white/5 pb-20 max-w-4xl">
        {/* Banner Area */}
        <div className="relative h-64 w-full bg-[#0a1a12]">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-black/80" />
          <div className="absolute -bottom-16 left-8">
            <div className="p-1 bg-black rounded-full border-[6px] border-black shadow-2xl">
              <div className="size-32 bg-[#0d2a24] rounded-full flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary text-5xl">navigation</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 right-8">
            {isOwnProfile ? (
              <button className="px-6 py-2 border border-primary text-primary rounded-lg font-bold text-sm hover:bg-primary/10 transition-all">
                Edit Profile
              </button>
            ) : (
              <button className="px-6 py-2 bg-primary text-black rounded-lg font-bold text-sm hover:brightness-110 transition-all">
                Follow
              </button>
            )}
          </div>
        </div>

        {/* User Details */}
        <div className="mt-20 px-8">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-white">{user.name}</h1>
            {user.isVerified && <span className="material-symbols-outlined text-primary text-xl fill-1">verified</span>}
          </div>
          <p className="text-zinc-500 font-bold text-sm mt-0.5">@{user.handle}</p>
          
          <p className="mt-6 text-[15px] leading-relaxed text-zinc-300 max-w-2xl font-medium">
            {user.bio}
          </p>

          <div className="mt-4 flex gap-6 text-sm">
            <div className="flex items-center gap-1.5 text-zinc-500">
              <span className="material-symbols-outlined text-base">calendar_today</span>
              <span>Joined January 2024</span>
            </div>
            <a href="#" className="flex items-center gap-1.5 text-primary font-bold hover:underline">
              <span className="material-symbols-outlined text-base">link</span>
              cryptowhale.sol
            </a>
          </div>

          {/* Stats Grid - Screenshot Match */}
          <div className="mt-10 grid grid-cols-4 gap-4">
            <StatCard label="POSTS" value="1.2k" />
            <StatCard label="FOLLOWERS" value="45k" />
            <StatCard label="FOLLOWING" value="890" />
            <StatCard label="WIN RATE" value="68%" highlight />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-12 border-b border-white/5 flex gap-8 px-8">
          {['Posts', 'Replies', 'Media', 'Likes', 'Calls'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full shadow-[0_0_8px_#13ec6d]" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'Calls' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white">Live & Past Calls</h2>
                <button className="size-10 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white transition-all">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
              
              {MOCK_CALLS.map(call => (
                <CallCard key={call.id} call={call} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-zinc-600 font-bold">
              Nothing to see here yet.
            </div>
          )}
        </div>
      </div>

      {/* Profile-Specific Right Sidebar */}
      <aside className="w-80 hidden lg:flex flex-col gap-6 p-6">
        <div className="bg-[#050505] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
             <span className="material-symbols-outlined text-primary text-xl">bolt</span>
             <h3 className="text-lg font-black text-white tracking-tight">Trending Alpha</h3>
          </div>
          <div className="space-y-6">
            <TrendItem rank={1} symbol="$SOLANA" change="+12.4%" isPositive />
            <TrendItem rank={2} symbol="$JUP" change="+5.2%" isPositive />
            <TrendItem rank={3} symbol="$WAVE" change="+89.1%" isPositive isMeme />
          </div>
          <button className="w-full mt-8 text-primary text-xs font-black uppercase tracking-widest hover:bg-primary/5 py-2 rounded-lg transition-all text-center">
            Show More
          </button>
        </div>

        <div className="bg-[#050505] border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-black text-white mb-6">Who to follow</h3>
          <div className="space-y-6">
            {OTHER_MOCK_USERS.map(other => (
              <div key={other.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={other.avatar} className="size-10 rounded-full border border-white/10" alt="" />
                  <div>
                    <p className="text-sm font-black text-white">{other.name}</p>
                    <p className="text-[10px] text-zinc-500">@{other.handle}</p>
                  </div>
                </div>
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase hover:brightness-110 transition-all">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-zinc-600 font-bold uppercase tracking-wider">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Accessibility</a>
          <a href="#">Ads Info</a>
          <span className="w-full">© 2024 WAVE Social</span>
        </div>
      </aside>
    </div>
  );
};

const StatCard = ({ label, value, highlight }: any) => (
  <div className={`p-6 rounded-2xl border transition-all ${highlight ? 'bg-primary/5 border-primary/20 relative overflow-hidden' : 'bg-[#050505] border-white/5'}`}>
    {highlight && <div className="absolute top-4 right-4 text-primary opacity-40"><span className="material-symbols-outlined text-sm">trending_up</span></div>}
    <p className="text-2xl font-black text-white">{value}</p>
    <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${highlight ? 'text-primary' : 'text-zinc-500'}`}>{label}</p>
  </div>
);

// Added React.FC to allow standard React props like 'key'
const CallCard: React.FC<{ call: AlphaCall }> = ({ call }) => (
  <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-white/10 transition-all">
    <div className="flex items-center gap-5">
      <div className="size-16 rounded-2xl bg-[#0d0d0d] flex items-center justify-center border border-white/5 shadow-inner">
        <span className="text-primary font-black text-sm">{call.tokenName}</span>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-xl font-black text-white">{call.token}</h4>
          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${call.status === 'HIT' ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'}`}>
            {call.status}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-zinc-500">
          <span>Entry: <span className="text-zinc-300">{call.entry}</span></span>
          {call.target && <span>•</span>}
          {call.target && <span>Target: <span className="text-zinc-300">{call.target}</span></span>}
        </div>
      </div>
    </div>
    
    <div className="flex items-center gap-10">
      <div className="text-right">
        <p className={`text-2xl font-black tracking-tighter ${call.status === 'HIT' ? 'text-primary' : 'text-red-500'}`}>
          {call.roi}
        </p>
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Current ROI</p>
      </div>
      <button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 border border-white/5 rounded-xl font-black text-xs text-white hover:bg-zinc-800 transition-all shadow-xl">
        <span className="material-symbols-outlined text-base">share</span>
        Share Call
      </button>
    </div>
  </div>
);

const TrendItem = ({ rank, symbol, change, isPositive, isMeme }: any) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-4">
      <span className="text-[11px] font-black text-zinc-700">{rank} • {isMeme ? 'MEME' : 'TRENDING'}</span>
    </div>
    <div className="text-right">
      <p className="text-sm font-black text-white group-hover:text-primary transition-colors">{symbol}</p>
    </div>
    <div className={`text-[11px] font-black ${isPositive ? 'text-primary' : 'text-red-500'}`}>
      {change}
    </div>
  </div>
);

export default Profile;
