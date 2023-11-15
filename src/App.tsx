import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Timer from './components/Timer'
import StartButton from './components/Buttons/StartButton'
import StopButton from './components/Buttons/StopButton'
import LogsButton from './components/Buttons/LogsButton'

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
`
const Separator = styled.div`
	margin-top: 48px;
	width: 40px;
	height: 0.5px;
	background: #fef2e7;
`

function App() {
	return (
		<Container>
			<button>huj</button>
			<Header />
			<Timer />
			<StartButton text='START FOCUS' />
			<StopButton text='TAKE A BREAK' />
			<Separator />
			<LogsButton text='Show logs' />
		</Container>
	)
}

export default App
