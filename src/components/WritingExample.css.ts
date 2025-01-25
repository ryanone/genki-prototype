import { createVar, style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

const paddingBlockVar = createVar();

export const writingExampleClass = style({
  border: `1px solid ${themeVars.color.outline1}`,
  display: 'flex',
  flexDirection: 'column',
  height: 'max-content',
  vars: {
    [paddingBlockVar]: '2px',
  },
});

export const altClass = style({
  backgroundColor: themeVars.color.outline1,
  fontSize: '.75rem',
  paddingBlock: paddingBlockVar,
  textAlign: 'center',
});

export const contentClass = style({
  backgroundColor: themeVars.color.background3,
  color: themeVars.color.foreground1,
  fontSize: '1rem',
  paddingBlock: paddingBlockVar,
  textAlign: 'center',
});
