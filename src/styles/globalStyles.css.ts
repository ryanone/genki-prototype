import { globalStyle } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

globalStyle('body', {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
});

const FONT_FAMILY =
  // eslint-disable-next-line max-len
  "'メイリオ', 'Meiryo', 'Osaka', 'ＭＳ Ｐゴシック', 'MS PGothic', \"ヒラギノ角ゴ Pro W3\",\"Hiragino Kaku Gothic Pro\", Arial, Helvetica, sans-serif";

globalStyle(':root', {
  backgroundColor: themeVars.color.background1,
  color: themeVars.color.foreground1,
  colorScheme: 'dark light',
  fontFamily: FONT_FAMILY,
  fontSize: '16px',
  fontSynthesis: 'none',
  fontWeight: '400',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('button', { fontFamily: 'inherit', fontSize: 'inherit' });
