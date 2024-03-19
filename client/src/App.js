import Account from './Components/Account';
import { useEffect } from 'react';
import Courses from './Components/Courses';
import Signin from "./Components/Signin"
import Signup from "./Components/Signup"
import LandingPage from './Components/LandingPage';
import { Routes,Route,useNavigate } from 'react-router-dom';

import Admin from './Components/Admin';


function App() {
  const navigate=useNavigate();
  const ready=async()=>{
    try {
      const res=await fetch("https://web-dev-task-eight.vercel.app/validate",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
     
      console.log(res.status)
      if(!res.status===200){
        navigate("/")
        
        
      }
     
  
    } catch (error) {
      console.log(error);
      navigate("/")
    }
  }
  useEffect(()=>{
    ready();
    
  },[])
  return (
    <>
    
      <Routes>
      <Route path="/" element={<LandingPage />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        
        <Route path="/account" element={<Account />}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>

      </Routes>
   
      
    </>
  );
}

export default App;
