import React, { useState } from "react";
import "./faqPage.css";
 
const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
 
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
 
  const faqs = [
    {
      question: "What is IELTSGenAI?",
      answer:(
        <>Visit our <a href="https://www.ieltsgenai.com/" target="_blank" rel="noopener noreferrer">IELTSGenAI ,</a> is an AI-powered platform designed to assist users in preparing for the IELTS exam. It provides tailored resources, mock tests, and interactive practice materials to help improve your English proficiency and test-taking skills.</>
      )
    },
    {
      question: "How can I register for the IELTSGenAI platform?",
      answer: (
        <>
          To register, visit our <a href="https://www.ieltsgenai.com/Login1" target="_blank" rel="noopener noreferrer">registration page</a>, enter your details, and follow the instructions to create an account. Once registered, you’ll be prompted to choose a payment package that suits your needs. After completing the payment, you’ll have full access to all the tests, personalized resources, and practice materials available on the platform.
        </>
      ),
    },
    {
      question: "Does IELTSGenAI provide official IELTS practice tests?",
      answer: "While IELTSGenAI offers a variety of practice tests designed to simulate the IELTS exam experience, these are not official IELTS tests. They are curated to closely match the format and difficulty of the actual IELTS exam.",
    },
    {
      question: "How does the AI feature help in IELTS preparation?",
      answer: (
        <>
          The AI-powered features on IELTSGenAI analyze your performance, suggest areas for improvement, and customize learning resources to match your specific needs, enabling you to prepare more effectively for the IELTS exam. Additionally, the speaking module will be handled by AI, allowing you to practice speaking directly with the system, providing a personalized and interactive speaking experience.
        </>
      ),
    },
    {
      question: "What types of content are available for practice?",
      answer: (
        <>  Visit our <a href="https://www.ieltsgenai.com/learningResources" target="_blank" rel="noopener noreferrer">Learning Resources</a> We offer practice materials across all sections of the IELTS exam, including Listening, Reading, Writing, and Speaking. Content includes audio clips, reading passages, writing prompts, and interactive speaking exercises.</>
      )
     
    },
    {
      question: "Can I track my progress on IELTSGenAI?",
      answer: (
        <>
          Yes, IELTSGenAI provides detailed analytics and progress tracking. You can view your performance history, assess improvement over time, and receive feedback on areas that need further attention. All of this information will be displayed in your dashboard for easy access and monitoring.
        </>
      ),
    },
    {
      question: "Is there a free trial for IELTSGenAI?",
      answer: "No, we do not offer a free trial. IELTSGenAI is dedicated to providing high-quality, comprehensive IELTS preparation resources that offer real value for our users' investment. Our platform is carefully crafted to give you effective, AI-powered assistance to achieve your goals, and we believe it’s worth every penny for those serious about excelling in the IELTS exam.",
    },
    {
      question: "How can I contact support if I face issues?",
      answer: (
        <>
          You can reach out to our support team  by emailing <a href="mailto:support@ieltsgenai.com">support@ieltsgenai.com</a>. We’re here to help you with any issues or questions.
        </>
      ),
    },
    {
      question: "Does IELTSGenAI provide feedback on my practice tests?",
      answer: "Yes, IELTSGenAI provides detailed feedback on your practice tests, helping you identify your strengths and areas that need improvement.",
    },
    {
      question: "Is IELTSGenAI suitable for both Academic and General Training IELTS?",
      answer: "Yes, IELTSGenAI offers resources and practice tests for both Academic and General Training IELTS formats to meet different user needs.",
    },
    {
      question: "Can I use IELTSGenAI on my mobile device?",
      answer: "Yes, IELTSGenAI is mobile-friendly and can be accessed through web browsers on any mobile device, providing flexibility for on-the-go learning.",
    },
    {
      question: "What are the subscription plans available on IELTSGenAI?",
      answer: (
        <>
          We offer various subscription plans designed to suit different preparation needs, including a 7-day plan, a 1-month plan, a 3-month plan, and a 6-month plan. You can view detailed information on our <a href="https://www.ieltsgenai.com/home" target="_blank" rel="noopener noreferrer">Pricing page</a>.
        </>
      ),
    },
    {
      question: "Are there any discounts available for IELTSGenAI subscriptions?",
      answer: "We occasionally offer promotions and discounts. Please check our website or subscribe to our newsletter to stay updated on any current offers.",
    },
    {
      question: "Is IELTSGenAI suitable for beginners?",
      answer: "Yes, IELTSGenAI provides resources suitable for beginners as well as advanced learners. The AI customizes your practice according to your proficiency level.",
    },
    {
      question: "How often is the content updated on IELTSGenAI?",
      answer: "Our content is regularly updated to ensure it aligns with the latest IELTS standards and best practices for effective test preparation.",
    },
    {
      question: "Can I access IELTSGenAI offline?",
      answer: "Currently, IELTSGenAI requires an internet connection to access our resources, as we use cloud-based AI features and interactive content.",
    },
    {
      question: "What payment methods does IELTSGenAI accept?",
      answer: (
        <>
          We accept major credit/debit cards, UPI, and some digital wallets for seamless payment processing on our platform. For more details, please refer to our <a href="/https://www.ieltsgenai.com/policy" target="_blank" rel="noopener noreferrer">Payment Details</a> in privacy policy file in the footer .
        </>
      ),
    },
    {
      question: "Does IELTSGenAI offer one-on-one coaching sessions?",
      answer: "Currently, we focus on self-paced, AI-driven learning, but we’re planning to include one-on-one coaching sessions in the near future. Stay tuned for updates.",
    },
    {
      question: "Is there a money-back guarantee if I’m unsatisfied?",
      answer: (
        <>
          Yes, we offer a 7-day money-back guarantee for new users, depending on your token usage. Please refer to our <a href="/https://www.ieltsgenai.com/policy"  target="_blank" rel="noopener noreferrer">Refund Policy page</a> for more details.
        </>
      ),
    },
    {
      question: "How can I improve my Speaking score using IELTSGenAI?",
      answer: "IELTSGenAI offers interactive speaking exercises with AI-powered feedback, helping you improve fluency, pronunciation, and vocabulary for the IELTS Speaking section.",
    },
    {
      question: "Does IELTSGenAI offer support for non-English speakers?",
      answer: "Yes, IELTSGenAI provides simplified explanations and tips to support non-native English speakers in understanding IELTS requirements.",
    },
    {
      question: "Can I reset my progress on IELTSGenAI?",
      answer: "Yes, you can reset your progress in the account settings if you want a fresh start or wish to re-evaluate your skills.",
    },
    {
      question: "How is my data secured on IELTSGenAI?",
      answer: "We prioritize user privacy and data security, employing advanced encryption and secure servers to ensure your data remains safe.",
    },
  ];
 
 
 
  return (
    <div className="faq-container">
      <h1 className="faq-title">IELTSGenAI FAQ</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
          >
            <h2 className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-toggle-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </h2>
            <p
              className="faq-answer"
              style={{ display: activeIndex === index ? "block" : "none" }}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default FaqPage;