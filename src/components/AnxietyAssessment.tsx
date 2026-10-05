import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  Sparkles, 
  Check, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { 
  StudentLevel, 
  PersonalityArchetype, 
  AnxietyResult, 
  AnxietySeverity 
} from '../types';
import { 
  PRIMARY_ANXIETY_QUESTIONS, 
  PRIMARY_TRIGGERS 
} from '../data/primaryData';
import { 
  SECONDARY_ANXIETY_QUESTIONS, 
  SECONDARY_TRIGGERS 
} from '../data/secondaryData';
import { soundEngine } from '../utils/audio';

interface AnxietyAssessmentProps {
  level: StudentLevel;
  studentName?: string;
  archetype: PersonalityArchetype;
  onComplete: (result: AnxietyResult) => void;
  onBack: () => void;
}

export const AnxietyAssessment: React.FC<AnxietyAssessmentProps> = ({
  level,
  studentName,
  archetype,
  onComplete,
  onBack
}) => {
  const questions = level === 'primary' ? PRIMARY_ANXIETY_QUESTIONS : SECONDARY_ANXIETY_QUESTIONS;
  const triggersList = level === 'primary' ? PRIMARY_TRIGGERS : SECONDARY_TRIGGERS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [stepPhase, setStepPhase] = useState<'questions' | 'triggers'>('questions');

  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const primaryOptions = [
    { value: 0, label: 'Hardly Ever', sub: 'Sunny & calm', emoji: '☀️' },
    { value: 1, label: 'Sometimes', sub: 'A little breezy', emoji: '⛅' },
    { value: 2, label: 'A Lot', sub: 'Rainy storm', emoji: '🌧️' }
  ];

  const secondaryOptions = [
    { value: 0, label: 'Not at all', sub: '0–1 day in past 2 weeks' },
    { value: 1, label: 'Several days', sub: 'A few times a week' },
    { value: 2, label: 'More than half the days', sub: 'Frequently happens' },
    { value: 3, label: 'Nearly every day', sub: 'Almost constant feeling' }
  ];

  const handleSelectScore = (val: number) => {
    soundEngine.playGentleChime(640, 0.3);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: val
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStepPhase('triggers');
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleTrigger = (triggerId: string) => {
    setSelectedTriggers(prev => 
      prev.includes(triggerId) 
        ? prev.filter(t => t !== triggerId) 
        : [...prev, triggerId]
    );
  };

  const calculateResults = () => {
    const rawScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = level === 'primary' ? questions.length * 2 : questions.length * 3;

    let severity: AnxietySeverity = 'minimal';
    let headline = '';
    let interpretation = '';
    let supportAdvice = '';

    if (level === 'primary') {
      if (rawScore <= 3) {
        severity = 'minimal';
        headline = 'Sunny Skies · Feeling Calm & Steady';
        interpretation = 'Your feelings weather is mostly sunny! You generally feel safe, confident, and your tummy is relaxed.';
        supportAdvice = 'Keep practicing friendly breathing to maintain your calm superpower!';
      } else if (rawScore <= 6) {
        severity = 'mild';
        headline = 'Passing Clouds · A Few Worries';
        interpretation = 'Like light clouds drifting across a blue sky, you have some worries once in a while. That is very normal!';
        supportAdvice = 'Learning simple balloon breaths will help blow those passing clouds away.';
      } else if (rawScore <= 9) {
        severity = 'moderate';
        headline = 'Breezy Weather · Worries Need Attention';
        interpretation = 'Your worry engine is running hot right now. Your body and mind are feeling a bit tired from carrying these feelings.';
        supportAdvice = 'Your personalized coping tools will help you feel safe. Don\'t forget to share with a trusted adult!';
      } else {
        severity = 'elevated';
        headline = 'Stormy Weather · Lots of Big Feelings';
        interpretation = 'You have been carrying very heavy rainy feelings lately. You don\'t have to weather this storm alone.';
        supportAdvice = 'We strongly recommend talking with a kind teacher, parent, or school counselor. You deserve help and care.';
      }
    } else {
      // Secondary scoring
      if (rawScore <= 4) {
        severity = 'minimal';
        headline = 'Minimal Anxiety · Well-Regulated Baseline';
        interpretation = 'Your anxiety levels are currently within a manageable, adaptive range. You possess strong foundational equilibrium.';
        supportAdvice = 'Maintain your routines, protect sleep rhythms, and use quick grounding when academic crunches arrive.';
      } else if (rawScore <= 9) {
        severity = 'mild';
        headline = 'Mild Stress & Tension · Periodic Spikes';
        interpretation = 'You are experiencing intermittent situational anxiety, likely tied to school deadlines, social rhythms, or performance expectations.';
        supportAdvice = 'Incorporate tactical Box Breathing and cognitive reframing to stop minor worries from snowballing.';
      } else if (rawScore <= 14) {
        severity = 'moderate';
        headline = 'Moderate Anxiety · Heightened Nervous System Load';
        interpretation = 'Your nervous system is operating on sustained alert. Physical tension, overthinking, or sleep disruptions are impacting your day-to-day comfort.';
        supportAdvice = 'Active coping rituals (CBT thought records, progressive relaxation) and talking with a school counselor can provide immense relief.';
      } else {
        severity = 'elevated';
        headline = 'Elevated Anxiety · Significant Mental & Physical Drain';
        interpretation = 'Your anxiety is at a high intensity, causing notable distress and emotional fatigue. You are working very hard just to get through each day.';
        supportAdvice = 'We warmly encourage reaching out to a school counselor, trusted teacher, or mental health specialist. Support is available and you do not have to carry this alone.';
      }
    }

    onComplete({
      score: rawScore,
      maxScore,
      severity,
      headline,
      interpretation,
      primaryTriggers: selectedTriggers,
      supportAdvice
    });
  };

  const selectedAnswer = answers[currentQuestion?.id];

  // Triggers Selection Screen
  if (stepPhase === 'triggers') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          
          <div className="mb-6">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 mb-2">
              Step 2B · Identifying Specific Triggers
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              What sparks your worry engine?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Select any situations that tend to trigger anxiety, stress, or butterflies for you (pick as many as apply).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {triggersList.map(item => {
              const isChecked = selectedTriggers.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleTrigger(item.id)}
                  className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                    isChecked
                      ? 'border-teal-600 bg-teal-50/70 font-semibold text-teal-900 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {'emoji' in item && <span className="text-xl">{item.emoji}</span>}
                    <span className="text-xs sm:text-sm">{item.label}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                    isChecked ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStepPhase('questions')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Questions</span>
            </button>

            <button
              type="button"
              onClick={calculateResults}
              className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <span>Build My Personalized Coping Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Questions Screen
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Header & Back */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
          <button 
            onClick={onBack}
            className="flex items-center gap-1 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Personality Profile</span>
          </button>
          <span>
            Question {currentIndex + 1} of {questions.length} ({progressPercent}%)
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
          <div 
            className="h-full bg-sky-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-sky-50 text-sky-700">
              Step 2 · Feelings & Worries Check
            </span>
            <span className="text-xs text-slate-400 capitalize">
              ({currentQuestion.category} domain)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h2>
          {currentQuestion.subtext && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {currentQuestion.subtext}
            </p>
          )}
        </div>

        {/* Options */}
        {level === 'primary' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {primaryOptions.map(opt => {
              const isSelected = selectedAnswer === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelectScore(opt.value)}
                  className={`p-5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 group ${
                    isSelected 
                      ? 'border-sky-500 bg-sky-50/70 shadow-xs' 
                      : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {opt.emoji}
                  </span>
                  <div>
                    <div className={`font-bold text-sm ${isSelected ? 'text-sky-900' : 'text-slate-800'}`}>
                      {opt.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {opt.sub}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs mt-1">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {secondaryOptions.map(opt => {
              const isSelected = selectedAnswer === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelectScore(opt.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left flex items-center justify-between gap-4 transition-all ${
                    isSelected 
                      ? 'border-sky-600 bg-sky-50/60 shadow-xs' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className={`text-sm sm:text-base font-semibold ${isSelected ? 'text-sky-900' : 'text-slate-800'}`}>
                      {opt.label}
                    </div>
                    <div className="text-xs text-slate-500">
                      {opt.sub}
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevQuestion}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed text-slate-400' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNextQuestion}
            disabled={selectedAnswer === undefined}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs ${
              selectedAnswer !== undefined
                ? 'bg-sky-700 hover:bg-sky-800 text-white active:scale-95' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{currentIndex === questions.length - 1 ? 'Go to Stress Triggers' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Gentle educational note */}
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 justify-center">
        <ShieldCheck className="w-4 h-4 text-slate-400" />
        <span>Answers are 100% private to your device. There are no "bad" scores.</span>
      </div>

    </div>
  );
};
