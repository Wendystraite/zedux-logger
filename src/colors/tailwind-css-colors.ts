import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';
import { getZeduxLoggerColorsTemplate } from './getZeduxLoggerColorsTemplate.js';

/**
 * Colors from tailwindcss.
 * @see https://tailwindcss.com/docs/colors
 */
const TAILWIND_CSS_COLORS: Record<
  Exclude<keyof Parameters<typeof getZeduxLoggerColorsTemplate>[0], 'normal'>,
  [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ]
> = {
  red: [
    '#fef2f2',
    '#fee2e2',
    '#fecaca',
    '#fca5a5',
    '#f87171',
    '#ef4444',
    '#dc2626',
    '#b91c1c',
    '#991b1b',
    '#7f1d1d',
    '#450a0a',
  ],
  gray: [
    '#f9fafb',
    '#f3f4f6',
    '#e5e7eb',
    '#d1d5db',
    '#9ca3af',
    '#6b7280',
    '#4b5563',
    '#374151',
    '#1f2937',
    '#111827',
    '#030712',
  ],
  blue: [
    '#eff6ff',
    '#dbeafe',
    '#bfdbfe',
    '#93c5fd',
    '#60a5fa',
    '#3b82f6',
    '#2563eb',
    '#1d4ed8',
    '#1e40af',
    '#1e3a8a',
    '#172554',
  ],
  amber: [
    '#fffbeb',
    '#fef3c7',
    '#fde68a',
    '#fcd34d',
    '#fbbf24',
    '#f59e0b',
    '#d97706',
    '#b45309',
    '#92400e',
    '#78350f',
    '#451a03',
  ],
  green: [
    '#f0fdf4',
    '#dcfce7',
    '#bbf7d0',
    '#86efac',
    '#4ade80',
    '#22c55e',
    '#16a34a',
    '#15803d',
    '#166534',
    '#14532d',
    '#052e16',
  ],
  orange: [
    '#fff7ed',
    '#ffedd5',
    '#fed7aa',
    '#fdba74',
    '#fb923c',
    '#fb923c',
    '#f97316',
    '#ea580c',
    '#c2410c',
    '#9a3412',
    '#7c2d12',
  ],
  purple: [
    '#faf5ff',
    '#faf5ff',
    '#e9d5ff',
    '#d8b4fe',
    '#c084fc',
    '#a855f7',
    '#9333ea',
    '#7e22ce',
    '#6b21a8',
    '#581c87',
    '#3b0764',
  ],
};

export function getZeduxLoggerTailwindColorsTemplate(
  key: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
): Pick<CompleteZeduxLoggerLocalOptions, 'colors'> {
  return getZeduxLoggerColorsTemplate({
    red: TAILWIND_CSS_COLORS.red[key],
    gray: TAILWIND_CSS_COLORS.gray[key],
    blue: TAILWIND_CSS_COLORS.blue[key],
    amber: TAILWIND_CSS_COLORS.amber[key],
    green: TAILWIND_CSS_COLORS.green[key],
    orange: TAILWIND_CSS_COLORS.orange[key],
    purple: TAILWIND_CSS_COLORS.purple[key],
  });
}
