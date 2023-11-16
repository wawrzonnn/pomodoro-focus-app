import React from 'react'
import styled from 'styled-components'
import useStore from '../store/store'

const StyledButton = styled.button`
	margin-top: 25px;
	color: var(--Beige, #fef2e7);
	text-align: center;
	/* Regular, 16 */
	font-family: Raleway;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 1.6px;
	background-color: transparent;
	border: none;
	outline: none;
`

export const StopButton = () => {
	const {
		isTimerRunning,
		timerPaused,
		mode,
		setMode,
		isFocusCompleted,
		isBreakCompleted,
		returnToHomeScreen,
		cancelActiveMode,
	} = useStore()

	const handleClick = () => {
        if (isTimerRunning || timerPaused) {
            cancelActiveMode(mode === 'focus' ? 'break' : 'focus');
        } else if (isFocusCompleted && mode === 'focus') {
            returnToHomeScreen('break');
        } else if (isBreakCompleted && mode === 'break') {
            returnToHomeScreen('focus');
        } else {
            setMode(mode === 'focus' ? 'break' : 'focus');
        }
    };

	let buttonText = 'TAKE A BREAK'
	if (isFocusCompleted || isBreakCompleted) {
		buttonText = 'DONE'
	} else if (isTimerRunning || timerPaused) {
		buttonText = 'CANCEL'
	} else if (mode === 'focus') {
		buttonText = 'TAKE A BREAK'
	} else {
		buttonText = 'FOCUS'
	}

	return <StyledButton onClick={handleClick}>{buttonText}</StyledButton>
}

export default StopButton
