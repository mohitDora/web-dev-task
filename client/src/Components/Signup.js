import React, { useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom'; 


import { TextField, Button, Typography, Grid, Container } from '@mui/material';

export default function SignupUp() {
  const [signupData, setSignupData] = useState({ email: '', pwd: '', cpwd: '' });
  let navigate = useNavigate(); // Corrected hook name

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, pwd, cpwd } = signupData;
    const res = await fetch("https://backend-temp-jcrb.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, pwd,cpwd
      })
    })

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid registration");
    }
    else {
      window.alert("Registration successful");
      console.log(res)
      navigate('/courses') // Corrected navigation function usage
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <form method='POST' onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>Sign up</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              name="email"
              label="Email"
              fullWidth
              value={signupData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="pwd"
              label="Password"
              fullWidth
              value={signupData.pwd}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="cpwd"
              label="confirm Password"
              fullWidth
              value={signupData.cpwd}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: "2rem", fontSize: "1.6rem" }}>Sign up</Button>
        <Typography sx={{ marginTop: "2rem", fontSize: "1.4rem" }}>already have an account, <Link to="/signin"> Login here</Link></Typography>
      </form>
    </Container>
  );
}
