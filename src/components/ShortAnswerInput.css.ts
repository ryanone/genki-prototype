import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { themeVars } from '@/styles/theme.css';

export const widthVar = createVar();

export const shortAnswerInputClass = style({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  width: 'max-content',
});

export const answerContentClass = style({
  color: themeVars.color.selectedCorrect,
});

export const input = recipe({
  base: {
    background: 'transparent',
    border: `0 solid ${themeVars.color.outline2}`,
    borderBottomWidth: 2,
    boxSizing: 'border-box',
    color: themeVars.color.foreground1,
    fontSize: '1rem',
    outline: 'none',
    padding: '4px 2px',
    width: fallbackVar(widthVar, 'auto'),
    selectors: {
      '&:focus, &:focus:hover': {
        borderColor: themeVars.color.highlight1,
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

export type InputVariant = RecipeVariants<typeof input>;
