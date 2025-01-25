import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const writingChoicesListClass = style({
  background: themeVars.color.background2,
  border: `1px solid ${themeVars.color.outline1}`,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: 8,
});

export const choiceClass = style({
  flexBasis: 200,
  paddingInlineEnd: 24,
  width: 0,
});
