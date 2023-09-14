import { NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function NavbarApp({ isLoggedIn }){
    const logout = () => {
        console.log('Logging out')
    }
    //Code logout function here

    return (
        <header> 
            <Navbar bg="dark" variant='dark'>
                <Container>
                    <NavLink to='/journal'> Journal </NavLink>
                    <NavLink to='/mood'> Mood Tracking </NavLink> 
                    <NavLink to="/meditate"> Meditate </NavLink> 
                    {isLoggedIn ? <NavLink to='/account'> Manage Account </NavLink> : null}
                    {isLoggedIn ? <Button onClick={logout} variant='secondary'> Logout </Button> : <NavLink to='/login'> Login/Register </NavLink>}
                </Container>
            </Navbar>
        </header>
    )
}

export default NavbarApp;