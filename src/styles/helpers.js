import { spacing as spacingUnit } from './constants';

/* eslint-disable import/prefer-default-export */

export const spacing = multiplier => `${(multiplier || 1) * spacingUnit}px`;
