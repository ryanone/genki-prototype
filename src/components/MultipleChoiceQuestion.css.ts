import { createVar, style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

const containerPaddingVar = createVar();

export const multipleChoiceQuestionClass = style({
  background: themeVars.color.background3,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  vars: {
    [containerPaddingVar]: '12px',
  },
});

export const contentClass = style({
  border: `1px solid ${themeVars.color.outline1}`,
  borderBottomWidth: 0,
  display: 'flex',
  fontSize: '1.25rem',
  justifyContent: 'center',
  padding: containerPaddingVar,
});

export const choicesContainerClass = style({
  border: `1px solid ${themeVars.color.outline1}`,
  padding: containerPaddingVar,
});

export const indexClass = style({
  fontSize: '.75rem',
  inset: '4px auto auto 4px',
  position: 'absolute',
});
