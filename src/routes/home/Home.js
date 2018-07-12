import React from 'react';
import styled from 'styled-components';
import Search from './components/Search';
import Main from './components/Main';
import { spacing, media } from '../../styles';

const Root = styled.div`
  padding: ${spacing()};
  color: white;

  ${media.min460} {
    padding: ${spacing(2)};
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 360px;

  ${media.min460} {
    max-width: 800px;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  margin-bottom: ${spacing()};

  ${media.min460} {
    font-size: 24px;
    margin-bottom: ${spacing(2)};
  }
`;

export default function Home() {
  return (
    <Root>
      <Wrapper>
        <Title>Github gists search</Title>
        <Search />
        <Main />
      </Wrapper>
    </Root>
  );
}
