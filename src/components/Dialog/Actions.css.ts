import { style } from '@vanilla-extract/css';
import { contentPaddingVar } from '@/components/Dialog.css';

export const actionsClass = style({
  display: 'flex',
  gap: 12,
  justifyContent: 'center',
  padding: contentPaddingVar,
});
