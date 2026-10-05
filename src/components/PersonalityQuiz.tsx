import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Check, 
  RotateCcw,
  Star
} from 'lucide-react';
import { StudentLevel, PersonalityArchetype, QuizQuestion } from '../types';
import { PRIMARY_ARCHETYPES, PRIMARY_QUIZ_QUESTIONS } from '../data/primaryData';
import { SECONDARY_ARCHETYPES, SECONDARY_QUIZ_QUESTIONS } from '../data/secondaryData';
import { soundEngine } from '../utils/audio';

interface PersonalityQuizProps {
  level: StudentLevel;
  studentName?: string;
  onComplete: (archetype: PersonalityArchetype) => void;
  onCancel: () => void;
}

export const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({
  level,
  studentName,
  onComplete,
  onCancel
}) => {
  const questions: QuizQuestion[] = level === 'primary' ? PRIMARY_QUIZ_QUESTIONS : SECONDARY_QUIZ_QUESTIONS;
  const archetypes: PersonalityArchetype[] = level === 'primary' ? PRIMARY_ARCHETYPES : SECONDARY_ARCHETYPES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [calculatedArchetype, setCalculatedArchetype] = useState<PersonalityArchetype | null>(null);

  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleSelectOption = (archetypeId: string) => {
    soundEngine.playGentleChime(580, 0.4);
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: archetypeId
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    // Count frequencies
    const counts: Record<string, number> = {};
    Object.values(selectedAnswers).forEach(archId => {
      counts[archId] = (counts[archId] || 0) + 1;
    });

    let topArchId = archetypes[0].id;
    let maxCount = -1;

    for (const [archId, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        topArchId = archId;
      }
    }

    const matched = archetypes.find(a => a.id === topArchId) || archetypes[0];
    setCalculatedArchetype(matched);
    soundEngine.playGentleChime(784, 1.5);
  };

  // If result calculated, show celebration & confirmation screen
  if (calculatedArchetype) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 text-center relative overflow-hidden animate-in fade-in zoom-in-95">
          
          {/* Subtle top banner background */}
          <div 
            className="absolute top-0 left-0 right-0 h-32 opacity-15"
            style={{ backgroundColor: calculatedArchetype.accentColor }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: `${calculatedArchetype.accentColor}18`, color: calculatedArchetype.accentColor }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personality Archetype Discovered</span>
            </div>

            <div className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-5xl shadow-sm mb-4 bg-slate-50 border border-slate-200">
              {calculatedArchetype.emoji}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {studentName ? `${studentName}, you are ` : 'You are '}{' '}
              <span style={{ color: calculatedArchetype.accentColor }}>
                {calculatedArchetype.name}
              </span>
            </h2>
            <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1">
              "{calculatedArchetype.title}"
            </p>

            <p className="mt-4 text-slate-700 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              {calculatedArchetype.description}
            </p>

            {/* Strengths Grid */}
            <div className="mt-6 text-left max-w-lg mx-auto bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span>Your Core Superpowers</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {calculatedArchetype.strengths.map((str, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600">
                <strong className="text-slate-800">Best way to recharge:</strong> {calculatedArchetype.rechargeMethod}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="mt-6 italic text-xs sm:text-sm text-slate-500">
              "{calculatedArchetype.quote}"
            </blockquote>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onComplete(calculatedArchetype)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span>Continue to Step 2: Feelings Check</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCalculatedArchetype(null);
                  setCurrentIndex(0);
                  setSelectedAnswers({});
                }}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium flex items-center justify-center gap-1.5 text-xs sm:text-sm transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  const selectedCurrent = selectedAnswers[currentQuestion.id];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Progress & Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
          <button 
            onClick={onCancel}
            className="flex items-center gap-1 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Level Choice</span>
          </button>
          <span>
            Question {currentIndex + 1} of {questions.length} ({progressPercent}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
          <div 
            className="h-full bg-teal-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="text-center sm:text-left mb-6">
          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 mb-2">
            Step 1 · Personality Strengths
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h2>
          {currentQuestion.subtext && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {currentQuestion.subtext}
            </p>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedCurrent === opt.archetypeId;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(opt.archetypeId)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between gap-4 group ${
                  isSelected 
                    ? 'border-teal-600 bg-teal-50/70 shadow-xs' 
                    : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50/80 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {opt.emoji && (
                    <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {opt.emoji}
                    </span>
                  )}
                  <span className={`text-sm sm:text-base font-medium ${isSelected ? 'text-teal-900 font-semibold' : 'text-slate-800'}`}>
                    {opt.text}
                  </span>
                </div>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Bottom */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
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
            onClick={handleNext}
            disabled={!selectedCurrent}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs ${
              selectedCurrent 
                ? 'bg-teal-700 hover:bg-teal-800 text-white active:scale-95' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{currentIndex === questions.length - 1 ? 'Reveal My Strengths' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
