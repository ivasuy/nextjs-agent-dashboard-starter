export const CHART_COLORS = {
  primary: '#4175ff',
  secondary: '#8eadff',
  success: '#16a34a',
  warning: '#f59e0b',
  error: '#dc2626',
  info: '#2563eb',
  palette: ['#4175ff', '#8eadff', '#16a34a', '#f59e0b', '#dc2626', '#2563eb', '#9333ea', '#ec4899'],
} as const;

export const CHART_DEFAULTS = {
  margin: { top: 5, right: 20, bottom: 5, left: 0 },
  animationDuration: 300,
  strokeWidth: 2,
  dotRadius: 4,
  gridStroke: '#e5e7eb',
  gridStrokeDasharray: '3 3',
  tooltipStyle: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    fontSize: '13px',
    padding: '8px 12px',
  },
} as const;
