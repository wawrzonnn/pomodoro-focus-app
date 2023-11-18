import { create } from 'zustand'
import { StoreState, Log, PomodoroMode } from './types'

export const useStore = create<StoreState>((set, get) => ({
  mode: 'focus',
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

  startTimer: () => {
    if (get().isTimerRunning) return
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
      } = get()
      if (mode === 'focus') {
        // FOCUS LOGIC
        if (focusTime.minutes === 0 && focusTime.seconds === 0) {
          if (!isFocusCompleted) {
            //CREATING AND SAVING COMPLETED FOCUS LOG
            const newLog: Log = {
              mode: PomodoroMode.FOCUS,
              time: initialFocusTime.minutes * 60 + initialFocusTime.seconds,
              createdAt: new Date(),
			  startTime: new Date()
            }
            saveLog(newLog)
          }
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
            const newLog: Log = {
              mode: PomodoroMode.BREAK,
              time: initialBreakTime.minutes * 60 + initialBreakTime.seconds,
              createdAt: new Date(),
			  startTime: new Date()
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

  returnToHomeScreen: (newMode: 'focus' | 'break') => {
    const interval = get().timerInterval
    if (interval) clearInterval(interval)

    set({
      isTimerRunning: false,
      timerInterval: null,
      isTimerPaused: false,
      focusTime: { minutes: 25, seconds: 0 },
      breakTime: { minutes: 5, seconds: 0 },
      mode: newMode,
      isFocusCompleted: false,
      isBreakCompleted: false,
	  isOvertimeRunning: false, 
	  overtime: { minutes: 0, seconds: 0 },
    })
  },

  cancelActiveMode: (newMode: 'focus' | 'break') => {
    const interval = get().timerInterval
    if (interval) clearInterval(interval)
    set({
      isTimerRunning: false,
      timerInterval: null,
      isTimerPaused: false,
      mode: newMode,
      isFocusCompleted: newMode === 'focus' ? false : get().isFocusCompleted,
      isBreakCompleted: newMode === 'break' ? false : get().isBreakCompleted,
      focusTime: { minutes: 25, seconds: 0 },
      breakTime: { minutes: 5, seconds: 0 },
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

  stopOvertime: () => {
    const interval = get().timerInterval
    if (interval) clearInterval(interval)

    set({
      isOvertimeRunning: false,
      overtime: { minutes: 0, seconds: 0 },
      timerInterval: null,
    })
  },

  saveLog: (log: Log) => {
    const logs = JSON.parse(localStorage.getItem('logs') || '[]')
    logs.push(log)
    localStorage.setItem('logs', JSON.stringify(logs))
	console.log(log);
  },
}))

export default useStore
