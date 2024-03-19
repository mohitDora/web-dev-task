import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';

export default function Signin() {
    const [signinData, setSigninData] = useState({ email: '', pwd: '' });
    let navigate = useNavigate();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSigninData({ ...signinData, [name]: value });
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
    const { email, pwd } = signinData;
    const res = await fetch("https://backend-temp-jcrb.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, pwd
      })
    })

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid credentials");
      console.log(res)
    }
    else {
      window.alert("Login successful");
      navigate('/courses') // Corrected navigation function usage
    }
  };
  
    return (
        <Container maxWidth="xs" sx={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh"}}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>Sign In</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              name="email"
              label="Email"
              fullWidth
              value={signinData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="pwd"
              label="Password"
              fullWidth
              value={signinData.pwd}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginTop:"2rem",fontSize:"1.6rem"}}>Sign In</Button>
        <Typography sx={{marginTop:"2rem",fontSize:"1.4rem"}}>not have an account, <Link to="/signup"> Register here</Link></Typography>
      </form>
    </Container>
    );
  }
