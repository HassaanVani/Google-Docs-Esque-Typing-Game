import './Toolbar.css';

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
        <select className="toolbar-select zoom-select" defaultValue="100">
          <option value="50">50%</option>
          <option value="75">75%</option>
          <option value="90">90%</option>
          <option value="100">100%</option>
          <option value="125">125%</option>
          <option value="150">150%</option>
          <option value="200">200%</option>
        </select>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <select className="toolbar-select style-select" defaultValue="Normal text">
          <option>Normal text</option>
          <option>Title</option>
          <option>Subtitle</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
          <option>Heading 3</option>
        </select>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <select className="toolbar-select font-select" defaultValue="Arial">
          <option>Arial</option>
          <option>Courier New</option>
          <option>Georgia</option>
          <option>Roboto</option>
          <option>Times New Roman</option>
          <option>Verdana</option>
        </select>
      </div>

      <div className="toolbar-separator" />

      <div className="toolbar-group">
        <button className="toolbar-btn size-btn" title="Decrease font size">
          <span className="material-icons" style={{ fontSize: '14px' }}>remove</span>
        </button>
        <input className="toolbar-size-input" type="text" defaultValue="11" />
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
          <span className="material-icons" style={{ borderBottom: '3px solid #202124' }}>format_color_text</span>
        </button>
        <button className="toolbar-btn" title="Highlight color">
          <span className="material-icons" style={{ borderBottom: '3px solid #fbbc04' }}>highlight</span>
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
        <button className="toolbar-btn" title="Clear formatting (Ctrl+\\)">
          <span className="material-icons">format_clear</span>
        </button>
      </div>

      <div className="toolbar-spacer" />

      <div className="toolbar-group editing-group">
        <span className="material-icons" style={{ fontSize: '16px', color: '#444746' }}>edit</span>
        <span className="editing-label">Editing</span>
        <span className="material-icons" style={{ fontSize: '16px', color: '#444746' }}>arrow_drop_down</span>
      </div>
    </div>
  );
}
