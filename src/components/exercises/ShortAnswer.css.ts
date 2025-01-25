import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';
import { primaryButtonClass } from '@/styles/common.css';

export const shortAnswerClass = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const actionsClass = style({
  display: 'flex',
  gap: 12,
  justifyContent: 'center',
});

export const checkAnswersButtonClass = style([
  primaryButtonClass,
  {
    alignItems: 'center',
    display: 'flex',
    gap: 6,
    marginBlockStart: 20,
    marginInline: 'auto',
  },
]);

export const itemsClass = style({
  background: themeVars.color.background3,
  border: `1px solid ${themeVars.color.outline1}`,
  boxSizing: 'border-box',
  padding: `12px 8px`,
  width: '100%',
});
