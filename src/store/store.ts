import { create } from 'zustand'
import { StoreState, Log, PomodoroMode } from '../types/types'

export const useStore = create<StoreState>((set, get) => ({
  mode: 'home',
  setMode: (mode) => set({ mode }),

  initialFocusTime: { minutes: 25, seconds: 0 },
  setInitialFocusTime: (time) => set({ initialFocusTime: time }),

  initialBreakTime: { minutes: 5, seconds: 0 },
  setInitialBreakTime: (time) => set({ initialBreakTime: time }),

  focusTime: { minutes: 25, seconds: 0 },
  setFocusTime: (time) => set({ focusTime: time }),
  isFocusCompleted: false,

  breakTime: { minutes: 5, seconds: 0 },
  setBreakTime: (time) => set({ breakTime: time }),
  isBreakCompleted: false,

  overtime: { minutes: 0, seconds: 0 },
  setOvertime: (time) => set({ overtime: time }),
  isOvertimeRunning: false,

  isTimerPaused: false,
  isTimerRunning: false,
  timerInterval: null,
  startTime: null,

  startTimer: () => {
    if (get().isTimerRunning) return
    const startTime = new Date()
    set({ startTime, isTimerRunning: true })
    const interval = setInterval(() => {
      const {
        focusTime,
        breakTime,
        mode,
        initialBreakTime,
        initialFocusTime,
        isBreakCompleted,
        isFocusCompleted,
        saveLog,
        startTimer,
      } = get()
      if (mode === 'focus') {
        // FOCUS LOGIC
        if (focusTime.minutes === 0 && focusTime.seconds === 0) {
          clearInterval(interval)
          set({
            isOvertimeRunning: true,
            isTimerRunning: false,
            isFocusCompleted: true,
            isBreakCompleted: false,
            breakTime: initialBreakTime,
          })
          get().startOvertime()
        } else {
          let newMinutes =
            focusTime.seconds === 0 ? focusTime.minutes - 1 : focusTime.minutes
          let newSeconds = focusTime.seconds === 0 ? 59 : focusTime.seconds - 1
          set({ focusTime: { minutes: newMinutes, seconds: newSeconds } })
        }
      } else {
        // if mode === 'break' BREAK LOGIC
        if (breakTime.minutes === 0 && breakTime.seconds === 0) {
          if (!isBreakCompleted) {
            //CREATING AND SAVING COMPLETED BREAK LOG
            const endTime = new Date()
            const newLog: Log = {
              mode: PomodoroMode.BREAK,
              time: initialBreakTime.minutes * 60 + initialBreakTime.seconds,
              createdAt: endTime,
              startTime: startTime,
            }
            saveLog(newLog)
          }
          clearInterval(interval)
          set({
            isTimerRunning: false,
            isBreakCompleted: true,
            isFocusCompleted: false,
            focusTime: initialFocusTime,
          })
        } else {
          let newMinutes =
            breakTime.seconds === 0 ? breakTime.minutes - 1 : breakTime.minutes
          let newSeconds = breakTime.seconds === 0 ? 59 : breakTime.seconds - 1
          set({ breakTime: { minutes: newMinutes, seconds: newSeconds } })
        }
      }
    }, 1000)
    set({ isTimerRunning: true, timerInterval: interval })
  },

  pauseTimer: () => {
    const interval = get().timerInterval
    if (interval) {
      clearInterval(interval)
    }
    set({
      isTimerRunning: false,
      timerInterval: null,
      isTimerPaused: true,
      isOvertimeRunning: false,
      overtime: { minutes: 0, seconds: 0 },
    })
  },

  returnToHomeScreen: () => {
    const interval = get().timerInterval
    if (interval) clearInterval(interval)

    set({
      isTimerRunning: false,
      timerInterval: null,
      isTimerPaused: false,
      focusTime: { minutes: 25, seconds: 0 },
      breakTime: { minutes: 5, seconds: 0 },
      mode: 'home',
      isFocusCompleted: false,
      isBreakCompleted: false,
      isOvertimeRunning: false,
      overtime: { minutes: 0, seconds: 0 },
    })
  },

  cancelActiveMode: () => {
    const interval = get().timerInterval
    if (interval) clearInterval(interval)
    const currentMode = get().mode
    set({
      isTimerRunning: false,
      timerInterval: null,
      isTimerPaused: false,
      isFocusCompleted:
        currentMode === 'focus' ? false : get().isFocusCompleted,
      isBreakCompleted:
        currentMode === 'break' ? false : get().isBreakCompleted,
      focusTime: get().initialFocusTime,
      breakTime: get().initialBreakTime,
    })
  },

  startOvertime: () => {
    const isOver = get().isOvertimeRunning

    if (isOver) {
      const interval = setInterval(() => {
        let { overtime } = get()
        let newSeconds = overtime.seconds === 59 ? 0 : overtime.seconds + 1
        let newMinutes =
          overtime.seconds === 59 ? overtime.minutes + 1 : overtime.minutes

        set({ overtime: { minutes: newMinutes, seconds: newSeconds } })
      }, 1000)

      set({ timerInterval: interval })
    }
  },

  saveLog: (log: Log) => {
    const { startTime } = get()
    const endTime = new Date()

    const newLog = {
      ...log,
      startTime: startTime,
      createdAt: endTime,
    }

    const logs = JSON.parse(localStorage.getItem('logs') || '[]')
    logs.push(newLog)
    localStorage.setItem('logs', JSON.stringify(logs))
    console.log(newLog)

    set((state) => ({ ...state, startTime: null }))
  },
  stopOvertime: () => {
    const { initialFocusTime, overtime, saveLog } = get();
    const interval = get().timerInterval;
    if (interval) clearInterval(interval);
  
    const endTime = new Date();

    const initialFocusTimeMs = (initialFocusTime.minutes * 60 + initialFocusTime.seconds) * 1000;
    const overtimeMs = (overtime.minutes * 60 + overtime.seconds) * 1000;

    const startTime = new Date(endTime.getTime() - initialFocusTimeMs - overtimeMs);

    const totalTimeInSeconds = Math.round((initialFocusTimeMs + overtimeMs) / 1000);
    const totalTimeInMinutes = Math.round(totalTimeInSeconds / 60);
  
    const newLog: Log = {
      mode: PomodoroMode.FOCUS,
      time: totalTimeInMinutes * 60,
      createdAt: endTime,
      startTime: startTime,
    }
  
    saveLog(newLog);
  
    set({
      isOvertimeRunning: false,
      overtime: { minutes: 0, seconds: 0 },
      timerInterval: null,
    });
  },

  addFakeLogs: () => {
    const fakeLogs = []
    const currentDate = new Date()

    for (let i = 0; i < 5; i++) {
      const daysToSubtract = Math.floor(Math.random() * 7)

      const logDate = new Date(currentDate)
      logDate.setDate(logDate.getDate() - daysToSubtract)

      fakeLogs.push({
        mode: i % 2 === 0 ? PomodoroMode.FOCUS : PomodoroMode.BREAK,
        time: i % 2 === 0 ? 1500 : 300,
        createdAt: logDate,
        startTime: logDate,
      })
    }

    const updatedLogs = [...get().logs, ...fakeLogs]
    localStorage.setItem('logs', JSON.stringify(updatedLogs))
    set({ logs: updatedLogs })
  },
  logs: JSON.parse(localStorage.getItem('logs') || '[]'),

  setLogs: (newLogs: any) => set({ logs: newLogs }),
}))

export default useStore
