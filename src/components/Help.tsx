interface HelpProps {
  onClose: () => void;
}

export function Help({ onClose }: HelpProps) {
  return (
    <div className="help-overlay" onClick={onClose}>
      <div className="help" onClick={(e) => e.stopPropagation()}>
        <button className="help__close" onClick={onClose}>×</button>
        
        <h2 className="help__title">🍅 How to Use</h2>
        
        <div className="help__section">
          <h3>The Pomodoro Technique</h3>
          <p>
            Work in focused 25-minute intervals called "pomodoros," followed by short 5-minute breaks. 
            After completing 4 pomodoros, take a longer 15-minute break.
          </p>
        </div>
        
        <div className="help__section">
          <h3>Getting Started</h3>
          <ol>
            <li>Add a block with a title describing what you'll work on</li>
            <li>Press <strong>Start</strong> to begin your focus session</li>
            <li>Work until the timer ends (you'll hear a sound)</li>
            <li>Your task is automatically marked complete when the pomodoro finishes</li>
            <li>Take your break, then repeat!</li>
          </ol>
        </div>
        
        <div className="help__section">
          <h3>Controls</h3>
          <ul>
            <li><strong>Start/Resume</strong> — Begin or continue the timer</li>
            <li><strong>Pause</strong> — Pause the current session</li>
            <li><strong>Reset</strong> — Reset the current phase timer</li>
            <li><strong>Skip</strong> — Skip to the next phase</li>
          </ul>
        </div>
        
        <div className="help__section">
          <h3>Keyboard Shortcuts</h3>
          <ul>
            <li><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Q</kbd> — Skip to next phase</li>
          </ul>
        </div>
        
        <div className="help__footer">
          <p>
            Built by <strong>Rhys Johns</strong> — a quick tool made for fun! 
            If you run into any issues, head over to the <a href="https://github.com/rhysjohns/pomodoro-scheduler/issues" target="_blank" rel="noopener noreferrer">GitHub repo</a> and post an issue.
          </p>
        </div>
      </div>
    </div>
  );
}
