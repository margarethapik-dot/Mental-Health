import React, { useState, useEffect } from 'react';
import { StudentLevel, PersonalityArchetype, AnxietyResult } from './types';
import { getSavedLevel, saveStudentLevel, getSavedStudentName, saveStudentName } from './utils/storage';
import { PRIMARY_ARCHETYPES } from './data/primaryData';
import { SECONDARY_ARCHETYPES } from './data/secondaryData';

import { Header } from './components/Header';
import { LevelSelector } from './components/LevelSelector';
import { PersonalityQuiz } from './components/PersonalityQuiz';
import { AnxietyAssessment } from './components/AnxietyAssessment';
import { ResultsDashboard } from './components/ResultsDashboard';

import { BreathingTool } from './components/tools/BreathingTool';
import { GroundingTool } from './components/tools/GroundingTool';
import { WorryReleaseTool } from './components/tools/WorryReleaseTool';
import { CircleOfControl } from './components/tools/CircleOfControl';
import { SosQuickCalmModal } from './components/tools/SosQuickCalmModal';
import { CalmPlanModal } from './components/tools/CalmPlanModal';
import { CounselorBridge } from './components/CounselorBridge';
import { CheckinHistoryModal } from './components/CheckinHistoryModal';

export default function App() {
  const [level, setLevel] = useState<StudentLevel>('primary');
  const [studentName, setStudentName] = useState<string>('');
  
  // Navigation / Phase
  const [currentStep, setCurrentStep] = useState<'intro' | 'personality' | 'anxiety' | 'results' | 'tool'>('intro');
  const [activeToolId, setActiveToolId] = useState<string>('breathing');

  // Assessment Results State
  const [archetype, setArchetype] = useState<PersonalityArchetype>(PRIMARY_ARCHETYPES[0]);
  const [anxietyResult, setAnxietyResult] = useState<AnxietyResult>({
    score: 4,
    maxScore: 12,
    severity: 'mild',
    headline: 'Passing Clouds · A Few Worries',
    interpretation: 'You have some worries once in a while. That is very normal and your coping tools will help you find calm.',
    primaryTriggers: ['Quizzes & Spelling Tests', 'Speaking in front of class'],
    supportAdvice: 'Practicing your belly breathing will help blow those passing clouds away!'
  });

  // Modal Dialogs
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isCalmPlanOpen, setIsCalmPlanOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isCounselorHelpOpen, setIsCounselorHelpOpen] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedLvl = getSavedLevel();
    if (savedLvl) {
      setLevel(savedLvl);
      setArchetype(savedLvl === 'primary' ? PRIMARY_ARCHETYPES[0] : SECONDARY_ARCHETYPES[0]);
    }
    const savedName = getSavedStudentName();
    if (savedName) {
      setStudentName(savedName);
    }
  }, []);

  const handleLevelChange = (newLevel: StudentLevel) => {
    setLevel(newLevel);
    saveStudentLevel(newLevel);
    setArchetype(newLevel === 'primary' ? PRIMARY_ARCHETYPES[0] : SECONDARY_ARCHETYPES[0]);
  };

  const handleSelectLevelAndStart = (selectedLevel: StudentLevel, name?: string) => {
    handleLevelChange(selectedLevel);
    if (name) {
      setStudentName(name);
      saveStudentName(name);
    }
    setCurrentStep('personality');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNameChange = (name: string) => {
    setStudentName(name);
    saveStudentName(name);
  };

  const handlePersonalityComplete = (discoveredArchetype: PersonalityArchetype) => {
    setArchetype(discoveredArchetype);
    setCurrentStep('anxiety');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnxietyComplete = (result: AnxietyResult) => {
    setAnxietyResult(result);
    setCurrentStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchTool = (toolId: string) => {
    setActiveToolId(toolId);
    setCurrentStep('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setCurrentStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      
      {/* Top Navigation */}
      <Header
        level={level}
        onLevelChange={handleLevelChange}
        onOpenSos={() => setIsSosOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenCalmPlan={() => setIsCalmPlanOpen(true)}
        onOpenCounselorHelp={() => setIsCounselorHelpOpen(true)}
        currentStep={currentStep}
        onNavigateHome={() => setCurrentStep('intro')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentStep === 'intro' && (
          <LevelSelector
            currentLevel={level}
            onSelectLevelAndStart={handleSelectLevelAndStart}
            studentName={studentName}
            onNameChange={handleNameChange}
            onQuickExploreTools={() => {
              setCurrentStep('results');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'personality' && (
          <PersonalityQuiz
            level={level}
            studentName={studentName}
            onComplete={handlePersonalityComplete}
            onCancel={() => setCurrentStep('intro')}
          />
        )}

        {currentStep === 'anxiety' && (
          <AnxietyAssessment
            level={level}
            studentName={studentName}
            archetype={archetype}
            onComplete={handleAnxietyComplete}
            onBack={() => setCurrentStep('personality')}
          />
        )}

        {currentStep === 'results' && (
          <ResultsDashboard
            level={level}
            studentName={studentName}
            archetype={archetype}
            anxietyResult={anxietyResult}
            onLaunchTool={handleLaunchTool}
            onOpenCalmPlan={() => setIsCalmPlanOpen(true)}
            onOpenCounselorHelp={() => setIsCounselorHelpOpen(true)}
            onRestart={handleRestart}
          />
        )}

        {currentStep === 'tool' && (
          <div>
            {activeToolId === 'breathing' && (
              <BreathingTool level={level} onBack={handleBackToDashboard} />
            )}
            {activeToolId === 'grounding' && (
              <GroundingTool level={level} onBack={handleBackToDashboard} />
            )}
            {activeToolId === 'worry-release' && (
              <WorryReleaseTool level={level} onBack={handleBackToDashboard} />
            )}
            {activeToolId === 'circle-control' && (
              <CircleOfControl level={level} onBack={handleBackToDashboard} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">MindHarbor</span>
            <span>· Safe, Evidence-Informed Student Mental Wellness</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={() => setIsCounselorHelpOpen(true)} 
              className="text-slate-600 hover:text-teal-700 underline"
            >
              School Counselor Guide & Crisis Lines
            </button>
            <span className="text-slate-300">|</span>
            <button 
              onClick={() => setIsHistoryOpen(true)} 
              className="text-slate-600 hover:text-teal-700 underline"
            >
              Local Mood History
            </button>
            <span className="text-slate-300">|</span>
            <span>Private & Confidential (No tracking)</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <SosQuickCalmModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        level={level}
      />

      <CalmPlanModal
        isOpen={isCalmPlanOpen}
        onClose={() => setIsCalmPlanOpen(false)}
        level={level}
        defaultStudentName={studentName}
        defaultArchetype={archetype?.name}
        defaultTriggers={anxietyResult?.primaryTriggers}
      />

      <CheckinHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      <CounselorBridge
        isOpen={isCounselorHelpOpen}
        onClose={() => setIsCounselorHelpOpen(false)}
        level={level}
      />

    </div>
  );
}
