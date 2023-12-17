import { Log, PomodoroMode } from '../types/types'

export interface GroupedLogs {
  [date: string]: {
    logs: Log[]
    totalFocus: number
    totalBreak: number
  }
}

export const formatDate = (date: string | number | Date) => {
  const d = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }
  return d
    .toLocaleDateString('en-US', options)
    .replace(/,/g, '')
    .replace(/\//g, '.')
}

export const groupLogsByDate = (logs: Log[]): GroupedLogs => {
  return logs.reduce<GroupedLogs>((acc, log) => {
    const date = formatDate(log.createdAt)
    if (!acc[date]) {
      acc[date] = {
        logs: [],
        totalFocus: 0,
        totalBreak: 0,
      }
    }
    acc[date].logs.push({ ...log, startTime: log.createdAt })
    if (log.mode === PomodoroMode.FOCUS) {
      acc[date].totalFocus += Math.round(log.time / 60);
    } else {
      acc[date].totalBreak += log.time / 60
    }
    return acc
  }, {})
}

export const formatTime = (startTime: Date, durationInSeconds: number) => {
  const start = new Date(startTime)
  const end = new Date(start.getTime() + durationInSeconds * 1000)

  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  const formattedStart = start
    .toLocaleTimeString('pl-PL', formatOptions)
    .substring(0, 5)
  const formattedEnd = end
    .toLocaleTimeString('pl-PL', formatOptions)
    .substring(0, 5)

  return `${formattedStart} - ${formattedEnd}`
}
