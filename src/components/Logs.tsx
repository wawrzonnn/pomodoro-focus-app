import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { PomodoroMode } from '../store/types'
import { groupLogsByDate, formatTime } from '../utils/formatLogsDate'
import { ArrowRight } from '../assets/icons/ArrowRight'
import { ArrowDown } from '../assets/icons/ArrowDown'

const ShowLogsButton = styled.button`
  margin-top: 20px;
  color: var(--Beige, #fef2e7);
  font-family: Raleway;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.6px;
  background-color: transparent;
  border: none;
  outline: none;
  margin-bottom: 10px;
  cursor: pointer;
`

const LogsContainer = styled.div`
  background: #191b17;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
`
const LogWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const BaseText = styled.span`
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 1.2px;
  text-transform: uppercase;
`

const DayContainer = styled.div`
  width: 350px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  border-bottom: 1px solid #000300;
`

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Date = styled(BaseText)``

const TotalTime = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`
const TimeEntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TimeEntry = styled.span`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.6px;
`
const TimeEntryLabel = styled(BaseText)``

const Separator = styled.span`
  width: 1px;
  height: 20px;
  background: #fef2e7;
`
const LogEntry = styled.div`
  height: 40px;
  background: #0d0f0c;
  width: 350px;
  padding: 0px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #000300;
  border-bottom: 1px solid #000300;
`

const LogDetails = styled(BaseText)``

const LogDuration = styled(TimeEntry)`
  min-width: 20px;
  text-align: right;
`
const ToggleArrow = styled.span``

export const Logs = () => {
  const [logs, setLogs] = useState([])
  const [showLogs, setShowLogs] = useState<boolean>(false)
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('logs') || '[]')
    setLogs(storedLogs)
  }, [])

  const groupedLogs = groupLogsByDate(logs)

  const toggleLogs = () => {
    setShowLogs(!showLogs)
  }

  const toggleDetails = (date: any) => {
    setShowDetails((prevDetails) => ({
      ...prevDetails,
      [date]: !prevDetails[date],
    }))
  }

  return (
    <>
      <ShowLogsButton onClick={toggleLogs}>{showLogs ? 'Hide' : 'Show'} logs</ShowLogsButton>
      {showLogs && (
        <LogsContainer>
          {Object.entries(groupedLogs).map(([date, data]) => (
            <LogWrapper key={date}>
              <DayContainer onClick={() => toggleDetails(date)}>
                <DateWrapper>
                  <Date>{date.split(' ')[0]}</Date>
                  <Date>{date.split(' ').slice(1).join(' ')}</Date>
                </DateWrapper>
                <TotalTime>
                  <TimeEntryWrapper>
                    <TimeEntry>{data.totalFocus}</TimeEntry>
                    <TimeEntryLabel>FOCUS</TimeEntryLabel>
                  </TimeEntryWrapper>
                  <Separator></Separator>
                  <TimeEntryWrapper>
                    <TimeEntry>{data.totalBreak}</TimeEntry>
                    <TimeEntryLabel>BREAK</TimeEntryLabel>
                  </TimeEntryWrapper>
                  <ToggleArrow>
                    {showDetails[date] ? <ArrowDown /> : <ArrowRight />}
                  </ToggleArrow>
                </TotalTime>
              </DayContainer>
              {showDetails[date] &&
                data.logs.map((log, index: React.Key | null | undefined) => (
                  <LogEntry key={index}>
                    <LogDetails>
                      {formatTime(log.startTime, log.time)}{' '}
                    </LogDetails>
                    <LogDetails>
                      {log.mode === PomodoroMode.FOCUS ? 'FOCUS' : 'BREAK'}
                    </LogDetails>
                    <LogDuration>{log.time / 60}</LogDuration>
                  </LogEntry>
                ))}
            </LogWrapper>
          ))}
        </LogsContainer>
      )}
    </>
  )
}

export default Logs
