import { style } from '@vanilla-extract/css';

export const rootClass = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

export const mainClass = style({
  flexGrow: 1,
});
