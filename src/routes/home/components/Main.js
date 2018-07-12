import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { clearFix } from 'polished';
import { spacing, media, card, uppercase } from 'styles';

const Card = styled.div`
  ${card};

  &:last-child {
    margin-bottom: 0;
  }
`;

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

  &:last-child {
    margin-bottom: 0;
  }

  ${media.max460} {
    font-size: 13px;
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

const Forker = styled.div`
  ${clearFix()};
  margin-bottom: 2px;

  ${media.min460} {
    margin-bottom: 6px;
  }

  &:last-child {
    margin-bottom: 0;
  }
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
      return <Card>Loading ...</Card>;
    }

    if (failure && query) {
      if (failure.message !== '') {
        return (
          <Card>
            Couldn’t find user <em>{query}</em>
          </Card>
        );
      }
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
      <Card key={gist.created_at}>
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
            {!gist.forks && !gist.forksError && 'Loading...'}
            {gist.forks &&
              !gist.forksError &&
              (gist.forks.length
                ? gist.forks.filter((f, i) => i < 3).map(fork => (
                    <Forker key={fork.id}>
                      <ForkerAvatar
                        url={(fork.user || fork.owner).avatar_url}
                      />
                      <ForkerName>{(fork.user || fork.owner).login}</ForkerName>
                    </Forker>
                  ))
                : 'No forks')}
            {!!gist.forksError && gist.forksError}
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
