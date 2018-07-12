import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled, { css } from 'styled-components';
import MDSpinner from 'react-md-spinner';
import { clearFix } from 'polished';
import { spacing, media, card, uppercase } from 'styles';

const GistTitle = styled.h3`
  font-size: 18px;
  margin-bottom: ${spacing(0.75)};

  ${media.min460} {
    font-size: 24px;
    margin-bottom: ${spacing(1.5)};
  }
`;

const GistRow = styled.div`
  ${clearFix()};
  margin-bottom: ${spacing()};
  opacity: 0.8;
  transition: opacity 0.2s;

  &:last-child {
    margin-bottom: 0;
  }

  ${media.max460} {
    font-size: 13px;
  }
`;

const Card = styled(props => {
  const { children, href, target, ...rest } = props;

  if (props.href) {
    return (
      <a href={href} target={target} {...rest}>
        {children}
      </a>
    );
  }

  return <div {...rest}>{children}</div>;
})`
  ${card};
  display: block;
  transition: background 0.2s;
  color: #fff;

  &:hover {
    ${props =>
      props.href &&
      css`
        background: rgba(0, 0, 0, 0.3);

        ${GistTitle} {
          text-decoration: underline;
        }

        ${GistRow} {
          opacity: 1;
        }
      `};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const PlaceholderTitle = styled.div`
  width: 50%;
  height: 22px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  margin-bottom: ${spacing(0.75)};

  ${media.min460} {
    height: 29px;
    margin-bottom: ${spacing(1.5)};
  }
`;

const PlaceholderDetails = styled.div`
  width: ${props => props.width}%;
  height: 16px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  margin-bottom: 22px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const GistColumn = styled.div`
  ${clearFix()};

  &:first-child {
    font-weight: 600;
  }

  ${media.max460} {
    margin-bottom: 2px;
  }

  ${media.min460} {
    float: left;
    min-width: 184px;
  }
`;

const Tag = styled.div`
  ${uppercase};
  float: left;
  padding: 4px 8px;
  margin: 0 4px 4px 0;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const ForkerAvatar = styled.div`
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: ${spacing(0.5)};
  background: white url(${props => props.url});
  background-size: cover;

  ${media.min460} {
    width: 28px;
    height: 28px;
  }
`;

const ForkerName = styled.div`
  float: left;
  line-height: 20px;

  ${media.min460} {
    line-height: 28px;
  }
`;

const Forker = styled.a`
  ${clearFix()};
  display: block;
  margin-bottom: 2px;
  color: #fff;

  ${media.min460} {
    margin-bottom: 6px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    ${ForkerName} {
      text-decoration: underline;
    }
  }
`;

@connect(
  state => ({
    query: state.gists.query,
    gists: state.gists.results,
    failure: state.gists.failure,
    loading: state.gists.fetching,
  }),
  null,
)
export default class Main extends React.Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    gists: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
      }),
    ).isRequired,
    failure: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  renderContent() {
    const { gists, query, loading, failure } = this.props;

    if (loading) {
      return (
        <Card>
          <PlaceholderTitle />
          <PlaceholderDetails width={20} />
          <PlaceholderDetails width={60} />
          <PlaceholderDetails width={38} />
        </Card>
      );
    }

    if (failure && query) {
      if (failure.message === 'Not Found') {
        return (
          <Card>
            Couldn’t find user <em>{query}</em>
          </Card>
        );
      }
      return (
        <Card>
          Something went wrong <em>{failure.message}</em>
        </Card>
      );
    }

    if (!query && !gists.length) {
      return <Card>No gists to show</Card>;
    }

    if (query && !gists.length) {
      return (
        <Card>
          No gists to show for user <em>{query}</em>
        </Card>
      );
    }

    return gists.map(gist => (
      <Card href={gist.url} target="_blank" key={gist.created_at}>
        <GistTitle>
          {gist.description ||
            // eslint-disable-next-line no-unused-vars
            Object.values(gist.files).find(first => true).filename}
        </GistTitle>
        <GistRow>
          <GistColumn>Created at</GistColumn>
          <GistColumn>
            {moment(gist.created_at).format('MMM Do YYYY')}
          </GistColumn>
        </GistRow>
        <GistRow>
          <GistColumn>Last forked by</GistColumn>
          <GistColumn>
            {!gist.forks &&
              !gist.forksError && (
                <MDSpinner singleColor="white" borderSize={2} size={22} />
              )}
            {gist.forks &&
              !gist.forksError &&
              (gist.forks.length
                ? gist.forks
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at),
                    )
                    .filter((f, i) => i < 3)
                    .map(fork => (
                      <Forker href={fork.url} target="_blank" key={fork.id}>
                        <ForkerAvatar
                          url={(fork.user || fork.owner).avatar_url}
                        />
                        <ForkerName>
                          {(fork.user || fork.owner).login}
                        </ForkerName>
                      </Forker>
                    ))
                : 'No forks')}
            {!!gist.forksError && gist.forksError.message}
          </GistColumn>
        </GistRow>
        <GistRow>
          <GistColumn>Tags</GistColumn>
          <GistColumn>
            {[
              ...new Set(
                Object.values(gist.files)
                  .map(file => file.language)
                  .filter(value => value),
              ),
            ].map(language => <Tag>{language}</Tag>)}
          </GistColumn>
        </GistRow>
      </Card>
    ));
  }

  render() {
    return <main>{this.renderContent()}</main>;
  }
}
