import { Box, IconButton,Typography } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Box sx={{display:"flex",margin:"5rem",backgroundColor:"rgba( 31, 38, 135, 0.07 )",padding:"2.5rem 4rem",borderRadius:"5rem", justifyContent:"space-between",alignItems:"center"}}>
        <Typography sx={{fontSize:"2.4rem"}}>Coursera</Typography>
        <Link to="/account">
        <IconButton>
            <AccountCircleIcon sx={{fontSize:"3.2rem"}}></AccountCircleIcon>
        </IconButton>
        </Link>
    </Box>
  )
}

export default Navbar