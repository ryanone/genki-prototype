import { createVar, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';
import { primaryButtonClass } from '@/styles/common.css';
import { themeVars } from '@/styles/theme.css';

const widthVar = createVar();

export const lessonsNavigation = recipe({
  base: {
    background: themeVars.color.background3,
    borderRightWidth: 0,
    height: '100vh',
    inset: `0 auto auto ${calc(-1).multiply(widthVar).toString()}`,
    position: 'absolute',
    transition: 'left .25s ease-in',
    width: widthVar,
    zIndex: 1,
    vars: {
      [widthVar]: '400px',
    },
  },
  variants: {
    mode: {
      expanded: {
        borderRight: `1px solid ${themeVars.color.outline1}`,
        left: 0,
      },
    },
  },
});

export type LessonsNavigationVariant = RecipeVariants<typeof lessonsNavigation>;

export const headerClass = style({
  display: 'flex',
});

export const titleClass = style({
  alignItems: 'center',
  background: themeVars.color.highlight1,
  color: themeVars.color.foreground2,
  display: 'flex',
  flexGrow: 1,
  fontSize: '1.25rem',
  justifyContent: 'center',
});

export const openButtonClass = style([
  primaryButtonClass,
  {
    background: themeVars.color.highlight2,
    inset: '0 auto auto 0',
    position: 'fixed',
  },
]);
