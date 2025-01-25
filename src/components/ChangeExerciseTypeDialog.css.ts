import { style } from '@vanilla-extract/css';
import { contentPaddingVar } from '@/components/Dialog.css';

export const contentClass = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
});

export const formClass = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

export const labelClass = style({
  flexGrow: 1,
  paddingBlockStart: contentPaddingVar,
});
