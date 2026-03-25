import './LeftSidebar.css';

export default function LeftSidebar() {
  return (
    <div className="left-sidebar">
      <div className="sidebar-header">
        <button className="sidebar-back-btn" title="Close sidebar">
          <span className="material-icons">arrow_back</span>
        </button>
        <span className="sidebar-title">Document tabs</span>
        <button className="sidebar-add-btn" title="Add a tab">
          <span className="material-icons">add</span>
        </button>
      </div>
      <div className="sidebar-tab active">
        <span className="material-icons-outlined sidebar-tab-icon">description</span>
        <span className="sidebar-tab-name">Tab 1</span>
        <button className="sidebar-tab-menu" title="Tab options">
          <span className="material-icons">more_vert</span>
        </button>
      </div>
      <div className="sidebar-outline-hint">
        Headings you add to the document will appear here.
      </div>
    </div>
  );
}
