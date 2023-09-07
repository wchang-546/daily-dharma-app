import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function LoginForm({ isLoggedIn, setIsLoggedIn }){

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
        fetch('http://127.0.0.1:5555/login', {
          method: 'POST', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null, 2),
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 200) {
            setIsLoggedIn(true)
            console.log(res)
          }
        })
        // .then((data) => console.log(data))

        //Back end - Write a function that Users/Sellers.query.filter(values.username)
        //Back end - GET request by user/seller ID.
        //Front end - Assign useState variable with user/seller items. 
      }
    })

  
    return (
        <Card style={{ width: '18rem' }} className='center-box'>
                {isLoggedIn ? (
                <Card.Text>You are logged in!</Card.Text>
                ) : (
                    <Card.Body>
                        <Card.Title> Login: </Card.Title> 
                            <form onSubmit={formik.handleSubmit}>
                                <label>
                                Username:   
                                <input
                                    id='username'
                                    type="text"
                                    value={formik.values.username}
                                    placeholder="Username"
                                    onChange={formik.handleChange}
                                />
                                <p style={{ color: "red" }}> {formik.errors.username}</p>
                                </label>
                                <label>
                                Password:
                                <input
                                    id='password'
                                    type="password"
                                    value={formik.values.password}
                                    placeholder="Password"
                                    onChange={formik.handleChange}
                                />
                                <p style={{ color: "red" }}> {formik.errors.password}</p>
                                </label>
                                <br />
                                <Button variant='primary' type="submit">Login</Button>
                                <br />
                                <br />
                                <br /> 
                                <NavLink to='/register'> Need an account? Register here. </NavLink>
                            </form>
                </Card.Body>
                )}
      </Card> 
    );
  }
  
export default LoginForm;
  