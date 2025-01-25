import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';
import { primaryButtonClass } from '@/styles/common.css';

export const fillChartClass = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const itemsClass = style({
  display: 'grid',
  backgroundColor: themeVars.color.background3,
  border: `1px solid ${themeVars.color.outline1}`,
  padding: 16,
});

export const actionsClass = style({
  display: 'flex',
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

export const emptyItemClass = style({
  background: themeVars.color.background1,
  border: `1px solid ${themeVars.color.outline1}`,
});
