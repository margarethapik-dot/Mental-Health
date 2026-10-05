import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Calendar, 
  TrendingDown, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Compass
} from 'lucide-react';
import { CheckinRecord } from '../types';
import { getCheckinHistory, clearCheckinHistory } from '../utils/storage';

interface CheckinHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecord?: (record: CheckinRecord) => void;
}

export const CheckinHistoryModal: React.FC<CheckinHistoryModalProps> = ({
  isOpen,
  onClose,
  onSelectRecord
}) => {
  const [records, setRecords] = useState<CheckinRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      setRecords(getCheckinHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your private check-in history from this device?')) {
      clearCheckinHistory();
      setRecords([]);
    }
  };

  const severityColors = {
    minimal: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    mild: 'bg-teal-50 text-teal-800 border-teal-200',
    moderate: 'bg-amber-50 text-amber-800 border-amber-200',
    elevated: 'bg-rose-50 text-rose-800 border-rose-200'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">My Check-in Log & Mood Trends</h3>
              <p className="text-xs text-slate-500">Track how your anxiety changes over time on this device</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {records.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto mb-3">
              📝
            </div>
            <h4 className="font-bold text-slate-800 text-base">No Check-ins Yet</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Complete your personality and feelings check to record your first entry. Regular check-ins build emotional resilience!
            </p>
          </div>
        ) : (
          <div>
            {/* Summary Trend Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block">Total Check-ins</span>
                <span className="text-2xl font-extrabold text-slate-900">{records.length}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-center">
                <span className="text-xs text-teal-800 block">Latest Archetype</span>
                <span className="text-base font-bold text-teal-950 truncate block mt-1">
                  {records[0]?.archetypeName || 'N/A'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-center col-span-2 sm:col-span-1">
                <span className="text-xs text-sky-800 block">Latest Anxiety Score</span>
                <span className="text-2xl font-extrabold text-sky-950">
                  {records[0]?.anxietyScore} / {records[0]?.maxScore}
                </span>
              </div>
            </div>

            {/* List of Entries */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {records.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-400">{rec.date}</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {rec.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm sm:text-base">
                        {rec.archetypeName}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-md border font-semibold capitalize ${severityColors[rec.severity]}`}>
                        {rec.severity} anxiety
                      </span>
                    </div>

                    {rec.selectedTriggers && rec.selectedTriggers.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {rec.selectedTriggers.map((t, i) => (
                          <span key={i} className="text-[11px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-400 block">Score</span>
                    <span className="text-lg font-bold text-slate-800">
                      {rec.anxietyScore} <span className="text-xs text-slate-400 font-normal">/ {rec.maxScore}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear History Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1.5 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Saved History</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
