export type TimerPhase = 'work' | 'shortBreak' | 'longBreak';

export type TimerStatus = 'idle' | 'running' | 'paused';

export interface PomodoroBlock {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  pomodoroNumber: number;
}

export interface TimerState {
  phase: TimerPhase;
  status: TimerStatus;
  timeRemaining: number;
  pomodorosCompleted: number;
}

export const DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
} as const;

export const POMODOROS_BEFORE_LONG_BREAK = 4;
