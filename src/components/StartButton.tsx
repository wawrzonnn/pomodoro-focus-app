import React from 'react'
import styled from 'styled-components'
import useStore from '../store/store'

const StyledButton = styled.button`
	margin-top: 210px;
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
`

export const StartButton = () => {
	const {
		isTimerRunning,
		timerPaused,
		startTimer,
		pauseTimer,
		setMode,
		mode,
		focusTime,
		breakTime,
		isFocusCompleted,
		isBreakCompleted,
	} = useStore()

	const handleClick = () => {
        if (isTimerRunning) {
            pauseTimer();
        } else {
            if (isFocusCompleted && mode === 'focus') {
                setMode('break');
            } else if (isBreakCompleted && mode === 'break') {
                setMode('focus');
            }
            startTimer();
        }
    };

	let buttonText
	if (isFocusCompleted && mode === 'focus') {
		buttonText = `BREAK ${breakTime.minutes}:00`
	} else if (isBreakCompleted && mode === 'break') {
		buttonText = `FOCUS ${focusTime.minutes}:00`
	} else if (isTimerRunning) {
		buttonText = 'PAUSE'
	} else if (timerPaused) {
		buttonText = 'RESUME'
	} else {
		buttonText = mode === 'focus' ? 'START FOCUS' : 'START BREAK'
	}

	return <StyledButton onClick={handleClick}>{buttonText}</StyledButton>
}

export default StartButton
