import { css } from 'styled-components';
import { lighten, clearFix } from 'polished';
import { siteWidth } from './constants';
import { spacing } from './helpers';
import * as colors from './colors';
import * as media from './media';

export const wrapper = css`
  ${clearFix()}
  max-width: ${siteWidth + parseInt(spacing(4), 10)}px;
  margin: 0 auto;
`;

export const title = css`
  font-size: 24px;
  color: ${colors.text};

  ${media.min768} {
    font-size: 27px;
  }
`;

export const subtitle = css`
  font-size: 16px;
  color: ${lighten(0.2, colors.text)};

  ${media.min768} {
    font-size: 18px;
  }
`;

export const title2 = css`
  font-size: 21px;
  color: ${colors.text};

  ${media.min768} {
    font-size: 24px;
  }
`;

export const subtitle2 = css`
  font-size: 16px;
  color: ${lighten(0.2, colors.text)};

  ${media.min768} {
    font-size: 17px;
  }
`;

export const card = css`
  overflow: hidden;
  background: #fff;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.06), 0 4px 24px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  margin: 0 auto ${spacing()};

  ${media.max460} {
    border-radius: 0;
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
