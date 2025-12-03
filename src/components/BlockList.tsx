import React from 'react';
import type { PomodoroBlock as PomodoroBlockType } from '../types';
import { PomodoroBlock } from './PomodoroBlock';
import { BlockForm } from './BlockForm';

interface BlockListProps {
  blocks: PomodoroBlockType[];
  currentBlockId: string | null;
  currentPomodoroNumber: number;
  nextPomodoroNumber: number;
  onAddBlock: (block: Omit<PomodoroBlockType, 'id' | 'completed' | 'createdAt'>) => void;
  onCompleteBlock: (id: string) => void;
  onDeleteBlock: (id: string) => void;
  onClearCompleted: () => void;
}

export function BlockList({
  blocks,
  currentBlockId,
  currentPomodoroNumber,
  nextPomodoroNumber,
  onAddBlock,
  onCompleteBlock,
  onDeleteBlock,
  onClearCompleted,
}: BlockListProps) {
  const pendingBlocks = blocks
    .filter(b => !b.completed)
    .sort((a, b) => a.pomodoroNumber - b.pomodoroNumber);
  const completedBlocks = blocks
    .filter(b => b.completed)
    .sort((a, b) => b.pomodoroNumber - a.pomodoroNumber);

  return (
    <div className="block-list">
      <div className="block-list__section">
        <h2 className="block-list__heading">Up Next</h2>
        
        {pendingBlocks.length === 0 ? (
          <p className="block-list__empty">No blocks scheduled. Add one to get started!</p>
        ) : (
          <div className="block-list__items">
            {pendingBlocks.map((block) => (
              <PomodoroBlock
                key={block.id}
                block={block}
                isCurrent={block.id === currentBlockId}
                currentPomodoroNumber={currentPomodoroNumber}
                onComplete={() => onCompleteBlock(block.id)}
                onDelete={() => onDeleteBlock(block.id)}
              />
            ))}
          </div>
        )}
        
        <BlockForm onAdd={onAddBlock} nextPomodoroNumber={nextPomodoroNumber} />
      </div>

      {completedBlocks.length > 0 && (
        <div className="block-list__section block-list__section--completed">
          <div className="block-list__header">
            <h2 className="block-list__heading">Completed</h2>
            <button className="block-list__clear-btn" onClick={onClearCompleted}>
              Clear All
            </button>
          </div>
          <div className="block-list__items">
            {completedBlocks.map((block) => (
              <PomodoroBlock
                key={block.id}
                block={block}
                currentPomodoroNumber={currentPomodoroNumber}
                onDelete={() => onDeleteBlock(block.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
