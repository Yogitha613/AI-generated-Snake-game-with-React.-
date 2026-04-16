/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Music, Gamepad2, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-magenta-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
        {/* Header */}
        <header className="w-full max-w-4xl flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Zap className="w-6 h-6 text-black fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">
                Neon<span className="text-cyan-400">Rhythm</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">Arcade & Audio</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-white transition-colors flex items-center gap-2">
              <Gamepad2 className="w-3 h-3" /> Play
            </a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
              <Music className="w-3 h-3" /> Library
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-24">
          {/* Left Side: Game */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <SnakeGame />
          </motion.section>

          {/* Right Side: Info & Player */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 w-full max-w-[500px] flex flex-col gap-8"
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-[0.85]">
                Vibe while you <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">Slide</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                Experience the ultimate fusion of retro gaming and synthwave aesthetics. 
                Keep the rhythm alive as you navigate the digital grid.
              </p>
            </div>

            <div className="pt-4">
              <MusicPlayer />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Current BPM</span>
                <span className="text-2xl font-mono font-bold text-cyan-400">128</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Players Online</span>
                <span className="text-2xl font-mono font-bold text-magenta-400">1,402</span>
              </div>
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="w-full max-w-4xl mt-12 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground">
          <p className="text-[10px] uppercase tracking-widest">© 2024 NEON RHYTHM ARCADE • ALL RIGHTS RESERVED</p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] uppercase tracking-widest hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[10px] uppercase tracking-widest hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-[10px] uppercase tracking-widest hover:text-white transition-colors">Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

