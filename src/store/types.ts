export interface TimerState {
    minutes: number;
    seconds: number;
}

export interface StoreState {
    mode: 'focus' | 'break';
    focusTime: TimerState;
    breakTime: TimerState;
    overtime: TimerState,
    isTimerRunning: boolean;
    timerInterval: number | null;
    setMode: (mode: 'focus' | 'break') => void;
    setFocusTime: (time: TimerState) => void;
    setBreakTime: (time: TimerState) => void;
    setovertime: (time: TimerState) => void;
    startTimer: () => void;
    pauseTimer: () => void;
    timerPaused: boolean;
    cancelFocusMode: () => void;
    returnToHomeScreen: () => void;
    isFocusCompleted: boolean
}