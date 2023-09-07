import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import CalendarApp from "./CalendarApp";
import NavbarApp from "./Navbar"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"; 
import ManageAccount from './ManageAccount';
import JournalApp from './JournalApp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
  <div> 
    <NavbarApp /> 
    <Routes>
      <Route exact path='/' element={null}/> 
      <Route exact path='/journal'element={<JournalApp />}/> 
      <Route exact path='/calendar' element={<CalendarApp />}/> 
      <Route exact path='/meditate' element={null}/>
      <Route exact path='/account' element={<ManageAccount />}/>  
      <Route exact path='/login' element={<LoginForm />}/>  
      <Route exact path='/register/' element={<RegisterForm />}/>
    </Routes>
  </div>
  )
}

export default App;
