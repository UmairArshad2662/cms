import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { baseuri } from "../../baseuri/baseuri";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      // Corrected base URI and added the leading slash
      const response = await axios.post(`${baseuri}/api/auth/login`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess("Login successful. Redirecting...");
      setError("");

      // Setting the cookies on successful login
      Cookies.set("token", response.data.token, { expires: 7 });
      Cookies.set("role", response.data.role, { expires: 7 });
      Cookies.set("isPaid", response.data.isPaid, { expires: 7 });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/"); // Redirect to dashboard or homepage
      }, 2000);
    } catch (err) {
      // Improved error handling
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Internal server error";
      setError(errorMessage);  // Show error message if login fails
    }
  };

  return (
    <Container maxWidth="xs">
      <Box>
        <Typography variant="h4" align="center">Login</Typography>

        {/* Display error or success messages */}
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>

        {/* Redirect link to SignUp page */}
        <Typography align="center" mt={2}>
          Don't have an account? <Button onClick={() => navigate("/signup")}>Sign Up</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
