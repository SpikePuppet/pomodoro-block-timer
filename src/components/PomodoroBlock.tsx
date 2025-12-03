import type { PomodoroBlock as PomodoroBlockType } from '../types';

interface PomodoroBlockProps {
  block: PomodoroBlockType;
  position: number;
  isCurrent?: boolean;
  onComplete?: () => void;
  onDelete?: () => void;
}

export function PomodoroBlock({ 
  block, 
  position,
  isCurrent = false,
  onComplete,
  onDelete,
}: PomodoroBlockProps) {
  return (
    <div className={`pomodoro-block ${isCurrent ? 'pomodoro-block--current' : ''} ${block.completed ? 'pomodoro-block--completed' : ''}`}>
      <div className="pomodoro-block__number">
        <span className="pomodoro-block__number-text">#{position}</span>
      </div>
      <div className="pomodoro-block__content">
        <div className="pomodoro-block__header">
          <h3 className="pomodoro-block__title">
            {block.completed && <span className="pomodoro-block__check">✓</span>}
            {block.title}
          </h3>
          {isCurrent && <span className="pomodoro-block__badge">Now</span>}
          {!block.completed && !isCurrent && position === 2 && (
            <span className="pomodoro-block__eta">Next</span>
          )}
          {!block.completed && !isCurrent && position > 2 && (
            <span className="pomodoro-block__eta">{position - 1} pomodoros away</span>
          )}
        </div>
        
        {block.description && (
          <p className="pomodoro-block__description">{block.description}</p>
        )}
      </div>
      
      <div className="pomodoro-block__actions">
        {!block.completed && onComplete && (
          <button 
            className="pomodoro-block__btn pomodoro-block__btn--complete"
            onClick={onComplete}
            title="Mark as complete"
          >
            ✓
          </button>
        )}
        {onDelete && (
          <button 
            className="pomodoro-block__btn pomodoro-block__btn--delete"
            onClick={onDelete}
            title="Delete"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
