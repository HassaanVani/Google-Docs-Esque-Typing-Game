import './Toolbar.css';

function ToolbarDropdown({ value, width }: { value: string; width: number }) {
  return (
    <button className="toolbar-dropdown" style={{ width }}>
      <span className="toolbar-dropdown-text">{value}</span>
      <span className="material-icons toolbar-dropdown-arrow">arrow_drop_down</span>
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="toolbar">
      <button className="toolbar-btn menus-btn" title="Search the menus (Alt+/)">
        <span className="material-icons" style={{ fontSize: '16px' }}>search</span>
        <span className="menus-label">Menus</span>
      </button>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <button className="toolbar-btn" title="Undo (Ctrl+Z)">
          <span className="material-icons">undo</span>
        </button>
        <button className="toolbar-btn" title="Redo (Ctrl+Y)">
          <span className="material-icons">redo</span>
        </button>
        <button className="toolbar-btn" title="Print (Ctrl+P)">
          <span className="material-icons">print</span>
        </button>
        <button className="toolbar-btn" title="Spell check">
          <span className="material-icons">spellcheck</span>
        </button>
        <button className="toolbar-btn" title="Paint format">
          <span className="material-icons">format_paint</span>
        </button>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <ToolbarDropdown value="100%" width={58} />
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <ToolbarDropdown value="Normal text" width={120} />
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <ToolbarDropdown value="Arial" width={110} />
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <button className="toolbar-btn size-btn" title="Decrease font size">
          <span className="material-icons" style={{ fontSize: '14px' }}>remove</span>
        </button>
        <input className="toolbar-size-input" type="text" defaultValue="11" readOnly />
        <button className="toolbar-btn size-btn" title="Increase font size">
          <span className="material-icons" style={{ fontSize: '14px' }}>add</span>
        </button>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <button className="toolbar-btn" title="Bold (Ctrl+B)">
          <span className="material-icons">format_bold</span>
        </button>
        <button className="toolbar-btn" title="Italic (Ctrl+I)">
          <span className="material-icons">format_italic</span>
        </button>
        <button className="toolbar-btn" title="Underline (Ctrl+U)">
          <span className="material-icons">format_underlined</span>
        </button>
        <button className="toolbar-btn" title="Text color">
          <span className="material-icons toolbar-icon-underlined" data-color="#202124">format_color_text</span>
        </button>
        <button className="toolbar-btn" title="Highlight color">
          <span className="material-icons toolbar-icon-underlined" data-color="#fbbc04">highlight</span>
        </button>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <button className="toolbar-btn" title="Insert link (Ctrl+K)">
          <span className="material-icons">insert_link</span>
        </button>
        <button className="toolbar-btn" title="Add comment (Ctrl+Alt+M)">
          <span className="material-icons">add_comment</span>
        </button>
        <button className="toolbar-btn" title="Insert image">
          <span className="material-icons">image</span>
        </button>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <button className="toolbar-btn" title="Left align (Ctrl+Shift+L)">
          <span className="material-icons">format_align_left</span>
        </button>
        <button className="toolbar-btn" title="Line & paragraph spacing">
          <span className="material-icons">format_line_spacing</span>
        </button>
        <button className="toolbar-btn" title="Checklist">
          <span className="material-icons">checklist</span>
        </button>
        <button className="toolbar-btn" title="Bulleted list (Ctrl+Shift+8)">
          <span className="material-icons">format_list_bulleted</span>
        </button>
        <button className="toolbar-btn" title="Numbered list (Ctrl+Shift+7)">
          <span className="material-icons">format_list_numbered</span>
        </button>
        <button className="toolbar-btn" title="Decrease indent (Ctrl+[)">
          <span className="material-icons">format_indent_decrease</span>
        </button>
        <button className="toolbar-btn" title="Increase indent (Ctrl+])">
          <span className="material-icons">format_indent_increase</span>
        </button>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <button className="toolbar-btn" title="Clear formatting (Ctrl+\\)">
          <span className="material-icons">format_clear</span>
        </button>
      </div>

      <div className="toolbar-spacer" />

      <button className="toolbar-btn editing-btn" title="Editing mode">
        <span className="material-icons" style={{ fontSize: '16px' }}>edit</span>
        <span className="editing-label">Editing</span>
        <span className="material-icons" style={{ fontSize: '18px' }}>arrow_drop_down</span>
      </button>

      <button className="toolbar-btn collapse-btn" title="Hide the menus (Ctrl+Shift+F)">
        <span className="material-icons">expand_less</span>
      </button>
    </div>
  );
}
