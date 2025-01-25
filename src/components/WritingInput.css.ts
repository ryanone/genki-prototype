import { createVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { inputClass } from '@/styles/common.css';
import { themeVars } from '@/styles/theme.css';

export const writingInputClass = style({
  position: 'relative',
  width: '100%',
});

export const input = recipe({
  base: [
    inputClass,
    {
      width: '100%',
      selectors: {
        '&:hover:enabled': {
          borderColor: themeVars.color.outline3,
        },
        '&:focus, &:focus:hover': {
          borderColor: themeVars.color.highlight1,
        },
        '&::placeholder': {
          color: themeVars.color.outline3,
        },
      },
    },
  ],
  variants: {
    mode: {
      incorrect: {
        borderColor: themeVars.color.incorrect,
      },
    },
  },
});

export type InputVariant = RecipeVariants<typeof input>;

const iconSizeVar = createVar();
const iconPositionVar = createVar();

export const iconClass = style({
  color: themeVars.color.highlight1,
  fontSize: iconSizeVar,
  inset: `${iconPositionVar} ${iconPositionVar} auto auto`,
  position: 'absolute',
  vars: {
    [iconSizeVar]: '.75rem',
    [iconPositionVar]: calc(-0.5).multiply(iconSizeVar).toString(),
  },
});
