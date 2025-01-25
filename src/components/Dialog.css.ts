import { createVar, style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const contentPaddingVar = createVar();

export const dialogClass = style({
  backgroundColor: themeVars.color.background3,
  border: `1px solid ${themeVars.color.highlight1}`,
  color: themeVars.color.foreground1,
  display: 'flex',
  minHeight: '25vh',
  padding: '0',
  width: '50vw',
  '::backdrop': {
    backgroundColor: themeVars.color.background1,
    opacity: 0.5,
  },
  vars: {
    [contentPaddingVar]: '12px',
  },
});

export const dialogFormClass = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});
