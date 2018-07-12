import { css } from 'styled-components';
import { spacing } from './helpers';
import * as media from './media';

export const card = css`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-bottom: ${spacing()};
  padding: ${spacing()};

  ${media.min460} {
    margin-bottom: ${spacing(2)};
    padding: ${spacing(2)};
  }
`;

export const cover = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const uppercase = css`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;
