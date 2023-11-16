import React from 'react'
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
import { TimerState } from '../store/types'
import { useStore } from '../store/store'

interface CircleProps {
	top: string
	left: string
	opacity: number
	animation: any
}

const TimerContainer = styled.div`
	margin-top: 160px;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
	min-height: 133px;
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

const Overtime = styled.div`
	color: var(--Beige, #fef2e7);
	text-align: center;
	font-family: Roboto;
	font-size: 30px;
	font-style: normal;
	font-weight: 300;
	line-height: 40px; /* 133.333% */
	letter-spacing: 3px;
	position: absolute;
	top: 70px;
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
	const {
		mode,
		focusTime,
		breakTime,
		setFocusTime,
		setBreakTime,
		isTimerRunning,
		timerPaused,
		overtime,
		isFocusCompleted,
	} = useStore()

	const handleDecrease = () => {
		if (mode === 'focus') {
			setFocusTime({ ...focusTime, minutes: focusTime.minutes - 4 })
		} else {
			setBreakTime({ ...breakTime, minutes: breakTime.minutes - 4 })
		}
	}

	const handleIncrease = () => {
		if (mode === 'focus') {
			setFocusTime({ ...focusTime, minutes: focusTime.minutes + 5 })
		} else {
			setBreakTime({ ...breakTime, minutes: breakTime.minutes + 5 })
		}
	}

	const formatTime = ({ minutes, seconds }: TimerState) => {
		const formattedMinutes = minutes.toString().padStart(2, '0')
		const formattedSeconds = seconds.toString().padStart(2, '0')
		return `${formattedMinutes}:${formattedSeconds}`
	}

	const currentTimerValue = mode === 'focus' ? focusTime : breakTime

	const isFocusTimeZero = focusTime.minutes === 0 && focusTime.seconds === 0
	const formattedOvertime = isFocusTimeZero ? `+${formatTime(overtime)}` : ''

	return (
		<TimerContainer>
			<TimeDisplay>{formatTime(currentTimerValue)}</TimeDisplay>
			{!isTimerRunning && !timerPaused && (
				<ButtonsContainer>
					<TimerButton onClick={handleDecrease}>
						<Minus />
					</TimerButton>
					<TimerButton onClick={handleIncrease}>
						<Plus />
					</TimerButton>
				</ButtonsContainer>
			)}
			{mode === 'focus' && isFocusCompleted && <Overtime>{formattedOvertime}</Overtime>}
			<Circle animation={isTimerRunning ? orbitAnimation1 : ''} top='-105px' left='-150px' opacity={0.8} />
			<Circle animation={isTimerRunning ? orbitAnimation2 : ''} top='-125px' left='-170px' opacity={0.4} />
			<Circle animation={isTimerRunning ? orbitAnimation3 : ''} top='-115px' left='-70px' opacity={0.2} />
			<Circle animation={isTimerRunning ? orbitAnimation4 : ''} top='-130px' left='-100px' opacity={1} />
			<Circle animation={isTimerRunning ? orbitAnimation5 : ''} top='-95px' left='-105px' opacity={0.6} />
		</TimerContainer>
	)
}

export default Timer
