import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function NavbarApp({ user, setUser }){

    const handleLogout = () => {
        fetch("/logout", {
          method: "DELETE",
        })
        .then((res) => {
            if (res.ok) {
                setUser('')
            }
        })
      }

    return (
        <header> 
            <Navbar bg="dark" variant='light'>
                <Container>
                    <NavLink to='/journal'> Journal </NavLink>
                    <NavLink to='/mood'> Mood Tracking </NavLink> 
                    <NavLink to="/meditate"> Meditate </NavLink> 
                    {user ? <NavLink to='/account'> Manage Account </NavLink> : null}
                    {user ? <Button onClick={handleLogout} variant='secondary'> Logout </Button> : <NavLink to='/login'> Login/Register </NavLink>}
                </Container>
            </Navbar>
        </header>
    )
}

export default NavbarApp;