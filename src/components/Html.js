/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import { injectGlobal } from 'styled-components';
import { lighten } from 'polished';
import { colors, spacing } from '../styles';

/* eslint-disable no-unused-expressions, react/no-danger */

injectGlobal`
  html {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    text-size-adjust: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    background: ${colors.primary};
    color: ${colors.text};

    &:before {
      display: none;
    }
  }

  html,
  body,
  #app {
    height: 100%;
  }

  html,
  input,
  textarea,
  button {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 400;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }

  article,
  aside,
  footer,
  header,
  main,
  nav,
  section,
  textarea {
    display: block;
  }

  h1,
  h2,
  h3,
  h4 {
    margin-top: 0;
    margin-bottom: .5rem;
    font-weight: 400;
    line-height: 1.2;
    text-rendering: optimizeLegibility;
  }

  p {
    margin-top: 0;
    margin-bottom: ${spacing()};

    &:last-child {
      margin-bottom: 0;
    }
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: ${spacing()};
    padding-left: ${spacing()};

    &:last-child {
      margin-bottom: 0;
    }
  }

  a,
  button,
  label {
    transition: all .2s;

    &:active:not([disabled]) {
      transition-duration: .05s;
    }
  }

  a {
    background-color: transparent;

    &:hover,
    &:focus,
    &:active {
      outline: 0;
    }

    &,
    &:active,
    &:visited,
    &:hover {
      text-decoration: none;
      cursor: pointer;
    }
  }

  button {
    border: 0;
    outline: 0;
    padding: 0;
    cursor: pointer;
  }

  label {
    display: inline-block;
    cursor: pointer;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
  }

  th {
    text-align: left;
  }

  img {
    box-sizing: content-box;
    border: 0;
  }

  hr {
    box-sizing: content-box;
    height: 0;
  }

  em {
    font-weight: 600;
    font-style: normal;
  }

  strong {
    font-weight: 400;
    font-style: italic;
  }

  button,
  input,
  select,
  optgroup,
  textarea {
    margin: 0;
    font: inherit;
    line-height: inherit;
    color: inherit;
  }

  button {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  input,
  textarea {
    outline: 0;
  }

  button,
  html input[type=button],
  input[type=reset],
  input[type=submit] {
    cursor: pointer;
    -webkit-appearance: button;
  }

  [readonly],
  button[disabled],
  html input[disabled] {
    cursor: default;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  input {
    line-height: normal;

    &:invalid {
      box-shadow: none;
    }
  }

  input[type=text],
  input[type=tel],
  input[type=number],
  input[type=email],
  input[type=search]::-webkit-search-cancel-button,
  input[type=search]::-webkit-search-decoration,
  input[type=search]::-webkit-search-results-button,
  input[type=search]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  input[type=checkbox],
  input[type=radio] {
    padding: 0;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  input[type=search] {
    box-sizing: content-box;
    -webkit-appearance: textfield;
  }

  input[type=text][disabled]
  input[type=email][disabled]
  input[type=password][disabled] {
    -webkit-text-fill-color: ${colors.text};
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: inset 0 0 0 100px #fff;
  }

  textarea {
    vertical-align: top;
    overflow: auto;
    resize: vertical;
  }

  ::-webkit-input-placeholder {
    color: ${lighten(0.3, colors.text)};
    -webkit-font-smoothing: antialiased;
  }

  :-moz-placeholder {
    color: ${lighten(0.3, colors.text)};
    opacity: 1;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }

  ::-moz-placeholder {
    color: ${lighten(0.3, colors.text)};
    opacity: 1;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }

  :-ms-input-placeholder {
    color: ${lighten(0.3, colors.text)};
    -webkit-font-smoothing: antialiased;
  }
`;

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired,
    ),
    styleElement: PropTypes.node.isRequired,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const {
      title,
      description,
      styles,
      styleElement,
      scripts,
      app,
      children,
    } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="icon" href="https://uae.dubizzle.com/favicon.ico" />
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
          {styleElement}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }}
          />
          {scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
