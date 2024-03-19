import React, { useEffect, useState } from 'react'
import CardTemp from './CardTemp'

import { Box } from '@mui/material'
import Navbar from './Navbar'

function Courses() {

  const [courses,setcourses]=useState([])

  const mostpopURL="https://backend-temp-jcrb.onrender.com/data"
    const data=async()=>{
        
        let response = await fetch(mostpopURL);
        let data = await response.json();
        setcourses(data);
      
    }
useEffect(()=>{
  data();
},[])
    const cards=courses?.map((item,index)=>{
        return(
    <CardTemp key={index} name={item.name} desc={item.description} instructor={item.instructor}  level={item.level} duration={item.duration} amount={item.amount}></CardTemp>
        )
    })

  return (
    <>
    <Navbar></Navbar>
    <Box sx={{display:"flex",flexWrap:"wrap",gap:"2rem",justifyContent:"center",marginBottom:"5rem" ,padding:"2rem"}}>
    {cards}
    </Box>
    
    </>
  )
}

export default Courses