import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const compactHeaderClass = style({
  borderBottom: `1px solid ${themeVars.color.outline1}`,
  color: themeVars.color.foreground1,
  fontSize: '1.25rem',
  paddingInline: 4,
  selectors: {
    '&:hover': {
      color: themeVars.color.highlight1,
    },
  },
});

export const detailedHeaderClass = style({
  borderBottom: `1px solid ${themeVars.color.highlight1}`,
  color: themeVars.color.highlight1,
  fontSize: '1.5rem',
  paddingBlockEnd: 4,
});
