import { useState, useEffect, useCallback, useRef } from "react";
import type { TimerPhase, TimerStatus, TimerState } from "../types";
import { DURATIONS, POMODOROS_BEFORE_LONG_BREAK } from "../types";

export function useTimer(onPhaseComplete?: (phase: TimerPhase) => void) {
  const [state, setState] = useState<TimerState>({
    phase: "work",
    status: "idle",
    timeRemaining: DURATIONS.work,
    pomodorosCompleted: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playNotification = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.log("Audio notification failed:", e);
    }
  }, []);

  const getNextPhase = useCallback(
    (currentPhase: TimerPhase, pomodorosCompleted: number): TimerPhase => {
      if (currentPhase === "work") {
        const newCount = pomodorosCompleted + 1;
        if (newCount % POMODOROS_BEFORE_LONG_BREAK === 0) {
          return "longBreak";
        }
        return "shortBreak";
      }
      return "work";
    },
    []
  );

  const completePhase = useCallback(() => {
    playNotification();
    setState((prev) => {
      const nextPhase = getNextPhase(prev.phase, prev.pomodorosCompleted);
      const newPomodorosCompleted =
        prev.phase === "work"
          ? prev.pomodorosCompleted + 1
          : prev.pomodorosCompleted;

      onPhaseComplete?.(prev.phase);

      return {
        phase: nextPhase,
        status: "idle",
        timeRemaining: DURATIONS[nextPhase],
        pomodorosCompleted: newPomodorosCompleted,
      };
    });
  }, [getNextPhase, playNotification, onPhaseComplete]);

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.timeRemaining <= 1) {
        completePhase();
        return prev;
      }
      return { ...prev, timeRemaining: prev.timeRemaining - 1 };
    });
  }, [completePhase]);

  useEffect(() => {
    if (state.status === "running") {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.status, tick]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, status: "running" }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, status: "paused" }));
  }, []);

  const reset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      status: "idle",
      timeRemaining: DURATIONS[prev.phase],
    }));
  }, []);

  const skip = useCallback(() => {
    completePhase();
  }, [completePhase]);

  const setPhase = useCallback((phase: TimerPhase) => {
    setState((prev) => ({
      ...prev,
      phase,
      status: "idle",
      timeRemaining: DURATIONS[phase],
    }));
  }, []);

  return {
    ...state,
    start,
    pause,
    reset,
    skip,
    setPhase,
  };
}
