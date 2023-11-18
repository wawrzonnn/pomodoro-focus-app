import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Timer from './components/Timer'
import StartButton from './components/StartButton'
import StopButton from './components/StopButton'
import { Logs } from './components/Logs'
import { useStore } from './store/store'
const Container = styled.div`
  min-width: 390px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  background: #000300;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  position: relative;
  padding: 0 20px;
  margin-bottom: 20px;
`
const Separator = styled.div`
  margin-top: 48px;
  width: 40px;
  height: 0.5px;
  background: #fef2e7;
`

const Divek = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: black;
  z-index: 999;
  font-size: 12px;
  font-family: Roboto;
`

const ButtonsWrapper = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
`

function App() {
  const { setFocusTime, setBreakTime, addFakeLogs } = useStore()
  const [isPanelVisible, setIsPanelVisible] = React.useState(false)

  const togglePanelVisibility = () => {
    setIsPanelVisible(!isPanelVisible)
  }
  const test1 = () => {
    setFocusTime({ minutes: 0, seconds: 3 })
  }
  const test2 = () => {
    setBreakTime({ minutes: 0, seconds: 3 })
  }
  const clearLocalStorage = () => {
    localStorage.clear()
  }
  return (
    <Container>
      <ButtonsWrapper></ButtonsWrapper>
      <button
        onClick={togglePanelVisibility}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {isPanelVisible ? 'Hide Dev Buttons' : 'Show Dev Buttons'}
      </button>
      {isPanelVisible && (
        <Divek>
          Control Buttons for State Management to Test the Application
          <ButtonsWrapper>
            <button
              onClick={test1}
              style={{ zIndex: 999, position: 'relative' }}
            >
              FOCUS
            </button>
            <p>Set the focus time to 00:03</p>
          </ButtonsWrapper>
          <ButtonsWrapper>
            <button
              onClick={test2}
              style={{ zIndex: 999, position: 'relative' }}
            >
              BREAK
            </button>
            <p>Set the break time to 00:03</p>
          </ButtonsWrapper>
          <ButtonsWrapper>
            <button onClick={addFakeLogs}>ADD LOGS</button>
            <p>Add fake logs, click and refresh the page</p>
          </ButtonsWrapper>
          <ButtonsWrapper>
            <button onClick={clearLocalStorage}>CLEAR LOGS</button>
            <p>Clear logs, click and refresh</p>
          </ButtonsWrapper>
        </Divek>
      )}
      <Header />
      <Timer />
      <StartButton />
      <StopButton />
      <Separator />
      <Logs />
    </Container>
  )
}

export default App
