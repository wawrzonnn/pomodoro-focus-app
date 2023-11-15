import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  color: var(--Beige, #FEF2E7);
  text-align: center;
  font-family: Raleway;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2.4px;
  text-transform: uppercase;
`;

const StyledH1 = styled.h1`
  color: var(--Beige, #FEF2E7);
  text-align: center;
  font-family: Raleway;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.66px;
  text-transform: uppercase;
`;

const StyledHeader = styled.header`
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 30px;
gap: 4px;`

export const Header = () => {
  return (
    <StyledHeader>
      <StyledSpan>– Get the work done –</StyledSpan>
      <StyledH1>POMODORO FOCUS</StyledH1>
    </StyledHeader>
  );
}

export default Header;