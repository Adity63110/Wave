
import React from 'react';
import { useWallet } from '../App';

const Login: React.FC = () => {
  const { connect, isConnecting } = useWallet();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent blur-3xl"></div>
        <div className="h-full w-full bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-xl px-6 text-center">
        <div className="size-24 bg-primary rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(19,236,109,0.4)] animate-pulse">
          <span className="material-symbols-outlined text-black font-black text-5xl">waves</span>
        </div>

        <h1 className="text-6xl font-black tracking-tighter mb-4 text-white">
          WAVE <span className="text-primary italic">HUB</span>
        </h1>
        
        <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
          The ultimate social layer for the Solana ecosystem. 
          Connect your wallet to access alpha, communities, and real-time market signals.
        </p>

        <div className="flex flex-col gap-4 w-full sm:w-80">
          <button 
            onClick={connect}
            disabled={isConnecting}
            className="group relative flex items-center justify-center gap-3 bg-white text-black py-4 px-8 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-[0_10px_40px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <span className="relative z-10 flex items-center gap-2">
              {isConnecting ? (
                <div className="size-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="size-6 invert brightness-0" alt="Solana" />
              )}
              {isConnecting ? 'Connecting...' : 'Connect Solana Wallet'}
            </span>
          </button>
          
          <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mt-2">
            No registration required. Just sign and wave.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
          <LoginStat label="Active Hubs" value="420+" />
          <LoginStat label="Daily Vol" value="$1.2B" />
          <LoginStat label="Verified Users" value="125k" />
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-700 text-xs font-black uppercase tracking-widest flex items-center gap-4">
        <span>Built on Solana</span>
        <span className="size-1 bg-zinc-800 rounded-full"></span>
        <span>Secure & Fast</span>
      </div>
    </div>
  );
};

const LoginStat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl font-black text-white">{value}</span>
    <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mt-1">{label}</span>
  </div>
);

export default Login;
