import { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import './MenuBar.css';

interface MenuItem {
  label: string;
  shortcut?: string;
  divider?: boolean;
  action?: () => void;
  disabled?: boolean;
}

interface Menu {
  label: string;
  items: MenuItem[];
}

export default function MenuBar({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { startNewTest, resetTest } = useGame();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);

  const menus: Menu[] = [
    {
      label: 'File',
      items: [
        { label: 'New', shortcut: 'Ctrl+N', action: () => { resetTest(); setTimeout(startNewTest, 50); } },
        { label: 'Open', shortcut: 'Ctrl+O', disabled: true },
        { label: 'Make a copy', disabled: true },
        { divider: true, label: '' },
        { label: 'Share', disabled: true },
        { label: 'Email', disabled: true },
        { label: 'Download', disabled: true },
        { divider: true, label: '' },
        { label: 'Rename', disabled: true },
        { label: 'Move', disabled: true },
        { label: 'Move to trash', disabled: true },
        { divider: true, label: '' },
        { label: 'Page setup', disabled: true },
        { label: 'Print', shortcut: 'Ctrl+P', disabled: true },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: 'Ctrl+Z', disabled: true },
        { label: 'Redo', shortcut: 'Ctrl+Y', disabled: true },
        { divider: true, label: '' },
        { label: 'Cut', shortcut: 'Ctrl+X', disabled: true },
        { label: 'Copy', shortcut: 'Ctrl+C', disabled: true },
        { label: 'Paste', shortcut: 'Ctrl+V', disabled: true },
        { label: 'Paste without formatting', shortcut: 'Ctrl+Shift+V', disabled: true },
        { divider: true, label: '' },
        { label: 'Select all', shortcut: 'Ctrl+A', disabled: true },
        { label: 'Delete', disabled: true },
        { divider: true, label: '' },
        { label: 'Find and replace', shortcut: 'Ctrl+H', disabled: true },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Mode', disabled: true },
        { label: 'Show print layout', disabled: true },
        { label: 'Show ruler', disabled: true },
        { label: 'Show outline', disabled: true },
        { label: 'Show equation toolbar', disabled: true },
        { divider: true, label: '' },
        { label: 'Snap to guides', disabled: true },
        { divider: true, label: '' },
        { label: 'Full screen', disabled: true },
      ],
    },
    {
      label: 'Insert',
      items: [
        { label: 'Image', disabled: true },
        { label: 'Table', disabled: true },
        { label: 'Drawing', disabled: true },
        { label: 'Chart', disabled: true },
        { divider: true, label: '' },
        { label: 'Horizontal line', disabled: true },
        { label: 'Emoji', disabled: true },
        { label: 'Smart chips', disabled: true },
        { divider: true, label: '' },
        { label: 'Headers & footers', disabled: true },
        { label: 'Footnote', disabled: true },
        { divider: true, label: '' },
        { label: 'Building blocks', disabled: true },
        { label: 'Special characters', disabled: true },
        { label: 'Equation', disabled: true },
        { divider: true, label: '' },
        { label: 'Bookmark', disabled: true },
        { label: 'Table of contents', disabled: true },
      ],
    },
    {
      label: 'Format',
      items: [
        { label: 'Text', disabled: true },
        { label: 'Paragraph styles', disabled: true },
        { label: 'Align & indent', disabled: true },
        { label: 'Line & paragraph spacing', disabled: true },
        { label: 'Columns', disabled: true },
        { label: 'Bullets & numbering', disabled: true },
        { divider: true, label: '' },
        { label: 'Headers & footers', disabled: true },
        { label: 'Page numbers', disabled: true },
        { label: 'Page orientation', disabled: true },
        { divider: true, label: '' },
        { label: 'Clear formatting', shortcut: 'Ctrl+\\', disabled: true },
      ],
    },
    {
      label: 'Tools',
      items: [
        { label: 'Typing Settings', action: onOpenSettings },
        { divider: true, label: '' },
        { label: 'Spelling and grammar', disabled: true },
        { label: 'Word count', shortcut: 'Ctrl+Shift+C', disabled: true },
        { divider: true, label: '' },
        { label: 'Review suggested edits', disabled: true },
        { label: 'Compare documents', disabled: true },
        { label: 'Citations', disabled: true },
        { divider: true, label: '' },
        { label: 'Dictionary', disabled: true },
        { label: 'Translate document', disabled: true },
        { divider: true, label: '' },
        { label: 'Voice typing', shortcut: 'Ctrl+Shift+S', disabled: true },
        { divider: true, label: '' },
        { label: 'Notification settings', disabled: true },
        { label: 'Preferences', disabled: true },
        { label: 'Accessibility', disabled: true },
      ],
    },
    {
      label: 'Extensions',
      items: [
        { label: 'Add-ons', disabled: true },
        { label: 'Apps Script', disabled: true },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'Search the menus', shortcut: 'Alt+/', disabled: true },
        { divider: true, label: '' },
        { label: 'Help', disabled: true },
        { label: 'Training', disabled: true },
        { label: 'Updates', disabled: true },
        { divider: true, label: '' },
        { label: 'Report abuse', disabled: true },
        { label: 'Keyboard shortcuts', shortcut: 'Ctrl+/', disabled: true },
      ],
    },
  ];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="menu-bar" ref={menuBarRef}>
      <div className="menu-items">
        {menus.map((menu, idx) => (
          <div
            key={menu.label}
            className={`menu-item ${activeMenu === idx ? 'active' : ''}`}
            onMouseDown={() => setActiveMenu(activeMenu === idx ? null : idx)}
            onMouseEnter={() => activeMenu !== null && setActiveMenu(idx)}
          >
            <span className="menu-label">{menu.label}</span>
            {activeMenu === idx && (
              <div className="menu-dropdown">
                {menu.items.map((item, iIdx) =>
                  item.divider ? (
                    <div key={`div-${iIdx}`} className="menu-divider" />
                  ) : (
                    <div
                      key={item.label}
                      className={`menu-dropdown-item ${item.disabled ? 'disabled' : ''}`}
                      onClick={() => {
                        if (!item.disabled && item.action) {
                          item.action();
                          setActiveMenu(null);
                        }
                      }}
                    >
                      <span className="menu-dropdown-label">{item.label}</span>
                      {item.shortcut && <span className="menu-shortcut">{item.shortcut}</span>}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
