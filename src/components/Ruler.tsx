import './Ruler.css';

export default function Ruler() {
  const ticks = [];
  // Generate ruler ticks (1 inch = 96px at 100% zoom, Google Docs ruler goes ~7.5 inches)
  for (let i = 0; i <= 16; i++) {
    const isInch = i % 2 === 0;
    const label = i / 2;
    ticks.push(
      <div key={i} className={`ruler-tick ${isInch ? 'inch' : 'half'}`}>
        {isInch && label > 0 && <span className="ruler-label">{label}</span>}
      </div>
    );
  }

  return (
    <div className="ruler-container">
      <div className="ruler">
        <div className="ruler-indent-left" title="First Line Indent">
          <div className="indent-marker first-line">▼</div>
          <div className="indent-marker left-indent">▲</div>
        </div>
        <div className="ruler-track">
          {ticks}
        </div>
        <div className="ruler-indent-right" title="Right Indent">
          <div className="indent-marker right-indent">▲</div>
        </div>
      </div>
    </div>
  );
}
