import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function RegisterForm({ user, setUser }){
    const [isRegistered, setIsRegistered] = useState(false);
    
    const formSchema = yup.object().shape({
      username: yup.string().required("Must enter a username"),
      password: yup.string().required("Must enter a password"),
    })
    
    const formik = useFormik({
      initialValues: {
        username: "",
        password: "", 
      },
      validationSchema: formSchema, 
      onSubmit: (values) => {
        fetch('http://127.0.0.1:5555/register', {
          method: 'POST', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null, 2),
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.hasOwnProperty("Error")){ 
            alert(res.Error)
          } else if (res.status == 200) {
            console.log(res)
            alert(res.username)
            ((res) => setUser(res))
          }
        })
      }
    })

  
    return (
        <Card style={{ width: '20rem' }} className='green-login-box'>
                {isRegistered ? (
                <Card.Text>User registration successful. <NavLink to='/login'> Sign in here </NavLink> </Card.Text>
                ) : (
                    <Card.Body>
                        <Card.Title className='headline'> Register a new account: </Card.Title> 
                            <form onSubmit={formik.handleSubmit}>
 
                                <input
                                    id='username'
                                    type="text"
                                    value={formik.values.username}
                                    placeholder="Username"
                                    onChange={formik.handleChange}
                                />
                                <p style={{ color: "red" }}> {formik.errors.username}</p>
                                <input
                                    id='password'
                                    type="password"
                                    value={formik.values.password}
                                    placeholder="Password"
                                    onChange={formik.handleChange}
                                />
                                <p style={{ color: "red" }}> {formik.errors.password}</p>
                                <br />
                                <Button className='green-button' type="submit">Register</Button>
                                <br />
                                <br />
                                <br /> 
                                <NavLink to='/login'> Already have an account? Login here. </NavLink>
                            </form>
                </Card.Body>
                )}
      </Card> 
    );
  }
  
  