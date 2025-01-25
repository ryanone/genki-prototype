import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const writingChoiceItemClass = style({
  alignItems: 'flex-start',
  display: 'flex',
  gap: 8,
});

export const input = recipe({
  base: {
    background: 'transparent',
    borderWidth: '0 0 2px 0',
    width: '1.5rem',
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

export const inputContainerClass = style({
  display: 'flex',
  flexDirection: 'column',
});

export const inputLineClass = style({
  display: 'flex',
  flexWrap: 'nowrap',
});

export const answerContentClass = style({
  color: themeVars.color.selectedCorrect,
  textAlign: 'center',
});
