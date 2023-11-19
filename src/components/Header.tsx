import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { useStore } from '../store/store'

const fadeIn = keyframes`
  from { opacity: 0.5; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0.5; }
`;

interface StyledTextProps {
  show: boolean;
}

const StyledSpan = styled.span<StyledTextProps>`
  color: var(--Beige, #fef2e7);
  text-align: center;
  font-family: Raleway;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2.4px;
  text-transform: uppercase;
  animation: ${props => props.show ? fadeIn : fadeOut} 0.3s ease-in-out;
  animation-fill-mode: forwards;
`

const StyledH1 = styled.h1<StyledTextProps>`
  color: var(--Beige, #fef2e7);
  text-align: center;
  font-family: Raleway;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.66px;
  text-transform: uppercase;
  animation: ${props => props.show ? fadeIn : fadeOut} 0.3s ease-in-out;
  animation-fill-mode: forwards;
`

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  gap: 4px;
`

export const Header = () => {
  const { mode, isTimerRunning, isTimerPaused, isBreakCompleted, isFocusCompleted } = useStore();

  const [headerText, setHeaderText] = useState('POMODORO FOCUS');
  const [spanText, setSpanText] = useState('– Get the work done –');
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    let newHeaderText = 'POMODORO FOCUS';
    let newSpanText = '– Get the work done –';
    
    if (isTimerRunning || isTimerPaused || isBreakCompleted || isFocusCompleted) {
      newHeaderText = mode === 'focus' ? 'FOCUS' : 'BREAK';
    }

    if (
      (isTimerRunning && mode === 'break') ||
      (isTimerPaused && mode === 'break') || (isBreakCompleted && mode === 'break')
    ) {
      newSpanText = '– RECHARGING –';
    }

    if (newHeaderText !== headerText || newSpanText !== spanText) {
      setShowText(false);
      setTimeout(() => {
        setHeaderText(newHeaderText);
        setSpanText(newSpanText);
        setShowText(true);
      }, 200);
    }
  }, [isTimerRunning, isTimerPaused, mode, isFocusCompleted, isBreakCompleted, headerText, spanText]);

  return (
    <StyledHeader>
      <StyledSpan show={showText}>{spanText}</StyledSpan>
      <StyledH1 show={showText}>{headerText}</StyledH1>
    </StyledHeader>
  );
};

export default Header;