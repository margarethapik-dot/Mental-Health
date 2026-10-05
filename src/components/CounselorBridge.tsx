import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Copy, 
  Check, 
  MessageSquare, 
  Phone, 
  ShieldAlert, 
  Heart, 
  ExternalLink 
} from 'lucide-react';
import { StudentLevel } from '../types';

interface CounselorBridgeProps {
  isOpen: boolean;
  onClose: () => void;
  level: StudentLevel;
}

export const CounselorBridge: React.FC<CounselorBridgeProps> = ({
  isOpen,
  onClose,
  level
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const primaryScripts = [
    {
      id: 'teacher-break',
      title: 'Asking Your Teacher for a 2-Minute Quiet Break',
      recipient: 'Teacher / Aide',
      script: 'Excuse me, my tummy has nervous butterflies right now and my brain feels crowded. May I please step to the water fountain or sit quietly for two minutes to take deep breaths?'
    },
    {
      id: 'parent-talk',
      title: 'Telling a Parent You Feel Worried',
      recipient: 'Mom, Dad, or Guardian',
      script: 'I have had some big worried thoughts lately and I don\'t want to keep them locked inside my head. Can you sit with me for a little while and just listen without getting mad?'
    },
    {
      id: 'counselor-visit',
      title: 'Asking to Visit the School Counselor',
      recipient: 'Teacher or Front Office',
      script: 'I would like to speak with the school counselor today to learn some calm tools for my worries.'
    }
  ];

  const secondaryScripts = [
    {
      id: 'teacher-overwhelm',
      title: 'Emailing a Teacher Regarding Deadline Overwhelm & Anxiety',
      recipient: 'Teacher / Professor',
      script: 'Dear [Teacher Name], I am writing to communicate that I am experiencing significant stress and anxiety regarding [Assignment/Exam]. I am actively working on the material, but my focus has been severely impacted. Would it be possible to schedule a 5-minute meeting or discuss a brief 24-hour extension so I can submit work that reflects my best understanding? Thank you for your support.'
    },
    {
      id: 'counselor-intake',
      title: 'Scheduling a Confidential Session with School Counselor',
      recipient: 'School Counselor',
      script: 'Hi [Counselor Name], I would like to schedule a confidential appointment with you this week. Over the past few weeks, I have been dealing with persistent anxiety and academic pressure, and I would appreciate your guidance on healthy coping strategies.'
    },
    {
      id: 'parent-boundary',
      title: 'Talking to Parents About Grade Expectations & Stress',
      recipient: 'Parents / Family',
      script: 'I know you want the very best for my future, and I care about my grades too. But recently, the pressure has made me feel physically exhausted and overwhelmed. I need your emotional support more than pressure right now. Can we talk about a healthier routine?'
    }
  ];

  const activeScripts = level === 'primary' ? primaryScripts : secondaryScripts;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Safe Communication & Help Bridge</h3>
              <p className="text-xs text-slate-500">Ready-to-use conversation scripts & confidential support hotlines</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Starter Scripts */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            What to Say When You Don't Know How to Start (Tap to Copy)
          </h4>
          <div className="space-y-3">
            {activeScripts.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                    <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      To: {item.recipient}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(item.id, item.script)}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200/80 mt-2">
                  "{item.script}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Real Free Youth Crisis & Support Resources */}
        <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Free, 24/7 Confidential Crisis Resources</span>
          </div>
          <p className="text-xs text-rose-900 mb-3">
            If you or a peer are experiencing overwhelming despair, panic, or self-harm thoughts, free compassionate professionals are waiting to help you immediately:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-rose-200">
              <strong className="block text-slate-900">Crisis Text Line:</strong>
              <span className="text-slate-600">Text <strong>HOME</strong> to <strong>741741</strong> (US/UK/Canada)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-rose-200">
              <strong className="block text-slate-900">Teen Line (By Teens, For Teens):</strong>
              <span className="text-slate-600">Call <strong>800-852-8336</strong> or text <strong>TEEN</strong> to <strong>839863</strong></span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-rose-200">
              <strong className="block text-slate-900">Suicide & Crisis Lifeline:</strong>
              <span className="text-slate-600">Call or Text <strong>988</strong> (24/7, US & Canada)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-rose-200">
              <strong className="block text-slate-900">International Resources:</strong>
              <span className="text-slate-600">Visit <strong>befrienders.org</strong> or <strong>findahelpline.com</strong></span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
