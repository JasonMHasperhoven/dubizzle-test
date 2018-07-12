import { mix, lighten } from 'polished';

export const primary = '#2dbcbe';

export const grey = '#f8f8f8';

export const link = '#2d79be';

export const disabled = '#c1c1c1';

export const bgBody = '#f1f1f1';

export const border = '#e5e5e5';

export const error = '#f9756e';

export const success = '#00f39a';

const textMixShade = '#0043ff';

const textBaseShade = '#555';

export const text = mix(0.055, textMixShade, textBaseShade);

export const textLight = lighten(0.25, text); // '#96989f';
