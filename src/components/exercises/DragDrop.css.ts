import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { primaryButtonClass } from '@/styles/common.css';

export const dragDrop = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  variants: {
    orientation: {
      horizontal: {},
      vertical: {},
    },
  },
});

export type DragDropVariant = RecipeVariants<typeof dragDrop>;

const dragDropHorizontalSelector = dragDrop({
  orientation: 'horizontal',
})
  .split(' ')
  .map((cls) => `.${cls}`)
  .join('');

const dragDropVerticalSelector = dragDrop({
  orientation: 'vertical',
})
  .split(' ')
  .map((cls) => `.${cls}`)
  .join('');

export const mainClass = style({
  display: 'flex',
  selectors: {
    [`${dragDropHorizontalSelector} &`]: {
      flexDirection: 'column',
      gap: 20,
    },
    [`${dragDropVerticalSelector} &`]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
});

export const choicesClass = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 4,
  justifyContent: 'flex-start',
  selectors: {
    [`${dragDropVerticalSelector} &`]: {
      flexBasis: 'max-content',
      flexDirection: 'column',
    },
  },
});

export const actionsClass = style({
  display: 'flex',
  gap: 12,
  justifyContent: 'center',
});

export const buttonClass = style([
  primaryButtonClass,
  {
    alignItems: 'center',
    display: 'flex',
    gap: 6,
  },
]);
