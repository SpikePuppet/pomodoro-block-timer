import React from 'react';
import type { PomodoroBlock as PomodoroBlockType } from '../types';
import { PomodoroBlock } from './PomodoroBlock';
import { BlockForm } from './BlockForm';

interface BlockListProps {
  blocks: PomodoroBlockType[];
  currentBlockId: string | null;
  onAddBlock: (block: Omit<PomodoroBlockType, 'id' | 'completed' | 'createdAt'>) => void;
  onCompleteBlock: (id: string) => void;
  onDeleteBlock: (id: string) => void;
}

export function BlockList({
  blocks,
  currentBlockId,
  onAddBlock,
  onCompleteBlock,
  onDeleteBlock,
}: BlockListProps) {
  const pendingBlocks = blocks.filter(b => !b.completed);
  const completedBlocks = blocks.filter(b => b.completed);

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
                onComplete={() => onCompleteBlock(block.id)}
                onDelete={() => onDeleteBlock(block.id)}
              />
            ))}
          </div>
        )}
        
        <BlockForm onAdd={onAddBlock} />
      </div>

      {completedBlocks.length > 0 && (
        <div className="block-list__section block-list__section--completed">
          <h2 className="block-list__heading">Completed</h2>
          <div className="block-list__items">
            {completedBlocks.map((block) => (
              <PomodoroBlock
                key={block.id}
                block={block}
                onDelete={() => onDeleteBlock(block.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
