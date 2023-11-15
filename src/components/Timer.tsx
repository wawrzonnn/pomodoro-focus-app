import React, { useState } from 'react'
import styled from 'styled-components'
import {
	orbitAnimation1,
	orbitAnimation2,
	orbitAnimation3,
	orbitAnimation4,
	orbitAnimation5,
} from '../animations/animations'
import { Plus } from '../assets/icons/Plus'
import { Minus } from '../assets/icons/Minus'

interface CircleProps {
	top: string
	left: string
	opacity: number
	animation: any
}

const TimerContainer = styled.div`
	margin-top: 150px;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 15px;
`

const TimeDisplay = styled.span`
	color: var(--Beige, #fef2e7);
	text-align: center;
	font-family: Roboto;
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
	opacity: ${props => props.opacity};
	position: absolute;
	top: ${props => props.top};
	left: ${props => props.left};
	animation: ${props => props.animation} 8000ms ease-in-out infinite;
`

const Timer = () => {
	const [focusTime, setFocusTime] = useState(25)
	const [breakTime, setBreakTime] = useState(5)

	const handleDecrease = () => {
		setFocusTime(prev => Math.max(prev - 5, 5))
		setBreakTime(prev => Math.max(prev - 5, 5))
	}

	const handleIncrease = () => {
		setFocusTime(prev => prev + 5)
		setBreakTime(prev => prev + 5)
	}

	return (
		<TimerContainer>
			<button onClick={handleDecrease}>ghghhg</button>
			<TimeDisplay>{focusTime}:00</TimeDisplay>
			<ButtonsContainer>
				<TimerButton onClick={handleDecrease}>
					<Minus />
				</TimerButton>
				<TimerButton onClick={handleIncrease}>
					<Plus />
				</TimerButton>
			</ButtonsContainer>
			<Circle animation={orbitAnimation1} top='-110px' left='-130px' opacity={0.8} />
			<Circle animation={orbitAnimation2} top='-120px' left='-120px' opacity={0.4} />
			<Circle animation={orbitAnimation3} top='-115px' left='-110px' opacity={0.2} />
			<Circle animation={orbitAnimation4} top='-125px' left='-115px' opacity={1} />
			<Circle animation={orbitAnimation5} top='-105px' left='-105px' opacity={0.6} />
		</TimerContainer>
	)
}

export default Timer
