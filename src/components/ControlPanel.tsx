import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import ArrowDown from '../assets/icons/ArrowDown'

interface DevControlPanelComponentProps {
  isPanelVisible: boolean
  togglePanelVisibility: (isVisible: boolean) => void
  handleSetFocus: () => void
  handleSetBreak: () => void
  addFakeLogs: () => void
  clearLocalStorage: () => void
}

const DevControlPanel = styled.div`
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background: black;
  z-index: 999;
  font-size: 12px;
  font-family: Roboto;
`
const DevControlPanelButton = styled.button`
  margin-top: 10px;
  width: 100%;
  border: none;
  background: black;
  opacity: 0.7;
  font-size: 14px;
  color: var(--Beige, #fef2e7);
  text-align: center;
  font-family: Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
`
const Xmark = styled.button`
  border: none;
  background: none;
  color: #fef2e7;
  font-size: 24px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 5px;
  border: 1px solid #fef2e7;
`

const StyledButton = styled.button`
  background-color: #282c34;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px;
  transition:
    background-color 0.3s,
    transform 0.3s;
  width: 90px;
  height: 80px;
  &:hover {
    background-color: #4b4f58;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

const DevControlPanelComponent = ({
  isPanelVisible,
  togglePanelVisibility,
  handleSetFocus,
  handleSetBreak,
  addFakeLogs,
  clearLocalStorage,
}: DevControlPanelComponentProps) => {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        togglePanelVisibility(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  return (
    <>
      <DevControlPanelButton
        onClick={() => togglePanelVisibility(!isPanelVisible)}
      >
        {isPanelVisible ? 'Hide Dev control panel' : 'Show Dev control panel'}
        <ArrowDown />
      </DevControlPanelButton>
      {isPanelVisible && (
        <DevControlPanel ref={panelRef}>
          Control buttons for state management to test the application.
          <ButtonsWrapper>
            <StyledButton onClick={handleSetFocus}>
              Set focus time to 00:03
            </StyledButton>
            <StyledButton onClick={handleSetBreak}>
              Set break time to 00:03
            </StyledButton>
            <StyledButton onClick={addFakeLogs}>
              Add fake logs (click and refresh the page)
            </StyledButton>
            <StyledButton onClick={clearLocalStorage}>
              Clear logs (click and refresh the page)
            </StyledButton>
          </ButtonsWrapper>
          <Xmark onClick={() => togglePanelVisibility(false)}>X</Xmark>
        </DevControlPanel>
      )}
    </>
  )
}

export default DevControlPanelComponent
