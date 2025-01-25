import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const exerciseRouteClass = style({
  marginInline: 'auto',
  maxWidth: 1500,
});

export const headingClass = style({
  color: themeVars.color.highlight1,
  display: 'flex',
  fontSize: '2rem',
  justifyContent: 'center',
  paddingBlock: 32,
});
