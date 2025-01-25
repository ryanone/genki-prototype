import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const primaryButtonClass = style({
  background: themeVars.color.highlight1,
  border: 0,
  color: themeVars.color.highlightForeground,
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 600,
  padding: '8px',
  selectors: {
    '&:hover, &:focus': {
      backgroundColor: themeVars.color.highlight2,
    },
  },
});

export const buttonIconClass = style({
  fontSize: '1.5rem',
});

export const secondaryButtonClass = style({
  background: themeVars.color.highlight2,
  border: 0,
  color: themeVars.color.highlightForeground,
  cursor: 'pointer',
  padding: '8px',
});

export const selectClass = style({
  background: themeVars.color.background2,
  border: `1px solid ${themeVars.color.outline1}`,
  color: themeVars.color.foreground1,
  fontSize: '1rem',
  margin: 'auto',
  padding: '8px',
});

export const hiddenClass = style({
  left: '-9999px',
  position: 'absolute',
  top: '-9999px',
});

export const inputClass = style({
  border: `1px solid ${themeVars.color.outline1}`,
  backgroundColor: themeVars.color.background2,
  boxSizing: 'border-box',
  color: themeVars.color.foreground1,
  fontSize: '1rem',
  padding: '4px 2px',
  outline: 'none',
  textAlign: 'center',
  width: '100%',
  selectors: {
    '&:hover:enabled': {
      borderColor: themeVars.color.outline3,
    },
    '&:focus, &:focus:hover': {
      borderColor: themeVars.color.highlight1,
    },
  },
});
