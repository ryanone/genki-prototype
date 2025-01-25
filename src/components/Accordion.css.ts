import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const accordionClass = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
});

export const contentClass = style({
  padding: 4,
});

const ICON_SIZE = '8px';
export const iconClass = style({
  border: 'solid currentcolor',
  borderWidth: '0 2px 2px 0',
  color: themeVars.color.foreground1,
  height: ICON_SIZE,
  pointerEvents: 'none',
  position: 'absolute',
  right: ICON_SIZE,
  top: ICON_SIZE,
  transform: 'translateY(-2px) rotate(45deg)',
  width: ICON_SIZE,
});

export const iconRotatedClass = style({
  transform: 'translateY(2px) rotate(-135deg)',
});

export const itemClass = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const titleClass = style({
  alignItems: 'center',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  paddingInline: '0',
  position: 'relative',
  textAlign: 'start',
});

export const titleContentClass = style({
  color: themeVars.color.foreground1,
  flexGrow: 1,
});
