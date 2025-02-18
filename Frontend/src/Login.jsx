



// import React, { useState, useEffect } from 'react';
// import { UilAt, UilLockAlt, UilUser, UilPhone } from '@iconscout/react-unicons';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.css';

// const Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullName: '',
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//   });
//   const [forgotPasswordData, setForgotPasswordData] = useState({
//     email: '',
//     otp: '',
//     newPassword: '',
//     reEnterPassword: '',
//   });

//   const navigate = useNavigate();
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleForgotPasswordChange = (e) => {
//     const { name, value } = e.target;
//     setForgotPasswordData({ ...forgotPasswordData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const apiUrl = isSignUp
//       ? 'https://ieltsgenai.com/register'
//       : 'https://ieltsgenai.com/login';

//     const payload = isSignUp
//       ? {
//           email: formData.email,
//           username: formData.fullName,
//           password: formData.password,
//           phone_number: formData.phoneNumber,
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//         }
//       : {
//           email: formData.email,
//           password: formData.password,
//         };

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const { user_id } = data;

//         const user = {
//           email: formData.email,
//           username: formData.fullName,
//         };

//         localStorage.setItem('user', JSON.stringify(user));
//         localStorage.setItem('user_id', user_id);
//         localStorage.setItem('isAuthenticated', 'true');

//         if (isSignUp) {
//           alert('Registered Successfully! Please log in.');
//           setRegistrationSuccess(true);
//         } else {
//           alert('Logged in Successfully!');
//           navigate('/home');
//         }
//       } else if (response.status === 400) {
//         const errorData = await response.json();
//         if (isSignUp) {
//           alert(errorData.message || 'Email or username already exists');
//         } else {
//           alert(errorData.message || 'Login failed. Please check your credentials.');
//         }
//       } else if (response.status === 500) {
//         if (isSignUp) {
//           alert('Registration failed. Please try again later.');
//         } else {
//           alert('Login failed. Please try again later.');
//         }
//       } else {
//         alert('An unexpected error occurred. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       alert(isSignUp ? 'Registration Failed' : 'Login Failed');
//     }
//   };

//   useEffect(() => {
//     if (registrationSuccess) {
//       setIsSignUp(false);
//       setFormData({
//         email: '',
//         password: '',
//         fullName: '',
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//       });
//       setRegistrationSuccess(false);
//     }
//   }, [registrationSuccess]);

//   const handleForgotPasswordSubmit = async (e) => {
//     e.preventDefault();
//     const apiUrl = 'https://ieltsgenai.com/forgot_password';

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: forgotPasswordData.email }),
//       });

//       if (response.ok) {
//         alert('OTP sent to your email.');
//         setOtpSent(true);
//       } else {
//         alert('Email not found or failed to send OTP.');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       alert('Failed to send OTP.');
//     }
//   };

//   const handleOtpVerification = async (e) => {
//     e.preventDefault();
//     if (forgotPasswordData.newPassword !== forgotPasswordData.reEnterPassword) {
//       alert('New passwords do not match.');
//       return;
//     }

//     const apiUrl = 'https://ieltsgenai.com/reset_password';

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: forgotPasswordData.email,
//           otp: forgotPasswordData.otp,
//           new_password: forgotPasswordData.newPassword,
//         }),
//       });

//       if (response.ok) {
//         alert('Password reset successful.');
//         setShowForgotPassword(false);
//         setOtpSent(false);
//         navigate('/');
//       } else {
//         alert('OTP verification failed.');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       alert('Failed to reset password.');
//     }
//   };

//   return (
//     <div className="login-container">
//           <div id="stars"></div>
//            <div id="stars2"></div>
//            <div id="stars3"></div>
//            <div className="section">
//              <div className="container">
//                <div className="row full-height justify-content-center">
//                  <div className="col-12 text-center align-self-center py-5">
//                    <div className="section pb-5 pt-5 pt-sm-2 text-center">
//                      <h6 className="mb-0 pb-3">
//                        <span
//                         onClick={() => setIsSignUp(false)}
//                         className={!isSignUp ? 'active' : ''}
//                       >
//                         Log In
//                       </span>
//                       <span
//                         onClick={() => setIsSignUp(true)}
//                         className={isSignUp ? 'active' : ''}
//                       >
//                         Sign Up
//                       </span>
//                     </h6>
//                     <div className={`arrow ${isSignUp ? 'arrow-signup' : 'arrow-login'}`}></div>
//                     <div className="card-3d-wrap mx-auto">
//                       <div className={`card-3d-wrapper ${isSignUp ? 'isSignUp' : ''}`}>
//                         {!isSignUp ? (
//                           <div className="card-front">
//                             <div className="center-wrap">
//                               <div className="section text-center">
//                                 <h4 className="mb-4 pb-3">Log In</h4>
//                                 <form onSubmit={handleFormSubmit}>
//                                   <div className="form-group">
//                                     <input
//                                       type="email"
//                                       name="email"
//                                       className="form-style"
//                                       placeholder="Email"
//                                       value={formData.email}
//                                       onChange={handleInputChange}
//                                       required
//                                     />
//                                     <i className="input-icon">
//                                       <UilAt />
//                                     </i>
//                                   </div>
//                                   <div className="form-group mt-2">
//                                     <input
//                                       type="password"
//                                       name="password"
//                                       className="form-style"
//                                       placeholder="Password"
//                                       value={formData.password}
//                                       onChange={handleInputChange}
//                                       required
//                                     />
//                                     <i className="input-icon">
//                                       <UilLockAlt />
//                                     </i>
//                                   </div>
//                                   <button type="submit" className="btn mt-4">
//                                     Login
//                                   </button>
//                                   <div className="mt-3">
//                                     <span
//                                       className="forgot-password-link"
//                                       onClick={() => setShowForgotPassword(true)}
//                                     >
//                                       Forgot Password?
//                                     </span>
//                                   </div>
//                                 </form>
//                               </div>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="card-back">
//                             <div className="center-wrap">
//                               <div className="section text-center">
//                                 <h4 className="mb-3 pb-3">Sign Up</h4>
//                                 <form onSubmit={handleFormSubmit}>
//                                   <div className="form-group">
//                                     <input
//                                       type="text"
//                                       name="fullName"
//                                       className="form-style"
//                                       placeholder="User name"
//                                       value={formData.fullName}
//                                       onChange={handleInputChange}
//                                       required
//                                     />
//                                     <i className="input-icon">
//                                       <UilUser />
//                                     </i>
//                                   </div>
//                                   <div className="form-group mt-2">
//                                     <input
//                                       type="text"
//                                       name="firstName"
//                                       className="form-style"
//                                       placeholder="First Name"
//                                       value={formData.firstName}
//                                       onChange={handleInputChange}
//                                       required
//                                     />
//                                     <i className="input-icon">
//                                       <UilUser />
//                                     </i>
//                                   </div>
//                                   <div className="form-group mt-2">
//                                     <input
//                                       type="text"
//                                       name="lastName"
//                                       className="form-style"
//                                       placeholder="Last Name"
//                                       value={formData.lastName}
//                                       onChange={handleInputChange}
//                                       required
//                                     />
//                                     <i className="input-icon">
//                                       <UilUser />
//                                     </i>
//                                   </div>
//                                   <div className="form-group mt-2">
//                                     <input
//                                       type="email"
//                                       name="email"
//                                       className="form-style"
//                                       placeholder="Email"
//                                       value={formData.email}
//                                       onChange={handleInputChange}
//                                       required
//                                     />
//                                     <i className="input-icon">
//                                       <UilAt />
//                                     </i>
//                                   </div>
//                                   <div className="form-group mt-2">
//                                     <input
//                                       type="text"
//                                       name="phoneNumber"
//                                       className="form-style"
//                                       placeholder="Phone Number"
//                                       value={formData.phoneNumber}
//                                       onChange={handleInputChange}
//                                       required
//                                     />
//                                     <i className="input-icon">
//                                       <UilPhone />
//                                     </i>
//                                   </div>
//                                   <div className="form-group mt-2">
//                                     <input
//                                       type="password"
//                                       name="password"
//                                       className="form-style"
//                                       placeholder="Password"
//                                       value={formData.password}
//                                       onChange={handleInputChange}
//                                       required
//                                     />
//                                     <i className="input-icon">
//                                       <UilLockAlt />
//                                     </i>
//                                   </div>
//                                   <button type="submit" className="btn mt-4">
//                                     Sign Up
//                                   </button>
//                                 </form>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
    
//           {/* Forgot Password Modal */}
//           {showForgotPassword && (
//             <div className="forgot-password-modal">
//               <div className="modal-content">
//                 {!otpSent ? (
//                   <form onSubmit={handleForgotPasswordSubmit}>
//                     <h4>Forgot Password</h4>
//                     <div className="form-group">
//                       <input
//                         type="email"
//                         name="email"
//                         className="form-style"
//                         placeholder="Email"
//                         value={forgotPasswordData.email}
//                         onChange={handleForgotPasswordChange}
//                         required
//                       />
//                     </div>
//                     <button type="submit" className="btn mt-4">
//                       Send OTP
//                     </button>
//                     <button
//                       type="button"
//                       className="btn mt-4"
//                       onClick={() => setShowForgotPassword(false)}
//                     >
//                       Close
//                     </button>
//                   </form>
//                 ) : (
//                   <form onSubmit={handleOtpVerification}>
//                     <h4>Verify OTP</h4>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         name="otp"
//                         className="form-style"
//                         placeholder="Enter OTP"
//                         value={forgotPasswordData.otp}
//                         onChange={handleForgotPasswordChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group mt-2">
//                       <input
//                         type="password"
//                         name="newPassword"
//                         className="form-style"
//                         placeholder="New Password"
//                         value={forgotPasswordData.newPassword}
//                         onChange={handleForgotPasswordChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group mt-2">
//                       <input
//                         type="password"
//                         name="reEnterPassword"
//                         className="form-style"
//                         placeholder="Re-enter New Password"
//                         value={forgotPasswordData.reEnterPassword}
//                         onChange={handleForgotPasswordChange}
//                         required
//                       />
//                     </div>
//                     <button type="submit" className="btn mt-4">
//                       Reset Password
//                     </button>
//                     <button
//                       type="button"
//                       className="btn mt-4"
//                       onClick={() => setShowForgotPassword(false)}
//                     >
//                       Close
//                     </button>
//                   </form>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//   );
// };

// export default Login;




// import React, { useState, useEffect } from 'react';
// import { UilAt, UilLockAlt, UilUser, UilPhone } from '@iconscout/react-unicons';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.css';

// const Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
  
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullName: '',
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//   });
//   const [forgotPasswordData, setForgotPasswordData] = useState({
//     email: '',
//     otp: '',
//     newPassword: '',
//     reEnterPassword: '',
//   });

//   const navigate = useNavigate();
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleForgotPasswordChange = (e) => {
//     const { name, value } = e.target;
//     setForgotPasswordData({ ...forgotPasswordData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const apiUrl = isSignUp
//       ? 'https://ieltsgenai.com/register'
//       : 'https://ieltsgenai.com/login';

//     const payload = isSignUp
//       ? {
//           email: formData.email,
//           username: formData.fullName,
//           password: formData.password,
//           phone_number: formData.phoneNumber,
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//         }
//       : {
//           email: formData.email,
//           password: formData.password,
//         };

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const { user_id } = data;

//         const user = {
//           email: formData.email,
//           username: formData.fullName,
//         };

//         localStorage.setItem('user', JSON.stringify(user));
//         localStorage.setItem('user_id', user_id);
//         localStorage.setItem('isAuthenticated', 'true');

//         if (isSignUp) {
//           alert('Registered Successfully! Please log in.');
//           setRegistrationSuccess(true);
//         } else {
//           alert('Logged in Successfully!');
//           navigate('/home');
//         }
//       } else if (response.status === 400) {
//         const errorData = await response.json();
//         if (isSignUp) {
//           alert(errorData.message || 'Email or username already exists');
//         } else {
//           alert(errorData.message || 'Login failed. Please check your credentials.');
//         }
//       } else if (response.status === 500) {
//         if (isSignUp) {
//           alert('Registration failed. Please try again later.');
//         } else {
//           alert('Login failed. Please try again later.');
//         }
//       } else {
//         alert('An unexpected error occurred. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       alert(isSignUp ? 'Registration Failed' : 'Login Failed');
//     }
//   };

//   useEffect(() => {
//     if (registrationSuccess) {
//       setIsSignUp(false);
//       setFormData({
//         email: '',
//         password: '',
//         fullName: '',
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//       });
//       setRegistrationSuccess(false);
//     }
//   }, [registrationSuccess]);

//   const handleForgotPasswordSubmit = async (e) => {
//     e.preventDefault();
//     const apiUrl = 'https://ieltsgenai.com/forgot_password';

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: forgotPasswordData.email }),
//       });

//       if (response.ok) {
//         alert('OTP sent to your email.');
//         setOtpSent(true);
//       } else {
//         alert('Email not found or failed to send OTP.');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       alert('Failed to send OTP.');
//     }
//   };

//   const handleOtpVerification = async (e) => {
//     e.preventDefault();
//     if (forgotPasswordData.newPassword !== forgotPasswordData.reEnterPassword) {
//       alert('New passwords do not match.');
//       return;
//     }

//     const apiUrl = 'https://ieltsgenai.com/reset_password';

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: forgotPasswordData.email,
//           otp: forgotPasswordData.otp,
//           new_password: forgotPasswordData.newPassword,
//         }),
//       });

//       if (response.ok) {
//         alert('Password reset successful.');
//         setShowForgotPassword(false);
//         setOtpSent(false);
//         navigate('/');
//       } else {
//         alert('OTP verification failed.');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       alert('Failed to reset password.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div id="stars"></div>
//       <div id="stars2"></div>
//       <div id="stars3"></div>
//       <div className="section">
//         <div className="container">
//           <div className="row full-height justify-content-center">
//             <div className="col-12 text-center align-self-center py-5">
//               <div className="section pb-5 pt-5 pt-sm-2 text-center">
//                 <h6 className="mb-0 pb-3">
//                   <span
//                     onClick={() => setIsSignUp(false)}
//                     className={!isSignUp ? 'active' : ''}
//                   >
//                     Log In
//                   </span>
//                   <span
//                     onClick={() => setIsSignUp(true)}
//                     className={isSignUp ? 'active' : ''}
//                   >
//                     Sign Up
//                   </span>
//                 </h6>
//                 <div className={`arrow ${isSignUp ? 'arrow-signup' : 'arrow-login'}`}></div>
//                 <div className="card-3d-wrap mx-auto">
//                   <div className={`card-3d-wrapper ${isSignUp ? 'isSignUp' : ''}`}>
//                     {!isSignUp ? (
//                       <div className="card-front">
//                         <div className="center-wrap">
//                           <div className="section text-center">
//                             <h4 className="mb-4 pb-3">Log In</h4>
//                             <form onSubmit={handleFormSubmit}>
//                               <div className="form-group">
//                                 <input
//                                   type="email"
//                                   name="email"
//                                   className="form-style"
//                                   placeholder="Email"
//                                   value={formData.email}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                                 <i className="input-icon">
//                                   <UilAt />
//                                 </i>
//                               </div>
//                               <div className="form-group mt-2">
//                                 <input
//                                   type="password"
//                                   name="password"
//                                   className="form-style"
//                                   placeholder="Password"
//                                   value={formData.password}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                                 <i className="input-icon">
//                                   <UilLockAlt />
//                                 </i>
//                               </div>
//                               <button type="submit" className="btn mt-4">
//                                 Login
//                               </button>
//                               <div className="mt-3">
//                                 <span
//                                   className="forgot-password-link"
//                                   onClick={() => setShowForgotPassword(true)}
//                                 >
//                                   Forgot Password?
//                                 </span>
//                               </div>
//                             </form>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="card-back">
//                         <div className="center-wrap">
//                           <div className="section text-center">
//                             <h4 className="mb-3 pb-3">Sign Up</h4>
//                             <form onSubmit={handleFormSubmit}>
//                               <div className="form-group">
//                                 <input
//                                   type="text"
//                                   name="fullName"
//                                   className="form-style"
//                                   placeholder="User name"
//                                   value={formData.fullName}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                                 <i className="input-icon">
//                                   <UilUser />
//                                 </i>
//                               </div>
//                               <div className="form-group mt-2">
//                                 <input
//                                   type="text"
//                                   name="firstName"
//                                   className="form-style"
//                                   placeholder="First Name"
//                                   value={formData.firstName}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                                 <i className="input-icon">
//                                   <UilUser />
//                                 </i>
//                               </div>
//                               <div className="form-group mt-2">
//                                 <input
//                                   type="text"
//                                   name="lastName"
//                                   className="form-style"
//                                   placeholder="Last Name"
//                                   value={formData.lastName}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                                 <i className="input-icon">
//                                   <UilUser />
//                                 </i>
//                               </div>
//                               <div className="form-group mt-2">
//                                 <input
//                                   type="email"
//                                   name="email"
//                                   className="form-style"
//                                   placeholder="Email"
//                                   value={formData.email}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                                 <i className="input-icon">
//                                   <UilAt />
//                                 </i>
//                               </div>
//                               <div className="form-group mt-2">
//                                 <input
//                                   type="password"
//                                   name="password"
//                                   className="form-style"
//                                   placeholder="Password"
//                                   value={formData.password}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                                 <i className="input-icon">
//                                   <UilLockAlt />
//                                 </i>
//                               </div>
//                               <div className="form-group mt-2">
//                                 <input
//                                   type="text"
//                                   name="phoneNumber"
//                                   className="form-style"
//                                   placeholder="Phone Number"
//                                   value={formData.phoneNumber}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                                 <i className="input-icon">
//                                   <UilPhone />
//                                 </i>
//                               </div>
//                               <button type="submit" className="btn mt-4">
//                                 Register
//                               </button>
//                             </form>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showForgotPassword && (
//         <div className="forgot-password-container">
//           <h5>Reset Password</h5>
//           <form onSubmit={handleForgotPasswordSubmit}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={forgotPasswordData.email}
//               onChange={handleForgotPasswordChange}
//               required
//             />
//             <button type="submit">Send OTP</button>
//           </form>
//           {otpSent && (
//             <form onSubmit={handleOtpVerification}>
//               <input
//                 type="text"
//                 name="otp"
//                 placeholder="Enter OTP"
//                 value={forgotPasswordData.otp}
//                 onChange={handleForgotPasswordChange}
//                 required
//               />
//               <input
//                 type="password"
//                 name="newPassword"
//                 placeholder="New Password"
//                 value={forgotPasswordData.newPassword}
//                 onChange={handleForgotPasswordChange}
//                 required
//               />
//               <input
//                 type="password"
//                 name="reEnterPassword"
//                 placeholder="Re-enter New Password"
//                 value={forgotPasswordData.reEnterPassword}
//                 onChange={handleForgotPasswordChange}
//                 required
//               />
//               <button type="submit">Reset Password</button>
//             </form>
//           )}
//           <button onClick={() => setShowForgotPassword(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;





import React, { useState, useEffect } from 'react';
import { UilAt, UilLockAlt, UilUser, UilPhone, UilEyeSlash, UilEye } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import phone input styles

import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles



const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  // const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
 
  useEffect(() => {
    // Set up a listener for the popstate event (triggered when the back button is pressed)
    const handleBackNavigation = (event) => {
      event.preventDefault();
      navigate('/', { replace: true }); // Redirect to home page
    };
 
    // Listen for the "popstate" event, which fires on back navigation
    window.addEventListener('popstate', handleBackNavigation);
 
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [navigate]);


  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password); // Check for uppercase letter
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check for special character

    return password.length >= minLength && hasUppercase && hasSpecialChar;
  };

  // New state to manage button disabled status
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    reEnterPassword: '',
  });

  // const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'password' && error) {
      setError(''); // Clear error while typing
    }

    if ((name === 'firstName' || name === 'lastName') && !/^[a-zA-Z\s]*$/.test(value)) {
      toast.error('Only alphabetic characters are allowed in Name fields', { position: 'top-center' });
      return;
    }

    if (name === 'password') {
      // Validate the password only when length reaches 8
      if (value.length >= 8) {
        if (!validatePassword(value)) {
          setError('Password must be at least 8 characters long, include an uppercase letter, and contain a special character.');
        } else {
          setError(''); // Clear the error if validation passes
        }
      } else {
        setError(''); // Clear error for lengths less than 8
      }
    }
    setFormData({ ...formData, [name]: value });
  };
  const handlePasswordBlur = () => {
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long, include an uppercase letter, and contain a special character.');
    }
  };


  const handlePhoneNumberChange = (phone) => {


    setFormData({
      ...formData,
      phoneNumber: phone
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
    
  };



  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData({ ...forgotPasswordData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const apiUrl = isSignUp
      ? 'https://ieltsgenai.com/register'
      : 'https://ieltsgenai.com/login';

    const payload = isSignUp
      ? {
        email: formData.email,
        username: formData.fullName,
        password: formData.password,
        phone_number: formData.phoneNumber,
        first_name: formData.firstName,
        last_name: formData.lastName,
      }
      : {
        email: formData.email,
        password: formData.password,
      };

      setLoading(true);

    // const processingToastId = toast.info('Processing your request...', { position: 'top-center', autoClose: 1000 });
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const { user_id } = data;

        const user = {
          email: formData.email,
          username: formData.fullName,
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('isAuthenticated', 'true');

        if (isSignUp) {
          toast.success('Registered Successfully! Please log in.', { position: 'top-center' });
          setRegistrationSuccess(true);
        } else {
          toast.success('Logged in Successfully!', { position: 'top-center' });
          navigate('/home');
        }
      } else if (response.status === 400) {
        const errorData = await response.json();
        if (isSignUp) {
          toast.error(errorData.message || 'Email or username already exists', { position: 'top-center' });
        } else {
          toast.error(errorData.message || 'Login failed. Please check your credentials.', { position: 'top-center' });
        }
      } else if (response.status === 500) {
        if (isSignUp) {
          toast.error('Registration failed. Please try again later.', { position: 'top-center' });
        } else {
          toast.error('Login failed. Please try again later.', { position: 'top-center' });
        }
      } else {
        toast.error('Active login session found please logout your previous devices.', { position: 'top-center' });
      }

    } catch (error) {
      console.error('Error:', error.message);
      toast.error(isSignUp ? 'Registration Failed' : 'Login Failed', { position: 'top-center' });
    }
    finally {
      setLoading(false); // Re-enable the button if necessary (optional)
    }

  };

  useEffect(() => {
    if (registrationSuccess) {
      setIsSignUp(false);
      setFormData({
        email: '',
        password: '',
        fullName: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      });
      setRegistrationSuccess(false);
    }
  }, [registrationSuccess]);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'https://ieltsgenai.com/forgot_password';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotPasswordData.email }),
      });

      if (response.ok) {
        toast.info('OTP sent to your email.', { position: 'top-center' });
        setOtpSent(true);
      } else {
        toast.error('Email not found or failed to send OTP.', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Failed to send OTP.', { position: 'top-center' });
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (forgotPasswordData.newPassword !== forgotPasswordData.reEnterPassword) {
      toast.error('New passwords do not match.', { position: 'top-center' });
      return;
    }

    const apiUrl = 'https://ieltsgenai.com/reset_password';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: forgotPasswordData.email,
          otp: forgotPasswordData.otp,
          new_password: forgotPasswordData.newPassword,
        }),
      });

      if (response.ok) {
        toast.success('Password reset successful.', { position: 'top-center', autoClose: 3000 })
        setShowForgotPassword(false);
        setOtpSent(false);
        navigate('/');
      } else {
        toast.error('OTP verification failed.', { position: 'top-center', autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Failed to reset password.', { position: 'top-center', autoClose: 3000 });
    }
  };

  return (
    <div className="login-container">

      <ToastContainer />
      <div id=""></div>
      <div id=""></div>
      <div id=""></div>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span
                    onClick={() => setIsSignUp(false)}
                    className={!isSignUp ? 'active' : ''}
                  >
                    Login
                  </span>
                  <span
                    onClick={() => setIsSignUp(true)}
                    className={isSignUp ? 'active' : ''}
                  >
                    Sign Up
                  </span>
                </h6>
                <div className={`arrow ${isSignUp ? 'arrow-signup' : 'arrow-login'}`}></div>
                <div className="card-3d-wrap mx-auto">
                  <div className={`card-3d-wrapper ${isSignUp ? 'isSignUp' : ''}`}>
                    {!isSignUp ? (
                      <div className="card-front">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4 className="mb-4 pb-3">Login</h4>
                            <form onSubmit={handleFormSubmit}>
                              <div className="form-group">
                                <input
                                  type="email"
                                  name="email"
                                  className="form-style"
                                  placeholder="Email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required

                                />
                                <i className="input-icon">
                                  <UilAt />
                                </i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type={passwordVisible ? "text" : "password"}

                                  name="password"
                                  className="form-style"
                                  placeholder="Password"
                                  value={formData.password}
                                  onChange={handleInputChange}
                                  required
                                  minLength="8"
                                  
                                  pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$"
                                  title="Password must be at least 8 characters long, contain one uppercase letter, and one special character."



                                />
                                <i className="input-icon">
                                  <UilLockAlt />
                                </i>
                                <span
                                  onClick={togglePasswordVisibility}
                                  style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',

                                    // zIndex: 1,
                                  }}
                                >
                                  {passwordVisible ? <UilEye /> : < UilEyeSlash />}

                                </span>

                              </div>
                              <button type="submit" className={`btn mt-4 ${loading ? 'loading-style-btn' : ''}`}  disabled={loading}>
                              {loading ? 'Processing...' : 'Sign Up'}
                              </button>
                              <div className="mt-3">
                                <span
                                  className="forgot-password-link"
                                  onClick={() => setShowForgotPassword(true)}
                                >
                                  Forgot Password?
                                </span>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="card-back">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4 className="mb-3 pb-3">Sign Up</h4>
                            <form onSubmit={handleFormSubmit}>
                              <div className="form-group">
                                <input
                                      type="text"
                                      name="fullName"
                                      className="form-style"
                                      placeholder="User name"
                                      value={formData.fullName}
                                      onChange={handleInputChange}
                                      required
                                    />
                                <i className="input-icon">
                                  <UilUser />
                                </i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="text"
                                  name="firstName"
                                  className="form-style"
                                  placeholder="First Name"
                                  value={formData.firstName}
                                  maxLength={48}
                                  onChange={handleInputChange}
                                  required
                                />
                                <i className="input-icon">
                                  <UilUser />
                                </i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="text"
                                  name="lastName"
                                  className="form-style"
                                  placeholder="Last Name"
                                  value={formData.lastName}
                                  maxLength={48}
                                  onChange={handleInputChange}
                                  required
                                />
                                <i className="input-icon">
                                  <UilUser />
                                </i>
                              </div>
                             
                              {/* <div className="form-group mt-2">
                                <input
                                  type="text"
                                  name="phoneNumber"
                                 className="form-style"
                                  placeholder="Phone Number"
                                  value={formData.phoneNumber}
                                  onChange={handleInputChange}
                                  required
                                />
                                <i className="input-icon">
                                  <UilPhone />
                                </i>
                              </div> */}
                              <div className="form-group mt-2">

                                <PhoneInput
                                  country={'us'}
                                  value={formData.phoneNumber} // Ensure the state variable matches the new format
                                  onChange={handlePhoneNumberChange}

                                  enableSearch={true}
                                  className='form-style form-style-phone' // Combine your existing class with any new class
                                  placeholder="Phone Number"

                                />
                                <i className="input-icon">
                                  <UilPhone />
                                </i>

                              </div>

                              <div className="form-group mt-2">
                                <input
                                  type="email"
                                  name="email"
                                  className="form-style"
                                  placeholder="Email"
                                  maxLength={50} // Adjust max length as needed
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required
                                />
                                <i className="input-icon">
                                  <UilAt />
                                </i>
                              </div>

                              <div className="form-group mt-2" style={{ position: "relative" }}>
                                <input
                                  type={passwordVisible ? "text" : "password"}
                                  name="password"
                                  className="form-style"
                                  placeholder="Password"

                                  value={formData.password}
                                  onChange={handleInputChange}
                                  onBlur={handlePasswordBlur} // Validate on blur
                                  required
                                  minLength="8"
                                  
                                  pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$"
                                  title="Password must be at least 8 characters long, contain one uppercase letter, and one special character."

                                />
                                <i className="input-icon">
                                  <UilLockAlt />
                                </i>
                                <span
                                  onClick={togglePasswordVisibility}
                                  className='eye-icon'

                                  style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    zIndex: 1,
                                  }}
                                >
                                  {passwordVisible ? <UilEye /> : < UilEyeSlash />}

                                </span>


                              </div>
                              {error && (
                                <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
                              )}


                              <button type="submit" className={`btn mt-4 ${loading ? 'loading-style-btn' : ''}`}  disabled={loading}>
                              {loading ? 'Processing...' : 'Sign Up'}
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            {!otpSent ? (
              <form onSubmit={handleForgotPasswordSubmit}>
                <h4>Forgot Password</h4>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-style"
                    placeholder="Email"
                    value={forgotPasswordData.email}
                    onChange={handleForgotPasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="btn mt-4">
                  Send OTP
                </button>
                <button
                  type="button"
                  className="btn mt-4"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Close
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpVerification}>
                <h4>Verify OTP</h4>
                <div className="form-group">
                  <input
                    type="text"
                    name="otp"
                    className="form-style"
                    placeholder="Enter OTP"
                    value={forgotPasswordData.otp}
                    onChange={handleForgotPasswordChange}
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="password"
                    name="newPassword"
                    className="form-style"
                    placeholder="New Password"
                    value={forgotPasswordData.newPassword}
                    onChange={handleForgotPasswordChange}
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="password"
                    name="reEnterPassword"
                    className="form-style"
                    placeholder="Re-enter New Password"
                    value={forgotPasswordData.reEnterPassword}
                    onChange={handleForgotPasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="btn mt-4">
                  Reset Password
                </button>
                <button
                  type="button"
                  className="btn mt-4"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Close
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
































