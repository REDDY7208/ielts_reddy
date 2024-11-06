import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import './index.css';
import Residencies from './Residencies';
import Navbar from './navbar';  // Import the Navbar component
import ChatHelp from './ChatHelp/ChatHelp';
import Testimonial from './Testimonial'
import LearningResources from './LearningResources'
import myImage from './assets/Picture1.png'
 
const Home = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
 
  const showNavbar = () => {
    setNavbarOpen(true);
  };
 
  const closeNavbar = () => {
    setNavbarOpen(false);
  };
 
  return (
    <div>
      {/* Replace the old navbar code with the Navbar component */}
      <Navbar user={user} />
 
   
 
      {/* Header */}
 
      <div className="header">
 
        <div>
 
          <h1 className="main-head animated-head">Learning IELTS Skills Anywhere, Anytime</h1>
 
          <h3 className='sub-head'>Welcome to IELTSGenAI!</h3>
 
          <p className="about">
 
           
 
              At IELTSGenAI, we are dedicated to helping you achieve your highest potential on the IELTS exam. Whether you're Aiming to study abroad, advance your career, or simply meet your personal goals, our comprehensive platform offers tailored resources
              and support for each module: Speaking, Listening, Writing, and Reading.
 
           
 
          </p>
 
 
 
 
          {/*<button className="header-button">Shop Now</button> */}
 
        </div>
 
        <div >
 
          <img
 
            className="header-img"
 
            src={myImage}
 
            alt="Study  Abroad Image"
 
 
 
 
          />
 
        </div>
 
      </div>
 
 
 
      <LearningResources />
      <Residencies />
      <ChatHelp />
 
      <Testimonial />
 {/* Footer */}
      <div className="footer">
        <div className="footer-container">
          <div className="footer-box-1">
            <h1 className="headingtext">IELTSGenAI</h1>
            <p>Follow us on :</p>
            <div className="footer-icon-container">
 
              <a href="https://x.com/IELTSGenAI2024" target="_blank" rel="noopener noreferrer" className="link">
                <i className="fa-brands fa-x-twitter" style={{ color: 'white' }}></i>
              </a>
 
              <a href="https://www.youtube.com/@IELTSGenAI" target="_blank" rel="noopener noreferrer" className="link">
                <i className="fa-brands fa-youtube" style={{ color: 'white' }}></i>
              </a>
 
              <a href="https://www.instagram.com/ieltsgenai?igsh=dHIyaXZ2a2ppMnV5" target="_blank" rel="noopener noreferrer" className="link">
                <i className="fa-brands fa-instagram" style={{ color: 'white' }}></i>
              </a>
 
              <a href="https://t.me/+-61Ucw2L5eBkNDk1" target="_blank" rel="noopener noreferrer" className="link">
                <i className="fa-brands fa-telegram" style={{ color: 'white' }}></i>
              </a>
 
            </div>
          </div>
          <div className="footer-box-2">
    <h4 className="textcolorwhite">ABOUT</h4>
 
    <p className="footerlinks">
      <a href="/terms-conditions" className="link" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
    </p>
    <p className="footerlinks">
      <a href="/policy" className="link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
    </p>
    <p className="footerlinks">
      <a href="/IELTSGenAI-FAQS" className="link" target="_blank" rel="noopener noreferrer">FAQ's</a>
    </p>
</div>
 
          <div className="footer-box-3">
            <h4 className="textcolorwhite">SERVICES</h4>
            <p className="footerlinks"><Link to="/Login1" className="link" >How to Start</Link></p>
            <p className="footerlinks"><Link to="/home" className="link">Our Product</Link></p>
 
            <p className="footerlinks"><Link to="/" className="link">Promo</Link></p>
 
          </div>
          <div className="footer-box-4">
            <h4 className="textcolorwhite">CONTACT DETAILS</h4>
            <p className="footerlinks">
              <a className="link" href="mailto:support@ieltsgenai.com">Contact Email</a>
            </p>
 
            {/* <p className="footerlinks"><Link to="/">Help</Link></p> */}
 
            <h6 className="link" style={{ color: '' }}>DSAIS,1st Floor,<br></br>AWFIS Workspace,<br></br>Perungudi,
              Chennai-97.</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Home;