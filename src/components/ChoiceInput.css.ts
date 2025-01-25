import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { themeVars } from '@/styles/theme.css';

export const choiceInputClass = style({
  backgroundColor: themeVars.color.background1,
  border: `1px solid ${themeVars.color.outline1}`,
  color: themeVars.color.foreground1,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  paddingBlock: 8,
  paddingInline: 24,
});

export const correctAnswerClass = style({
  color: themeVars.color.selectedCorrect,
  minHeight: '1rem',
  textAlign: 'center',
});

export const input = recipe({
  base: {
    border: `2px solid ${themeVars.color.outline2}`,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    color: themeVars.color.foreground1,
    fontSize: '1rem',
    textAlign: 'center',
    outline: 'none',
    selectors: {
      '&:hover:enabled': {
        borderColor: themeVars.color.outline3,
      },
      '&:focus:enabled': {
        borderColor: themeVars.color.highlight1,
      },
      '&, &:disabled': {
        background: 'transparent',
      },
    },
  },
  variants: {
    mode: {
      correct: {
        borderColor: themeVars.color.selectedCorrect,
      },
      incorrect: {
        borderColor: themeVars.color.incorrect,
      },
    },
  },
});

export const labelClass = style({
  textAlign: 'center',
});

export type ChoiceInputVariant = RecipeVariants<typeof input>;
