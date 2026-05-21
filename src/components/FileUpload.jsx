import { useState, useCallback } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import './FileUpload.css';

const FileUpload = ({ onUpload, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onUpload(files[0]);
    } else {
      alert("Please upload a PDF file.");
    }
  }, [onUpload]);

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onUpload(files[0]);
    }
  };

  return (
    <div className="file-upload-container animate-fade-in">
      <div 
        className={`upload-zone glass-panel ${isDragging ? 'dragging' : ''} ${isProcessing ? 'processing' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="processing-state">
            <Loader2 className="processing-icon spin" />
            <h2 className="gradient-text">Analyzing Document...</h2>
            <p>Extracting insights, summaries, and methodologies.</p>
            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
          </div>
        ) : (
          <div className="upload-state">
            <div className="upload-icon-wrapper">
              <UploadCloud className="upload-icon" />
            </div>
            <h2>Upload Research Paper</h2>
            <p>Drag and drop your PDF here, or click to browse</p>
            <input 
              type="file" 
              accept="application/pdf" 
              className="file-input" 
              id="file-upload" 
              onChange={handleFileInput}
            />
            <label htmlFor="file-upload" className="upload-button">
              Browse Files
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
