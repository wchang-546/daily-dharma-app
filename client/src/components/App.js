import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CalendarApp from "./CalendarApp";
import NavbarApp from "./NavbarApp"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"; 
import ManageAccount from './ManageAccount';
import JournalApp from './JournalApp';
import MeditationApp from './MeditationApp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
  <div> 
    <NavbarApp /> 
    <Routes>
      <Route exact path='/' element={<LoginForm />}/> 
      <Route exact path='/journal'element={<JournalApp />}/> 
      <Route exact path='/calendar' element={<CalendarApp />}/> 
      <Route exact path='/meditate' element={<MeditationApp />}/>
      <Route exact path='/account' element={<ManageAccount />}/>  
      <Route exact path='/login' element={<LoginForm />}/>  
      <Route exact path='/register/' element={<RegisterForm />}/>
    </Routes>
  </div>
  )
}

export default App;
