import { CheckinRecord, CalmActionPlan, StudentLevel } from '../types';

const STORAGE_KEYS = {
  LEVEL: 'mindharbor_student_level',
  CHECKINS: 'mindharbor_checkins_history',
  CALM_PLAN: 'mindharbor_calm_plan',
  STUDENT_NAME: 'mindharbor_student_name',
};

export const getSavedLevel = (): StudentLevel | null => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.LEVEL);
    return val === 'primary' || val === 'secondary' ? val : null;
  } catch {
    return null;
  }
};

export const saveStudentLevel = (level: StudentLevel): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LEVEL, level);
  } catch {
    // ignore
  }
};

export const getSavedStudentName = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEYS.STUDENT_NAME) || '';
  } catch {
    return '';
  }
};

export const saveStudentName = (name: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, name);
  } catch {
    // ignore
  }
};

export const getCheckinHistory = (): CheckinRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKINS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveCheckin = (record: Omit<CheckinRecord, 'id' | 'timestamp' | 'date'>): CheckinRecord => {
  const history = getCheckinHistory();
  const now = new Date();
  const newRecord: CheckinRecord = {
    ...record,
    id: `chk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    date: now.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
  };

  const updated = [newRecord, ...history].slice(0, 30); // keep last 30 checkins
  try {
    localStorage.setItem(STORAGE_KEYS.CHECKINS, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return newRecord;
};

export const clearCheckinHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CHECKINS);
  } catch {
    // ignore
  }
};

export const getSavedCalmPlan = (): CalmActionPlan | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CALM_PLAN);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveCalmPlan = (plan: CalmActionPlan): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CALM_PLAN, JSON.stringify(plan));
  } catch {
    // ignore
  }
};
