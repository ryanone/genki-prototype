import { style } from '@vanilla-extract/css';
import { primaryButtonClass } from '@/styles/common.css';

export const rootBoundaryClass = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
});

export const actionsClass = style({
  display: 'flex',
  justifyContent: 'center',
});

export const buttonClass = style([
  primaryButtonClass,
  {
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
  },
]);
