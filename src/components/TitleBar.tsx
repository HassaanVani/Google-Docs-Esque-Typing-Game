import { useGame } from '../context/GameContext';
import './TitleBar.css';

export default function TitleBar() {
  const { state } = useGame();

  const getStatusText = () => {
    switch (state.status) {
      case 'running': return 'Editing...';
      case 'finished': return 'All changes saved in Drive';
      default: return 'All changes saved in Drive';
    }
  };

  return (
    <div className="title-bar">
      <div className="title-bar-left">
        <div className="docs-icon">
          <svg viewBox="0 0 48 48" width="40" height="40">
            <path fill="#4285F4" d="M29 4H12a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V15L29 4z"/>
            <path fill="#A1C2FA" d="M29 4v11h11L29 4z"/>
            <path fill="#fff" d="M16 24h16v2H16zm0 4h16v2H16zm0 4h12v2H16z"/>
          </svg>
        </div>
        <div className="title-section">
          <div className="title-row">
            <span className="doc-title">Untitled document</span>
            <button className="icon-btn star-btn" title="Star">
              <span className="material-icons-outlined">star_border</span>
            </button>
            <button className="icon-btn" title="Move">
              <span className="material-icons-outlined">drive_file_move_outline</span>
            </button>
            <button className="icon-btn" title="See document status">
              <span className="material-icons-outlined">cloud_done</span>
            </button>
          </div>
        </div>
      </div>
      <div className="title-bar-right">
        <span className="last-edit">{getStatusText()}</span>
        <button className="icon-btn" title="Open comment history">
          <span className="material-icons-outlined">chat_bubble_outline</span>
        </button>
        <button className="icon-btn" title="Join a call">
          <span className="material-icons-outlined">videocam</span>
        </button>
        <button className="share-btn">
          <span className="material-icons" style={{ fontSize: '16px', marginRight: '6px' }}>lock</span>
          Share
        </button>
        <div className="user-avatar" title="Google Account">
          <span>H</span>
        </div>
      </div>
    </div>
  );
}
