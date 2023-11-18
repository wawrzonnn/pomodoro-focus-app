import React from 'react'
import styled from 'styled-components'
import { useStore } from '../store/store'
const StyledSpan = styled.span`
  color: var(--Beige, #fef2e7);
  text-align: center;
  font-family: Raleway;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2.4px;
  text-transform: uppercase;
`

const StyledH1 = styled.h1`
  color: var(--Beige, #fef2e7);
  text-align: center;
  font-family: Raleway;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.66px;
  text-transform: uppercase;
`

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  gap: 4px;
`

export const Header = () => {
  const { mode, isTimerRunning, isTimerPaused, isBreakCompleted, isFocusCompleted } = useStore()

  let headerText = 'POMODORO FOCUS'
  if (isTimerRunning || isTimerPaused || isBreakCompleted || isFocusCompleted) {
    headerText = mode === 'focus' ? 'FOCUS' : 'BREAK'
  }

  let spanText = '– Get the work done –'
  if (
    (isTimerRunning && mode === 'break') ||
    (isTimerPaused && mode === 'break') || (isBreakCompleted  && mode === 'break')
  ) {
    spanText = '– RECHARGING –'
  }
  return (
    <StyledHeader>
      <StyledSpan>{spanText}</StyledSpan>
      <StyledH1>{headerText}</StyledH1>
    </StyledHeader>
  )
}

export default Header
