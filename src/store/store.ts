import { create } from 'zustand';
import { StoreState } from './types'

export const useStore = create<StoreState>((set, get) => ({
    mode: 'focus',
    focusTime: { minutes: 25, seconds: 0 },
    breakTime: { minutes: 5, seconds: 0 },
    overtime: { minutes: 0, seconds: 0 },
    isFocusCompleted: false,
    isTimerRunning: false,
    timerInterval: null,

    setMode: (mode) => set({ mode }),
    setFocusTime: (time) => set({ focusTime: time }),
    setBreakTime: (time) => set({ breakTime: time }),
    setovertime: (time) => set({ overtime: time }),
    timerPaused: false,
    startTimer: () => {
        if (get().isTimerRunning) return;

        const interval = setInterval(() => {
            set(state => {
                if (state.mode === 'focus') {
                    let { minutes, seconds } = state.focusTime;

                    if (minutes === 0 && seconds === 0) {
                        let overtimeSeconds = state.overtime.seconds + 1;
                        let overtimeMinutes = state.overtime.minutes;

                        if (overtimeSeconds >= 60) {
                            overtimeMinutes++;
                            overtimeSeconds = 0;
                        }

                        return { ...state, overtime: { minutes: overtimeMinutes, seconds: overtimeSeconds }};
                    } else {
                        seconds--;
                        if (seconds < 0) {
                            minutes--;
                            seconds = 59;
                        }

                        const isFocusCompleted = minutes <= 0 && seconds <= 0;

                        return { ...state, focusTime: { minutes, seconds }, isFocusCompleted };
                    }
                } else {
                    let { minutes, seconds } = state.breakTime;

                    seconds--;
                    if (seconds < 0) {
                        minutes--;
                        seconds = 59;
                    }

                    if (minutes < 0) {
                        clearInterval(interval);
                        return { ...state, isTimerRunning: false, timerInterval: null };
                    }

                    return { ...state, breakTime: { minutes, seconds }};
                }
            });
        }, 1000);

        set({ isTimerRunning: true, timerPaused: false, timerInterval: interval });
    },

    pauseTimer: () => {
        const interval = get().timerInterval;
        if (interval) {
            clearInterval(interval);
        }
        set({ isTimerRunning: false, timerInterval: null, timerPaused: true, overtime: { minutes: 0, seconds: 0 } });
    },

    cancelFocusMode: () => {
        const interval = get().timerInterval;
        if (interval) clearInterval(interval);
        set({ isTimerRunning: false, timerInterval: null, timerPaused: false, focusTime: { minutes: 25, seconds: 0 }, breakTime: { minutes: 5, seconds: 0 }, overtime: { minutes: 0, seconds: 0 }, mode: 'break', isFocusCompleted: false});
    },
    returnToHomeScreen: () => {
        const interval = get().timerInterval;
        if (interval) clearInterval(interval);

        set({
            isTimerRunning: false,
            timerInterval: null,
            timerPaused: false,
            focusTime: { minutes: 25, seconds: 0 },
            breakTime: { minutes: 5, seconds: 0 },
            overtime: { minutes: 0, seconds: 0 },
            mode: 'break',
            isFocusCompleted: false
        });
    },
}));

export default useStore;