
import React, { useState, createContext, useContext, useEffect } from 'react';
import * as ReactRouterDom from 'react-router-dom';
const { HashRouter, Routes, Route, Link, useLocation, Navigate } = ReactRouterDom;
import Home from './screens/Home';
import Explore from './screens/Explore';
import Search from './screens/Search';
import Communities from './screens/Communities';
import CommunityDetail from './screens/CommunityDetail';
import PostDetail from './screens/PostDetail';
import Bookmarks from './screens/Bookmarks';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Messages from './screens/Messages';
import CreateCommunity from './screens/CreateCommunity';
import SetupProfile from './screens/SetupProfile';
import { MOCK_USER } from './constants';

interface WalletContextType {
  walletAddress: string | null;
  hasProfile: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  completeProfile: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
};

const Sidebar = () => {
  const location = useLocation();
  const { walletAddress, hasProfile, disconnect, connect, isConnecting } = useWallet();
  const isActive = (path: string) => location.pathname === path;
  const isMessages = location.pathname.startsWith('/messages');

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 flex flex-col p-6 z-50 bg-black font-display">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="size-10 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(19,236,109,0.3)]">
          <span className="material-symbols-outlined text-black font-bold text-2xl">waves</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-xl font-black leading-none tracking-tighter uppercase">WAVE</h1>
          <p className="text-[10px] text-primary font-bold tracking-[0.2em] leading-none mt-1">SOLANA SOCIAL</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        <NavLink to="/" icon="home" label="Home" active={isActive('/')} />
        <NavLink to="/explore" icon="explore" label="Explore" active={isActive('/explore')} />
        <NavLink to="/search" icon="search" label="Search" active={isActive('/search')} />
        <NavLink to="/communities" icon="groups" label="Communities" active={isActive('/communities') || location.pathname.startsWith('/community/')} />
        <NavLink to="/bookmarks" icon="bookmark" label="Bookmarks" active={isActive('/bookmarks')} />
        <NavLink to="/messages" icon="chat" label="Messages" active={isMessages} />
        <NavLink to="/profile" icon="person" label="Profile" active={isActive('/profile') || location.pathname.startsWith('/profile/')} />
        <div className="h-px bg-white/10 my-4 mx-2" />
        <NavLink to="/docs" icon="description" label="Docs" active={isActive('/docs')} />
        <NavLink to="/settings" icon="settings" label="Settings" active={isActive('/settings')} />
      </nav>

      <div className="mt-auto space-y-4">
        {!walletAddress || !hasProfile ? (
          <button 
            onClick={connect}
            disabled={isConnecting}
            className="w-full bg-primary text-black py-4 rounded-full font-black text-[15px] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(19,236,109,0.3)]"
          >
            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            {isConnecting ? 'Connecting...' : 'Connect'}
          </button>
        ) : (
          <div className="space-y-4">
            <button className="w-full bg-primary text-black py-4 rounded-full font-black text-[17px] hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(19,236,109,0.3)] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined fill-1">add_circle</span>
              {isMessages ? 'New Message' : 'POST'}
            </button>
            <Link to="/profile" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/10">
              <img src={MOCK_USER.avatar} className="size-10 rounded-full border border-white/10 object-cover" alt="User" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate text-white">{MOCK_USER.name}</p>
                <p className="text-[11px] text-zinc-500 truncate font-mono">@{MOCK_USER.handle}</p>
              </div>
              <span className="material-symbols-outlined text-white/30 text-xl group-hover:text-white">more_horiz</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

const NavLink = ({ to, icon, label, active }: { to: string, icon: string, label: string, active: boolean }) => (
  <Link to={to} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${active ? 'bg-primary/10 text-primary' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}>
    <span className={`material-symbols-outlined text-2xl ${active ? 'fill-1' : ''}`}>{icon}</span>
    <span className="text-[17px] font-bold">{label}</span>
  </Link>
);

const App: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(localStorage.getItem('wave_wallet'));
  const [hasProfile, setHasProfile] = useState(localStorage.getItem('wave_profile_complete') === 'true');
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    setIsConnecting(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      const mockAddress = '0x72...4a2b';
      setWalletAddress(mockAddress);
      localStorage.setItem('wave_wallet', mockAddress);
    } catch (err) {
      console.error("Connection failed", err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setWalletAddress(null);
    setHasProfile(false);
    localStorage.removeItem('wave_wallet');
    localStorage.removeItem('wave_profile_complete');
  };

  const completeProfile = () => {
    setHasProfile(true);
    localStorage.setItem('wave_profile_complete', 'true');
  };

  return (
    <WalletContext.Provider value={{ walletAddress, hasProfile, connect, disconnect, completeProfile, isConnecting }}>
      <HashRouter>
        <div className="flex bg-black min-h-screen text-white selection:bg-primary/30 font-display">
          <Sidebar />
          <main className="ml-64 flex-1 flex flex-col relative">
            <Routes>
              {walletAddress && !hasProfile ? (
                <Route path="*" element={<SetupProfile />} />
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/communities" element={<Communities />} />
                  <Route path="/community/:id" element={<CommunityDetail />} />
                  <Route path="/post/:id" element={<PostDetail />} />
                  <Route path="/bookmarks" element={<Bookmarks />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:handle" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/create-community" element={<CreateCommunity />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </HashRouter>
    </WalletContext.Provider>
  );
};

export default App;
