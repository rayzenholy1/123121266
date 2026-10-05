import { Gender, Goal } from './types';

export const COLORS = {
  primary: '#2563eb',
  background: '#f3f4f6',
  card: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
  border: '#d1d5db',
  error: '#dc2626',
};

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Чоловіча' },
  { value: 'female', label: 'Жіноча' },
  { value: 'other', label: 'Інша' },
];

export const GOAL_OPTIONS: { value: Goal; label: string }[] = [
  { value: 'work', label: 'Пошук роботи' },
  { value: 'study', label: 'Навчання' },
  { value: 'communication', label: 'Спілкування' },
  { value: 'business', label: 'Бізнес' },
];
