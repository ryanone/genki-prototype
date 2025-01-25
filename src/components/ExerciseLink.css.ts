import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const exerciseLinkClass = style({
  color: themeVars.color.link1,
  textDecoration: 'none',
  selectors: {
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
  },
});
