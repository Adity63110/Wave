
import React from 'react';
import { MOCK_USER } from '../constants';

const Settings: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-8 w-full">
      <header className="mb-12">
        <h2 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase">Settings</h2>
        <p className="text-gray-500 font-medium">Manage your WAVE experience and account security.</p>
      </header>

      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary text-3xl">palette</span>
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Display</h3>
        </div>
        <div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col gap-1 mb-2">
            <p className="text-white text-base font-bold leading-tight">Theme</p>
            <p className="text-gray-400 text-sm font-normal">Select your preferred color scheme for the interface.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 p-1.5 bg-black border border-white/10 rounded-xl">
            <ThemeOption icon="dark_mode" label="Dark" active />
            <ThemeOption icon="light_mode" label="Light" />
            <ThemeOption icon="settings_brightness" label="System" />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary text-3xl">person</span>
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Account</h3>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="flex flex-col gap-1">
              <label className="text-white text-base font-bold">Username</label>
              <p className="text-gray-400 text-sm">Your unique handle on the WAVE platform.</p>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">@</span>
              <input 
                defaultValue={MOCK_USER.handle}
                className="w-full bg-black border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white font-medium focus:ring-1 focus:ring-primary outline-none transition-all" 
                type="text" 
              />
            </div>
            <div className="flex justify-end">
              <button className="px-8 py-2.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black font-black rounded-lg transition-all">Save Changes</button>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">lock_reset</span>
              </div>
              <div>
                <p className="text-white font-bold">Password</p>
                <p className="text-gray-400 text-sm">Last changed 3 months ago</p>
              </div>
            </div>
            <button className="px-6 py-2.5 border border-white/10 hover:border-primary text-white font-bold rounded-lg transition-all">Change</button>
          </div>
        </div>
      </section>
      
      <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
        <div className="flex gap-4 items-start">
          <span className="material-symbols-outlined text-primary mt-0.5">verified_user</span>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-black text-white uppercase tracking-wider">Security Tip</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Since your WAVE profile is linked to your Solana wallet, maintaining account security is essential. Ensure your password is unique and high-strength.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThemeOption = ({ icon, label, active }: any) => (
  <button className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-black transition-all ${active ? 'bg-primary text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
    <span className="material-symbols-outlined text-lg">{icon}</span>
    {label}
  </button>
);

export default Settings;
