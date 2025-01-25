import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { primaryButtonClass } from '@/styles/common.css';

export const exerciseTypeButtonClass = style([
  primaryButtonClass,
  {
    alignItems: 'center',
    display: 'flex',
    gap: 6,
    marginBlockStart: 20,
    marginInline: 'auto',
  },
]);

export const loadingClass = style({
  display: 'flex',
  justifyContent: 'center',
});

export const actionsClass = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBlockStart: 20,
});

const adjacent = recipe({
  base: {
    alignItems: 'center',
    display: 'flex',
    gap: 6,
    textDecoration: 'none',
  },
  variants: {
    position: {
      next: {
        alignSelf: 'flex-end',
        marginInlineStart: 'auto',
      },
      previous: {
        alignSelf: 'flex-start',
        marginInlineEnd: 'auto',
      },
    },
  },
});

export const previousExerciseClass = style([
  adjacent({ position: 'previous' }),
  primaryButtonClass,
]);

export const nextExerciseClass = style([
  adjacent({ position: 'next' }),
  primaryButtonClass,
]);
