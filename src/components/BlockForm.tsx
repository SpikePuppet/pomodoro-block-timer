import React, { useState } from 'react';
import type { PomodoroBlock } from '../types';

interface BlockFormProps {
  onAdd: (block: Omit<PomodoroBlock, 'id' | 'completed' | 'createdAt'>) => void;
  nextPomodoroNumber: number;
}

export function BlockForm({ onAdd, nextPomodoroNumber }: BlockFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd({
      title: title.trim(),
      description: description.trim(),
      pomodoroNumber: nextPomodoroNumber,
    });
    
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button 
        className="block-form__add-btn"
        onClick={() => setIsExpanded(true)}
      >
        + Add Block for Pomodoro #{nextPomodoroNumber}
      </button>
    );
  }

  return (
    <form className="block-form" onSubmit={handleSubmit}>
      <div className="block-form__header">
        <span className="block-form__pomodoro-badge">🍅 #{nextPomodoroNumber}</span>
        <span className="block-form__subtitle">Will be done after this pomodoro</span>
      </div>
      <input
        type="text"
        className="block-form__input"
        placeholder="What are you working on?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      
      <textarea
        className="block-form__textarea"
        placeholder="Add details or notes (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />
      
      <div className="block-form__actions">
        <button type="submit" className="block-form__submit">
          Add Block
        </button>
        <button 
          type="button" 
          className="block-form__cancel"
          onClick={() => {
            setIsExpanded(false);
            setTitle('');
            setDescription('');
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
