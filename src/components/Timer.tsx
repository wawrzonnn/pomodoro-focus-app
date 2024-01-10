import React from 'react'
import styled from 'styled-components'
import {
  orbitAnimation1,
  orbitAnimation2,
  orbitAnimation3,
  orbitAnimation4,
  orbitAnimation5,
} from '../animations/timerCircles'
import { Plus } from '../assets/icons/Plus'
import { Minus } from '../assets/icons/Minus'
import { TimerState } from '../types/types'
import { useStore } from '../store/store'

interface CircleProps {
  top: string
  left: string
  opacity: number
  animation: any
  isPaused: boolean
}

const TimerContainer = styled.div`
  margin-top: 180px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  min-height: 158px;
  width: 168px;
`

const TimeDisplay = styled.span`
  margin-top: 25px;
  color: var(--Beige, #fef2e7);
  text-align: center;
  font-family: Inter;
  font-size: 60px;
  font-style: normal;
  font-weight: 300;
  line-height: 60px; /* 100% */
  letter-spacing: 6px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
`

const Overtime = styled.div`
  color: var(--Beige, #fef2e7);
  text-align: center;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 300;
  line-height: 40px; /* 133.333% */
  letter-spacing: 3px;
  position: absolute;
  top: 100px;
`

const TimerButton = styled.button`
  display: flex;
  width: 55px;
  height: 55px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 80px;
  border: 0.5px solid var(--Beige, #fef2e7);
  background: var(--Dark, #000300);
  cursor: pointer;
  z-index: 100;
`

const Circle = styled.div<CircleProps>`
  width: 407.895px;
  height: 407.088px;
  flex-shrink: 0;
  border-radius: 407.895px;
  border: 1px solid var(--Beige, #fef2e7);
  opacity: ${(props) => props.opacity};
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  animation: ${(props) => props.animation} 10000ms ease-in-out infinite;
  animation-play-state: ${(props) => (props.isPaused ? 'paused' : 'running')};
`

const Timer = () => {
  const {
    mode,
    focusTime,
    breakTime,
    setFocusTime,
    setBreakTime,
    isTimerRunning,
    isTimerPaused,
    overtime,
    isFocusCompleted,
    setInitialFocusTime,
    initialFocusTime,
    setInitialBreakTime,
    initialBreakTime,
    isBreakCompleted,
    isOvertimeRunning,
  } = useStore()

  const handleDecrease = () => {
    if (mode === 'focus' || mode === 'home') {
      setFocusTime({
        ...focusTime,
        minutes: Math.max(focusTime.minutes - 5, 5),
      })
      setInitialFocusTime({
        ...initialFocusTime,
        minutes: Math.max(initialFocusTime.minutes - 5, 5),
      })
    } else {
      setBreakTime({
        ...breakTime,
        minutes: Math.max(breakTime.minutes - 5, 5),
      })
      setInitialBreakTime({
        ...initialBreakTime,
        minutes: Math.max(initialBreakTime.minutes - 5, 5),
      })
    }
  }

  const handleIncrease = () => {
    if (mode === 'focus' || mode === 'home') {
      setFocusTime({ ...focusTime, minutes: focusTime.minutes + 5 })
      setInitialFocusTime({
        ...initialFocusTime,
        minutes: initialFocusTime.minutes + 5,
      })
    } else {
      setBreakTime({ ...breakTime, minutes: breakTime.minutes + 5 })
      setInitialBreakTime({
        ...initialBreakTime,
        minutes: initialBreakTime.minutes + 5,
      })
    }
  }

  const formatTime = ({ minutes, seconds }: TimerState) => {
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  const currentTimerValue = (mode === 'focus' || mode === 'home') ? focusTime : breakTime;


  const formattedOvertime = `+ ${formatTime(overtime)}`

  const showButtonsContainer =
    !isTimerRunning &&
    !isTimerPaused &&
    !(isFocusCompleted && mode === 'focus') &&
    !(isBreakCompleted && mode === 'break')

  return (
    <TimerContainer>
      <TimeDisplay>{formatTime(currentTimerValue)}</TimeDisplay>
      {showButtonsContainer && (
        <ButtonsContainer>
          <TimerButton onClick={handleDecrease}>
            <Minus />
          </TimerButton>
          <TimerButton onClick={handleIncrease}>
            <Plus />
          </TimerButton>
        </ButtonsContainer>
      )}
      {isOvertimeRunning && <Overtime>{formattedOvertime}</Overtime>}
      <Circle
        animation={orbitAnimation1}
        isPaused={!isTimerRunning}
        top="-105px"
        left="-105px"
        opacity={0.8}
      />
      <Circle
        animation={orbitAnimation2}
        isPaused={!isTimerRunning}
        top="-109px"
        left="-137px"
        opacity={0.4}
      />
      <Circle
        animation={orbitAnimation3}
        isPaused={!isTimerRunning}
        top="-102px"
        left="-145px"
        opacity={0.2}
      />
      <Circle
        animation={orbitAnimation4}
        isPaused={!isTimerRunning}
        top="-97px"
        left="-105px"
        opacity={1}
      />
      <Circle
        animation={orbitAnimation5}
        isPaused={!isTimerRunning}
        top="-105px"
        left="-105px"
        opacity={0.6}
      />
    </TimerContainer>
  )
}

export default Timer
