import { style } from '@vanilla-extract/css';
import { contentPaddingVar } from '@/components/Dialog.css';

export const contentClass = style({
  flexGrow: 1,
  padding: contentPaddingVar,
});
