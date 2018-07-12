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

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(-135deg, #00a6ff, #004286);
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
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
      <Cover />
      <Wrapper>
        <Title>Github gists search</Title>
        <Search />
        <Main />
      </Wrapper>
    </Root>
  );
}
