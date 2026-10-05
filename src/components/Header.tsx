import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  AlertCircle, 
  ClipboardList, 
  Compass, 
  FileText,
  HelpCircle
} from 'lucide-react';
import { StudentLevel } from '../types';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  level: StudentLevel;
  onLevelChange: (level: StudentLevel) => void;
  onOpenSos: () => void;
  onOpenHistory: () => void;
  onOpenCalmPlan: () => void;
  onOpenCounselorHelp: () => void;
  currentStep: 'intro' | 'personality' | 'anxiety' | 'results' | 'tool';
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  level,
  onLevelChange,
  onOpenSos,
  onOpenHistory,
  onOpenCalmPlan,
  onOpenCounselorHelp,
  onNavigateHome
}) => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState(false);

  useEffect(() => {
    setActiveSound(soundEngine.getActiveSound());
  }, []);

  const handleSoundToggle = (sound: 'rain' | 'waves' | 'bowl' | 'forest') => {
    if (activeSound === sound) {
      soundEngine.stopSoundscape();
      setActiveSound(null);
    } else {
      soundEngine.playSoundscape(sound);
      setActiveSound(sound);
    }
    setIsAudioMenuOpen(false);
  };

  const handleStopAllSound = () => {
    soundEngine.stopSoundscape();
    setActiveSound(null);
    setIsAudioMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg p-1"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-xs ${
            level === 'primary' 
              ? 'bg-gradient-to-tr from-amber-400 via-orange-400 to-teal-400' 
              : 'bg-gradient-to-tr from-teal-700 via-teal-600 to-indigo-600'
          }`}>
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 tracking-tight text-lg">MindHarbor</span>
              {level === 'primary' ? (
                <span className="text-xs font-semibold text-amber-600">Junior</span>
              ) : (
                <span className="text-xs font-semibold text-teal-700">Youth</span>
              )}
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {level === 'primary' ? 'Discover Your Superpower & Calm' : 'Evidence-Based Resilience & Coping'}
            </p>
          </div>
        </button>

        {/* Level Switcher (Segmented Control) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => onLevelChange('primary')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              level === 'primary'
                ? 'bg-white text-amber-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🎈</span>
            <span>Primary</span>
            <span className="hidden md:inline text-xs opacity-75">(Grades 1–6)</span>
          </button>
          <button
            onClick={() => onLevelChange('secondary')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              level === 'secondary'
                ? 'bg-white text-teal-800 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🧭</span>
            <span>Secondary</span>
            <span className="hidden md:inline text-xs opacity-75">(Grades 7–12)</span>
          </button>
        </div>

        {/* Action Controls & Soundscape */}
        <div className="flex items-center gap-2">
          
          {/* Ambient Sound Menu */}
          <div className="relative">
            <button
              onClick={() => setIsAudioMenuOpen(!isAudioMenuOpen)}
              title="Calm Soundscape (Rain, Ocean, Forest)"
              className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs ${
                activeSound
                  ? 'bg-teal-50 border-teal-300 text-teal-700 animate-pulse'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {activeSound ? <Volume2 className="w-4 h-4 text-teal-600" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              <span className="hidden sm:inline font-medium">
                {activeSound ? activeSound.toUpperCase() : 'Soundscape'}
              </span>
            </button>

            {isAudioMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Calming Audio (Procedural)
                </div>
                <button
                  onClick={() => handleSoundToggle('rain')}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 ${
                    activeSound === 'rain' ? 'font-semibold text-teal-600 bg-teal-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>🌧️ Soft Gentle Rain</span>
                  {activeSound === 'rain' && <span className="text-teal-600 text-xs">Playing</span>}
                </button>
                <button
                  onClick={() => handleSoundToggle('waves')}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 ${
                    activeSound === 'waves' ? 'font-semibold text-teal-600 bg-teal-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>🌊 Ocean Surf Waves</span>
                  {activeSound === 'waves' && <span className="text-teal-600 text-xs">Playing</span>}
                </button>
                <button
                  onClick={() => handleSoundToggle('bowl')}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 ${
                    activeSound === 'bowl' ? 'font-semibold text-teal-600 bg-teal-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>🔔 Singing Bowl Chimes</span>
                  {activeSound === 'bowl' && <span className="text-teal-600 text-xs">Playing</span>}
                </button>
                <button
                  onClick={() => handleSoundToggle('forest')}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 ${
                    activeSound === 'forest' ? 'font-semibold text-teal-600 bg-teal-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>🌲 Forest Birds & Breeze</span>
                  {activeSound === 'forest' && <span className="text-teal-600 text-xs">Playing</span>}
                </button>
                {activeSound && (
                  <div className="pt-1 mt-1 border-t border-slate-100 px-2">
                    <button
                      onClick={handleStopAllSound}
                      className="w-full py-1 text-center text-xs text-rose-600 hover:bg-rose-50 rounded-md font-medium"
                    >
                      Turn Audio Off
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Calm Plan Button */}
          <button
            onClick={onOpenCalmPlan}
            title="My Calm Action Plan"
            className="p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-4 h-4 text-indigo-500" />
            <span className="hidden md:inline">Calm Plan</span>
          </button>

          {/* History / Mood Journal */}
          <button
            onClick={onOpenHistory}
            title="Past Check-ins"
            className="p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <ClipboardList className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">Check-in Log</span>
          </button>

          {/* Help / Counselor Bridge */}
          <button
            onClick={onOpenCounselorHelp}
            title="Counselor & Safe Talk Help"
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-sky-600" />
          </button>

          {/* SOS Quick Calm Button */}
          <button
            onClick={onOpenSos}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            title="Instant 60-Second Panic / Overwhelm Reset"
          >
            <AlertCircle className="w-4 h-4 animate-bounce" />
            <span>SOS Calm</span>
          </button>
        </div>

      </div>
    </header>
  );
};
