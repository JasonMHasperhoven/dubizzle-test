import React from 'react';
import styled from 'styled-components';
import { spacing, media } from '../../styles';

const Root = styled.div`
  padding: ${spacing(2)};
  color: white;
`;

const Title = styled.h1`
  font-size: 18px;

  ${media.min460} {
    font-size: 24px;
  }
`;

export default function Home() {
  return (
    <Root>
      <Title>Github gists search</Title>
    </Root>
  );
}
