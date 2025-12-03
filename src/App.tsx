import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import { Timer } from './components/Timer';
import { BlockList } from './components/BlockList';
import { useTimer } from './hooks/useTimer';
import type { PomodoroBlock, TimerPhase } from './types';

const STORAGE_KEY = 'pomodoro-blocks';

function loadBlocks(): PomodoroBlock[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveBlocks(blocks: PomodoroBlock[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
}

export function App() {
  const [blocks, setBlocks] = useState<PomodoroBlock[]>(loadBlocks);
  
  const currentBlock = blocks.find(b => !b.completed) || null;
  
  const handlePhaseComplete = useCallback((phase: TimerPhase) => {
    if (phase === 'work' && currentBlock) {
      setBlocks(prev => {
        const updated = prev.map(b => 
          b.id === currentBlock.id ? { ...b, completed: true } : b
        );
        saveBlocks(updated);
        return updated;
      });
    }
  }, [currentBlock]);
  
  const timer = useTimer(handlePhaseComplete);
  
  useEffect(() => {
    saveBlocks(blocks);
  }, [blocks]);
  
  const handleAddBlock = (block: Omit<PomodoroBlock, 'id' | 'completed' | 'createdAt'>) => {
    const newBlock: PomodoroBlock = {
      ...block,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: Date.now(),
    };
    setBlocks(prev => [...prev, newBlock]);
  };
  
  const handleCompleteBlock = (id: string) => {
    setBlocks(prev => prev.map(b => 
      b.id === id ? { ...b, completed: true } : b
    ));
  };
  
  const handleDeleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">🍅 Pomodoro Timer</h1>
      </header>
      
      <main className="app__main">
        <div className="app__timer-section">
          {currentBlock && (
            <div className="app__current-task">
              <span className="app__current-label">Working on:</span>
              <span className="app__current-title">{currentBlock.title}</span>
            </div>
          )}
          
          <Timer
            phase={timer.phase}
            status={timer.status}
            timeRemaining={timer.timeRemaining}
            pomodorosCompleted={timer.pomodorosCompleted}
            onStart={timer.start}
            onPause={timer.pause}
            onReset={timer.reset}
            onSkip={timer.skip}
          />
        </div>
        
        <div className="app__blocks-section">
          <BlockList
            blocks={blocks}
            currentBlockId={currentBlock?.id || null}
            onAddBlock={handleAddBlock}
            onCompleteBlock={handleCompleteBlock}
            onDeleteBlock={handleDeleteBlock}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
