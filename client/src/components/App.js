import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import CalendarApp from "./CalendarApp";
import NavbarApp from "./NavbarApp"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"; 
import ManageAccount from './ManageAccount';
import JournalApp from './JournalApp';
import MeditationApp from './MeditationApp';


export default function App() {
  const UserContext = createContext()
  const [user, setUser] = useState('') 


  useEffect(() => {
    fetch('http://127.0.0.1:5555/check_session')
      .then((res) => {
        if (res.status === 200) {
          res.json()
          .then((res) => setUser(res))
        }
      })
  }, [])

  return (
      <div>
        <UserContext.Provider value={user}> 
            <NavbarApp user={user} setUser={setUser}/>
          <Routes>
            <Route exact path='/' element={<LoginForm />}/> 
            <Route exact path='/journal'element={<JournalApp user={user} />}/> 
            <Route exact path='/mood' element={<CalendarApp user={user} />}/> 
            <Route exact path='/meditate' element={<MeditationApp />}/>
            <Route exact path='/account' element={<ManageAccount user={user} setUser={setUser} />}/>  
            <Route exact path='/login' element={<LoginForm user={user} setUser={setUser} />}/>  
            <Route exact path='/register/' element={<RegisterForm user={user} setUser={setUser} />}/>
          </Routes>
        </UserContext.Provider>
      </div>
  )
}
