import React, { useState, useEffect } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Save, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Edit3, 
  Check, 
  Compass 
} from 'lucide-react';
import { StudentLevel, CalmActionPlan } from '../../types';
import { getSavedCalmPlan, saveCalmPlan } from '../../utils/storage';

interface CalmPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: StudentLevel;
  defaultStudentName?: string;
  defaultArchetype?: string;
  defaultTriggers?: string[];
}

export const CalmPlanModal: React.FC<CalmPlanModalProps> = ({
  isOpen,
  onClose,
  level,
  defaultStudentName = '',
  defaultArchetype = '',
  defaultTriggers = []
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [plan, setPlan] = useState<CalmActionPlan>({
    studentName: defaultStudentName || '',
    level,
    archetypeName: defaultArchetype || (level === 'primary' ? 'Wise Owl' : 'Analytical Strategist'),
    topTriggers: defaultTriggers.length > 0 ? defaultTriggers : ['Quizzes / Exams', 'Being Rushed'],
    calmingStrategies: [
      level === 'primary' ? 'Magic Balloon Breathing (3 slow breaths)' : 'Tactical Box Breathing (4-4-4-4)',
      '5-4-3-2-1 Sensory Grounding (spotting details around the room)',
      'Sipping cold water & stretching my shoulders'
    ],
    safePersonName: '',
    safePersonContact: '',
    favoriteSafePlace: level === 'primary' ? 'My cozy bed / School library' : 'Quiet library desk / Outdoor park bench',
    empowermentMantra: level === 'primary' 
      ? 'I am brave, capable, and doing my best every single day.'
      : 'Anxiety is just a wave. I have the tools and calm to ride it through.'
  });

  useEffect(() => {
    if (isOpen) {
      const existing = getSavedCalmPlan();
      if (existing) {
        setPlan(existing);
      } else {
        setPlan(prev => ({
          ...prev,
          studentName: defaultStudentName || prev.studentName,
          archetypeName: defaultArchetype || prev.archetypeName,
          level
        }));
      }
    }
  }, [isOpen, defaultStudentName, defaultArchetype, level]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveCalmPlan(plan);
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8 print:m-0 print:p-4 print:shadow-none print:border-none">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">My Calm Action Plan</h3>
              <p className="text-xs text-slate-500">Your personalized emergency grounding pocket card</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Done Editing' : 'Edit Plan'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Container */}
        <div className="border-2 border-dashed border-teal-300 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-teal-50/40 via-white to-sky-50/30">
          
          {/* Card Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-100 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-md">
                  {plan.level === 'primary' ? 'Junior Calm Passport' : 'Student Resilience Plan'}
                </span>
                <span className="text-xs text-slate-400">· Private Card</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                {plan.studentName ? `${plan.studentName}'s Calm Plan` : 'My Personal Calm Plan'}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Personality Archetype:</span>
              <span className="font-bold text-slate-800 text-sm">{plan.archetypeName}</span>
            </div>
          </div>

          {/* Form Fields / Readout */}
          <div className="space-y-4">
            
            {/* Top Triggers */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                ⚠️ Situations that Trigger My Anxiety:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={plan.topTriggers.join(', ')}
                  onChange={(e) => setPlan(p => ({ ...p, topTriggers: e.target.value.split(',').map(s => s.trim()) }))}
                  className="w-full text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-slate-300"
                  placeholder="e.g. Math quizzes, Public speaking, High homework"
                />
              ) : (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {plan.topTriggers.map((trig, idx) => (
                    <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {trig}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* My 3 Emergency Calming Strategies */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <label className="block text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
                🛡️ My Top 3 Calming Strategies (Do These in Order):
              </label>
              {isEditing ? (
                <div className="space-y-2">
                  {plan.calmingStrategies.map((strat, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={strat}
                      onChange={(e) => {
                        const updated = [...plan.calmingStrategies];
                        updated[idx] = e.target.value;
                        setPlan(p => ({ ...p, calmingStrategies: updated }));
                      }}
                      className="w-full text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-slate-300"
                    />
                  ))}
                </div>
              ) : (
                <ol className="space-y-2">
                  {plan.calmingStrategies.map((strat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <span>{strat}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Safe Support Person */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  🤝 My Safe Person to Talk To:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={plan.safePersonName}
                    onChange={(e) => setPlan(p => ({ ...p, safePersonName: e.target.value }))}
                    placeholder="e.g. Mom, Dad, Mr. Davis (Counselor)"
                    className="w-full text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-slate-300"
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    {plan.safePersonName || 'School Counselor / Parent / Trusted Friend'}
                  </p>
                )}
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  🌿 My Safe Physical Space:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={plan.favoriteSafePlace}
                    onChange={(e) => setPlan(p => ({ ...p, favoriteSafePlace: e.target.value }))}
                    className="w-full text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-slate-300"
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    {plan.favoriteSafePlace}
                  </p>
                )}
              </div>
            </div>

            {/* Power Mantra */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500 to-indigo-600 text-white text-center shadow-xs">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-100 block mb-1">
                ⭐ My Core Empowerment Truth:
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={plan.empowermentMantra}
                  onChange={(e) => setPlan(p => ({ ...p, empowermentMantra: e.target.value }))}
                  className="w-full text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-white/20 border border-white/40 text-white placeholder:text-white/70"
                />
              ) : (
                <blockquote className="font-bold text-sm sm:text-base italic">
                  "{plan.empowermentMantra}"
                </blockquote>
              )}
            </div>

          </div>

          {/* Footer Card Signature */}
          <div className="mt-6 pt-4 border-t border-teal-100 flex items-center justify-between text-xs text-slate-400">
            <span>MindHarbor Student Wellness Hub</span>
            <span>Valid anytime you need to remember your calm</span>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>Saved to this device!</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Action Plan</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
