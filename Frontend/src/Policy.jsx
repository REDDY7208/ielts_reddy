import React from 'react';
import './policy.css';
 
const Policy = () => {
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-title">IELTSGenAI Privacy Policy</h1>
      <p className="section-text" style={{textAlign:'center'}}>IELTSGenAI is powered by DataSpark AI Solutions (Pvt).</p>
     
      <h2 className="section-title">1. Privacy Policy</h2>
      <p className="section-text">
        The Privacy Policy informs users about how their data is collected, used, and protected.
      </p>
     
      <h3 className="subsection-title">Information We Collect</h3>
      <ul className="list">
        <li><strong>Personal Data:</strong> Name, email address, phone number, payment details, etc.</li>
        <li><strong>Usage Data:</strong> Browsing behaviour, app activity, etc.</li>
        <li><strong>Device Data:</strong> IP address, browser type, device information.</li>
      </ul>
     
      <h3 className="subsection-title">How We Use Your Information</h3>
      <ul className="list">
        <li>To provide and maintain our services.</li>
        <li>To process your payments securely via Razorpay.</li>
        <li>To notify you of updates and offers related to our services.</li>
      </ul>
     
      <h3 className="subsection-title">Sharing Your Information</h3>
      <p className="section-text">
        We do not share your personal information with third parties except:
      </p>
      <ul className="list">
        <li>With payment processors (Razorpay) for secure transactions.</li>
        <li>To comply with legal obligations.</li>
      </ul>
     
      <h3 className="subsection-title">Data Security</h3>
      <p className="section-text">
        We use industry-standard security practices to protect your personal data. However, no method of
        transmission over the Internet is 100% secure.
      </p>
     
      <h3 className="subsection-title">Your Rights</h3>
      <p className="section-text">
        You can access, update, or request deletion of your personal data by contacting us at  
        <a href="mailto:support@ieltsgenai.com"> support@ieltsgenai.com </a>.
      </p>
     
      <h3 className="subsection-title">Changes to this Policy</h3>
      <p className="section-text">
        We may update this policy from time to time. Changes will be posted on this page.
      </p>
     
      <h3 className="subsection-title">Contact Us</h3>
      <p className="section-text">
        If you have any questions about this Privacy Policy, please contact us at
        <a href="mailto:support@ieltsgenai.com"> support@ieltsgenai.com </a>.
      </p>
     
      <h2 className="section-title">2. Refund/Cancellation Policy</h2>
      <p className="section-text">
        This policy will explain how users can request refunds or cancellations for their purchases.
      </p>
     
      <h3 className="subsection-title">Refund Policy</h3>
      <ul className="list">
        <li>
          <strong>Token-Based Refund:</strong> Refunds will be calculated based on the unused tokens remaining
          in your account. The refund amount will be proportional to the unused tokens, deducting the cost
          of the tokens already used.
        </li>
        <li>Refunds will be processed within 5-7 business days to the original payment method.</li>
      </ul>
     
      <h3 className="subsection-title">Cancellation Policy</h3>
      <ul className="list">
        <li>Access to the service will continue until the end of the current billing period or until the tokens in your account are used, whichever comes first.</li>
        <li>After cancellation, any unused tokens will not be refunded but can still be used until the end of the billing period.</li>
      </ul>
     
      <h3 className="subsection-title">How to Request a Refund</h3>
      <p className="section-text">
        Please contact our support team at <a href="mailto:support@ieltsgenai.com">support@ieltsgenai.com </a>
        to initiate a refund request. Provide your User ID or Email ID and the reason for the request. Refunds
        based on token usage will require verification of the remaining tokens at the time of the request.
      </p>
     
      <h3 className="subsection-title">Changes to the Policy</h3>
      <p className="section-text">
        We reserve the right to modify or update this policy at any time. Changes will be posted here.
      </p>
     
      <h2 className="section-title">3. Contact Us</h2>
      <p className="section-text">
        This section will include all our website contact details. It is important for transparency and user support.
      </p>
      <p className="contact-info">
        <strong>Email:</strong> <a href="mailto:ieltsgenai@gmail.com">ieltsgenai@gmail.com</a><br />
        <strong>Phone:</strong> 044-46890443 / +91-9363920738<br />
        <strong>Support:</strong> <a href="mailto:support@ieltsgenai.com">support@ieltsgenai.com</a>
      </p>
      <p className="section-text">
        Our support team is available to help you with any questions or issues you may encounter. Feel free to
        reach out during our business hours: Monday to Friday, 9:00 AM to 6:00 PM (GMT+5:30).
      </p>
     
      <h2 className="section-title">4. Plans Details</h2>
      <p className="section-text">
        Here, you will provide details of the products and services offered through your platform.
      </p>
      <ul className="list">
        <li><strong>7 Days Plan - ₹1,999</strong>: Access to all modules (Speaking, Writing, Reading, and Listening).</li>
        <li><strong>1 Month Plan - ₹6,999</strong>: Access to all modules (Speaking, Writing, Reading, and Listening).</li>
        <li><strong>3 Months Plan - ₹11,999</strong>: Access to all modules (Speaking, Writing, Reading, and Listening).</li>
        <li><strong>6 Months Plan - ₹17,999</strong>: Access to all modules (Speaking, Writing, Reading, and Listening).</li>
      </ul>
      <p className="section-text">
        All plans include access to real-time AI evaluations, study material, and progress tracking.
      </p>
    </div>
  );
};
 
export default Policy;