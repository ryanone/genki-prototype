import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const itemClass = style({
  backgroundColor: themeVars.color.background3,
  border: `1px solid ${themeVars.color.outline1}`,
  cursor: 'move',
  display: 'inline-flex',
  padding: '6px',
  selectors: {
    '&:focus': {
      borderColor: themeVars.color.highlight1,
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      outlineColor: themeVars.color.highlight1,
    },
  },
});
