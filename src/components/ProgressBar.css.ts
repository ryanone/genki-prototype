import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const progressBarClass = style({
  alignContent: 'center',
  border: `1px solid ${themeVars.color.highlight1}`,
  display: 'flex',
  position: 'relative',
});

export const completionClass = style({
  background: themeVars.color.highlight1,
  color: themeVars.color.foreground2,
  height: '100%',
  position: 'absolute',
  left: 0,
  transition: 'width ease-out .25s',
});

export const statusClass = style({
  position: 'relative',
  textAlign: 'center',
  width: '100%',
});
