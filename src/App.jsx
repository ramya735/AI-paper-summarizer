import { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import CompareUpload from './components/CompareUpload';
import CompareDashboard from './components/CompareDashboard';
import { extractTextFromPDF } from './utils/pdfParser';
import { analyzePaper, comparePapers } from './utils/aiClient';
import './index.css';

function App() {
  const [mode, setMode] = useState('single'); // 'single' or 'compare'
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  const [analysisData, setAnalysisData] = useState(null);
  const [compareData, setCompareData] = useState(null);
  
  const [paperText, setPaperText] = useState("");
  const [paperText2, setPaperText2] = useState("");
  
  const [error, setError] = useState(null);

  const handleUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setIsProcessing(true);
    setError(null);
    
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error("Missing VITE_GEMINI_API_KEY. Please create a .env file and add your API key.");
      }

      const { text, numPages } = await extractTextFromPDF(uploadedFile);
      setPaperText(text);

      const data = await analyzePaper(text);
      
      setAnalysisData({ ...data, numPages });
      setIsDone(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while processing the PDF.");
      setIsProcessing(false);
      setFile(null); 
    }
  };

  const handleCompareUpload = async (f1, f2) => {
    setFile(f1);
    setFile2(f2);
    setIsProcessing(true);
    setError(null);
    
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error("Missing VITE_GEMINI_API_KEY in .env");
      }

      const res1 = await extractTextFromPDF(f1);
      const res2 = await extractTextFromPDF(f2);
      
      setPaperText(res1.text);
      setPaperText2(res2.text);

      const data = await comparePapers(res1.text, res2.text);
      
      setCompareData(data);
      setIsDone(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while comparing the PDFs.");
      setIsProcessing(false);
      setFile(null); 
      setFile2(null);
    }
  };

  const resetState = (newMode) => {
    setMode(newMode);
    setIsDone(false);
    setFile(null);
    setFile2(null);
    setPaperText("");
    setPaperText2("");
    setIsProcessing(false);
    setError(null);
  };

  return (
    <div className="app-container">
      <header className="header glass-panel animate-fade-in" style={{ padding: '1rem 2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="logo-container">
          <Sparkles className="logo-icon" />
          <h1 className="logo-text gradient-text">Lumina Scholar</h1>
        </div>
        <div className="nav-toggle" style={{ display: 'flex', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.05)', padding: '0.4rem', borderRadius: '30px' }}>
          <button 
            style={{ border: 'none', background: mode === 'single' ? 'white' : 'transparent', color: mode === 'single' ? 'var(--accent-primary)' : 'var(--text-secondary)', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: mode === 'single' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none' }}
            onClick={() => resetState('single')}
          >Single Analysis</button>
          <button 
            style={{ border: 'none', background: mode === 'compare' ? 'white' : 'transparent', color: mode === 'compare' ? 'var(--accent-primary)' : 'var(--text-secondary)', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: mode === 'compare' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none' }}
            onClick={() => resetState('compare')}
          >Compare Papers</button>
        </div>
      </header>

      {error && (
        <div className="error-banner glass-panel animate-fade-in" style={{ borderLeft: '4px solid var(--danger)', padding: '1rem', background: 'rgba(230, 57, 70, 0.1)', marginTop: '1rem' }}>
          <AlertCircle style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px', color: 'var(--danger)' }} />
          <span style={{ color: 'var(--text-primary)' }}>{error}</span>
        </div>
      )}

      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {!isDone ? (
          mode === 'single' 
            ? <FileUpload onUpload={handleUpload} isProcessing={isProcessing} />
            : <CompareUpload onCompare={handleCompareUpload} isProcessing={isProcessing} />
        ) : (
          <div className="dashboard-grid animate-fade-in">
            {mode === 'single' ? (
              <Dashboard file={file} data={analysisData} />
            ) : (
              <CompareDashboard file1={file} file2={file2} data={compareData} />
            )}
            <ChatInterface paperText={mode === 'single' ? paperText : `--- PAPER 1 (${file.name}) ---\n${paperText}\n\n--- PAPER 2 (${file2.name}) ---\n${paperText2}`} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
