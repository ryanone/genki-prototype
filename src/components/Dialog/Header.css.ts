import { style } from '@vanilla-extract/css';
import { contentPaddingVar } from '@/components/Dialog.css';
import { themeVars } from '@/styles/theme.css';

export const headerClass = style({
  background: themeVars.color.highlight1,
  color: themeVars.color.highlightForeground,
  fontSize: '1.5rem',
  padding: contentPaddingVar,
});
