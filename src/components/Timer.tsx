import type { TimerPhase, TimerStatus } from "../types";

interface TimerProps {
  phase: TimerPhase;
  status: TimerStatus;
  timeRemaining: number;
  pomodorosCompleted: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

function getPhaseLabel(phase: TimerPhase): string {
  switch (phase) {
    case "work":
      return "Focus Time";
    case "shortBreak":
      return "Short Break";
    case "longBreak":
      return "Long Break";
  }
}

export function Timer({
  phase,
  status,
  timeRemaining,
  pomodorosCompleted,
  onStart,
  onPause,
  onReset,
  onSkip,
}: TimerProps) {
  return (
    <div className={`timer timer--${phase}`}>
      <div
        className={`timer__mascot ${
          status === "running" ? "timer__mascot--bouncing" : ""
        }`}
      >
        🍅❗
      </div>

      <div className="timer__phase-label">{getPhaseLabel(phase)}</div>

      <div className="timer__display">{formatTime(timeRemaining)}</div>

      <div className="timer__pomodoro-count">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={`timer__dot ${
              i < pomodorosCompleted % 4 ? "timer__dot--filled" : ""
            }`}
          >
            🍅
          </span>
        ))}
      </div>

      <div className="timer__controls">
        {status === "running" ? (
          <button className="timer__btn timer__btn--pause" onClick={onPause}>
            Pause
          </button>
        ) : (
          <button className="timer__btn timer__btn--start" onClick={onStart}>
            {status === "paused" ? "Resume" : "Start"}
          </button>
        )}

        <button className="timer__btn timer__btn--reset" onClick={onReset}>
          Reset
        </button>

        <button className="timer__btn timer__btn--skip" onClick={onSkip}>
          Skip
        </button>
      </div>

      <div className="timer__total">
        Total pomodoros completed this session: {pomodorosCompleted} pomodoro
        {pomodorosCompleted !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
