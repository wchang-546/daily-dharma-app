import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CalendarApp from "./CalendarApp";
import NavbarApp from "./NavbarApp"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"; 
import ManageAccount from './ManageAccount';
import JournalApp from './JournalApp';
import MeditationApp from './MeditationApp';


function App() {
  const [user, setUser] = useState('') 

  useEffect(() => {
    fetch('http://127.0.0.1:5555/check_session')
      .then((res) => {
        if (res.status === 200) {
          res.json()
          .then((user) => setUser(user))
        }
      })
  }, [])

  return (
      <div> 
            <NavbarApp user={user} setUser={setUser}/>
          <Routes>
            <Route exact path='/' element={<LoginForm />}/> 
            <Route exact path='/journal'element={<JournalApp />}/> 
            <Route exact path='/mood' element={<CalendarApp />}/> 
            <Route exact path='/meditate' element={<MeditationApp />}/>
            <Route exact path='/account' element={<ManageAccount user={user} setUser={setUser} />}/>  
            <Route exact path='/login' element={<LoginForm user={user} setUser={setUser} />}/>  
            <Route exact path='/register/' element={<RegisterForm user={user} setUser={setUser} />}/>
          </Routes>
      </div>
  )
}

export default App;