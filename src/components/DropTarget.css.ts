import { calc } from '@vanilla-extract/css-utils';
import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { contentMinWidth } from '@/components/VerticalDropTargetList.css';
import { themeVars } from '@/styles/theme.css';

const altFontSizeVar = createVar();
const altPaddingInlineVar = createVar();
const borderWidthVar = createVar();

export const dropTarget = recipe({
  base: {
    display: 'inline-flex',
    gap: 4,
    position: 'relative',
    vars: {
      [altFontSizeVar]: '.75rem',
      [altPaddingInlineVar]: '8px',
      [borderWidthVar]: '1px',
    },
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'row',
        height: 'max-content',
        width: 'max-content',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
  },
});

export type DropTargetVariant = RecipeVariants<typeof dropTarget>;

const dropTargetHorizontalSelector = dropTarget({
  orientation: 'horizontal',
})
  .split(' ')
  .map((cls) => `.${cls}`)
  .join('');

const dropTargetVerticalSelector = dropTarget({
  orientation: 'vertical',
})
  .split(' ')
  .map((cls) => `.${cls}`)
  .join('');

export const altClass = style({
  background: themeVars.color.outline1,
  fontSize: altFontSizeVar,
  height: 'fit-content',
  paddingInline: altPaddingInlineVar,
  textAlign: 'center',
});

const ZONE_CONTENT_BORDER = `${borderWidthVar} solid ${themeVars.color.outline1}`;

export const content = recipe({
  base: {
    backgroundColor: themeVars.color.background3,
    border: ZONE_CONTENT_BORDER,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: fallbackVar(contentMinWidth, '30px'),
    selectors: {
      [`${dropTargetHorizontalSelector} &`]: {
        minWidth: 30,
      },
    },
  },
  variants: {
    contents: {
      empty: {
        marginBlockEnd: calc(altFontSizeVar)
          .add(
            calc(altPaddingInlineVar).subtract(
              calc(borderWidthVar).multiply(2),
            ),
          )
          .toString(),
      },
    },
  },
});

export type ContentVariant = RecipeVariants<typeof content>;

export const primaryClass = style({
  paddingInline: 8,
  textAlign: 'center',
});

export const zone = recipe({
  base: {
    alignItems: 'center',
    border: ZONE_CONTENT_BORDER,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    paddingInline: 8,
    position: 'relative',
    selectors: {
      [`${dropTargetHorizontalSelector} &`]: {
        minWidth: 50,
      },
      [`${dropTargetVerticalSelector} &`]: {
        minHeight: '2rem',
      },
    },
  },
  variants: {
    mode: {
      incorrect: {
        borderColor: themeVars.color.incorrect,
      },
    },
    interaction: {
      entered: {
        borderColor: themeVars.color.highlight1,
      },
    },
  },
});

export type ZoneVariant = RecipeVariants<typeof zone>;

const iconSizeVar = createVar();
const iconPositionVar = createVar();

export const icon = recipe({
  base: {
    fontSize: iconSizeVar,
    inset: `${iconPositionVar} ${iconPositionVar} auto auto`,
    position: 'absolute',
    vars: {
      [iconPositionVar]: calc(-0.5).multiply(iconSizeVar).toString(),
      [iconSizeVar]: '.75rem',
    },
  },
  variants: {
    mode: {
      correct: {
        color: themeVars.color.highlight1,
      },
      incorrect: {
        color: themeVars.color.incorrect,
      },
    },
  },
});

export type IconVariant = RecipeVariants<typeof icon>;

export const numIncorrectClass = style({
  color: themeVars.color.incorrect,
  selectors: {
    [`${dropTargetHorizontalSelector} &`]: {
      alignItems: 'center',
      display: 'flex',
    },
    [`${dropTargetVerticalSelector} &`]: {
      bottom: 0,
      fontSize: '.75rem',
      right: 2,
      position: 'absolute',
    },
  },
});

export const incorrectArrowClass = style({
  marginInlineEnd: 12,
});
