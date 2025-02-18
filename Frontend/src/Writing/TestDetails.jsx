import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './TestDetails.css';

const TestDetails = () => {
  const { testId } = useParams();
  const [step, setStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState("");
  const [tasks, setTasks] = useState({ task1: "", task2: "" });
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [answers, setAnswers] = useState({ task1: "", task2: "" });
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isTestActive, setIsTestActive] = useState(true);
  const [hasTabAlertBeenShown, setHasTabAlertBeenShown] = useState(false);
  const [questions, setQuestions] = useState({ task1: { question: "", image: null }, task2: { question: "", image: null } });
  const [submitClicked, setSubmitClicked] = useState(false);
  const userId = localStorage.getItem('user_id');
  const videoRef = useRef(null); // Ref to video element
  const [intervalId, setIntervalId] = useState(null); // Store interval ID for frame processing


  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch('/mockTests.json');
        const data = await response.json();
        const test = data.tests.find(test => test.test_id === testId);
        if (test) {
          const modeData = test.modes[selectedMode];
          if (modeData) {
            setTasks({
              task1: modeData.task1.question_text,
              task2: modeData.task2.question_text,
            });
            setQuestions({
              task1: {
                question: modeData.task1.question_text,
                image: modeData.task1.image_url || null,
              },
              task2: {
                question: modeData.task2.question_text,
                image: modeData.task2.image_url || null,
              }
            });
            setCurrentTaskIndex(0);
          }
        }
      } catch (error) {
        console.error("Failed to fetch test data:", error);
      }
    };
    if (testId && selectedMode) {
      fetchTestData();
    }
  }, [testId, selectedMode]);

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
  };

  const handleNext = () => {
    if (selectedMode) {
      setStep(2);
    }
  };

  const goFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  };

  const disableBackNavigation = () => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  };

  const preventTabSwitch = () => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isTestActive && !hasTabAlertBeenShown) {
        setHasTabAlertBeenShown(true);
        alert('You are not allowed to switch tabs during the test. If you do, the test will be automatically submitted.');
        setTimeout(() => {
          handleSubmit(); // Automatically submit the test
        }, 0);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  };

  const startTest = async () => {
    try {
      console.log('Starting test for User ID:', userId);
      await fetch('https://ieltsgenai.com/start_monitoring', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });
      setStep(3);
      goFullScreen();
      disableBackNavigation();
      preventTabSwitch();
      startVideoMonitoring(); // Start video monitoring when the test starts
    } catch (error) {
      console.error('Failed to start monitoring:', error);
      alert('Failed to start monitoring. Please try again.');
    }
  };

  const startVideoMonitoring = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        const interval = setInterval(sendFrame, 1000); // Send frames every second
        setIntervalId(interval);
      } catch (error) {
        console.error("Error accessing webcam:", error);
        alert('Failed to access webcam.');
      }
    } else {
      alert('Camera is not available on this device.');
    }
  };

  const sendFrame = async () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = canvas.toDataURL('image/jpeg');

    try {
      await fetch('https://ieltsgenai.com/process_frame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ frame: frame }), // Send the frame as a base64 string
      });
    } catch (error) {
      console.error('Error processing frame:', error);
    }
  };

  const handleAnswerChange = (event) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [`task${currentTaskIndex + 1}`]: event.target.value,
    }));
  };

  useEffect(() => {
    let timer;

    if (step === 3 && isTestActive) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimeUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [step, isTestActive]);

  const handleSubmit = async () => {
    if (submitClicked) return; // Prevent multiple clicks
    setSubmitClicked(true); // Disable the button
    setIsTestActive(false);

    console.log({
      testId: testId,
      selectedMode: selectedMode,
      answers: answers,
      timeTaken: 3600 - timeRemaining,
      task1Question: questions.task1.question,
      task1Image: questions.task1.image,
      task2Question: questions.task2.question,
      userId: userId // Include user ID in the submission
    }); // Log data before submitting to check if everything is correct

    try {
      const response = await fetch('https://ieltsgenai.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testId: testId,
          selectedMode: selectedMode,
          answers: answers,
          timeTaken: 3600 - timeRemaining,
          task1Question: questions.task1.question,
          task1Image: questions.task1.image,
          task2Question: questions.task2.question,
          user_id: userId // Send user ID to backend
        }),
      });

      await fetch('https://ieltsgenai.com/stop_monitoring', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: userId}), // Send an empty object
      });

      clearInterval(intervalId); // Clear the interval when submitting
      const result = await response.json(); // Parse the response to get detailed info
      alert('Test submitted successfully!');
      window.location.href = '/Dashboard';
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Failed to submit test. Please try again.');
    } finally {
      setSubmitClicked(false); // Re-enable the button
    }
  };

  const swapTask = (taskIndex) => {
    setCurrentTaskIndex(taskIndex);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className="writing-test-container">
      {step === 1 && (
        <div className="mode-selection">
          <div className="mode-content">
            <h2>Select Mode</h2>
            <p><b>Please select one of the options below and click next to proceed to the writing test instructions.</b></p>
            <div className="mode-buttons-container">
              <button
                onClick={() => handleModeSelection("General")}
                className={`mode-button ${selectedMode === "General" ? 'selected' : ''}`}
              >
                General
              </button>
              <button
                onClick={() => handleModeSelection("Academic")}
                className={`mode-button ${selectedMode === "Academic" ? 'selected' : ''}`}
              >
                Academic
              </button>
            </div>
            <button
              onClick={handleNext}
              className="next-button"
              disabled={!selectedMode}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="instructions-wrapper">
          <div className="instructions-container">
            <h2> Writing Test Instructions</h2>
            <p>Practice mode is suitable for improving accuracy and time spent on each part.</p>
            <h3> Test information </h3>
            <ol>
              <li><strong>Task 1 Academic:</strong> Describe a graph, chart, or diagram in at least <strong>150 words</strong>.</li>
              <li><strong>Task 1 General:</strong> Write a letter (personal, semi-formal, or formal) in at least <strong>150 words</strong>.</li>
              <li><strong>Task 2:</strong> Respond to an argument or problem in at least <strong>250 words</strong> for both Academic and General formats.</li>
              <li><strong>Time Management:</strong> Spend approximately <strong>20 minutes on Task 1</strong> and <strong>40 minutes on Task 2</strong>.</li>
              <li><strong>Total Time Allowed:</strong> You have <strong>60 minutes</strong> in total to complete both tasks.</li>
              <li><strong>Scoring:</strong> Task 2 carries <strong>more weight</strong> than Task 1, so prioritize your time accordingly.</li>
            </ol>
            <button onClick={startTest} className="start-button">Start Now</button>
          </div>
          <div className="video-tab-instructions">
            <h2>Important Instructions</h2>
            <p>Welcome to the writing test. Please read and follow these instructions carefully:</p>
            <ol >
              <li><strong>Video Recording:</strong> Please note that your video will be recorded during the test. Ensure that you are in a well-lit and quiet environment to avoid any interruptions.</li>
              <li><strong>Language Requirements:</strong> Use clear, formal language. Focus on grammar, coherence, and vocabulary.</li>
              <li><strong>Structure:</strong> Ensure your writing is well-organized with a clear introduction, body, and conclusion.</li>
              <li><strong>Answer Sheet:</strong> Write your answers on the provided answer box and do not exceed the word limit.</li>
              <li><strong>Check Your Network Connection:</strong> Ensure you have a stable and reliable internet connection before starting the test. Avoid any interruptions by disabling notifications and closing unnecessary applications. Maintain focus and patience to complete the test effectively.</li>
            </ol>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="fullscreen-overlay">
          <div className="test-content">
            <div className="fixed-header">
              <div className="timer">
                <p>
                  <i className="fas fa-clock"></i> Time Remaining: {formatTime(timeRemaining)}
                </p>
                {isTimeUp && <p><i className="fas fa-clock"></i> Time is up!</p>}
              </div>
              <button
                onClick={handleSubmit}
                className="submit-button"
                disabled={submitClicked || isTimeUp}
              >
                Submit
              </button>
            </div>
            <div className="scrollable-content">
              <div className="task-container">
                <div className="task">
                  <h2 className='heading-writing'>{`${selectedMode === "General" ? "General" : "Academic"} Writing Task ${currentTaskIndex + 1}`}</h2>
                  <p className='Writing-Question' >{tasks[`task${currentTaskIndex + 1}`]}</p>
                  {questions[`task${currentTaskIndex + 1}`]?.image && (
                    <img src={questions[`task${currentTaskIndex + 1}`].image} alt="Writing Task" style={{ width: '100%', height: 'auto' }} />
                  )}
                </div>
                <div className="writing-area">
                  <textarea
                    value={answers[`task${currentTaskIndex + 1}`] || ""}
                    onChange={handleAnswerChange}
                    placeholder="Start writing here..."
                    rows="15"
                    cols="80"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    style={{
                      WebkitUserModify: 'read-write-plaintext-only',
                    }}
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                  />
                  <div className="word-count">
                    <p >Word Count: {countWords(answers[`task${currentTaskIndex + 1}`] || "")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="swap-section">
              <div className='swap-task'> <button onClick={() => swapTask(0)} disabled={currentTaskIndex === 0}>Task 1</button>
              </div>
              <div className='swap-task'>
                <button onClick={() => swapTask(1)} disabled={currentTaskIndex === 1}>Task 2</button>
              </div>
            </div>
            <video ref={videoRef} autoPlay muted className="hidden-video" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDetails;