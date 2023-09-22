import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useFormik } from "formik";
import * as yup from "yup";

export default function ManageAccount({ user, setUser }){

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username"),
        old_password: yup.string().required("Must enter existing password"),
        new_password: yup.string().required("Must enter a new password")
      })
      
      const formik = useFormik({
        initialValues: {
          username: `${user.username}`,
          old_password: "",
          new_password: "", 
        },
        validationSchema: formSchema, 
        onSubmit: (values) => {
          fetch(`http://127.0.0.1:5555/users/${user.id}`, {
            method: 'PATCH', 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          })
          .then((res) => {
            if (res.status === 202) {
              res.json()
              .then((user) => setUser(user))
            }
          })
        }
      })
  

    return(
        <Card className='green-login-box'> 
        <form onSubmit={formik.handleSubmit}>
            <h1 className='manage-account-font'> Update account credentials </h1>
            <h3 className='manage-account-font-small'> Enter Existing Password: 
                <br/> <input placeholder='Type here' 
                id='old_password'
                type='password'
                value={formik.values.old_password} 
                onChange={formik.handleChange}/>  
            </h3>
            <h3 className='manage-account-font-small'> Enter New Password: 
                <br/> 
                <input placeholder='Type here' 
                    id='new_password'
                    type='password'
                    value={formik.values.new_password} 
                    onChange={formik.handleChange}/> 
            </h3>
            <Button className='login-button' type='submit'> Update </Button>
        </form>
        </Card> 
    )
}
