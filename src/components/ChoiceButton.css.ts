import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { themeVars } from '@/styles/theme.css';

export const choiceButton = recipe({
  base: {
    background: themeVars.color.background2,
    border: `2px solid ${themeVars.color.outline1}`,
    color: themeVars.color.foreground1,
    cursor: 'pointer',
    paddingBlock: 8,
    flexBasis: '75%',
    fontSize: '1rem',
    selectors: {
      '&:hover:enabled, &:focus:enabled': {
        borderColor: themeVars.color.highlight1,
      },
    },
  },
  variants: {
    mode: {
      incorrect: {
        borderColor: themeVars.color.incorrect,
      },
      selectedCorrect: {
        borderColor: themeVars.color.selectedCorrect,
      },
      unselectedCorrect: {
        borderColor: themeVars.color.unselectedCorrect,
      },
    },
  },
});

export type ChoiceButtonVariant = RecipeVariants<typeof choiceButton>;
