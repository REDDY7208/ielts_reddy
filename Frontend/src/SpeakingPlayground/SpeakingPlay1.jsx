import React, { useState } from 'react';
import './SpeakingPlay1.css';
 
const SpeakingPlay1 = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState(null);
  const [recording, setRecording] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [languageError, setLanguageError] = useState('');
 
  const userId = localStorage.getItem('user_id'); // Fetch user ID from local storage
 
  // List of available themes
  const themes = [
    'Work', 'Study', 'Hometown', 'Home', 'Art', 'Bicycles', 'Birthdays', 'Childhood',
    'Clothes', 'Computers'
  ];
 
  // Function to handle theme selection
  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setGeneratedQuestion(null);  // Clear previous question
    setEvaluation(null);  // Clear previous evaluation
    setTranscription('');  // Clear previous transcription
    setLanguageError(''); // Clear language error
  };
 
  // Function to generate question based on selected theme
  const generateQuestion = async () => {
    if (!selectedTheme) {
        setLanguageError('Please select a theme first!');
        return;
    }

    try {
        const response = await fetch(`https://ieltsgenai.com/generate_question?theme_name=${selectedTheme}&user_id=${userId}`);
        const data = await response.json();

        if (data.error) {
            setLanguageError(data.error);
        } else {
            // Get question and suggested answer directly
            const question = data.question;
            const suggestedAnswer = data.suggested_answer;

            // Update the state with the question and suggested answer
            setGeneratedQuestion({ question, suggestedAnswer });
        }
    } catch (error) {
        console.error('Error generating question:', error);
        setLanguageError('Error generating question.');
    }
};

  
  // Function to start recording the user's answer
  const startRecording = async () => {
    setRecording(true);
    setLanguageError(''); // Clear previous error messages

    let mediaRecorder;
    const audioChunks = [];

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize MediaRecorder
      mediaRecorder = new MediaRecorder(stream);

      // Collect audio chunks
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      // Start recording
      mediaRecorder.start();

      // Stop recording after 1 minute 3 seconds
      setTimeout(() => {
        mediaRecorder.stop();
      }, 50000);

      // Handle stop event
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
          // Send audio to the backend
          const response = await fetch('https://ieltsgenai.com/capture_speech', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();

          if (data.error) {
            setLanguageError(data.error);
          } else {
            setTranscription(data.transcription);
            evaluateAnswer(data.transcription); // Evaluate the transcription
          }
        } catch (error) {
          console.error('Error sending audio:', error);
          setLanguageError('Failed to send audio.');
        } finally {
          // Stop microphone stream
          stream.getTracks().forEach((track) => track.stop());
          setRecording(false);
        }
      };
    } catch (error) {
      console.error('Error during speech capture:', error);
      setLanguageError('Error capturing speech.');
      setRecording(false);

      if (mediaRecorder) mediaRecorder.stop(); // Ensure MediaRecorder stops
    }
  };
 
  // Function to evaluate the user's answer using GPT and grammar checking
  const evaluateAnswer = async (sentence) => {
    try {
        const response = await fetch('https://ieltsgenai.com/evaluate_answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sentence,
                theme_name: selectedTheme,
                user_id: userId,
                question: generatedQuestion.question // Pass the generated question here
            })
        });

        // Check if the response is OK (status 200)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error occurred');
        }

        const data = await response.json();
        setEvaluation(data);
    } catch (error) {
        console.error('Error evaluating answer:', error);
        setLanguageError(error.message); // Set the error message for display
    }
};


  return (
    <div className="speak-test-container">
      <div className="themes-list">
        <h3>Select a Theme:</h3>
        <p><b>Select a theme from the list and click the Generate Question button</b></p>
        {themes.map((theme, index) => (
          <button key={index} className={`theme-button ${selectedTheme === theme ? 'selected' : ''}`} onClick={() => handleThemeSelect(theme)}>
            {theme}
          </button>
        ))}
      </div>
 
      <div className="test-area">
        <h2>Speak Test</h2>
        <div className="question-area">
          <button onClick={generateQuestion} className="generate-button">Generate Question</button>
          {generatedQuestion && (
            <div className="question-display">
              <p><strong>Question:</strong> <b>{generatedQuestion.question}</b></p>
              <p><strong>Suggested Answer:</strong> <i>{generatedQuestion.suggestedAnswer}</i></p>
            </div>
          )}
        </div>
        <div className="record-area">
          <button onClick={startRecording} className={`record-button ${recording ? 'recording' : ''}`} disabled={recording}>
            {recording ? 'Recording in progress...' : 'Start Recording'}
          </button>
          {transcription && (
            <div className="transcription-display">
              <p><strong>Your Answer:</strong> {transcription}</p>
            </div>
          )}
          {languageError && (
            <div className="error-message">
              <p>{languageError}</p>
            </div>
          )}
        </div>
        {evaluation && (
  <div className="evaluation-result">
    <h4>Evaluation:</h4>
    <p><strong>AI Evaluation:</strong></p>
    <div className="evaluation-feedback">
      {/* Assuming feedback is a single string */}
      {evaluation.feedback.split('\n\n').map((item, index) => (
        <div key={index} className="feedback-item">
          <span dangerouslySetInnerHTML={{ __html: item.replace(/(\d+\.\s*)/, '<strong>$&</strong>') }} />
        </div>
      ))}
    </div>
    {evaluation.suggestions && (
      <div>
        <strong>Suggestions for Improvement:</strong>
        <ul>
          {evaluation.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}


      </div>
    </div>
  );
};
 
export default SpeakingPlay1;