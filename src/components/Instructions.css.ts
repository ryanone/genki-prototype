import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const instructionsClass = style({
  alignItems: 'center',
  background: themeVars.color.highlight1,
  color: themeVars.color.highlightForeground,
  display: 'flex',
  gap: 12,
  padding: 16,
});

export const iconClass = style({
  fontSize: '2rem',
});
