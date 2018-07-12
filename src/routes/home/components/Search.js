import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MDSpinner from 'react-md-spinner';
import debounce from 'lodash/debounce';
import { spacing, media, colors } from '../../../styles';

const searchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
  >
    <defs>
      <circle id="a" cx="6.067" cy="6.067" r="6.067" />
      <mask id="b" width="12.133" height="12.133" x="0" y="0" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
    </defs>
    <g fill="none" fillRule="evenodd" stroke="currentColor">
      <use strokeWidth="3" mask="url(#b)" xlinkHref="#a" />
      <path strokeWidth="1.5" d="M10 10l4 4" strokeLinecap="round" />
    </g>
  </svg>
);

const Root = styled.div`
  position: relative;
  margin-bottom: ${spacing()};

  ${media.min460} {
    margin-bottom: ${spacing(2)};
  }
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: ${spacing(0.75)};
  padding-left: 46px;
  color: ${colors.text};

  ${media.min460} {
    font-size: 16px;
    padding-left: 54px;
  }
`;

const Icon = styled.div`
  width: 46px;
  height: 42px;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  padding-top: 14px;
  color: ${colors.text};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }

  svg {
    width: 16px;
    height: 16px;
  }

  ${media.min460} {
    width: 54px;
    height: 46px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

@connect(
  state => ({
    fetching: state.gists.fetching,
  }),
  dispatch => ({
    fetchGistsByUsername: dispatch.gists.fetchGistsByUsername,
  }),
)
export default class Search extends React.Component {
  static propTypes = {
    fetchGistsByUsername: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      loading: nextProps.fetching,
    };
  }

  onSearchInputChange = event => {
    const query = event.target.value;
    this.setState({ query }, () => {
      this.fetchGistsByUsername(query);
    });
  };

  fetchGistsByUsername = debounce(
    () => this.props.fetchGistsByUsername(this.state.query),
    300,
  );

  render() {
    const { loading } = this.state;

    return (
      <Root>
        <Input
          placeholder="Search by username..."
          onChange={this.onSearchInputChange}
        />
        <Icon>{searchIcon}</Icon>
        {loading && (
          <MDSpinner
            singleColor={colors.primary}
            borderSize={2}
            size={22}
            style={{
              position: 'absolute',
              top: 12,
              right: 16,
            }}
          />
        )}
      </Root>
    );
  }
}
