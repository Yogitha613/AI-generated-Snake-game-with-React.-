import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'motion/react';

const DUMMY_TRACKS = [
  {
    id: 1,
    title: "Neon Pulse",
    artist: "CyberSynth AI",
    duration: 184,
    color: "from-cyan-500 to-blue-600",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Digital Rain",
    artist: "Neural Drift",
    duration: 215,
    color: "from-magenta-500 to-purple-600",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Vapor Echo",
    artist: "Glitch Core",
    duration: 156,
    color: "from-lime-500 to-emerald-600",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState([70]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + (100 / currentTrack.duration);
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const formatTime = (percent: number) => {
    const totalSeconds = (percent / 100) * currentTrack.duration;
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-[600px] bg-black/40 backdrop-blur-xl border-white/10 p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Album Art Placeholder */}
        <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${currentTrack.color} flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Music2 className="w-12 h-12 text-white/80" />
            </motion.div>
          </AnimatePresence>
          {isPlaying && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {[1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  animate={{ height: [8, 16, 8] }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                  className="w-1 bg-white/60 rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 w-full space-y-4">
          <div>
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentTrack.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl font-bold text-white tracking-tight"
              >
                {currentTrack.title}
              </motion.h3>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTrack.artist}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm text-muted-foreground uppercase tracking-widest"
              >
                {currentTrack.artist}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={(val) => setProgress(val[0])}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(100)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handlePrev} className="text-white/70 hover:text-white hover:bg-white/10">
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button 
                size="icon" 
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNext} className="text-white/70 hover:text-white hover:bg-white/10">
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-3 w-32">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <Slider
                value={volume}
                max={100}
                step={1}
                onValueChange={setVolume}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
