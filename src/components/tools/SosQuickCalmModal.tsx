import React, { useState, useEffect } from 'react';
import { 
  X, 
  AlertCircle, 
  Heart, 
  Wind, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface SosQuickCalmModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: 'primary' | 'secondary';
}

export const SosQuickCalmModal: React.FC<SosQuickCalmModalProps> = ({
  isOpen,
  onClose,
  level
}) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setActiveStep(0);
      soundEngine.playGentleChime(432, 2.0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = level === 'primary' 
    ? [
        {
          emoji: '🧊',
          title: 'Step 1: Cool & Relax',
          action: 'Drop your shoulders down. If you have water, take a small cool sip. You are safe here.',
          subtext: 'Let your tummy get soft like a pillow.'
        },
        {
          emoji: '🌬️',
          title: 'Step 2: Double Bunny Breath',
          action: 'Sniff in twice through your nose (Sniff! Sniff!) ... and blow out one big slow breath through your mouth!',
          subtext: 'Do this 3 times with me right now.'
        },
        {
          emoji: '👣',
          title: 'Step 3: Press Your Feet',
          action: 'Press both feet firmly into the floor. Feel how strong the ground is holding you up.',
          subtext: 'You are right here, safe and sound.'
        },
        {
          emoji: '💖',
          title: 'Step 4: Say Your Calm Magic Word',
          action: 'Put one hand over your heart and whisper: "I am safe. My heartbeat is slowing down. I can take my time."',
          subtext: 'Big feelings come like waves, and now the wave is washing away.'
        }
      ]
    : [
        {
          emoji: '🧊',
          title: 'Step 1: Somatic Diver\'s Reset',
          action: 'Drop your tongue from the roof of your mouth. Lower your shoulders 2 inches. Unclench your jaw.',
          subtext: 'Releasing physical constriction sends immediate safety signals to the amygdala.'
        },
        {
          emoji: '🌬️',
          title: 'Step 2: 3 Physiological Sighs',
          action: 'Take 2 sharp consecutive inhales through your nose, followed by one long, slow, unforced exhale through your mouth.',
          subtext: 'This rapidly re-inflates collapsed alveoli and expels excess CO2 to halt panic.'
        },
        {
          emoji: '👣',
          title: 'Step 3: Bilateral Grounding',
          action: 'Plant both feet firmly flat on the floor. Grip the edge of your seat or table with moderate pressure.',
          subtext: 'Anchor your sensory attention to physical mass in the present moment.'
        },
        {
          emoji: '🛡️',
          title: 'Step 4: Objective Reassurance',
          action: 'Remind yourself: "This adrenaline surge is a biochemical alarm, not a real physical danger. It naturally peaks in 90 seconds and will dissipate."',
          subtext: 'You have survived 100% of past stressful moments. You will ride this out.'
        }
      ];

  const currentStepData = steps[activeStep];

  const handleNext = () => {
    soundEngine.playGentleChime(528 + activeStep * 80, 0.6);
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Indicator */}
        <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">
          <AlertCircle className="w-4 h-4 animate-ping" />
          <span>60-Second Acute Panic & Calm Reset</span>
        </div>

        {/* Progress tracker */}
        <div className="grid grid-cols-4 gap-1.5 my-3">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === activeStep ? 'bg-rose-500' : idx < activeStep ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Content Card */}
        <div className="my-6 text-center">
          <div className="text-5xl mb-4 animate-bounce">
            {currentStepData.emoji}
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {currentStepData.title}
          </h3>
          <p className="mt-3 text-base sm:text-lg font-medium text-slate-800 leading-relaxed max-w-md mx-auto">
            {currentStepData.action}
          </p>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 italic">
            {currentStepData.subtext}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Step {activeStep + 1} of 4
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <span>{activeStep === steps.length - 1 ? 'I Feel More Grounded' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
