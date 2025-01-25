import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '@/styles/theme.css';
import { primaryButtonClass } from '@/styles/common.css';

const paddingBlockVar = createVar();

export const exerciseResultsClass = style({
  border: `1px solid ${themeVars.color.outline1}`,
  vars: {
    [paddingBlockVar]: '12px',
  },
});

export const buttonClass = style([
  primaryButtonClass,
  {
    alignItems: 'center',
    display: 'flex',
    gap: 6,
    margin: 'auto',
  },
]);

export const headerClass = style({
  background: themeVars.color.highlight1,
  color: themeVars.color.highlightForeground,
  display: 'flex',
  justifyContent: 'center',
  paddingBlock: paddingBlockVar,
});

export const footerClass = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  paddingBlock: paddingBlockVar,
});

export const contentClass = style({
  borderSpacing: 0,
  width: '100%',
});

export const termClass = style({
  borderBottom: `1px solid ${themeVars.color.outline1}`,
  textAlign: 'end',
  width: '25%',
});

export const valueClass = style({
  borderBottom: `1px solid ${themeVars.color.outline1}`,
  paddingInlineStart: 12,
});

export const adviceClass = style({
  marginBlock: '0 12px',
  paddingInline: 12,
});

export const adviceContent = recipe({
  base: {
    fontWeight: 'bold',
  },
  variants: {
    mode: {
      correct: {
        color: themeVars.color.selectedCorrect,
      },
      incorrect: {
        color: themeVars.color.incorrect,
      },
      unselectedCorrect: {
        color: themeVars.color.unselectedCorrect,
      },
    },
  },
});
