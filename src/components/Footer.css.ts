import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const footerClass = style({
  alignItems: 'center',
  backgroundColor: themeVars.color.backgroundAside,
  display: 'flex',
  color: themeVars.color.highlightForeground,
  marginBlockStart: 16,
  padding: 8,
});

export const actionsClass = style({
  display: 'flex',
  justifyContent: 'center',
});

export const linksClass = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const copyrightClass = style({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
});

export const settingsButtonClass = style({
  alignItems: 'center',
  background: 'none',
  border: 0,
  cursor: 'pointer',
  display: 'flex',
  padding: 8,
  selectors: {
    '&:focus, &:hover': {
      background: `color-mix(in srgb, ${themeVars.color.backgroundAside}), white 25%)`,
    },
  },
});

export const settingsIconClass = style({
  fontSize: '1rem',
});
