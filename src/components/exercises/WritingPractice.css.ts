import { style } from '@vanilla-extract/css';
import { primaryButtonClass } from '@/styles/common.css';

export const writingPracticeClass = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const rowsClass = style({
  display: 'grid',
  gap: 8,
});

export const actionsClass = style({
  display: 'flex',
  justifyContent: 'center',
});

export const checkAnswersButtonClass = style([
  primaryButtonClass,
  {
    alignItems: 'center',
    display: 'flex',
    gap: 6,
    marginBlockStart: 20,
    marginInline: 'auto',
  },
]);
