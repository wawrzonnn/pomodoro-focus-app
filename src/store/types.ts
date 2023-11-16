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
    cancelActiveMode:  (newMode: 'focus' | 'break') => void;
    returnToHomeScreen: (newMode: 'focus' | 'break') => void;
    timerPaused: boolean;
    isFocusCompleted: boolean;
    isBreakCompleted: boolean;
}