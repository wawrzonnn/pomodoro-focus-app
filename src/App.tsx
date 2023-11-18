import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Timer from './components/Timer'
import StartButton from './components/StartButton'
import StopButton from './components/StopButton'
import LogsButton from './components/Logs'
import { useStore } from './store/store'
const Container = styled.div`
	width: 390px;
	height: 100%;
	margin: 0 auto;
	overflow-y: scroll;
	background: #000300;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-x: hidden;
	position: relative;
`
const Separator = styled.div`
	margin-top: 48px;
	width: 40px;
	height: 0.5px;
	background: #fef2e7;
`

const Divek = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
`

function App() {
	const { setFocusTime, setBreakTime } = useStore()

	const test1 = () => {
		setFocusTime({ minutes: 0, seconds: 3 })
	}
	const test2 = () => {
		setBreakTime({ minutes: 0, seconds: 3 })
	}
	return (
		<Container>
			<Divek>
				<button onClick={test1} style={{ zIndex: 999, position: 'relative' }}>
					Focus
				</button>
				<button onClick={test2} style={{ zIndex: 999, position: 'relative' }}>
					Break
				</button>
			</Divek>
			<Header />
			<Timer />
			<StartButton />
			<StopButton />
			<Separator />
			<LogsButton />
		</Container>
	)
}

export default App
