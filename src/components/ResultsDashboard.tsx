import React, { useState } from 'react';
import { 
  Sparkles, 
  Wind, 
  Heart, 
  Brain, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  Save, 
  Check, 
  Printer, 
  RotateCcw, 
  Activity,
  Smile,
  Compass,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { 
  StudentLevel, 
  PersonalityArchetype, 
  AnxietyResult, 
  CopingResource 
} from '../types';
import { PRIMARY_COPING_TOOLS } from '../data/primaryData';
import { SECONDARY_COPING_TOOLS } from '../data/secondaryData';
import { saveCheckin } from '../utils/storage';
import { soundEngine } from '../utils/audio';

interface ResultsDashboardProps {
  level: StudentLevel;
  studentName?: string;
  archetype: PersonalityArchetype;
  anxietyResult: AnxietyResult;
  onLaunchTool: (toolId: string) => void;
  onOpenCalmPlan: () => void;
  onOpenCounselorHelp: () => void;
  onRestart: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  level,
  studentName,
  archetype,
  anxietyResult,
  onLaunchTool,
  onOpenCalmPlan,
  onOpenCounselorHelp,
  onRestart
}) => {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const tools = level === 'primary' ? PRIMARY_COPING_TOOLS : SECONDARY_COPING_TOOLS;

  const handleSaveToHistory = () => {
    soundEngine.playGentleChime(784, 1.2);
    saveCheckin({
      level,
      studentName,
      archetypeId: archetype.id,
      archetypeName: archetype.name,
      anxietyScore: anxietyResult.score,
      maxScore: anxietyResult.maxScore,
      severity: anxietyResult.severity,
      selectedTriggers: anxietyResult.primaryTriggers
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const severityBadgeColors = {
    minimal: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    mild: 'bg-teal-50 text-teal-800 border-teal-200',
    moderate: 'bg-amber-50 text-amber-800 border-amber-200',
    elevated: 'bg-rose-50 text-rose-800 border-rose-200'
  };

  // Why this personality gets stressed explanation
  const getPersonalityStressConnection = () => {
    if (level === 'primary') {
      return `Because you are a ${archetype.name}, your brain works very hard noticing details. Sometimes when things feel busy or unexpected, your internal alarm rings extra loud. That's not a weakness—it's your caring brain wanting to keep everything safe!`;
    }
    return `As a ${archetype.name}, your cognitive instinct is to seek high standards and structure. When external factors (like ambiguous expectations, crowded deadlines, or interpersonal dynamics) disrupt that harmony, your sympathetic nervous system initiates a fight-or-flight alert. Recognizing this pattern is the first step toward self-regulation.`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Top Banner & Name Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-start gap-4">
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-xs border border-slate-200"
              style={{ backgroundColor: `${archetype.accentColor}15` }}
            >
              {archetype.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md"
                  style={{ backgroundColor: `${archetype.accentColor}20`, color: archetype.accentColor }}
                >
                  {level === 'primary' ? 'Your Superhero Animal' : 'Cognitive Archetype'}
                </span>
                <span className="text-xs text-slate-400">· Results Synthesis</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {studentName ? `${studentName}'s Wellness Profile` : 'Your Wellness Profile'}
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">
                {archetype.name} · "{archetype.title}"
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:self-center">
            <button
              onClick={handleSaveToHistory}
              disabled={savedSuccess}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs ${
                savedSuccess 
                  ? 'bg-emerald-600 text-white cursor-default' 
                  : 'bg-teal-700 hover:bg-teal-800 text-white active:scale-95'
              }`}
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? 'Check-in Saved!' : 'Save Check-in Log'}</span>
            </button>

            <button
              onClick={onOpenCalmPlan}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-indigo-500" />
              <span>Calm Plan Card</span>
            </button>

            <button
              onClick={onRestart}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
              title="Start a new check-in"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Grid: Personality Insights & Anxiety Screen Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Left: Personality & Stress Profile */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              <Brain className="w-4 h-4 text-teal-600" />
              <span>How Your Brain Operates</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              {archetype.name} Strengths & Stress Signs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {archetype.description}
            </p>

            {/* Strengths */}
            <div className="mt-4">
              <span className="text-xs font-bold text-slate-700 block mb-1.5">Top Strengths:</span>
              <div className="flex flex-wrap gap-1.5">
                {archetype.strengths.map((str, idx) => (
                  <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-teal-50 text-teal-900 border border-teal-200">
                    ✨ {str}
                  </span>
                ))}
              </div>
            </div>

            {/* Stress signs */}
            <div className="mt-4">
              <span className="text-xs font-bold text-slate-700 block mb-1.5">Common Stress Signs:</span>
              <div className="flex flex-wrap gap-1.5">
                {archetype.stressSigns.map((sign, idx) => (
                  <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                    ⚠️ {sign}
                  </span>
                ))}
              </div>
            </div>

            {/* Psychological Connection */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="block text-slate-900 font-semibold mb-1">Why You Might Feel Stressed:</strong>
              {getPersonalityStressConnection()}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span><strong>Recharge ritual:</strong> {archetype.rechargeMethod}</span>
          </div>
        </div>

        {/* Right: Anxiety Score & Emotional Weather */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Activity className="w-4 h-4 text-sky-600" />
                <span>Anxiety & Feelings Check</span>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold capitalize ${severityBadgeColors[anxietyResult.severity]}`}>
                {anxietyResult.severity}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              {anxietyResult.headline}
            </h2>

            {/* Score Bar */}
            <div className="my-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>Worry Meter Score</span>
                <span className="font-bold text-slate-900">{anxietyResult.score} / {anxietyResult.maxScore}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    anxietyResult.severity === 'minimal' 
                      ? 'bg-emerald-500' 
                      : anxietyResult.severity === 'mild' 
                      ? 'bg-teal-500' 
                      : anxietyResult.severity === 'moderate' 
                      ? 'bg-amber-500' 
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.max(8, (anxietyResult.score / anxietyResult.maxScore) * 100)}%` }}
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {anxietyResult.interpretation}
            </p>

            {/* Identified triggers */}
            {anxietyResult.primaryTriggers && anxietyResult.primaryTriggers.length > 0 && (
              <div className="mt-4">
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  Your Primary Stress Triggers:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {anxietyResult.primaryTriggers.map((trig, idx) => (
                    <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                      🎯 {trig}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs sm:text-sm text-sky-950">
              <strong className="block text-sky-950 font-bold mb-1">Supportive Advice:</strong>
              {anxietyResult.supportAdvice}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Educational self-awareness tool · Non-diagnostic
            </span>
            <button
              onClick={onOpenCounselorHelp}
              className="text-xs font-semibold text-sky-700 hover:text-sky-800 underline"
            >
              Need to talk to someone?
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Personalized Coping Toolkit Section */}
      <div className="bg-gradient-to-b from-teal-50/50 via-white to-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h2 className="text-2xl font-extrabold text-slate-900">
                Your Personalized Coping Toolkit
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Interactive exercises selected to match your {archetype.name} style and current worry level. Tap any tool to begin!
            </p>
          </div>

          <button
            onClick={onOpenCalmPlan}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
          >
            <span>Generate Action Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Breathing */}
          <div 
            onClick={() => onLaunchTool('breathing')}
            className="cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform">
                🌬️
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                {level === 'primary' ? 'Magic Balloon Breathing' : 'Tactical Box & 4-7-8 Breathing'}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {level === 'primary' 
                  ? 'Gentle tummy balloon breaths to calm nervous butterflies with soothing chimes.' 
                  : 'Regulate autonomic nervous system, slow heart rate, and clear mental fog.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
              <span>{level === 'primary' ? '2–3 mins' : '3–4 mins'}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Start Breathing <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: 5-4-3-2-1 Grounding */}
          <div 
            onClick={() => onLaunchTool('grounding')}
            className="cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform">
                👀
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition-colors">
                {level === 'primary' ? '5-4-3-2-1 Sensory Safari' : '5-4-3-2-1 Somatosensory Anchoring'}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {level === 'primary'
                  ? 'Become a sensory detective! Spot colors, sounds, and nice feelings around you.'
                  : 'Interrupt an adrenaline flood by systematically engaging external sensory anchors.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
              <span>3 mins</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Senses <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3: Worry Release / CBT */}
          <div 
            onClick={() => onLaunchTool('worry-release')}
            className="cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform">
                {level === 'primary' ? '🎈' : '🧠'}
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
                {level === 'primary' ? 'Worry Cloud Release' : 'CBT Cognitive Reframer'}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {level === 'primary'
                  ? 'Put your worry into a cloud, blow it into the sky, and watch it turn into a rainbow!'
                  : 'Identify cognitive distortions (Catastrophizing, All-or-Nothing) and craft balanced truths.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
              <span>3–4 mins</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {level === 'primary' ? 'Float Worry' : 'Reframe Thought'} <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 4: Circle of Control */}
          <div 
            onClick={() => onLaunchTool('circle-control')}
            className="cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform">
                🎯
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                Circle of Control & Release
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Sort what you can change (your effort, sleep, breath) from what you must let go of (others' opinions, exam difficulty).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>2–3 mins</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Sort Stressors <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 5: Safe Communication / Counselor Bridge */}
          <div 
            onClick={onOpenCounselorHelp}
            className="cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform">
                💬
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-700 transition-colors">
                Teacher & Counselor Scripts
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Word-for-word scripts to ask for a quiet break, request an assignment extension, or talk to a trusted adult safely.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-700">
              <span>Instant</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Scripts <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 6: My Calm Action Plan */}
          <div 
            onClick={onOpenCalmPlan}
            className="cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform">
                📋
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                My Calm Action Plan
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Personalized pocket card ready to print or save with your safe person, top triggers, and superpower affirmations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
              <span>Printable</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Pocket Card <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
