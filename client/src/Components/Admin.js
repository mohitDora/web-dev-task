import React, { useEffect, useState } from 'react'
import CardTemp2 from './CardTemp2'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Box } from '@mui/material'

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
    <CardTemp2 key={index} id={item._id} name={item.name} desc={item.description} instructor={item.instructor}  level={item.level} duration={item.duration} amount={item.amount}></CardTemp2>
        )
    })

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        instructor: '',
        duration: '',
        level: '',
        amount: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      


      const handleSubmit = async (e) => {
        e.preventDefault();
        const { name,description,instructor,duration,level,amount } = formData;
        const res = await fetch("https://backend-temp-jcrb.onrender.com/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,description,instructor,duration,level,amount
          })
        })
    
        const data2 = await res.json();
        if (res.status === 422 || !data2) {
          window.alert("Invalid");
        }
        else {
          window.alert("added successfully");
          console.log(res)
          data();
           // Corrected navigation function usage
        }
      };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Instructor"
        name="instructor"
        value={formData.instructor}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Duration"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Level</InputLabel>
        <Select
          name="level"
          value={formData.level}
          onChange={handleChange}
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
          <MenuItem value="Beginner to Intermediate">Beginner to Intermediate</MenuItem>
          <MenuItem value="Intermediate to Advanced">Intermediate to Advanced</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    <Box sx={{display:"flex",flexWrap:"wrap",gap:"2rem",justifyContent:"center",marginBottom:"5rem"}}>
    {cards}
    </Box>
    
    </>
  )
}

export default Courses