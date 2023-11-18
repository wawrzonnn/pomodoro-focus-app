export interface TimerState {
  minutes: number
  seconds: number
}

export enum PomodoroMode {
  BREAK = 'BREAK',
  FOCUS = 'FOCUS',
}

export interface Log {
  mode: PomodoroMode
  time: number
  createdAt: Date
}

export interface StoreState {
  mode: 'focus' | 'break'
  setMode: (mode: 'focus' | 'break') => void

  initialFocusTime: TimerState
  setInitialFocusTime: (time: TimerState) => void

  initialBreakTime: TimerState
  setInitialBreakTime: (time: TimerState) => void

  focusTime: TimerState
  setFocusTime: (time: TimerState) => void
  isFocusCompleted: boolean

  breakTime: TimerState
  setBreakTime: (time: TimerState) => void
  isBreakCompleted: boolean

  overtime: TimerState
  setOvertime: (time: TimerState) => void
  isOvertimeRunning: boolean

  isTimerPaused: boolean
  isTimerRunning: boolean
  timerInterval: number | null

  startTimer: () => void
  pauseTimer: () => void
  stopOvertime: () => void
  cancelActiveMode: (newMode: 'focus' | 'break') => void
  returnToHomeScreen: (newMode: 'focus' | 'break') => void
  startOvertime: () => void
  saveLog: (log: Log) => void
}
