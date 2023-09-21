import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function RegisterForm({ user, setUser }){
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
        fetch('http://127.0.0.1:5555/users', {
          method: 'POST', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null, 2),
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 200) {
            console.log(res)
            ((user) => setUser(user))
          }
        })
      }
    })

  
    return (
        <Card style={{ width: '20rem' }} className='center-box'>
                {isRegistered ? (
                <Card.Text>User registration successful. <NavLink to='/login'> Sign in here </NavLink> </Card.Text>
                ) : (
                    <Card.Body>
                        <Card.Title> Register a new account: </Card.Title> 
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
                                <Button variant='primary' type="submit">Register</Button>
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
  
export default RegisterForm;
  