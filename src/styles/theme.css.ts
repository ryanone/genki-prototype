import { createTheme, createThemeContract } from '@vanilla-extract/css';

type Color = string;

type ColorContract = {
  background1: Color;
  background2: Color;
  background3: Color;
  backgroundAside: Color;
  foreground1: Color;
  foreground2: Color;
  highlight1: Color;
  highlight2: Color;
  highlightForeground: Color;
  incorrect: Color;
  link1: Color;
  link2: Color;
  link3: Color;
  outline1: Color;
  outline2: Color;
  outline3: Color;
  outline4: Color;
  selectedCorrect: Color;
  unselectedCorrect: Color;
};

type ThemeContract = {
  color: ColorContract;
};

const themeContract: ThemeContract = {
  color: {
    background1: '',
    background2: '',
    background3: '',
    backgroundAside: '',
    foreground1: '',
    foreground2: '',
    highlight1: '',
    highlight2: '',
    highlightForeground: '',
    incorrect: '',
    link1: '',
    link2: '',
    link3: '',
    outline1: '',
    outline2: '',
    outline3: '',
    outline4: '',
    selectedCorrect: '',
    unselectedCorrect: '',
  },
};

export const themeVars = createThemeContract(themeContract);

type CommonThemeColors = Pick<
  ColorContract,
  | 'backgroundAside'
  | 'highlight1'
  | 'highlight2'
  | 'highlightForeground'
  | 'incorrect'
  | 'selectedCorrect'
  | 'unselectedCorrect'
>;

const COMMON_COLORS: CommonThemeColors = {
  backgroundAside: '#333',
  highlight1: '#f93',
  highlight2: '#c60',
  highlightForeground: '#fff',
  incorrect: '#f00',
  selectedCorrect: '#080',
  unselectedCorrect: '#09f',
};

const darkThemeVars = {
  color: {
    ...COMMON_COLORS,
    background1: '#161616',
    background2: '#1a1a1a',
    background3: '#222',
    foreground1: '#aaa',
    foreground2: '#fff',
    link1: '#69a',
    link2: '#ccc',
    link3: '#ff0',
    outline1: '#333',
    outline2: '#444',
    outline3: '#555',
    outline4: '#999',
  },
};

const darkThemeClass = createTheme(themeVars, darkThemeVars);

const lightThemeClass = createTheme(themeVars, {
  color: {
    ...COMMON_COLORS,
    background1: '#fff',
    background2: '#fff',
    background3: '#eee',
    foreground1: '#333',
    foreground2: '#000',
    link1: '#039',
    link2: '#ccc',
    link3: '#ff0',
    outline1: '#ccc',
    outline2: '#999',
    outline3: '#999',
    outline4: '#444',
  },
});

const keys = ['dark', 'light'] as const;
type ThemeKeys = (typeof keys)[number];

export type ThemeName = Record<ThemeKeys, string>;

export const themes = {
  dark: darkThemeClass,
  light: lightThemeClass,
};

export { darkThemeClass, lightThemeClass };
export type ThemeClass = (typeof themes)[keyof typeof themes];
