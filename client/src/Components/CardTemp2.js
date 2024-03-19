import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Box } from '@mui/material';

export default function CardTemp({ name, desc, instructor, duration,amount, level,id }) {
  
    const handleSubmit = async (id) => {
       console.log(name)
        
        const res = await fetch(`https://web-dev-task-eight.vercel.app/data/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
           id
          })
        })
    
        const data2 = await res.json();
        if (res.status === 422 || !data2) {
          window.alert("Invalid");
        }
        else {
          window.alert("deleted successfully");
          console.log(res)
          window.location.reload();
           // Corrected navigation function usage
        }
      };
  return (

    


    <Card elevation={0} sx={{ maxWidth: "50rem",border:"0.1rem solid rgb(50,50,50)" }}>
      

        <CardContent>
          <Typography gutterBottom component="div" sx={{ fontSize: "3.2rem" }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: "1.8rem" }} color="text.secondary">
            {desc}
          </Typography>
          <Box sx={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
            <Box>
              <Typography sx={{fontSize:"1.6rem"}}>Instructor</Typography>
              <Typography sx={{fontSize:"1.4rem"}} color="text.secondary">{instructor}</Typography>
            </Box>
            <Box>
              <Typography sx={{fontSize:"1.6rem"}}>duration</Typography>
              <Typography sx={{fontSize:"1.4rem"}}color="text.secondary">{duration}</Typography>
            </Box>
            <Box>
              <Typography sx={{fontSize:"1.6rem"}}>level</Typography>
              <Typography sx={{fontSize:"1.4rem"}}color="text.secondary">{level}</Typography>
            </Box>
            <Box>
              <Typography sx={{fontSize:"1.6rem"}}>Price</Typography>
              <Typography sx={{fontSize:"1.4rem"}}color="text.secondary">Rs {amount}</Typography>
            </Box>
          </Box>
        </CardContent>
    
      <CardActions>
        <Button size="large" color="primary" sx={{fontSize:"1.4rem"}} onClick={()=>handleSubmit(id)}>
          delete
        </Button>
      </CardActions>
    </Card>
  );
}