import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const exercisesSectionClass = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: 12,
});

export const headingClass = style({
  color: themeVars.color.foreground1,
  fontSize: '1.25rem',
  paddingBlockEnd: 6,
});
