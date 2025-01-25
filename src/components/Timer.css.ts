import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const timerClass = style({
  color: themeVars.color.foreground1,
  display: 'inline-flex',
  flexDirection: 'column',
});

export const timerContentClass = style({
  display: 'flex',
  justifyContent: 'center',
});
