import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseuri } from "../../baseuri/baseuri";

const SignUp = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending user data with 'fullName' instead of 'name' to match the backend model
      const response = await axios.post(`${baseuri}/api/auth/signup`, {
        fullName: userData.name,  // Change 'name' to 'fullName' here
        email: userData.email,
        password: userData.password
      });

      // Redirect to the SignIn page upon successful sign-up
      navigate("/signin");  
    } catch (error) {
      // Enhanced error handling
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Sign-up failed. Please try again.";
      setError(errorMessage);  // Set error message in case of failure
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" textAlign="center" mb={2}>Sign Up</Typography>
      
      {/* Displaying error message if there's any */}
      {error && <Typography color="error" mb={2}>{error}</Typography>}

      <form onSubmit={handleSubmit}>
        {/* Name input field */}
        <TextField 
          fullWidth 
          name="name" 
          label="Name" 
          margin="normal" 
          onChange={handleChange} 
          required 
        />
        
        {/* Email input field */}
        <TextField 
          fullWidth 
          name="email" 
          label="Email" 
          type="email" 
          margin="normal" 
          onChange={handleChange} 
          required 
        />
        
        {/* Password input field */}
        <TextField 
          fullWidth 
          name="password" 
          label="Password" 
          type="password" 
          margin="normal" 
          onChange={handleChange} 
          required 
        />
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>

      {/* Link to navigate to SignIn page */}
      <Typography textAlign="center" mt={2}>
        Already have an account?{" "}
        <Button onClick={() => navigate("/signin")} sx={{ textTransform: "none" }}>
          Sign In
        </Button>
      </Typography>
    </Box>
  );
};

export default SignUp;
