import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const headingClass = style({
  borderBottom: `1px solid ${themeVars.color.highlight1}`,
  color: themeVars.color.highlight1,
  fontSize: '1.5rem',
});

export const settingsClass = style({
  display: 'grid',
  gridTemplateColumns: '30% 1fr',
  rowGap: 16,
});

export const settingName = recipe({
  base: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  variants: {
    align: {
      start: {
        alignItems: 'flex-start',
      },
    },
  },
});

export type SettingNameVariant = RecipeVariants<typeof settingName>;

export const settingContentClass = style({
  margin: 0,
  paddingInlineStart: 20,
});

export const labelClass = style({
  cursor: 'pointer',
});

export const listClass = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const radioClass = style({
  marginInlineEnd: 8,
});
