import { BookOpen, Lightbulb, Target, ArrowRight } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ file, data }) => {
  const safeData = data || {
    summary: "Analysis failed or missing data.",
    studentExplanation: "N/A",
    methodology: [],
    results: [],
    futureResearch: [],
    keywords: []
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header glass-panel">
        <div className="file-info">
          <BookOpen className="file-icon" />
          <div>
            <h2>{file?.name || "Uploaded Document"}</h2>
            <p className="file-meta">Analyzed successfully • {data?.numPages || "?"} pages</p>
          </div>
        </div>
        <div className="keywords-list">
          {safeData.keywords.map((kw, i) => (
            <span key={i} className="keyword-tag">{kw}</span>
          ))}
        </div>
      </div>

      <div className="dashboard-content">
        <div className="main-summary glass-panel">
          <div className="section-header">
            <Lightbulb className="section-icon" />
            <h3>Executive Summary</h3>
          </div>
          <p>{safeData.summary}</p>
          
          <div className="student-explanation">
            <h4><Target size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} /> Student Explanation</h4>
            <p>{safeData.studentExplanation}</p>
          </div>
        </div>

        <div className="insights-grid">
          <div className="insight-card glass-panel">
            <h4>Methodology</h4>
            <ul>
              {safeData.methodology.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="insight-card glass-panel">
            <h4>Key Results</h4>
            <ul>
              {safeData.results.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="insight-card glass-panel full-width">
            <h4>Future Research Directions</h4>
            <ul className="future-list">
              {safeData.futureResearch.map((item, i) => (
                <li key={i}>
                  <ArrowRight size={14} className="list-icon" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
