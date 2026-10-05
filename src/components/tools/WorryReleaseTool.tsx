import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Send, 
  RotateCcw, 
  HelpCircle, 
  Check, 
  ArrowRight,
  ShieldAlert,
  Brain
} from 'lucide-react';
import { StudentLevel } from '../../types';
import { COGNITIVE_DISTORTIONS } from '../../data/secondaryData';
import { soundEngine } from '../../utils/audio';

interface WorryReleaseToolProps {
  level: StudentLevel;
  onBack?: () => void;
}

export const WorryReleaseTool: React.FC<WorryReleaseToolProps> = ({ level, onBack }) => {
  // Primary State
  const [worryText, setWorryText] = useState('');
  const [courageMantra, setCourageMantra] = useState('');
  const [isCloudFloating, setIsCloudFloating] = useState(false);
  const [isCloudPopped, setIsCloudPopped] = useState(false);

  // Secondary (CBT) State
  const [antText, setAntText] = useState(''); // Automatic Negative Thought
  const [selectedDistortion, setSelectedDistortion] = useState<string>('catastrophizing');
  const [evidenceFor, setEvidenceFor] = useState('');
  const [evidenceAgainst, setEvidenceAgainst] = useState('');
  const [balancedReframe, setBalancedReframe] = useState('');
  const [isReframingDone, setIsReframingDone] = useState(false);

  // Primary Release Action
  const handleReleasePrimaryWorry = () => {
    if (!worryText.trim()) return;
    soundEngine.playGentleChime(440, 1.0);
    setIsCloudFloating(true);

    setTimeout(() => {
      soundEngine.playGentleChime(784, 1.8);
      setIsCloudPopped(true);
      setIsCloudFloating(false);
    }, 2800);
  };

  const handleResetPrimary = () => {
    setWorryText('');
    setCourageMantra('');
    setIsCloudFloating(false);
    setIsCloudPopped(false);
  };

  const handleFinishSecondary = () => {
    soundEngine.playGentleChime(640, 1.5);
    setIsReframingDone(true);
  };

  const handleResetSecondary = () => {
    setAntText('');
    setSelectedDistortion('catastrophizing');
    setEvidenceFor('');
    setEvidenceAgainst('');
    setBalancedReframe('');
    setIsReframingDone(false);
  };

  // Primary UI: Worry Cloud Release
  if (level === 'primary') {
    const quickMantras = [
      'I am stronger than my worries! 🦁',
      'Mistakes help my brain grow! 🌱',
      'I am safe and loved right now. 💖',
      'This feeling is just passing by like a cloud. ⛅',
      'I will take it one little step at a time. 🐢'
    ];

    if (isCloudPopped) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-md text-center animate-in fade-in zoom-in-95">
            <div className="w-24 h-24 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-5xl mx-auto mb-4 animate-bounce">
              🌈
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The Worry Drifted Away!
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-md mx-auto">
              Your worry cloud has transformed into a bright rainbow. You don't have to carry that heavy thought anymore.
            </p>

            <div className="mt-6 p-5 bg-gradient-to-r from-amber-50 via-teal-50 to-sky-50 rounded-2xl border border-amber-200 text-center max-w-md mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Your Courage Shield:
              </span>
              <p className="text-base font-bold text-slate-900">
                "{courageMantra || 'I am brave and doing my best every day!'}"
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xs"
                >
                  Return to Dashboard
                </button>
              )}
              <button
                onClick={handleResetPrimary}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Let Go of Another Worry</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          ) : <div />}
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
            Worry Cloud Release 🎈
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Put Your Worry in a Cloud
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              When a worry feels too big inside your head, typing it down helps take its power away!
            </p>
          </div>

          {/* Cloud Animation Canvas */}
          <div className="my-6 min-h-[160px] flex items-center justify-center relative">
            <div 
              className={`p-6 rounded-3xl transition-all duration-1000 flex flex-col items-center justify-center max-w-sm w-full text-center border shadow-xs ${
                isCloudFloating
                  ? '-translate-y-24 opacity-0 scale-75 bg-slate-300 border-slate-400'
                  : 'bg-slate-100 border-slate-300'
              }`}
            >
              <span className="text-4xl mb-2">☁️</span>
              <p className="text-xs sm:text-sm text-slate-700 italic">
                {worryText || 'Your worry will sit inside this cloud...'}
              </p>
            </div>
          </div>

          {!isCloudFloating && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  1. What is worrying you right now?
                </label>
                <textarea
                  value={worryText}
                  onChange={(e) => setWorryText(e.target.value)}
                  placeholder="e.g. I am scared about the math test tomorrow..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden text-sm bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  2. Pick a Courage Superpower Phrase:
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {quickMantras.map((m, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCourageMantra(m)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border text-left transition-all ${
                        courageMantra === m 
                          ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={courageMantra}
                  onChange={(e) => setCourageMantra(e.target.value)}
                  placeholder="Or write your own courage phrase..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900"
                />
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReleasePrimaryWorry}
                  disabled={!worryText.trim()}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xs ${
                    worryText.trim()
                      ? 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Release Cloud into the Sky! 🚀</span>
                </button>
              </div>
            </div>
          )}

          {isCloudFloating && (
            <div className="text-center py-6">
              <span className="inline-block animate-spin text-3xl mb-2">✨</span>
              <p className="font-bold text-slate-800 text-base">Releasing worry into the breeze...</p>
              <p className="text-xs text-slate-500 mt-1">Take a slow, deep breath in and blow gently!</p>
            </div>
          )}

        </div>

      </div>
    );
  }

  // Secondary UI: CBT Cognitive Reframer
  const activeDistortionObj = COGNITIVE_DISTORTIONS.find(d => d.id === selectedDistortion) || COGNITIVE_DISTORTIONS[0];

  if (isReframingDone) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-md animate-in fade-in zoom-in-95">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Cognitive Reframe Complete
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              You just shifted from an emotional adrenaline loop to objective, balanced reality testing.
            </p>
          </div>

          <div className="space-y-4 my-6">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-1">
                Old Automatic Thought (Unbalanced):
              </span>
              <p className="text-sm text-rose-950 italic">
                "{antText}"
              </p>
              <span className="inline-block mt-2 text-xs font-semibold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-md">
                Distortion: {activeDistortionObj.name}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block mb-1">
                New Grounded Reframe (Evidence-Based):
              </span>
              <p className="text-sm font-semibold text-teal-950">
                "{balancedReframe || activeDistortionObj.reframe}"
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xs"
              >
                Return to Dashboard
              </button>
            )}
            <button
              onClick={handleResetSecondary}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reframe Another Thought</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        ) : <div />}
        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
          CBT Cognitive Restructuring
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Cognitive Reframing Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Anxiety often feeds on mental distortions. Break the feedback loop with three grounded clinical steps.
          </p>
        </div>

        {/* Step 1: Automatic Thought */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
            Step 1 · Catch the Automatic Negative Thought (ANT)
          </label>
          <textarea
            value={antText}
            onChange={(e) => setAntText(e.target.value)}
            placeholder="e.g. If I don't get an A on this physics exam, my GPA is wrecked and my teachers will think I'm lazy..."
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden text-sm bg-white text-slate-900"
          />
        </div>

        {/* Step 2: Choose Distortion */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Step 2 · Identify the Cognitive Distortion
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {COGNITIVE_DISTORTIONS.map(dist => {
              const isSelected = selectedDistortion === dist.id;
              return (
                <button
                  key={dist.id}
                  type="button"
                  onClick={() => setSelectedDistortion(dist.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected 
                      ? 'border-indigo-600 bg-indigo-50/70 font-semibold shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {dist.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {dist.definition}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Distortion Insight Box */}
          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-800">Classic Example:</span> {activeDistortionObj.example}
          </div>
        </div>

        {/* Step 3: Balanced Reframe */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Step 3 · Formulate Balanced Reality Reframe
            </label>
            <button
              type="button"
              onClick={() => setBalancedReframe(activeDistortionObj.reframe)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Use Suggested Template
            </button>
          </div>
          <textarea
            value={balancedReframe}
            onChange={(e) => setBalancedReframe(e.target.value)}
            placeholder="Write a grounded, objective statement that balances the catastrophe with realistic facts..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-hidden text-sm bg-white text-slate-900"
          />
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleFinishSecondary}
            disabled={!antText.trim()}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
              antText.trim()
                ? 'bg-teal-700 hover:bg-teal-800 text-white active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Lock in Balanced Reframe</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
