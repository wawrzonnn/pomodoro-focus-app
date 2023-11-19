import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Timer from './components/Timer'
import StartButton from './components/StartButton'
import StopButton from './components/StopButton'
import { Logs } from './components/Logs'
import { useStore } from './store/store'
import DevControlPanelComponent from './components/ControlPanel'

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
  margin-top: 40px;
  width: 40px;
  height: 0.5px;
  background: #fef2e7;
`

function App() {
  const { setFocusTime, setBreakTime, addFakeLogs } = useStore()
  const [isPanelVisible, setIsPanelVisible] = useState(false)

  const togglePanelVisibility = () => {
    setIsPanelVisible(!isPanelVisible)
  }

  const handleSetFocus = () => {
    setFocusTime({ minutes: 0, seconds: 3 })
  }
  const handleSetBreak = () => {
    setBreakTime({ minutes: 0, seconds: 3 })
  }
  const clearLocalStorage = () => {
    localStorage.clear()
  }

  return (
    <Container>
      <DevControlPanelComponent
        isPanelVisible={isPanelVisible}
        togglePanelVisibility={togglePanelVisibility}
        handleSetFocus={handleSetFocus}
        handleSetBreak={handleSetBreak}
        addFakeLogs={addFakeLogs}
        clearLocalStorage={clearLocalStorage}
      />
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
