import React from 'react'
import styled from 'styled-components'
import useStore from '../../store/store';


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
    const { isTimerRunning, timerPaused, mode, setMode, cancelFocusMode, focusTime, setFocusTime, startTimer, isFocusCompleted, returnToHomeScreen } = useStore();


    const handleClick = () => {
        if (isTimerRunning || timerPaused) {
            cancelFocusMode();
        } else if (isFocusCompleted && mode === 'focus') {
            // Logika dla kliknięcia na 'DONE'
            returnToHomeScreen();
        } else {
            setMode(mode === 'focus' ? 'break' : 'focus');
        }
    };

	let buttonText;
    if (isFocusCompleted) {
        buttonText = 'DONE';
    } else if (isTimerRunning || timerPaused) {
        buttonText = 'CANCEL';
    } else if (mode === 'focus') {
        buttonText = 'TAKE A BREAK';
    } else {
        buttonText = 'FOCUS';
    }

    return <StyledButton onClick={handleClick}>{buttonText}</StyledButton>;
};

export default StopButton;