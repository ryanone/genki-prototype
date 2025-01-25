import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const headerClass = style({
  background: themeVars.color.highlight1,
  color: themeVars.color.highlightForeground,
  display: 'flex',
  overflow: 'clip',
  position: 'relative',
});

export const headingClass = style({
  display: 'grid',
  flexGrow: 1,
  gridTemplateAreas: `"logo title" "logo description"`,
  gridTemplateColumns: '120px 1fr',
  gridTemplateRows: 'repeat(2, 1fr)',
  margin: 0,
});

export const descriptionClass = style({
  fontSize: '1rem',
  gridArea: 'description',
  paddingInlineStart: 300,
});

export const logoClass = style({
  gridArea: 'logo',
});

export const titleClass = style({
  color: themeVars.color.highlightForeground,
  fontSize: '2.5rem',
  gridArea: 'title',
  textDecoration: 'none',
});

export const forkMeClass = style({
  backgroundColor: themeVars.color.backgroundAside,
  color: themeVars.color.highlightForeground,
  inset: '30px -55px auto auto',
  position: 'absolute',
  textAlign: 'center',
  textDecoration: 'none',
  transform: 'rotate(45deg)',
  transition: 'color ease-out 300ms, background-color ease-out 300ms',
  width: 200,
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.highlightForeground,
      color: themeVars.color.backgroundAside,
    },
  },
});
