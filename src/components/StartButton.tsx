import React from 'react'
import styled from 'styled-components'
import useStore from '../store/store'

const StyledButton = styled.button`
  margin-top: 190px;
  color: var(--Beige, #fef2e7);
  text-align: center;
  font-family: Raleway;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 1.6px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`

export const StartButton = () => {
  const {
    isTimerRunning,
    isTimerPaused,
    startTimer,
    pauseTimer,
    setMode,
    mode,
    focusTime,
    breakTime,
    isFocusCompleted,
    isBreakCompleted,
    stopOvertime,
  } = useStore()

  const handleClick = () => {
    if (isTimerRunning) {
      pauseTimer()
    } else {
      if (isFocusCompleted && mode === 'focus') {
        setMode('break')
        stopOvertime()
        startTimer()
      } else if (isBreakCompleted && mode === 'break') {
        setMode('focus')
      }
      startTimer()
    }
  }

  let buttonText
  if (isFocusCompleted && mode === 'focus') {
    buttonText = `BREAK ${breakTime.minutes}:00`
  } else if (isBreakCompleted && mode === 'break') {
    buttonText = `FOCUS ${focusTime.minutes}:00`
  } else if (isTimerRunning) {
    buttonText = 'PAUSE'
  } else if (isTimerPaused) {
    buttonText = 'RESUME'
  } else {
    buttonText = mode === 'focus' ? 'START FOCUS' : 'START BREAK'
  }

  return <StyledButton onClick={handleClick}>{buttonText}</StyledButton>
}

export default StartButton
