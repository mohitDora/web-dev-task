import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Box } from '@mui/material';
import axios from "axios"

export default function CardTemp({ name, desc, instructor, duration, level,amount }) {
  const checkoutHandler = async (amount) => {
    try {
      const {data:{key}}=await axios.get("https://backend-temp-jcrb.onrender.com/pay/key")
    const {data:{order}}=await axios.post("https://backend-temp-jcrb.onrender.com/pay/checkout",{amount})
    console.log(window);
  
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Sinmplyjs",
        description: "Razorpay tutorial",
        image: "https://avatars.githubusercontent.com/u/96648429?s=96&v=4",
        order_id: order.id,
        callback_url: "https://backend-temp-jcrb.onrender.com/pay/verification",
        prefill: {
          name: "Killer",
          email: "alex@gmail.com",
          contact: "1234567890",
        },
        notes: {
          address: "razorapy official",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      console.log(window);
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Checkout error:", error);
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
        <Button size="large" color="primary" sx={{fontSize:"1.4rem"}} onClick={()=>checkoutHandler(amount)}>
          Enroll Now
        </Button>
      </CardActions>
    </Card>
  );
}