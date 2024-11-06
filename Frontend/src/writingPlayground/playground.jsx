// import React, { useState, useEffect ,useRef} from 'react';
// import axios from 'axios';
// import './playground.css'; // Import the CSS file for styling and animations
 
// // Theme data
// const themes = [
//   { "theme_id": 1, "theme_name": "Education" },
//   { "theme_id": 2, "theme_name": "Health and Lifestyle" },
//   { "theme_id": 3, "theme_name": "Environment and Climate Change" },
//   { "theme_id": 4, "theme_name": "Technology and Innovation" },
//   { "theme_id": 5, "theme_name": "Government and Public Policy" },
//   { "theme_id": 6, "theme_name": "Employment and Economy" },
//   { "theme_id": 7, "theme_name": "Society and Culture" },
//   { "theme_id": 8, "theme_name": "Globalisation" },
//   { "theme_id": 9, "theme_name": "Media and Communication" },
//   { "theme_id": 10, "theme_name": "Crime and Law Enforcement" },
//   { "theme_id": 11, "theme_name": "Family and Relationships" },
//   { "theme_id": 12, "theme_name": "Public Transport and Infrastructure" },
//   { "theme_id": 13, "theme_name": "Politics and International Relations" },
//   { "theme_id": 14, "theme_name": "Arts and Culture" },
//   { "theme_id": 15, "theme_name": "Mental Health and Well-being" },
//   { "theme_id": 16, "theme_name": "Fossil Fuels" }
// ];
 
// const words = {
//   "1": [ // Education
//     "Vocational training", "Lifelong learning", "Academic performance",
//     "Curriculum reform", "Tertiary education", "Pedagogy",
//     "Educational attainment", "Standardized testing", "Literacy rate",
//     "Student loan debt", "Knowledge economy", "Distance learning"
//   ],
//   "2": [ // Health and Lifestyle
//     "Preventive healthcare", "Sedentary lifestyle", "Mental well-being",
//     "Balanced diet", "Non-communicable diseases", "Public health policies",
//     "Obesity epidemic", "Chronic conditions", "Work-life balance",
//     "Immunization programs", "Life expectancy", "Fitness regime"
//   ],
//   "3": [ // Environment and Climate Change
//     "Carbon footprint", "Greenhouse gases", "Biodiversity loss",
//     "Renewable energy", "Sustainable development", "Global warming",
//     "Deforestation", "Environmental conservation", "Fossil fuel dependence",
//     "Climate action", "Eco-friendly practices", "Carbon offsetting"
//   ],
//   "4": [ // Technology and Innovation
//     "Artificial intelligence", "Technological disruption", "Digital divide",
//     "Automation", "Cybersecurity", "Cutting-edge technology",
//     "E-commerce", "Innovative solutions", "Big data",
//     "Smart devices", "Cloud computing", "Internet of Things (IoT)"
//   ],
//   "5": [ // Government and Public Policy
//     "Welfare state", "Public expenditure", "Taxpayer money",
//     "Regulatory frameworks", "Policy implementation", "Bureaucracy",
//     "Civic responsibility", "Infrastructure development", "Public sector reforms",
//     "Subsidies", "Legislative measures", "Social welfare programs"
//   ],
//   "6": [ // Employment and Economy
//     "Equal pay", "Gig economy", "Job market trends",
//     "Unemployment rate", "Workplace diversity", "Job satisfaction",
//     "Entrepreneurship", "Economic growth", "Inflation",
//     "Labour force participation", "Minimum wage", "Career advancement"
//   ],
//   "7": [ // Society and Culture
//     "Social integration", "Cultural diversity", "Ethnic heritage",
//     "Gender equality", "Social cohesion", "Cultural preservation",
//     "Multiculturalism", "Interpersonal relationships", "Traditional values",
//     "Social mobility", "Discrimination", "Cultural assimilation"
//   ],
//   "8": [ // Globalisation
//     "Global interconnectedness", "Trade liberalization", "Cultural homogenization",
//     "Outsourcing", "Foreign direct investment", "Global workforce",
//     "Cross-border trade", "Economic interdependence", "Global village",
//     "Multinational corporations", "Supply chains", "Global marketplace"
//   ],
//   "9": [ // Media and Communication
//     "Mass media", "Misinformation", "Media literacy",
//     "Social media platforms", "Online privacy", "Digital journalism",
//     "Advertising campaigns", "Freedom of speech", "Influence of mass communication",
//     "Fake news", "Content moderation", "Public discourse"
//   ],
//   "10": [ // Crime and Law Enforcement
//     "Juvenile delinquency", "Law enforcement agencies", "Crime prevention strategies",
//     "White-collar crime", "Recidivism", "Penal system",
//     "Deterrence", "Criminal justice system", "Policing methods",
//     "Cybercrime", "Forensic evidence", "Rehabilitation programs"
//   ],
//   "11": [ // Family and Relationships
//     "Nuclear family", "Parenting styles", "Family dynamics",
//     "Work-life balance", "Generation gap", "Childcare responsibilities",
//     "Single-parent families", "Domestic responsibilities", "Marital discord",
//     "Elderly care", "Family cohesion", "Kinship"
//   ],
//   "12": [ // Public Transport and Infrastructure
//     "Public transit", "Urban sprawl", "Congestion charges",
//     "Infrastructure development", "Sustainable transport", "Commuter networks",
//     "High-speed rail", "Mass transit systems", "Road maintenance",
//     "Traffic management", "Public transportation subsidies", "Ride-sharing services"
//   ],
//   "13": [ // Politics and International Relations
//     "Diplomatic relations", "Foreign policy", "Bilateral agreements",
//     "Political stability", "Democracy", "Election campaigns",
//     "International cooperation", "Sovereignty", "Geopolitical tension",
//     "Global governance", "Trade embargo", "Sanctions"
//   ],
//   "14": [ // Arts and Culture
//     "Cultural heritage", "Artistic expression", "Performing arts",
//     "Visual arts", "Government funding for arts", "Art appreciation",
//     "Traditional crafts", "Contemporary art", "Cultural festivals",
//     "Museums and galleries", "Cultural identity", "Public art installations"
//   ],
//   "15": [ // Mental Health and Well-being
//     "Emotional resilience", "Mental health awareness", "Counseling services",
//     "Stress management", "Therapy sessions", "Psychological well-being",
//     "Burnout prevention", "Self-care practices", "Mindfulness techniques",
//     "Anxiety disorders", "Depression management", "Social support networks"
//   ],
//   "16": [ // Fossil Fuels
//     "Coal dependency", "Energy transition", "Carbon emissions",
//     "Oil reserves", "Gas exploration", "Fossil fuel depletion",
//     "Renewable energy alternatives", "Energy crisis", "Petroleum industry",
//     "Environmental degradation", "Energy consumption", "Sustainability initiatives"
//   ]
// };
 
// function Playground1() {
//   const [selectedTheme, setSelectedTheme] = useState(null);
//   const [selectedWord, setSelectedWord] = useState('');
//   const [definition, setDefinition] = useState('');
//   const [type, setType] = useState('');
//   const [feedback, setFeedback] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [sampleSentence, setSampleSentence] = useState('')
   
 
//   // Refs to control scrolling
   
//   const wordSectionRef = useRef(null);
//   const wordInfoSectionRef = useRef(null);
 
 
//   // Get the user ID from local storage when the component mounts
//   useEffect(() => {
//     const storedUserId = localStorage.getItem('user_id');
//     setUserId(storedUserId);
//   }, []);
 
//   const handleThemeClick = (themeId) => {
//     setSelectedTheme(themeId);
//     setSelectedWord('');
//     setDefinition('');
//     setType('');
//     setFeedback(null);
 
 
//       // Scroll to the words section
     
//       if (wordSectionRef.current) {
//         wordSectionRef.current.scrollIntoView({ behavior: 'smooth',block: 'start' });
//       }
   
 
//   };
 
//   const handleWordClick = async (word) => {
//     setSelectedWord(word);
//     setDefinition('');
//     setType('');
//     setFeedback(null);
 
//     try {
//       // Fetch word info including word, meaning, and sentences
//       const wordInfoResponse = await axios.post('http://127.0.0.1:5015/word_info', { word, user_id: userId });
 
//       // Extract word, meaning, and sentences from response
//       const { word: fetchedWord, meaning, sentences } = wordInfoResponse.data;
 
//       setSelectedWord(fetchedWord);
//       setDefinition(meaning);
//       setSampleSentence(sentences ? sentences.join("\n") : '');  // Display all sentences
//     } catch (error) {
//       console.error("Error fetching word info:", error);
//       setDefinition('Error fetching word information.');
//       setSampleSentence('Error retrieving sentences');
//     }
 
//     if (wordInfoSectionRef.current) {
//       wordInfoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };
 
 
//   const handleSubmit = async () => {
//     if (!selectedWord || !definition || !type) {
//       alert("Please fill out all fields.");
//       return;
//     }
 
//     try {
//       // Post data to evaluate endpoint
//       const response = await axios.post('http://127.0.0.1:5015/evaluate', {
//         sentence: definition,
//         word: selectedWord,
//         type: type,
//         user_id: userId
//       });
 
//       setFeedback(response.data);
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("Error submitting data");
//     }
//   };
 
//   return (
//     <div className="playground-container">
//       <h1 className="title">Master Rich Lexical Words for IELTS Success</h1>
 
//       <h2 className='scrolling-text'>In this interactive space, learn and practice essential vocabulary and collocations for your IELTS writing exam.<br></br>his AI-powered playground will assist you in enhancing your lexical resource, grammar, and sentence formation skills.</h2>
 
//       <h3 className='three-d-heading'>Get ready to boost your writing proficiency and achieve IELTS success!</h3>
 
//       <div className="content">
//         {/* Themes */}
//         <div className="themes-section">
//           <h2 className='curved-heading'>Select A Theme</h2>
//           <div className="button-container"> {/* Wrap buttons in a flex container */}
//             {themes.map((theme) => (
//               <button
//                 key={theme.theme_id}
//                 className={`theme-button ${selectedTheme === theme.theme_id ? 'active' : ''}`}
//                 onClick={() => handleThemeClick(theme.theme_id)}
//               >
//                 {theme.theme_name}
//               </button>
//             ))}
//           </div>
//         </div>
 
//         {/* Words */}
//         <h2 className='curved-heading'>Select A Word</h2>
//         <div className="words-section" ref={wordSectionRef}>
       
       
         
         
//           {selectedTheme && words[selectedTheme].map((word) => (
//             <button
//               key={word}
//               className={`word-button ${selectedWord === word ? 'active' : ''}`}
//               onClick={() => handleWordClick(word)}
//             >
//               {word}
//             </button>
//           ))}
//         </div>
 
//         <h2 className='curved-heading'>Word Information</h2>
//         <div className="word-container" ref={wordInfoSectionRef}>
//           {/* Parent flex container */}
 
 
//           <div className='info'>
 
 
//             {/* Display the selected word */}
//             <p><strong>Word:</strong> {selectedWord}</p>
 
//             {/* Display the meaning */}
//             <p><strong>Meaning:</strong> {definition}</p>
 
//             {/* Display the sample sentence */}
//             <p><strong>Sample sentence:</strong> {sampleSentence}</p>
//           </div>
 
//           {/* Definition and Type */}
//           <div className="input-section">
//             {selectedWord && (
//               <>
//                 <label>
//                   Type:
//                   <input
                   
//                     type="text"
//                     className="input-field"
//                     placeholder={`e.g., noun, adjective for "${selectedWord}"`}
//                     value={type}
//                     onChange={(e) => setType(e.target.value)}
//                   />
//                 </label>
//                 <br />
//                 <button className="submit-button-play" onClick={handleSubmit}>Submit</button>
 
//                 {feedback && (
//                   <div className="feedback-section">
//                     <h3>Feedback</h3>
//                     <p><strong>Grammar Feedback:</strong> {feedback.grammar_feedback.join(', ')}</p>
//                     <p><strong>Word Usage Feedback:</strong> {feedback.word_usage_feedback}</p>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
 
//       </div>
//     </div>
//   );
// }
 
// export default Playground1;

// =============================================================
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './playground.css'; // Import the CSS file for styling and animations

// Theme data
const themes = [
  { theme_id: 1, theme_name: 'Education' },
  { theme_id: 2, theme_name: 'Health and Lifestyle' },
  { theme_id: 3, theme_name: 'Environment and Climate Change' },
  { theme_id: 4, theme_name: 'Technology and Innovation' },
  { theme_id: 5, theme_name: 'Government and Public Policy' },
  { theme_id: 6, theme_name: 'Employment and Economy' },
  { theme_id: 7, theme_name: 'Society and Culture' },
  { theme_id: 8, theme_name: 'Globalisation' },
  { theme_id: 9, theme_name: 'Media and Communication' },
  { theme_id: 10, theme_name: 'Crime and Law Enforcement' },
  { theme_id: 11, theme_name: 'Family and Relationships' },
  { theme_id: 12, theme_name: 'Public Transport and Infrastructure' },
  { theme_id: 13, theme_name: 'Politics and International Relations' },
  { theme_id: 14, theme_name: 'Arts and Culture' },
  { theme_id: 15, theme_name: 'Mental Health and Well-being' },
  { theme_id: 16, theme_name: 'Fossil Fuels' },
];

const words = {
    "1": [ // Education
      "Vocational training", "Lifelong learning", "Academic performance",
      "Curriculum reform", "Tertiary education", "Pedagogy",
      "Educational attainment", "Standardized testing", "Literacy rate",
      "Student loan debt", "Knowledge economy", "Distance learning"
    ],
    "2": [ // Health and Lifestyle
      "Preventive healthcare", "Sedentary lifestyle", "Mental well-being",
      "Balanced diet", "Non-communicable diseases", "Public health policies",
      "Obesity epidemic", "Chronic conditions", "Work-life balance",
      "Immunization programs", "Life expectancy", "Fitness regime"
    ],
    "3": [ // Environment and Climate Change
      "Carbon footprint", "Greenhouse gases", "Biodiversity loss",
      "Renewable energy", "Sustainable development", "Global warming",
      "Deforestation", "Environmental conservation", "Fossil fuel dependence",
      "Climate action", "Eco-friendly practices", "Carbon offsetting"
    ],
    "4": [ // Technology and Innovation
      "Artificial intelligence", "Technological disruption", "Digital divide",
      "Automation", "Cybersecurity", "Cutting-edge technology",
      "E-commerce", "Innovative solutions", "Big data",
      "Smart devices", "Cloud computing", "Internet of Things (IoT)"
    ],
    "5": [ // Government and Public Policy
      "Welfare state", "Public expenditure", "Taxpayer money",
      "Regulatory frameworks", "Policy implementation", "Bureaucracy",
      "Civic responsibility", "Infrastructure development", "Public sector reforms",
      "Subsidies", "Legislative measures", "Social welfare programs"
    ],
    "6": [ // Employment and Economy
      "Equal pay", "Gig economy", "Job market trends",
      "Unemployment rate", "Workplace diversity", "Job satisfaction",
      "Entrepreneurship", "Economic growth", "Inflation",
      "Labour force participation", "Minimum wage", "Career advancement"
    ],
    "7": [ // Society and Culture
      "Social integration", "Cultural diversity", "Ethnic heritage",
      "Gender equality", "Social cohesion", "Cultural preservation",
      "Multiculturalism", "Interpersonal relationships", "Traditional values",
      "Social mobility", "Discrimination", "Cultural assimilation"
    ],
    "8": [ // Globalisation
      "Global interconnectedness", "Trade liberalization", "Cultural homogenization",
      "Outsourcing", "Foreign direct investment", "Global workforce",
      "Cross-border trade", "Economic interdependence", "Global village",
      "Multinational corporations", "Supply chains", "Global marketplace"
    ],
    "9": [ // Media and Communication
      "Mass media", "Misinformation", "Media literacy",
      "Social media platforms", "Online privacy", "Digital journalism",
      "Advertising campaigns", "Freedom of speech", "Influence of mass communication",
      "Fake news", "Content moderation", "Public discourse"
    ],
    "10": [ // Crime and Law Enforcement
      "Juvenile delinquency", "Law enforcement agencies", "Crime prevention strategies",
      "White-collar crime", "Recidivism", "Penal system",
      "Deterrence", "Criminal justice system", "Policing methods",
      "Cybercrime", "Forensic evidence", "Rehabilitation programs"
    ],
    "11": [ // Family and Relationships
      "Nuclear family", "Parenting styles", "Family dynamics",
      "Work-life balance", "Generation gap", "Childcare responsibilities",
      "Single-parent families", "Domestic responsibilities", "Marital discord",
      "Elderly care", "Family cohesion", "Kinship"
    ],
    "12": [ // Public Transport and Infrastructure
      "Public transit", "Urban sprawl", "Congestion charges",
      "Infrastructure development", "Sustainable transport", "Commuter networks",
      "High-speed rail", "Mass transit systems", "Road maintenance",
      "Traffic management", "Public transportation subsidies", "Ride-sharing services"
    ],
    "13": [ // Politics and International Relations
      "Diplomatic relations", "Foreign policy", "Bilateral agreements",
      "Political stability", "Democracy", "Election campaigns",
      "International cooperation", "Sovereignty", "Geopolitical tension",
      "Global governance", "Trade embargo", "Sanctions"
    ],
    "14": [ // Arts and Culture
      "Cultural heritage", "Artistic expression", "Performing arts",
      "Visual arts", "Government funding for arts", "Art appreciation",
      "Traditional crafts", "Contemporary art", "Cultural festivals",
      "Museums and galleries", "Cultural identity", "Public art installations"
    ],
    "15": [ // Mental Health and Well-being
      "Emotional resilience", "Mental health awareness", "Counseling services",
      "Stress management", "Therapy sessions", "Psychological well-being",
      "Burnout prevention", "Self-care practices", "Mindfulness techniques",
      "Anxiety disorders", "Depression management", "Social support networks"
    ],
    "16": [ // Fossil Fuels
      "Coal dependency", "Energy transition", "Carbon emissions",
      "Oil reserves", "Gas exploration", "Fossil fuel depletion",
      "Renewable energy alternatives", "Energy crisis", "Petroleum industry",
      "Environmental degradation", "Energy consumption", "Sustainability initiatives"
    ]
  };

function Playground1() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedWord, setSelectedWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [typedSentence, setTypedSentence] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [userId, setUserId] = useState(null);
  const [sampleSentence, setSampleSentence] = useState('');

  // Refs to control scrolling
  const wordSectionRef = useRef(null);
  const wordInfoSectionRef = useRef(null);

  // Get the user ID from local storage when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
  }, []);

  const handleThemeClick = (themeId) => {
    setSelectedTheme(themeId);
    setSelectedWord('');
    setDefinition('');
    setTypedSentence('');
    setFeedback(null);

    // Scroll to the words section
    if (wordSectionRef.current) {
      wordSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleWordClick = async (word) => {
    setSelectedWord(word);
    setDefinition('');
    setTypedSentence('');
    setFeedback(null);

    try {
      // Fetch word info including word, meaning, and sentences
      const wordInfoResponse = await axios.post('https://ieltsgenai.com/word_info', { word, user_id: userId });

      // Extract word, meaning, and sentences from response
      const { word: fetchedWord, meaning, sentences } = wordInfoResponse.data;

      setSelectedWord(fetchedWord);
      setDefinition(meaning);
      setSampleSentence(sentences ? sentences.join('\n') : ''); // Display all sentences
    } catch (error) {
      console.error('Error fetching word info:', error);
      setDefinition('Error fetching word information.');
      setSampleSentence('Error retrieving sentences');
    }

    if (wordInfoSectionRef.current) {
      wordInfoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!selectedWord || !typedSentence) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Post typed sentence and word data to evaluate endpoint
      const response = await axios.post('https://ieltsgenai.com/evaluate', {
        sentence: typedSentence,
        word: selectedWord,
        user_id: userId,
      });

      setFeedback(response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data');
    }
  };

  return (
    <div className="playground-container">
      <h1 className="title">Master Rich Lexical Words for IELTS Success</h1>

      <h2 className="scrolling-text">
        In this interactive space, learn and practice essential vocabulary and
        collocations for your IELTS writing exam. This AI-powered playground
        will assist you in enhancing your lexical resource, grammar, and
        sentence formation skills.
      </h2>

      <h3 className="three-d-heading">
        Get ready to boost your writing proficiency and achieve IELTS success!
      </h3>

      <div className="content">
        {/* Themes */}
        <div className="themes-section">
          <h2 className="curved-heading">Select A Theme</h2>
          <div className="button-container">
            {themes.map((theme) => (
              <button
                key={theme.theme_id}
                className={`theme-button ${selectedTheme === theme.theme_id ? 'active' : ''}`}
                onClick={() => handleThemeClick(theme.theme_id)}
              >
                {theme.theme_name}
              </button>
            ))}
          </div>
        </div>

        {/* Words */}
        <h2 className="curved-heading">Select A Word</h2>
        <div className="words-section" ref={wordSectionRef}>
          {selectedTheme &&
            words[selectedTheme].map((word) => (
              <button
                key={word}
                className={`word-button ${selectedWord === word ? 'active' : ''}`}
                onClick={() => handleWordClick(word)}
              >
                {word}
              </button>
            ))}
        </div>

        <h2 className="curved-heading">Word Information</h2>
        <div className="word-container" ref={wordInfoSectionRef}>
          {/* Word and Meaning */}
          <div className="info">
            <p><strong>Word:</strong> {selectedWord}</p>
            <p><strong>Meaning:</strong> {definition}</p>
            <p><strong>Sample sentence:</strong> {sampleSentence}</p>
          </div>

          {/* Typed Sentence Input */}
          <div className="input-section">
            {selectedWord && (
              <>
                <label>
                  Type Sentence:
                  <textarea
                    className="input-field"
                    placeholder="Type your sentence here..."
                    value={typedSentence}
                    onChange={(e) => setTypedSentence(e.target.value)}
                  />
                </label>
                <br />
                <button className="submit-button-play" onClick={handleSubmit}>
                  Submit
                </button>

                {/* Feedback Section */}
                {feedback && (
                  <div className="feedback-section">
                    <h3>Feedback</h3>
                    <p>
                      <strong>Grammar Feedback:</strong>{' '}
                      {Array.isArray(feedback.grammar_feedback)
                        ? feedback.grammar_feedback.join(', ')
                        : feedback.grammar_feedback}
                    </p>
                    <p>
                      <strong>Word Usage Feedback:</strong> {feedback.word_usage_feedback}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground1;

