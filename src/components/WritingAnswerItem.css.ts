import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const writingAnswerItemClass = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 24,
});

export const questionContentClass = style({
  color: themeVars.color.foreground1,
});
