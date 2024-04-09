import React, { useState } from 'react';
import './Signup.css'; // Import CSS file for styling

const Signup = () => {
    const [isSignup, setIsSignup] = useState(true); // State to toggle between signup and signin

    const toggleSignup = () => {
        setIsSignup(!isSignup); // Toggle between signup and signin
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your signup or signin logic here
        isSignup ? callsignup() : signin();
    }; 
    const callsignup=()=>{
        console.log( " call  signuo function");

    }
    const signin=()=>{
        console.log (" call signin function");
    }
    return (
        <div className="signup-container">
            <h1>{isSignup ? 'Signup' : 'Signin'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username: 
                    <input type="text" name="username" />
                </label>
                <label>
                    Password: 
                    <input type="password" name="password" />
                </label>
                <button type="submit">{isSignup ? 'Signup' : 'Signin'}</button>
            </form>
            <button onClick={toggleSignup}>{isSignup ? 'Switch to Signin' : 'Switch to Signup'}</button>
        </div>
    );
};

export default Signup;
