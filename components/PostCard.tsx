
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profile/${post.author.handle}`);
  };

  return (
    <article 
      onClick={() => navigate(`/post/${post.id}`)}
      className="p-4 border-b border-white/5 hover:bg-white/[0.01] transition-colors cursor-pointer group"
    >
      <div className="flex gap-4">
        <img 
          onClick={handleProfileClick}
          src={post.author.avatar} 
          className="size-11 shrink-0 rounded-full bg-zinc-900 border border-white/10 object-cover hover:brightness-110 transition-all" 
          alt={post.author.name} 
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm">
              <span 
                onClick={handleProfileClick}
                className="font-bold truncate hover:underline text-[15px] text-white"
              >
                {post.author.name}
              </span>
              <span className="text-zinc-500 font-medium">@{post.author.handle} • {post.timestamp}</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-[18px] hover:text-white">more_horiz</span>
          </div>
          <p className="mt-1 text-[15px] leading-relaxed text-zinc-100 font-medium">
            {post.content}
          </p>
          
          <div className="mt-3 flex gap-2">
            <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
              <span className="material-symbols-outlined text-primary text-[16px]">trending_up</span>
              <span className="font-black text-[13px] text-white">$BONK</span>
              <span className="text-[13px] text-zinc-500 font-medium">$0.000024</span>
              <span className="text-[13px] font-black text-primary">+12.5%</span>
            </div>
          </div>

          {post.image && (
            <div className="mt-3 rounded-xl overflow-hidden border border-white/10 aspect-video relative group/img">
              <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.02]" alt="Post" />
            </div>
          )}

          <div className="flex items-center justify-between mt-4 text-zinc-600 max-w-sm">
            <Action icon="chat_bubble" count={post.comments} />
            <Action icon="repeat" count={post.reposts} />
            <Action icon="favorite" count={post.likes} />
            <Action icon="bar_chart" count={post.views} />
            <span className="material-symbols-outlined text-[18px] hover:text-primary transition-colors">share</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const Action = ({ icon, count }: { icon: string; count: number | string }) => (
  <button className="flex items-center gap-2 hover:text-white transition-colors">
    <span className="material-symbols-outlined text-[18px]">{icon}</span>
    <span className="text-[12px] font-bold">{count}</span>
  </button>
);

export default PostCard;
