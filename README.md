# Lumina Scholar - AI Research Paper Summarizer & Insight Extractor

![Lumina Scholar](https://img.shields.io/badge/Status-Completed-success) ![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue) ![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

**Lumina Scholar** is an intelligent web application designed to revolutionize how students and researchers interact with academic literature. By uploading a research paper (PDF), the system leverages the **Google Gemini AI** to instantly extract key methodologies, summarize complex results, and even provide a built-in AI chat interface to ask questions directly about the document.

## ✨ Features

- 📄 **On-Device PDF Parsing:** Extracts raw text directly from uploaded PDFs in the browser using `pdfjs-dist`.
- 🧠 **AI-Powered Analysis:** Automatically generates an executive summary, extracts key methodologies, identifies future research directions, and creates simplified student-friendly analogies.
- 💬 **Context-Aware Document Chat:** An interactive AI assistant that can answer specific questions based *only* on the context of the uploaded paper, or act as a general tutor.
- ⚖️ **Compare Papers Mode:** Upload two different research papers side-by-side. The AI acts as an academic evaluator to determine which paper is of higher quality based on methodology, data, and clarity.
- 🎨 **Premium UI/UX:** Built with a stunning "Ethereal Aurora" light theme, featuring frosted glassmorphism, fluid animations, and responsive design.

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 + Vite
- **Styling:** Vanilla CSS (Glassmorphism design system)
- **AI Integration:** Google Gemini API (`@google/generative-ai`)
- **Document Processing:** PDF.js (`pdfjs-dist`)
- **Markdown Rendering:** `react-markdown`
- **Icons:** `lucide-react`

## 🚀 Getting Started

### Prerequisites
You will need Node.js installed on your computer and a free API key from Google AI Studio.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ramya735/AI-paper-summarizer.git
   cd AI-paper-summarizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Environment Variables:
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📸 Usage

1. Open the app in your browser (usually `http://localhost:5173/`).
2. Choose between **Single Analysis** or **Compare Papers** mode.
3. Drag and drop your IEEE PDF file(s) into the upload zone.
4. Review the extracted insights on the dashboard.
5. Use the right-hand chat panel to ask the AI questions or give it commands regarding the text.

---
*Built as an AI-integrated academic tool to enhance research productivity.*
