import { create } from 'zustand'
import { StoreState, Log } from './types'

export const useStore = create<StoreState>((set, get) => ({
	mode: 'focus',
	focusTime: { minutes: 25, seconds: 0 },
	breakTime: { minutes: 5, seconds: 0 },
	overtime: { minutes: 0, seconds: 0 },
	isFocusCompleted: false,
	isBreakCompleted: false,
	isTimerRunning: false,
	timerInterval: null,

	setMode: mode => set({ mode }),
	setFocusTime: time => set({ focusTime: time }),
	setBreakTime: time => set({ breakTime: time }),
	setovertime: time => set({ overtime: time }),
	timerPaused: false,
	saveLog: (log: Log) => {
		const logs = JSON.parse(localStorage.getItem('logs') || '[]')
		logs.push(log)
		localStorage.setItem('logs', JSON.stringify(logs))
		console.log('saved log:', log)
	},

	startTimer: () => {
		if (get().isTimerRunning) return
		const currentState = get()
		const currentTime = currentState.mode === 'focus' ? currentState.focusTime : currentState.breakTime

        //LOGS SAVING LOGIC
		const newLog: Log = {
			mode: currentState.mode === 'focus' ? 'FOCUS' : 'BREAK',
			time: currentTime.minutes * 60 + currentTime.seconds,
			createdAt: new Date(),
		}
		get().saveLog(newLog)

		const interval = setInterval(() => {
			set(state => {
				// FOCUS MODE LOGIC
				if (state.mode === 'focus') {
					let { minutes, seconds } = state.focusTime

					if (minutes === 0 && seconds === 0) {
						// OVERTIME LOGIC
						let overtimeSeconds = state.overtime.seconds + 1
						let overtimeMinutes = state.overtime.minutes

						if (overtimeSeconds >= 60) {
							overtimeMinutes++
							overtimeSeconds = 0
						}

						return { ...state, overtime: { minutes: overtimeMinutes, seconds: overtimeSeconds } }
					} else {
						// FOCUS MODE NORMAL TIMER RUNNING LOGIC
						seconds--
						if (seconds < 0) {
							minutes--
							seconds = 59
						}

						const isFocusCompleted = minutes <= 0 && seconds <= 0
						return { ...state, focusTime: { minutes, seconds }, isFocusCompleted }
					}
				} else {
					// BREAK MODE LOGIC
					let { minutes, seconds } = state.breakTime

					seconds--
					if (seconds < 0) {
						minutes--
						seconds = 59
					}

					if (minutes < 0) {
						// IF BREAK IS 00:00
						clearInterval(interval)
						return {
							...state,
							isTimerRunning: false,
							timerInterval: null,
							isBreakCompleted: true,
						}
					}

					return { ...state, breakTime: { minutes, seconds } }
				}
			})
		}, 1000)

		set({ isTimerRunning: true, timerPaused: false, timerInterval: interval })
	},

	pauseTimer: () => {
		const interval = get().timerInterval
		if (interval) {
			clearInterval(interval)
		}
		set({ isTimerRunning: false, timerInterval: null, timerPaused: true, overtime: { minutes: 0, seconds: 0 } })
	},

	returnToHomeScreen: (newMode: 'focus' | 'break') => {
		const interval = get().timerInterval
		if (interval) clearInterval(interval)

		set({
			isTimerRunning: false,
			timerInterval: null,
			timerPaused: false,
			focusTime: { minutes: 25, seconds: 0 },
			breakTime: { minutes: 5, seconds: 0 },
			overtime: { minutes: 0, seconds: 0 },
			mode: newMode,
			isFocusCompleted: false,
			isBreakCompleted: false,
		})
	},

	cancelActiveMode: (newMode: 'focus' | 'break') => {
		const interval = get().timerInterval
		if (interval) clearInterval(interval)

		set({
			isTimerRunning: false,
			timerInterval: null,
			timerPaused: false,
			mode: newMode,
			isFocusCompleted: newMode === 'focus' ? false : get().isFocusCompleted,
			isBreakCompleted: newMode === 'break' ? false : get().isBreakCompleted,
			focusTime: { minutes: 25, seconds: 0 },
			breakTime: { minutes: 5, seconds: 0 },
			overtime: { minutes: 0, seconds: 0 },
		})
	},
}))

export default useStore
