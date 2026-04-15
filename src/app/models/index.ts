export type QuadrantId = 'do' | 'plan' | 'delegate' | 'remove' | 'inbox';

export interface Task {
  id: string;
  text: string;
  quadrant: QuadrantId;
  createdAt: number;
}

export interface QuadrantConfig {
  id: QuadrantId;
  label: string;
  subtitle: string;
  color: string;
  bgColor: string;
  headerColor: string;
}

export const QUADRANT_CONFIGS: QuadrantConfig[] = [
  {
    id: 'do',
    label: 'Q1 — Do',
    subtitle: 'Urgent + Important',
    color: '#ef4444',
    bgColor: '#fef2f2',
    headerColor: '#fee2e2',
  },
  {
    id: 'plan',
    label: 'Q2 — Plan',
    subtitle: 'Not Urgent + Important',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    headerColor: '#dbeafe',
  },
  {
    id: 'delegate',
    label: 'Q3 — Delegate',
    subtitle: 'Urgent + Not Important',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    headerColor: '#fef3c7',
  },
  {
    id: 'remove',
    label: 'Q4 — Remove',
    subtitle: 'Not Urgent + Not Important',
    color: '#6b7280',
    bgColor: '#f9fafb',
    headerColor: '#f3f4f6',
  },
];

export const STORAGE_KEY = 'covey_matrix_tasks';
