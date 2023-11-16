import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Timer from './components/Timer'
import StartButton from './components/StartButton'
import StopButton from './components/StopButton'
import LogsButton from './components/Logs'

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
			<Header />
			<Timer />
			<StartButton />
			<StopButton />
			<Separator />
			<LogsButton/>
		</Container>
	)
}

export default App
