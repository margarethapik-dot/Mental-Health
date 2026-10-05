import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { StudentLevel } from '../../types';
import { soundEngine } from '../../utils/audio';

interface BreathingToolProps {
  level: StudentLevel;
  onBack?: () => void;
  preset?: 'balloon' | 'box' | '4-7-8';
}

export const BreathingTool: React.FC<BreathingToolProps> = ({
  level,
  onBack,
  preset
}) => {
  const [technique, setTechnique] = useState<'balloon' | 'starfish' | 'box' | '4-7-8'>(
    preset || (level === 'primary' ? 'balloon' : 'box')
  );
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Technique timing configurations
  const configs = {
    balloon: {
      name: 'Magic Balloon Breath',
      desc: 'Blow up your tummy balloon gently, hold it high in the sky, then let all the air out smoothly.',
      phases: [
        { label: 'Breathe In (Blow up balloon)', duration: 4, scale: 1.35, color: '#f59e0b' },
        { label: 'Hold gentle & steady', duration: 2, scale: 1.35, color: '#10b981' },
        { label: 'Breathe Out (Swoosh)', duration: 4, scale: 0.85, color: '#0ea5e9' }
      ]
    },
    starfish: {
      name: 'Starfish Hand Tracing',
      desc: 'Trace up one finger as you breathe in, pause at the tip, trace down as you breathe out.',
      phases: [
        { label: 'Trace Up Finger (Inhale)', duration: 3, scale: 1.25, color: '#6366f1' },
        { label: 'Pause at the tip', duration: 1, scale: 1.25, color: '#ec4899' },
        { label: 'Trace Down (Exhale)', duration: 3, scale: 0.9, color: '#14b8a6' }
      ]
    },
    box: {
      name: 'Tactical Box Breathing (4-4-4-4)',
      desc: 'Synchronizes heart rate variability and clears adrenaline fog.',
      phases: [
        { label: 'Inhale deeply through nose', duration: 4, scale: 1.3, color: '#0284c7' },
        { label: 'Hold breath with lungs full', duration: 4, scale: 1.3, color: '#6366f1' },
        { label: 'Exhale smoothly through mouth', duration: 4, scale: 0.85, color: '#0d9488' },
        { label: 'Hold empty lungs steady', duration: 4, scale: 0.85, color: '#64748b' }
      ]
    },
    '4-7-8': {
      name: '4-7-8 Parasympathetic Reset',
      desc: 'Dr. Weil protocol. Extended exhalation stimulates the vagus nerve to calm acute anxiety and promote sleep.',
      phases: [
        { label: 'Inhale through nose quietly', duration: 4, scale: 1.3, color: '#0284c7' },
        { label: 'Hold breath gently', duration: 7, scale: 1.3, color: '#8b5cf6' },
        { label: 'Exhale with whoosh sound', duration: 8, scale: 0.8, color: '#059669' }
      ]
    }
  };

  const currentConfig = configs[technique];
  const currentPhase = currentConfig.phases[phaseIndex];

  // Timer loop
  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = window.setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            // Next phase
            const nextIdx = (phaseIndex + 1) % currentConfig.phases.length;
            setPhaseIndex(nextIdx);

            if (nextIdx === 0) {
              setCompletedCycles(c => c + 1);
              if (soundEnabled) soundEngine.playGentleChime(784, 1.2);
            } else if (soundEnabled) {
              soundEngine.playGentleChime(528, 0.6);
            }

            return currentConfig.phases[nextIdx].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phaseIndex, technique, currentConfig, soundEnabled]);

  const handleToggle = () => {
    if (!isActive) {
      if (soundEnabled) soundEngine.playGentleChime(528, 0.8);
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setSecondsLeft(currentConfig.phases[0].duration);
    setCompletedCycles(0);
  };

  const handleSelectTechnique = (tech: 'balloon' | 'starfish' | 'box' | '4-7-8') => {
    setTechnique(tech);
    setIsActive(false);
    setPhaseIndex(0);
    setSecondsLeft(configs[tech].phases[0].duration);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        ) : <div />}

        {/* Audio Cue Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
            soundEnabled ? 'border-teal-300 bg-teal-50 text-teal-800' : 'border-slate-200 bg-white text-slate-500'
          }`}
          title="Chime tones on breath transitions"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{soundEnabled ? 'Chimes On' : 'Silent'}</span>
        </button>
      </div>

      {/* Technique Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        {level === 'primary' ? (
          <>
            <button
              onClick={() => handleSelectTechnique('balloon')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                technique === 'balloon'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎈 Belly Balloon
            </button>
            <button
              onClick={() => handleSelectTechnique('starfish')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                technique === 'starfish'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⭐ Starfish Hand
            </button>
            <button
              onClick={() => handleSelectTechnique('box')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                technique === 'box'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📦 Box Breathing
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleSelectTechnique('box')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                technique === 'box'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tactical Box (4-4-4-4)
            </button>
            <button
              onClick={() => handleSelectTechnique('4-7-8')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                technique === '4-7-8'
                  ? 'bg-white text-indigo-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4-7-8 Parasympathetic
            </button>
            <button
              onClick={() => handleSelectTechnique('balloon')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                technique === 'balloon'
                  ? 'bg-white text-amber-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diaphragmatic Breath
            </button>
          </>
        )}
      </div>

      {/* Main Breathing Visualizer Canvas */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs text-center relative overflow-hidden flex flex-col items-center">
        
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {currentConfig.name}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
          {currentConfig.desc}
        </p>

        {/* Breathing Circle / Balloon */}
        <div className="my-12 relative w-64 h-64 flex items-center justify-center">
          
          {/* Subtle outer ripples */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-1000 ease-in-out opacity-20"
            style={{
              backgroundColor: currentPhase.color,
              transform: isActive ? `scale(${currentPhase.scale * 1.15})` : 'scale(1)',
            }}
          />

          {/* Main animated orb */}
          <div 
            className="w-48 h-48 rounded-full flex flex-col items-center justify-center text-white transition-all duration-1000 ease-in-out shadow-md"
            style={{
              backgroundColor: currentPhase.color,
              transform: isActive ? `scale(${currentPhase.scale})` : 'scale(1)',
            }}
          >
            {technique === 'balloon' ? (
              <span className="text-4xl mb-1 drop-shadow-xs">
                {currentPhase.scale > 1 ? '🎈' : '💨'}
              </span>
            ) : null}

            <span className="text-4xl font-extrabold tracking-tight drop-shadow-xs">
              {isActive ? secondsLeft : 'Ready'}
            </span>

            <span className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-90 px-3 text-center">
              {isActive ? currentPhase.label : 'Press Start'}
            </span>
          </div>
        </div>

        {/* Phase progress tracker */}
        <div className="flex items-center gap-2 mb-8">
          {currentConfig.phases.map((phase, idx) => (
            <div 
              key={idx}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                phaseIndex === idx && isActive
                  ? 'bg-slate-900 text-white shadow-xs scale-105'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {phase.label.split(' ')[0]} ({phase.duration}s)
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleToggle}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-xs active:scale-95 text-white ${
              isActive 
                ? 'bg-slate-700 hover:bg-slate-800' 
                : 'bg-teal-700 hover:bg-teal-800'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            <span>{isActive ? 'Pause' : 'Start Breathing'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            title="Reset Counter"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Cycles Counter */}
        {completedCycles > 0 && (
          <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{completedCycles} full breath cycles completed! Notice your calmer heartbeat.</span>
          </div>
        )}

      </div>

    </div>
  );
};
