// import React, { useState, useEffect } from 'react';

// import './SpeakTest.css';


// function SpeakTest() {

//     const [messages, setMessages] = useState([]);

//     const [recognition, setRecognition] = useState(null);

//     const [synth, setSynth] = useState(null);

//     const [listening, setListening] = useState(false); // Track listening state


//     useEffect(() => {

//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//         if (SpeechRecognition) {

//             const recog = new SpeechRecognition();

//             recog.lang = 'en-US';

//             recog.interimResults = false;

//             recog.continuous = false;

//             setRecognition(recog);

//         }

//         setSynth(window.speechSynthesis);

//     }, []);


//     const startConversation = () => {

//         greetUser();

//     };


//     const greetUser = () => {

//         const greeting = "Hi, I am GEN AI, your IELTS Speaking Test examiner. Let's begin with an introduction. Please tell me about yourself.";

//         appendMessage('bot', greeting);

//         speak(greeting, () => startListening());

//     };


//     const startListening = () => {

//         if (recognition && !listening) {

//             recognition.start();

//             setListening(true); // Set listening to true while recognizing


//             recognition.onresult = (event) => {

//                 const speechResult = event.results[0][0].transcript;

//                 appendMessage('user', speechResult);

//                 setListening(false); // Stop listening after a response is processed

//                 processResponse(speechResult);

//             };


//             recognition.onerror = (event) => {

//                 console.error(event.error);

//                 appendMessage('bot', "Sorry, I couldn't understand you. Could you please say it again?");

//                 speak("Sorry, I couldn't understand you. Could you please say it again?");

//                 setListening(false); // Stop listening after an error, without automatically restarting

//             };

//         }

//     };


//     const processResponse = (response) => {

//         fetch('https://ieltsgenai.com/response', {

//             method: 'POST',

//             headers: {

//                 'Content-Type': 'application/json',

//             },

//             body: JSON.stringify({ response }),

//         })

//         .then((res) => res.json())

//         .then((data) => {

//             if (data.question) {

//                 appendMessage('bot', data.question);

//                 speak(data.question, () => startListening());

//             } else if (data.final_feedback) {

//                 appendMessage('bot', data.final_feedback);

//                 speak(data.final_feedback);

//             }

//         })

//         .catch((error) => {

//             console.error("Error:", error);

//             appendMessage('bot', "There was an error processing your request.");

//             speak("There was an error processing your request.");

//         });

//     };


//     const appendMessage = (sender, message) => {

//         setMessages(prevMessages => [...prevMessages, { sender, message }]);

//     };


//     const speak = (text, callback) => {

//         if (synth) {

//             const utterance = new SpeechSynthesisUtterance(text);

//             utterance.rate = 0.85;

//             utterance.onend = callback;

//             synth.speak(utterance);

//         }

//     };


//     return (

//         <div className="SpeakTest-container">

//             <div className="SpeakTest-header">

//                 <h2>IELTS Speaking Test - Gen-Ai</h2>

//             </div>

//             <div className="SpeakTest-chat-window">

//                 {messages.map((msg, index) => (

//                     <div key={index} className={`SpeakTest-chat-message ${msg.sender}`}>

//                         {msg.message}

//                     </div>

//                 ))}

//             </div>

//             <button className="SpeakTest-start-conversation" onClick={startConversation}>

//                 Start Test

//             </button>

//         </div>

//     );

// }


// export default SpeakTest;





// import React, { useState, useEffect } from 'react';
// import './SpeakTest.css';
 
// function SpeakTest() {
//     const [messages, setMessages] = useState([]);
//     const [recognition, setRecognition] = useState(null);
//     const [listening, setListening] = useState(false);
//     const [stage, setStage] = useState('instructions'); // Default to 'instructions' stage
//     const [questionCount, setQuestionCount] = useState(0);
//     const totalQuestions = 7;
//     const [responseQueue, setResponseQueue] = useState([]);
//     const [submitted, setSubmitted] = useState(false);
 
//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             const recog = new SpeechRecognition();
//             recog.lang = 'en-US';
//             recog.interimResults = true;
//             recog.continuous = true;
//             recog.onresult = (event) => {
//                 for (let i = event.resultIndex; i < event.results.length; i++) {
//                     const speechResult = event.results[i][0].transcript;
//                     if (event.results[i].isFinal) {
//                         appendMessage('user', speechResult);
//                         setResponseQueue(prevQueue => [...prevQueue, speechResult]);
//                     }
//                 }
//             }
 
//             recog.onerror = (event) => {
//                 console.error(event.error);
//                 const errorMessage = "Sorry, I couldn't understand you. Could you please say it again?";
//                 appendMessage('bot', errorMessage);
//                 synthesizeSpeech(errorMessage);
//                 setListening(false);
//             };
 
 
 
 
//             setRecognition(recog);
//         }
//     }, []);
 
//     const startTestEnvironment = () => {
//         setStage('start'); // Move to start stage for test environment
//     };
 
//     const startConversation = () => {
//         greetUser();
//         setStage('recording'); // Move to recording stage
//     };
 
//     const greetUser = () => {
//         const greeting = "Hi, I am Elsa, your IELTS Speaking Test examiner. Let's begin.";
//         appendMessage('bot', greeting);
 
//         synthesizeSpeech(greeting, () => {
//             setTimeout(() => {
//                 setQuestionCount(0); // Reset question count
//                 fetchNextQuestion(); // Fetch the first question after a delay
//             }, 1000); // 1-second delay after greeting
//         });
//     };
 
//     const handleToggleRecording = () => {
//         if (recognition) {
//             if (!listening) {
//                 recognition.start();
//                 setListening(true);
//             } else {
//                 handleStopRecording();
//             }
//         }
//     };
 
//     const handleStopRecording = () => {
//         if (recognition && listening) {
//             recognition.stop();
//             setListening(false);
//             if (responseQueue.length > 0) {
//                 const fullResponse = responseQueue.join(' ');
//                 processResponse(fullResponse);
//                 setResponseQueue([]);
//             }
//         }
//     };
 
//     const processResponse = (response) => {
//         fetch('http://127.0.0.1:5001/submit_response', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ response }),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.message) {
//                     appendMessage('bot', data.message);
//                     synthesizeSpeech(data.message);
//                 }
 
//                 setQuestionCount(prevCount => prevCount + 1);
 
//                 // Check if there are more questions before fetching the next question
//                 if (questionCount < totalQuestions - 1) {
//                     setTimeout(fetchNextQuestion, 3000); // Delay for response processing
//                 } else {
//                     setStage('complete');
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//                 const errorMessage = "There was an error processing your request.";
//                 appendMessage('bot', errorMessage);
//                 synthesizeSpeech(errorMessage);
//             });
//     };
 
//     const fetchNextQuestion = () => {
//         fetch('http://127.0.0.1:5001/ask_question')
//             .then(res => res.json())
//             .then(data => {
//                 if (data.question) {
//                     appendMessage('bot', data.question);
//                     synthesizeSpeech(data.question);
//                 }
//             })
//             .catch(error => {
//                 console.error("Error fetching question:", error);
//             });
//     };
 
//     const appendMessage = (sender, message) => {
//         setMessages(prevMessages => [...prevMessages, { sender, message }]);
//     };
 
//     const synthesizeSpeech = async (text, callback = null) => {
//         try {
//             const response = await fetch("http://127.0.0.1:5001/synthesize_speech", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ text }),
//             });
 
//             if (response.ok) {
//                 const audioBlob = await response.blob();
//                 const audioUrl = URL.createObjectURL(audioBlob);
//                 const audio = new Audio(audioUrl);
 
//                 audio.onended = () => {
//                     if (callback) callback();
//                 };
 
//                 audio.play();
//             }
//         } catch (error) {
//             console.error("Error synthesizing speech:", error);
//         }
//     };
 
//     const submitTest = () => {
//         setSubmitted(true);
//         fetch('http://127.0.0.1:5001/submit_test', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.final_feedback) {
//                     appendMessage('bot', data.final_feedback);
//                     synthesizeSpeech(data.final_feedback);
//                 }
//             })
//             .catch(error => {
//                 console.error("Error submitting test:", error);
//                 appendMessage('bot', "There was an error submitting your test.");
//             });
//     };
 
//     return (
//         <div className="SpeakTest-container">
//             <div className="SpeakTest-header">
//                 <h2>IELTSGenAI Speaking Test</h2>
//             </div>
//             <div className="SpeakTest-content">
//                 {stage === 'instructions' && (
//                     <div className="SpeakTest-instructions">
//                         <p>Welcome to the IELTSGenAI Speaking Test.<br></br> Please Carefully Follow the Instructions</p>
//                         <ul>
//                             <li><strong>Preparation</strong><br></br>
 
//                                 Ensure you are in a quiet environment.
 
//                             </li>
//                             <li><strong>Starting the Test</strong>
//                                     <ol>
//                                 <li> <b>1. </b>When you click <b>"Start Test"</b> allow the microphone to access your voice.</li>
//                                 <li><b>2. </b>Press the <b>"Start Answer Recording"</b> button to begin recording your response.</li>
//                                     </ol>
//                             </li>
//                             <li><strong>During the Test</strong>
//                                 <ol>
//                                     <li><b>1. </b>Answer each question clearly and concisely.</li>
//                                     <li><b>2. </b>After answering, press <b>"Stop Answer Recording."</b></li>
//                                     <li><b>3. </b>In the main IELTS Speaking test, the duration is typically <b>15-16</b> minutes. For your test, we provide the "Start Answer Recording" and "Stop Answer Recording" buttons, giving you sufficient time to think and respond properly.</li>
//                                 </ol>
//                             </li>
//                             <li><strong>Completing Rounds</strong>
 
//                                 <br></br>The exam will be divided into several rounds, each with its own set of questions. Complete each round carefully before moving to the next.
 
//                             </li>
//                             <li><strong>Following Instructions</strong>
 
//                                 <br></br>Follow all instructions provided on-screen, as they are designed to guide you through the exam step-by-step.
 
//                             </li>
//                             <li><strong>Focus and Clarity</strong>
//                                 <ol>
//                                     <li><b>1. </b>Remain focused throughout each round, as each response is an important part of your overall assessment.</li>
//                                     <li><b>2. </b>Remember that accuracy and clarity are key in every response. Take your time, but stay mindful of the total exam duration.</li>
//                                 </ol>
//                             </li>
//                             <li><strong>Finalizing the Test</strong><br></br>
 
//                                 After completing all rounds, you will see the <b>"Submit"</b> button to finalize and submit your answers.</li>
 
 
//                         </ul>
 
//                         <button onClick={startTestEnvironment}>Next</button>
//                     </div>
//                 )}
//                 {stage !== 'instructions' && (
//                     <>
//                         <div className="SpeakTest-chat-window">
//                             {messages.map((msg, index) => (
//                                 <div key={index} className={`SpeakTest-chat-message ${msg.sender}`}>
//                                     {msg.message}
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="SpeakTest-controls">
//                             {stage === 'start' && (
//                                 <button onClick={startConversation}>Start Test</button>
//                             )}
//                             {stage === 'recording' && (
//                                 <button onClick={handleToggleRecording}>
//                                     {listening ? 'Stop Answer Recording' : 'Start Answer Recording'}
//                                 </button>
//                             )}
//                             {stage === 'complete' && (
//                                 <button onClick={submitTest} disabled={submitted}>Submit Test</button>
//                             )}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }
 
// export default SpeakTest;
 


import React, { useState, useEffect } from 'react';
import './SpeakTest.css';

function SpeakTest() {
    const [messages, setMessages] = useState([]);
    const [recognition, setRecognition] = useState(null);
    const [listening, setListening] = useState(false);
    const [stage, setStage] = useState('instructions'); // Default to 'instructions' stage
    const [questionCount, setQuestionCount] = useState(0);
    const totalQuestions = 7;
    const [responseQueue, setResponseQueue] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recog = new SpeechRecognition();
            recog.lang = 'en-US';
            recog.interimResults = true;
            recog.continuous = true;
            recog.onresult = (event) => {
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const speechResult = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        appendMessage('user', speechResult);
                        setResponseQueue(prevQueue => [...prevQueue, speechResult]);
                    }
                }
            };

            recog.onerror = (event) => {
                console.error(event.error);
                const errorMessage = "Sorry, I couldn't understand you. Could you please say it again?";
                appendMessage('bot', errorMessage);
                synthesizeSpeech(errorMessage);
                setListening(false);
            };

            setRecognition(recog);
        }
    }, []);

    const startTestEnvironment = () => {
        setStage('start'); // Move to start stage for test environment
    };

    const startConversation = () => {
        greetUser();
        setStage('recording'); // Move to recording stage
    };

    const greetUser = () => {
        const greeting = "Hi, I am Elsa, your IELTS Speaking Test examiner. Let's begin.";
        appendMessage('bot', greeting);

        synthesizeSpeech(greeting, () => {
            setTimeout(() => {
                setQuestionCount(0); // Reset question count
                fetchNextQuestion(); // Fetch the first question after a delay
            }, 1000); // 1-second delay after greeting
        });
    };

    const handleToggleRecording = () => {
        if (recognition) {
            if (!listening) {
                recognition.start();
                setListening(true);
            } else {
                handleStopRecording();
            }
        }
    };

    const handleStopRecording = () => {
        if (recognition && listening) {
            recognition.stop();
            setListening(false);
            if (responseQueue.length > 0) {
                const fullResponse = responseQueue.join(' ');
                processResponse(fullResponse);
                setResponseQueue([]);
            }
        }
    };

    const processResponse = (response) => {
        const userId = localStorage.getItem('user_id'); // Fetch user ID from local storage

        fetch('https://ieltsgenai.com/submit_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ response, userId }), // Send userId along with response
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    appendMessage('bot', data.message);
                    synthesizeSpeech(data.message);
                }

                setQuestionCount(prevCount => prevCount + 1);
                // Check if there are more questions before fetching the next question
                if (questionCount < totalQuestions - 1) {
                    setTimeout(fetchNextQuestion, 3000); // Delay for response processing
                } else {
                    setStage('complete');
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                const errorMessage = "There was an error processing your request.";
                appendMessage('bot', errorMessage);
                synthesizeSpeech(errorMessage);
            });
    };

    const fetchNextQuestion = () => {
        fetch('https://ieltsgenai.com/ask_question')
            .then(res => res.json())
            .then(data => {
                if (data.question) {
                    appendMessage('bot', data.question);
                    synthesizeSpeech(data.question);
                }
            })
            .catch(error => {
                console.error("Error fetching question:", error);
            });
    };

    const appendMessage = (sender, message) => {
        setMessages(prevMessages => [...prevMessages, { sender, message }]);
    };

    const synthesizeSpeech = async (text, callback = null) => {
        try {
            const response = await fetch("https://ieltsgenai.com/synthesize_speech", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);

                audio.onended = () => {
                    if (callback) callback();
                };

                audio.play();
            }
        } catch (error) {
            console.error("Error synthesizing speech:", error);
        }
    };

    const submitTest = () => {
        setSubmitted(true);
        const userId = localStorage.getItem('user_id'); // Fetch user ID from local storage

        fetch('https://ieltsgenai.com/submit_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }), // Send userId along with test submission
        })
            .then(res => res.json())
            .then(data => {
                if (data.final_feedback) {
                    appendMessage('bot', data.final_feedback);
                    synthesizeSpeech(data.final_feedback);
                }
            })
            .catch(error => {
                console.error("Error submitting test:", error);
                appendMessage('bot', "There was an error submitting your test.");
            });
    };

    return (
        <div className="SpeakTest-container">
            <div className="SpeakTest-header">
                <h2>IELTSGenAI Speaking Test</h2>
            </div>
            <div className="SpeakTest-content">
                {stage === 'instructions' && (
                    <div className="SpeakTest-instructions">
                        <p>Welcome to the IELTSGenAI Speaking Test.<br></br> Please Carefully Follow the Instructions</p>
                        <ul>
                            <li><strong>Preparation</strong><br></br> Ensure you are in a quiet environment.</li>
                            <li><strong>Starting the Test</strong>
                                <ol>
                                    <li> <b>1. </b>When you click <b>"Start Test"</b> allow the microphone to access your voice.</li>
                                    <li><b>2. </b>Press the <b>"Start Answer Recording"</b> button to begin recording your response.</li>
                                </ol>
                            </li>
                            <li><strong>During the Test</strong>
                                <ol>
                                    <li><b>1. </b>Answer each question clearly and concisely.</li>
                                    <li><b>2. </b>After answering, press <b>"Stop Answer Recording."</b></li>
                                    <li><b>3. </b>In the main IELTS Speaking test, the duration is typically <b>15-16</b> minutes. For your test, we provide the "Start Answer Recording" and "Stop Answer Recording" buttons, giving you sufficient time to think and respond properly.</li>
                                </ol>
                            </li>
                            <li><strong>Completing Rounds</strong>
                                <br></br>The exam will be divided into several rounds, each with its own set of questions. Complete each round carefully before moving to the next.
                            </li>
                            <li><strong>Following Instructions</strong>
                                <br></br>Follow all instructions provided on-screen, as they are designed to guide you through the exam step-by-step.
                            </li>
                            <li><strong>Focus and Clarity</strong>
                                <ol>
                                    <li><b>1. </b>Remain focused throughout each round, as each response is an important part of your overall assessment.</li>
                                    <li><b>2. </b>Remember that accuracy and clarity are key in every response. Take your time, but stay mindful of the total exam duration.</li>
                                </ol>
                            </li>
                            <li><strong>Finalizing the Test</strong><br></br>
                                After completing all rounds, you will see the <b>"Submit"</b> button to finalize and submit your answers.</li>
                        </ul>
                        <button onClick={startTestEnvironment}>Next</button>
                    </div>
                )}
                {stage !== 'instructions' && (
                    <>
                        <div className="SpeakTest-chat-window">
                            {messages.map((msg, index) => (
                                <div key={index} className={`SpeakTest-chat-message ${msg.sender}`}>
                                    {msg.message}
                                </div>
                            ))}
                        </div>
                        <div className="SpeakTest-controls">
                            {stage === 'start' && (
                                <button onClick={startConversation}>Start Test</button>
                            )}
                            {stage === 'recording' && (
                                <button onClick={handleToggleRecording}>
                                    {listening ? 'Stop Answer Recording' : 'Start Answer Recording'}
                                </button>
                            )}
                            {stage === 'complete' && (
                                <button onClick={submitTest} disabled={submitted}>Submit Test</button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SpeakTest;