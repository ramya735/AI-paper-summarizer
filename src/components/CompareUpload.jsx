import { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, Loader2 } from 'lucide-react';
import './CompareUpload.css';

const SingleDropZone = ({ label, file, setFile, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Please upload a valid PDF file.');
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`compare-drop-zone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''} ${disabled ? 'disabled' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !disabled && fileInputRef.current?.click()}
    >
      <input 
        ref={fileInputRef}
        type="file" 
        accept="application/pdf" 
        onChange={handleChange} 
        className="file-input"
        disabled={disabled}
      />
      
      {file ? (
        <div className="compare-file-state">
          <CheckCircle className="success-icon" size={40} />
          <h4>{label} Ready</h4>
          <p className="compare-filename">{file.name}</p>
        </div>
      ) : (
        <div className="compare-upload-state">
          <div className="compare-icon-wrapper">
            <FileText className="upload-icon" />
          </div>
          <h4>Upload {label}</h4>
          <p>Drag & drop PDF here</p>
        </div>
      )}
    </div>
  );
};

const CompareUpload = ({ onCompare, isProcessing }) => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleCompareClick = () => {
    if (file1 && file2) {
      onCompare(file1, file2);
    }
  };

  if (isProcessing) {
    return (
      <div className="compare-upload-container">
        <div className="compare-processing glass-panel">
          <Loader2 className="processing-icon spin" />
          <h2>Analyzing & Comparing Papers...</h2>
          <p>Our AI is evaluating methodology, results, and quality.</p>
          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-upload-container animate-fade-in">
      <div className="compare-header text-center">
        <h2>Compare Research Papers</h2>
        <p>Upload two papers to let AI determine which one has superior methodology and results.</p>
      </div>
      
      <div className="compare-zones glass-panel">
        <SingleDropZone label="Paper 1" file={file1} setFile={setFile1} disabled={isProcessing} />
        <div className="vs-divider">VS</div>
        <SingleDropZone label="Paper 2" file={file2} setFile={setFile2} disabled={isProcessing} />
      </div>

      <div className="compare-action">
        <button 
          className="compare-btn" 
          disabled={!file1 || !file2} 
          onClick={handleCompareClick}
        >
          Compare Papers Now
        </button>
      </div>
    </div>
  );
};

export default CompareUpload;
