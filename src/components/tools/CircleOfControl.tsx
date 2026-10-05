import React, { useState } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  X,
  Target,
  Wind
} from 'lucide-react';
import { StudentLevel } from '../../types';
import { soundEngine } from '../../utils/audio';

interface CircleOfControlProps {
  level: StudentLevel;
  onBack?: () => void;
}

interface Item {
  id: number;
  text: string;
  isControl: boolean;
  explanation: string;
}

export const CircleOfControl: React.FC<CircleOfControlProps> = ({ level, onBack }) => {
  const items: Item[] = level === 'primary' 
    ? [
        { id: 1, text: 'How hard I try on my homework', isControl: true, explanation: 'You can choose your effort!' },
        { id: 2, text: 'If it rains on field trip day', isControl: false, explanation: 'The weather does what it wants.' },
        { id: 3, text: 'Taking deep balloon breaths when mad', isControl: true, explanation: 'You control your own breath.' },
        { id: 4, text: 'Whether a classmate is in a grumpy mood', isControl: false, explanation: 'Their mood belongs to them, not you.' },
        { id: 5, text: 'Asking a teacher or parent for help', isControl: true, explanation: 'You can always raise your hand or ask.' },
        { id: 6, text: 'What other kids say during recess', isControl: false, explanation: 'You cannot control other people\'s mouths.' },
        { id: 7, text: 'Being kind to myself when I make a mistake', isControl: true, explanation: 'You can choose to be gentle to yourself.' }
      ]
    : [
        { id: 1, text: 'My preparation, study schedule, and sleep timing', isControl: true, explanation: 'You control your daily discipline and habits.' },
        { id: 2, text: 'The specific questions chosen for the final exam', isControl: false, explanation: 'Curriculum exam questions are set by educators.' },
        { id: 3, text: 'Setting healthy screen and notification boundaries', isControl: true, explanation: 'You decide when to silence devices.' },
        { id: 4, text: 'Other students\' opinions, rumors, or peer gossip', isControl: false, explanation: 'Others\' perceptions are filtered through their own biases.' },
        { id: 5, text: 'How I speak to myself when facing setbacks', isControl: true, explanation: 'Your inner narrative is yours to reframe.' },
        { id: 6, text: 'College admissions decisions or grading curves', isControl: false, explanation: 'Institutional decisions are beyond individual control.' },
        { id: 7, text: 'Proactively communicating with teachers before deadlines', isControl: true, explanation: 'Self-advocacy is completely in your hands.' },
        { id: 8, text: 'Past mistakes or grades from last semester', isControl: false, explanation: 'The past is immutable; focus present effort.' }
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedInControl, setSortedInControl] = useState<Item[]>([]);
  const [sortedOutOfControl, setSortedOutOfControl] = useState<Item[]>([]);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentItem = items[currentIndex];
  const isFinished = currentIndex >= items.length;

  const handleClassify = (choseControl: boolean) => {
    if (!currentItem) return;

    const isCorrect = choseControl === currentItem.isControl;
    if (isCorrect) {
      soundEngine.playGentleChime(700, 0.4);
    } else {
      soundEngine.playGentleChime(400, 0.4);
    }

    setLastFeedback({
      isCorrect,
      text: currentItem.explanation
    });

    if (choseControl) {
      setSortedInControl(prev => [...prev, currentItem]);
    } else {
      setSortedOutOfControl(prev => [...prev, currentItem]);
    }

    setTimeout(() => {
      setLastFeedback(null);
      setCurrentIndex(prev => prev + 1);
    }, 1100);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSortedInControl([]);
    setSortedOutOfControl([]);
    setLastFeedback(null);
  };

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
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
          Perspective Shift Tool
        </span>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center">
          
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Card {currentIndex + 1} of {items.length}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Circle of Control: Is this within your power?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              When we stop stressing over what we cannot change, we free up energy for what we can!
            </p>
          </div>

          {/* Current Card */}
          <div className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-white border-2 border-slate-200 shadow-sm max-w-lg mx-auto">
            <p className="text-lg sm:text-xl font-bold text-slate-800">
              "{currentItem.text}"
            </p>

            {lastFeedback && (
              <div className={`mt-4 p-2.5 rounded-xl text-xs sm:text-sm font-semibold animate-in fade-in ${
                lastFeedback.isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
              }`}>
                {lastFeedback.isCorrect ? '✓ Spot on! ' : '💡 Good thought: '}
                {lastFeedback.text}
              </div>
            )}
          </div>

          {/* Action Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => handleClassify(true)}
              className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 hover:bg-emerald-100/70 text-emerald-900 font-bold flex flex-col items-center gap-1 transition-all active:scale-95 shadow-xs"
            >
              <Target className="w-6 h-6 text-emerald-600" />
              <span className="text-sm sm:text-base">In My Control 🎯</span>
              <span className="text-xs font-normal text-emerald-700">I have the power to shape this</span>
            </button>

            <button
              type="button"
              onClick={() => handleClassify(false)}
              className="p-4 rounded-2xl border-2 border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold flex flex-col items-center gap-1 transition-all active:scale-95 shadow-xs"
            >
              <Wind className="w-6 h-6 text-slate-500" />
              <span className="text-sm sm:text-base">Out of My Control 🍃</span>
              <span className="text-xs font-normal text-slate-600">Release and let it go</span>
            </button>
          </div>

        </div>
      ) : (
        /* Finished View: Visual Circles of Control */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto mb-3">
              🎯
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Your Personal Map of Clarity
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-lg mx-auto">
              Whenever you feel overwhelmed, look at this list. Put 100% of your energy into the green box, and take a deep breath to release the grey box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* In Control Column */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-emerald-700" />
                <span>Inside My Control (Focus My Energy)</span>
              </h3>
              <ul className="space-y-2">
                {sortedInControl.map((it, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-white text-xs sm:text-sm text-emerald-950 font-medium border border-emerald-100 shadow-xs flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outside Control Column */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
                <Wind className="w-4 h-4 text-slate-500" />
                <span>Outside My Control (Consciously Release)</span>
              </h3>
              <ul className="space-y-2">
                {sortedOutOfControl.map((it, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-white text-xs sm:text-sm text-slate-600 border border-slate-200 shadow-xs flex items-center gap-2">
                    <span className="text-slate-400 text-xs shrink-0">🍃</span>
                    <span>{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xs"
              >
                Return to Coping Dashboard
              </button>
            )}
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sort Again</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
