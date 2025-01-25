import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const multipleChoiceClass = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const actionsClass = style({
  display: 'flex',
  justifyContent: 'center',
  height: '2rem',
});

export const nextButtonClass = style({
  background: themeVars.color.background2,
  border: `1px solid ${themeVars.color.outline1}`,
  color: themeVars.color.foreground2,
  cursor: 'pointer',
  flexBasis: '50%',
  paddingBlock: 8,
  selectors: {
    '&:hover': {
      borderColor: themeVars.color.highlight1,
    },
  },
});
