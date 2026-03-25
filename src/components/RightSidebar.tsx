import './RightSidebar.css';

export default function RightSidebar() {
  return (
    <div className="right-sidebar">
      <div className="sidebar-icons">
        <button className="sidebar-icon-btn" title="Calendar">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
          </svg>
        </button>
        <button className="sidebar-icon-btn" title="Keep">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#FBBC04" d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
          </svg>
        </button>
        <button className="sidebar-icon-btn" title="Tasks">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </button>
        <button className="sidebar-icon-btn" title="Contacts">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#34A853" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </button>
      </div>
      <div className="sidebar-divider" />
      <button className="sidebar-icon-btn" title="Get Add-ons">
        <span className="material-icons" style={{ fontSize: '20px', color: '#5f6368' }}>add</span>
      </button>
    </div>
  );
}
