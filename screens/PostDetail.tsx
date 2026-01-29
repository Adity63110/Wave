
import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
const { useParams, useNavigate } = ReactRouterDom;
import { MOCK_POSTS, MOCK_USER } from '../constants';
import RightAside from '../components/RightAside';

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Dynamic post fetching based on URL param
  const post = MOCK_POSTS.find(p => p.id === id) || MOCK_POSTS[0];

  // Helper to format large numbers
  const formatNum = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleProfileClick = (handle: string) => {
    navigate(`/profile/${handle}`);
  };

  return (
    <div className="flex gap-0 max-w-[1200px] mx-auto w-full">
      <div className="flex-1 min-w-0 border-x border-white/10 min-h-screen">
        {/* Header - Pixel Perfect Match */}
        <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 flex items-center px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors mr-4">
            <span className="material-symbols-outlined text-white text-2xl font-bold">west</span>
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-black text-white leading-none tracking-tight">Post</h2>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-1.5 leading-none">WAVE for Solana</p>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <span className="material-symbols-outlined text-zinc-600">settings</span>
          </button>
        </header>

        {/* Main Post Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div 
              onClick={() => handleProfileClick(post.author.handle)}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <img src={post.author.avatar} className="size-14 rounded-full border border-white/10 object-cover group-hover:brightness-110 transition-all" alt={post.author.name} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-white text-[17px] group-hover:underline decoration-primary">{post.author.name}</span>
                  {post.author.isVerified && <span className="material-symbols-outlined text-primary text-[18px] fill-1">verified</span>}
                </div>
                <span className="text-zinc-500 font-bold text-sm tracking-tight">@{post.author.handle}</span>
              </div>
            </div>
            <button className="bg-white text-black px-6 py-2 rounded-full font-black text-sm hover:brightness-110 active:scale-95 transition-all">
              Follow
            </button>
          </div>

          {/* Post Content with Highlighted Symbols */}
          <div className="text-[22px] leading-relaxed text-zinc-100 mb-8 font-medium tracking-tight">
            {post.content.split(/(\$[A-Z]+|#[a-zA-Z0-9]+)/g).map((part, i) => {
              if (part.startsWith('$') || part.startsWith('#')) {
                return <span key={i} className="text-primary font-black hover:underline cursor-pointer">{part}</span>;
              }
              return part;
            })}
          </div>

          {/* High-Fidelity $SOL Market Card */}
          <div className="bg-[#080808] border border-white/5 rounded-[32px] p-6 flex items-center justify-between mb-8 group hover:border-primary/20 transition-all cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="size-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center p-3 shadow-inner">
                <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-full h-full object-contain" alt="SOL" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white tracking-tighter leading-none mb-1">$SOL</h4>
                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.15em]">Solana Network</p>
              </div>
            </div>
            <div className="text-right flex items-center gap-6">
              <div>
                <p className="text-2xl font-black text-white tracking-tighter leading-none">$142.64</p>
                <p className="text-[11px] font-black text-primary mt-1.5 flex items-center justify-end gap-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +5.24%
                </p>
              </div>
              <button className="bg-primary/5 border border-primary/20 text-primary px-7 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-primary hover:text-black transition-all group-hover:scale-105 active:scale-95 shadow-xl shadow-primary/5">
                <span className="material-symbols-outlined text-[18px] fill-1">shopping_cart</span>
                BUY
              </button>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="py-5 border-y border-white/5 flex gap-8 text-[13px] font-bold text-zinc-500 mb-6 px-2">
            <p><span className="text-white font-black">{formatNum(post.reposts)}</span> <span className="uppercase tracking-widest text-[10px] ml-1">Reposts</span></p>
            <p><span className="text-white font-black">842</span> <span className="uppercase tracking-widest text-[10px] ml-1">Quotes</span></p>
            <p><span className="text-white font-black">{formatNum(post.likes)}</span> <span className="uppercase tracking-widest text-[10px] ml-1">Likes</span></p>
            <p><span className="text-white font-black">1.2K</span> <span className="uppercase tracking-widest text-[10px] ml-1">Bookmarks</span></p>
          </div>

          {/* Interaction Bar */}
          <div className="flex items-center justify-around py-3 border-b border-white/5 mb-8 text-zinc-600">
            <ActionButton icon="chat_bubble" />
            <ActionButton icon="repeat" />
            <ActionButton icon="favorite" activeColor="text-primary" />
            <ActionButton icon="bookmark" />
            <ActionButton icon="share" />
          </div>

          {/* Reply Composer Section */}
          <div className="flex gap-4 mb-12 group/composer">
            <img 
              onClick={() => handleProfileClick(MOCK_USER.handle)}
              src={MOCK_USER.avatar} 
              className="size-11 rounded-full object-cover border border-white/10 ring-2 ring-transparent group-focus-within/composer:ring-primary/20 transition-all cursor-pointer" 
              alt="" 
            />
            <div className="flex-1">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 text-[18px] placeholder:text-zinc-700 resize-none pt-2 text-white font-medium" 
                placeholder="Post your reply"
                rows={1}
              />
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5">
                <div className="flex gap-1">
                   <IconButton icon="image" />
                   <IconButton icon="gif_box" />
                   <IconButton icon="sentiment_satisfied" />
                   <IconButton icon="location_on" />
                </div>
                <button className="bg-primary text-black px-8 py-2.5 rounded-full font-black text-[15px] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20">
                  Reply
                </button>
              </div>
            </div>
          </div>

          {/* Reply Feed - Dynamic threaded feel */}
          <div className="space-y-0 -mx-6">
            <ReplyItem 
              author="CryptoKing" 
              handle="king_sol" 
              time="12m" 
              content="$SOL really is the chain for the people this cycle. WAVE is helping make it social. LFG! 🚀"
              likes="156"
              replies="42"
              reposts="12"
              views="4.1k"
              avatar="https://picsum.photos/seed/king/200"
              onProfileClick={() => handleProfileClick('king_sol')}
            />
            <ReplyItem 
              author="MemeTrader" 
              handle="degen_99" 
              time="45m" 
              content="Bought the dip on $SOL at $130. Best decision of the month. Anyone looking at the new $WAVE token launch?"
              likes="34"
              replies="8"
              reposts="2"
              views="1.8k"
              avatar="https://picsum.photos/seed/meme/200"
              onProfileClick={() => handleProfileClick('degen_99')}
            />
          </div>
        </div>
      </div>
      <RightAside />
    </div>
  );
};

const ActionButton = ({ icon, activeColor = "hover:text-primary" }: { icon: string; activeColor?: string }) => (
  <button className={`p-2.5 rounded-full ${activeColor} transition-all hover:bg-primary/5 active:scale-90`}>
    <span className="material-symbols-outlined text-[26px]">{icon}</span>
  </button>
);

const IconButton = ({ icon }: { icon: string }) => (
  <button className="p-2 hover:bg-primary/10 rounded-full transition-colors group">
    <span className="material-symbols-outlined text-[20px] text-primary">{icon}</span>
  </button>
);

const ReplyItem = ({ author, handle, time, content, likes, replies, reposts, views, avatar, onProfileClick }: any) => (
  <div className="p-6 border-b border-white/5 hover:bg-white/[0.01] transition-colors group cursor-pointer">
    <div className="flex gap-4">
      <img 
        onClick={(e) => { e.stopPropagation(); onProfileClick(); }}
        src={avatar} 
        className="size-11 rounded-full object-cover border border-white/10 hover:brightness-110 transition-all" 
        alt="" 
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <div 
            onClick={(e) => { e.stopPropagation(); onProfileClick(); }}
            className="flex items-center gap-1.5 text-sm cursor-pointer"
          >
            <span className="font-black text-white hover:underline decoration-primary">{author}</span>
            <span className="text-zinc-500 font-bold tracking-tight">@{handle} • {time}</span>
          </div>
          <button className="text-zinc-700 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
          </button>
        </div>
        <p className="text-[15px] text-zinc-200 leading-relaxed mb-4 font-medium">{content}</p>
        <div className="flex items-center justify-between text-zinc-600 max-w-sm">
           <StatAction icon="chat_bubble" count={replies} />
           <StatAction icon="repeat" count={reposts} />
           <StatAction icon="favorite" count={likes} />
           <StatAction icon="bar_chart" count={views} />
        </div>
      </div>
    </div>
  </div>
);

const StatAction = ({ icon, count }: { icon: string; count: any }) => (
  <div className="flex items-center gap-2 hover:text-primary transition-colors group/stat cursor-pointer">
    <span className="material-symbols-outlined text-[19px]">{icon}</span>
    <span className="text-xs font-black uppercase tracking-tighter">{count}</span>
  </div>
);

export default PostDetail;
