import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import * as pdfjsLib from "pdfjs-dist";

// import "pdfjs-dist/build/pdf.worker.entry"; // Import worker as a side-effect

// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

// const GEMINI_API_KEY = "AIzaSyBChAK_4ODI1fv5eosNcN74RUiTadU9EEc"; // 🔴 Replace with your API key

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [selectedScore, setSelectedScore] = useState("");
  const [selectedResume, setSelectedResume] = useState("");
  const [summaries, setSummaries] = useState({});
  const [summary, setSummary] = useState("");

  useEffect(() => {
    // Dummy candidate data
    const dummyCandidates = [
      { name: "Alice Johnson", score: 85, resume: "/resumes/alice.pdf" },
      { name: "Bob Smith", score: 78, resume: "/resumes/bob.pdf" },
      { name: "Charlie Brown", score: 92, resume: "/resumes/charlie.pdf" },
    ];
    setCandidates(dummyCandidates);
  }, [id]);

  // Extract text from PDF
  const extractTextFromPDF = async (pdfUrl) => {
    try {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item) => item.str).join(" ") + "\n";
      }

      return extractedText;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      return "Error extracting text.";
    }
  };

  // Summarize resume using Gemini API
  const handleSummarize = async (resumeUrl) => {
    setSummary("");

    try {
      // Extract text from PDF
      const resumeText = await extractTextFromPDF(resumeUrl);

      // Call Gemini API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
        {
          prompt: `Summarize this resume highlighting the skills, projects, experience, grades, location in 150 words:\n${resumeText}`,
        }
      );

      const generatedSummary = response.data?.candidates?.[0]?.output || "No summary generated.";
      setSummary(generatedSummary);
    } catch (error) {
      console.error("Error summarizing resume:", error);
      setSummary("Failed to summarize resume.");
    }
  };

  const filteredCandidates = selectedScore
    ? candidates.filter((c) => c.score >= parseInt(selectedScore))
    : candidates;

    return (
        <div className="p-6 min-h-screen mx-20">
          <h1 className="text-2xl font-bold text-center mb-6">Applicants for Job {id}</h1>
    
          <div className="space-y-4">
            {candidates.map((candidate, index) => (
              <div key={index} className="flex items-center bg-amber-50 shadow-md p-4 rounded-lg">
                {/* Candidate Info */}
                <div className="flex-1">
                  <h2 className="text-lg font-bold">{candidate.name}</h2>
                  <p className="text-gray-500">Email: {candidate.email}</p>
                  <p className="text-gray-500">Score: {candidate.score}</p>
                  
                  <div className="flex space-x-2 mt-2">
                    <button className="btn btn-secondary" onClick={() => handleSummarize(candidate)}>
                      Summarize
                    </button>
                    <a
                      href={candidate.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View Resume
                    </a>
                  </div>
    
                  {/* Summary */}
                  {summaries[candidate.name] && (
                    <p className="text-gray-700 mt-2">{summaries[candidate.name]}</p>
                  )}
                </div>
    
                {/* Small Resume Preview */}
                <div className="w-32 h-40 ml-4 border rounded-lg overflow-hidden">
                  <iframe
                    src={candidate.resume}
                    className="w-full h-full"
                    title={`Resume of ${candidate.name}`}
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
    
          <button className="btn btn-accent mt-6" onClick={() => navigate(-1)}>
            Back to Jobs
          </button>
        </div>
      );
    };
    
    export default JobDetailsPage;