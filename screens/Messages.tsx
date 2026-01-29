
import React, { useState } from 'react';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../constants';
import { Conversation, Message } from '../types';

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Conversation>(MOCK_CONVERSATIONS[0]);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'u1',
      senderName: 'YOU',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden font-display">
      {/* Conversations List Pane */}
      <div className="w-[380px] border-r border-white/10 flex flex-col bg-[#010101]">
        <header className="p-6 pb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight">Messages</h2>
          <button className="text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">edit_square</span>
          </button>
        </header>

        <div className="px-6 mb-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-[14px] placeholder:text-zinc-600 text-white outline-none focus:ring-1 focus:ring-primary/20 transition-all" 
              placeholder="Search conversations..." 
              type="text" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
          {MOCK_CONVERSATIONS.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat)}
              className={`px-6 py-5 flex gap-4 cursor-pointer transition-all border-l-4 ${selectedChat.id === chat.id ? 'bg-primary/5 border-primary shadow-[inset_10px_0_40px_rgba(19,236,109,0.05)]' : 'border-transparent hover:bg-white/[0.02]'}`}
            >
              <div className="relative shrink-0">
                <img src={chat.user.avatar} className="size-12 rounded-full object-cover border border-white/10" alt="" />
                {chat.user.isOnline && (
                  <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-black" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-black text-white text-[15px] truncate">{chat.user.name}</span>
                    {chat.user.isVerified && <span className="material-symbols-outlined text-primary text-[16px] fill-1 shrink-0">verified</span>}
                  </div>
                  <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest whitespace-nowrap">{chat.lastTimestamp}</span>
                </div>
                <p className={`text-[13px] truncate ${selectedChat.id === chat.id ? 'text-zinc-100 font-bold' : 'text-zinc-500 font-medium'}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Chat View Pane */}
      <div className="flex-1 flex flex-col bg-black relative">
        {/* Chat Grid Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#13ec6d_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <header className="p-4 border-b border-white/10 flex items-center justify-between z-10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={selectedChat.user.avatar} className="size-11 rounded-full object-cover border border-white/10" alt="" />
              <div className={`absolute bottom-0 right-0 size-2.5 rounded-full border border-black ${selectedChat.user.isOnline ? 'bg-primary' : 'bg-zinc-600'}`} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-white text-[16px]">{selectedChat.user.name}</h3>
                {selectedChat.user.isVerified && <span className="material-symbols-outlined text-primary text-[18px] fill-1">verified</span>}
              </div>
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.15em] flex items-center gap-1">
                <span className={`size-1.5 rounded-full ${selectedChat.user.isOnline ? 'bg-primary animate-pulse' : 'bg-zinc-600'}`} />
                {selectedChat.user.isOnline ? 'ONLINE' : 'OFFLINE'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-transparent border border-primary text-primary px-6 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all">
              FOLLOW
            </button>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined">info</span>
            </button>
          </div>
        </header>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 no-scrollbar z-10">
          <div className="flex justify-center my-4">
            <span className="px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              TRANSACTION HISTORY INITIATED
            </span>
          </div>

          {messages.map((msg) => (
             <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest ${msg.isMe ? 'text-zinc-500' : 'text-zinc-500'}`}>
                   {msg.isMe ? (
                      <>{msg.timestamp} <span className="text-primary">YOU</span></>
                   ) : (
                      <><span className="text-zinc-300">{msg.senderName}</span> {msg.timestamp}</>
                   )}
                </div>
                
                {msg.isMedia ? (
                   <div className="bg-[#080808] border-2 border-primary/20 rounded-[28px] p-8 flex flex-col items-center gap-6 w-full max-w-sm hover:border-primary/40 transition-all cursor-pointer shadow-2xl shadow-primary/5">
                      <div className="size-20 bg-primary/5 rounded-full flex items-center justify-center border border-primary/20">
                         <span className="material-symbols-outlined text-primary text-5xl font-black">trending_up</span>
                      </div>
                      <p className="text-primary font-black uppercase tracking-[0.3em] text-[13px] text-glow">LIVE MARKET DATA STREAM</p>
                   </div>
                ) : (
                   <div className={`max-w-[70%] px-6 py-4 rounded-[24px] text-[15px] font-medium leading-relaxed ${msg.isMe ? 'bg-primary text-black rounded-tr-none' : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-white/5'}`}>
                      {msg.text}
                   </div>
                )}
             </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-6 pt-2 z-10">
          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-[24px] p-2 pl-4">
            <div className="flex gap-2">
              <IconButton icon="image" />
              <IconButton icon="sentiment_satisfied" />
              <IconButton icon="gif_box" />
            </div>
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] placeholder:text-zinc-600 text-white font-medium" 
              placeholder="Type an encrypted message..."
            />
            <button 
              onClick={handleSendMessage}
              className="size-12 bg-primary text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined font-black">send</span>
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 opacity-40">
            <span className="material-symbols-outlined text-primary text-[14px] fill-1">lock</span>
            <p className="text-[9px] font-black text-white uppercase tracking-[0.15em]">END-TO-END ENCRYPTED VIA SOLANA PROGRAM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const IconButton = ({ icon }: { icon: string }) => (
  <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white">
    <span className="material-symbols-outlined text-[22px]">{icon}</span>
  </button>
);

export default Messages;
