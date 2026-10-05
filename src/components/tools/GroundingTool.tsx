import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  Hand, 
  Volume2, 
  Flower2, 
  Heart, 
  Sparkles, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { StudentLevel } from '../../types';
import { soundEngine } from '../../utils/audio';

interface GroundingToolProps {
  level: StudentLevel;
  onBack?: () => void;
}

export const GroundingTool: React.FC<GroundingToolProps> = ({ level, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [itemsCollected, setItemsCollected] = useState<Record<number, string[]>>({
    0: [],
    1: [],
    2: [],
    3: [],
    4: []
  });
  const [customInput, setCustomInput] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    {
      count: 5,
      sense: 'SEE',
      icon: Eye,
      title: level === 'primary' ? '5 Things You Can SEE 👀' : '5 Visual Anchors in Your Environment',
      desc: level === 'primary' ? 'Look around your room or classroom. What catches your eye?' : 'Notice 5 distinct visual details: textures, light reflections, colors, or shadows.',
      color: '#0284c7', // sky
      suggestions: level === 'primary' 
        ? ['A blue pencil', 'The clock on the wall', 'A green leaf outside', 'My shoes', 'A cloud in the sky', 'A wooden desk']
        : ['Reflection of light on desk', 'Shadow cast by a chair', 'Specific typography in a poster', 'Pattern on fabric', 'Grain of floorboard']
    },
    {
      count: 4,
      sense: 'TOUCH',
      icon: Hand,
      title: level === 'primary' ? '4 Things You Can TOUCH or FEEL ✋' : '4 Physical Tactile Sensations',
      desc: level === 'primary' ? 'Touch something around you or feel your own clothes!' : 'Feel 4 physical contact points: feet grounding against floor, fabric against skin, chair support.',
      color: '#10b981', // emerald
      suggestions: level === 'primary'
        ? ['Soft shirt fabric', 'Smooth cool tabletop', 'Warm palms together', 'Feet firmly on the floor', 'Rough backpack strap']
        : ['Firmness of feet against the floor', 'Cool surface of phone or pen', 'Weight of arms on table', 'Collar resting on neck']
    },
    {
      count: 3,
      sense: 'HEAR',
      icon: Volume2,
      title: level === 'primary' ? '3 Sounds You Can HEAR 👂' : '3 Ambient Auditory Frequencies',
      desc: level === 'primary' ? 'Listen closely! What quiet or loud sounds are around?' : 'Listen past the loudest noise. What subtle hums, distant murmurs, or natural tones are present?',
      color: '#8b5cf6', // purple
      suggestions: level === 'primary'
        ? ['Someone whispering or walking', 'Air conditioner breeze', 'Birds chirping outside', 'My own quiet breath', 'Pencil scratching paper']
        : ['Ventilation / AC white noise', 'Distant vehicle engine', 'Keyboard or pen tapping', 'Your steady inhalation']
    },
    {
      count: 2,
      sense: 'SMELL',
      icon: Flower2,
      title: level === 'primary' ? '2 Things You Can SMELL 🌸' : '2 Olfactory Senses or Comfort Aromas',
      desc: level === 'primary' ? 'Sniff gently! Or think of your favorite nice smell.' : 'Notice existing ambient scents, or vividly recall 2 calming aromas (lavender, rain, citrus).',
      color: '#f59e0b', // amber
      suggestions: level === 'primary'
        ? ['Fresh paper or book pages', 'Pencil eraser', 'Clean soap on hands', 'Fresh morning air', 'My favorite food smell']
        : ['Crisp ambient room air', 'Scent of wooden pencil / paper', 'Subtle tea or coffee aroma', 'Lavender or citrus']
    },
    {
      count: 1,
      sense: 'TASTE / TRUTH',
      icon: Heart,
      title: level === 'primary' ? '1 Kind Truth About Yourself 💖' : '1 Grounding Core Truth',
      desc: level === 'primary' ? 'Say something nice to yourself in your heart!' : 'State one immutable, grounded reality that keeps you safe right now.',
      color: '#ec4899', // pink
      suggestions: level === 'primary'
        ? ['I am brave and doing my best!', 'I am safe right now.', 'Mistakes help me learn.', 'I am a kind friend.', 'This feeling will pass like a cloud.']
        : ['I am safe in this present moment.', 'My worth is not defined by today\'s stress.', 'I can handle this one minute at a time.', 'Anxiety is temporary; I am resilient.']
    }
  ];

  const currentStepData = steps[currentStep];
  const currentCollected = itemsCollected[currentStep] || [];
  const requiredCount = currentStepData.count;

  const handleAddItem = (item: string) => {
    if (!item.trim() || currentCollected.includes(item)) return;
    soundEngine.playGentleChime(600 + currentCollected.length * 60, 0.4);
    
    const updated = [...currentCollected, item.trim()];
    setItemsCollected(prev => ({
      ...prev,
      [currentStep]: updated
    }));
    setCustomInput('');
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      soundEngine.playGentleChime(784, 0.8);
      setCurrentStep(prev => prev + 1);
    } else {
      soundEngine.playGentleChime(880, 1.8);
      setIsCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setItemsCollected({ 0: [], 1: [], 2: [], 3: [], 4: [] });
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-md text-center animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto mb-4">
            🌟
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            You Are Completely Grounded!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
            By activating your 5 senses, you successfully signaled your nervous system that you are here, awake, and safe in this room.
          </p>

          <div className="mt-6 p-4 bg-teal-50 rounded-2xl border border-teal-200 text-left max-w-md mx-auto text-xs sm:text-sm text-teal-900">
            <strong className="block text-teal-950 font-bold mb-1">Your Grounding Anchor Truth:</strong>
            <p className="italic">
              "{itemsCollected[4]?.[0] || 'I am safe and grounded right now.'}"
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xs transition-all"
              >
                Return to Coping Dashboard
              </button>
            )}
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const IconComp = currentStepData.icon;

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
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Step {currentStep + 1} of 5 · 5-4-3-2-1 Sensory Reset
        </span>
      </div>

      {/* Progress pill steps */}
      <div className="grid grid-cols-5 gap-1.5 mb-8">
        {steps.map((st, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all ${
              idx === currentStep
                ? 'bg-teal-600'
                : idx < currentStep
                ? 'bg-emerald-400'
                : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Step Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
            style={{ backgroundColor: currentStepData.color }}
          >
            <IconComp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {currentStepData.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {currentStepData.desc}
            </p>
          </div>
        </div>

        {/* Counter indicator */}
        <div className="my-4 py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-semibold text-slate-700">
            Collected: {currentCollected.length} / {requiredCount}
          </span>
          <span className="text-slate-400 text-xs">
            {currentCollected.length >= requiredCount ? 'Target reached! Feel free to add more or proceed' : `Find ${requiredCount - currentCollected.length} more`}
          </span>
        </div>

        {/* Current collected chips */}
        {currentCollected.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {currentCollected.map((item, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs sm:text-sm font-medium animate-in fade-in"
              >
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        )}

        {/* Quick tap suggestions */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Quick Tap Suggestions:
          </label>
          <div className="flex flex-wrap gap-2">
            {currentStepData.suggestions.map((sug, idx) => {
              const isAdded = currentCollected.includes(sug);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddItem(sug)}
                  disabled={isAdded}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border text-left transition-all ${
                    isAdded
                      ? 'opacity-40 border-slate-200 bg-slate-100 text-slate-400 cursor-default'
                      : 'border-slate-200 bg-white hover:border-teal-400 hover:bg-teal-50/50 text-slate-700'
                  }`}
                >
                  + {sug}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Input */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Or Type Your Own Observation:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddItem(customInput);
                }
              }}
              placeholder="e.g. My soft notebook cover..."
              className="flex-1 px-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-hidden bg-white text-slate-900"
            />
            <button
              type="button"
              onClick={() => handleAddItem(customInput)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm"
            >
              Add
            </button>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 ${
              currentStep === 0 ? 'opacity-30 cursor-not-allowed text-slate-400' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Sense</span>
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <span>{currentStep === steps.length - 1 ? 'Finish Grounding' : 'Next Sense'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
