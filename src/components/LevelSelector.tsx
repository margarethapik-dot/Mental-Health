import React from 'react';
import { 
  Sparkles, 
  Compass, 
  Smile, 
  ShieldCheck, 
  ArrowRight, 
  Heart, 
  Brain, 
  Wind,
  CheckCircle2
} from 'lucide-react';
import { StudentLevel } from '../types';

interface LevelSelectorProps {
  currentLevel: StudentLevel;
  onSelectLevelAndStart: (level: StudentLevel, name?: string) => void;
  studentName: string;
  onNameChange: (name: string) => void;
  onQuickExploreTools: () => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  currentLevel,
  onSelectLevelAndStart,
  studentName,
  onNameChange,
  onQuickExploreTools
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Safe · Confidential · Student Mental Wellness</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Find Your Strengths. <br />
          <span className="bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
            Tame Your Worries.
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Every student thinks, feels, and experiences stress differently. Discover your personality archetype, measure your anxiety in a supportive space, and get hands-on tools designed specifically for you.
        </p>

        {/* Optional Name Input */}
        <div className="mt-6 max-w-md mx-auto">
          <label htmlFor="student-name" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
            Your First Name or Nickname (Optional)
          </label>
          <input
            id="student-name"
            type="text"
            value={studentName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Maya, Leo, Alex..."
            maxLength={25}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-hidden transition text-slate-900 text-center font-medium bg-white placeholder:text-slate-400"
          />
          <p className="text-xs text-slate-400 mt-1">
            Stored only on this device. Never sent to third parties or shared without your permission.
          </p>
        </div>
      </div>

      {/* Level Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
        
        {/* Primary Level Card */}
        <div 
          onClick={() => onSelectLevelAndStart('primary', studentName)}
          className={`cursor-pointer rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300 relative flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 ${
            currentLevel === 'primary' 
              ? 'border-amber-400 bg-gradient-to-b from-amber-50/70 to-white shadow-md' 
              : 'border-slate-200 bg-white hover:border-amber-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shadow-xs">
                🎈
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                Ages 7 – 11 · Grades 1–6
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span>Primary Level</span>
              <span className="text-xl">🌟</span>
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Friendly and fun! Explore your animal superhero strengths, check your feelings weather, and pop worried clouds with easy magic tools.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Animal Archetypes:</strong> Owl, Lion, Dolphin, Turtle...</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Feelings Weather:</strong> Sunny, Breezy, or Rainy storm meter</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Magic Coping:</strong> Balloon breathing, Starfish tracing, Worry cloud release</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <button
              type="button"
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>Start Primary Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary Level Card */}
        <div 
          onClick={() => onSelectLevelAndStart('secondary', studentName)}
          className={`cursor-pointer rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300 relative flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 ${
            currentLevel === 'secondary' 
              ? 'border-teal-500 bg-gradient-to-b from-teal-50/50 to-white shadow-md' 
              : 'border-slate-200 bg-white hover:border-teal-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center text-3xl shadow-xs">
                🧭
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
                Ages 12 – 18 · Grades 7–12
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span>Secondary Level</span>
              <span className="text-xl">⚡</span>
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Dignified & evidence-informed. Discover your cognitive work style, assess anxiety triggers (academics, social, future), and learn tactical self-regulation.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Cognitive Profiles:</strong> Strategist, Connector, Visionary, Anchor...</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Anxiety & Stress Screen:</strong> GAD-informed adolescent assessment</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Targeted Toolkit:</strong> Tactical Box Breathing, CBT Reframer, Circle of Control</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <button
              type="button"
              className="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>Start Secondary Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Reassurance Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-800">Supportive & Non-Diagnostic</h4>
            <p className="text-xs text-slate-500">
              This is a personal reflection tool to build self-awareness and emotional strength. It does not replace medical or mental health care.
            </p>
          </div>
        </div>
        <button
          onClick={onQuickExploreTools}
          className="shrink-0 text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1"
        >
          <span>Jump straight to Coping Tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
