import { lighten, transparentize } from 'polished';

export type Theme = typeof theme;

export const namedColors = {
  // neutral shades from black to white
  blackPanther: '#0F1111',
  mineShaft: '#3F3F3F',
  stoneGrey: '#666',
  silver: '#BFBFBF',
  greyWhite: '#CCC',
  offWhite: '#E5E5E5',
  whiteSmoke: '#EFEFEF',
  platinum: '#F6F6F6',
  white: '#FFF',

  // reds
  rubiate: '#BF4342',

  // greens
  meadow: '#709B55',

  // blues
  cobalt: '#0049AF',
};

export const colors = {
  ...namedColors,
  accent: namedColors.cobalt,
  accentHover: lighten(0.1, namedColors.cobalt),
  text1: namedColors.blackPanther,
  text2: namedColors.white,
  text3: namedColors.stoneGrey,
  textDisabled: namedColors.silver,
  buttonTextDisabled: namedColors.white,
  buttonDisabled: namedColors.greyWhite,
  bg1: namedColors.white,
  bg1Hover: transparentize(0.2, namedColors.whiteSmoke),
  bg2: namedColors.whiteSmoke,
  bg2Hover: namedColors.platinum,
  border1: namedColors.offWhite,
  border2: namedColors.silver,
  red: namedColors.rubiate,
  green: namedColors.meadow,
  blue: namedColors.cobalt,
};

export const space = [
  0,
  '.25rem',
  '.5rem',
  '.75rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '1.75rem',
  '2rem',
  '2.25rem',
  '2.5rem',
  '2.75rem',
  '3rem',
];

export const theme = {
  space,
  colors,
  border: `1px solid ${colors.border1}`,
  borderRadius: '6px',
  shadows: {
    inset: 'inset 1px 1px 4px 0 rgba(0,0,0,0.75)',
    insetTop: 'inset 0px 51px 8px -45px rgba(0,0,0,0.12)',
    small: '-2px 2px 2px 0 rgb(0 0 0 / 9%)',
    medium: '0 0 6px 2px rgba(0, 0, 0, 0.12)',
    large: '-1px 8px 7px -5px rgba(0,0,0,0.39)',
    heavy: '0 5px 13px -2px rgb(0 0 0 / 65%)',
  },
  transitions: {
    fast: '0.175s cubic-bezier(.65, .12, .3, .58)',
    normal: '0.275s cubic-bezier(.65, .12, .3, .58)',
    slow: '0.375s cubic-bezier(.65, .12, .3, .58)',
  },
};
