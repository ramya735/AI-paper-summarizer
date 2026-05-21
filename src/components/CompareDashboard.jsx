import { Award, Zap, AlertTriangle } from 'lucide-react';
import './CompareDashboard.css';

const CompareDashboard = ({ file1, file2, data }) => {
  if (!data) return null;

  return (
    <div className="compare-dashboard">
      <div className="winner-banner glass-panel">
        <div className="winner-icon-wrapper">
          <Award size={48} className="winner-icon" />
        </div>
        <div className="winner-content">
          <h3 className="winner-label">Higher Quality Paper</h3>
          <h1 className="winner-title gradient-text">
            {data.winner === 'Paper 1' ? file1.name : file2.name}
          </h1>
        </div>
      </div>

      <div className="compare-details-grid">
        <div className="glass-panel insight-card full-width">
          <div className="section-header">
            <Zap className="section-icon" size={24} />
            <h3>Why is this paper better?</h3>
          </div>
          <p className="reasoning-text">{data.reasoning}</p>
        </div>

        <div className="glass-panel insight-card full-width">
          <div className="section-header">
            <AlertTriangle className="section-icon" size={24} />
            <h3>Key Differences</h3>
          </div>
          <ul className="differences-list">
            {data.keyDifferences?.map((diff, idx) => (
              <li key={idx}>
                <span className="diff-bullet">→</span>
                {diff}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompareDashboard;
