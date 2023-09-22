import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function LoginForm({ user, setUser }){

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
        .then((res) => {
          if (res.status === 200) {
            res.json()
            .then((res) => {setUser(res)})
          }
        })
      }
    })

  
    return (
        <Card style={{ width: '18rem' }} className='green-login-box'>
                {user ? (
                <Card.Text className='headline'>You are logged in!</Card.Text>
                ) : (
                    <Card.Body>
                        <Card.Title className='headline'> Login: </Card.Title> 
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
                                <Button className='green-button' type="submit">Login</Button>
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
  
  