import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import * as Yup from "yup"
import { LoginFormType } from '../@types';
import authService from '../services/Auth.service';
import ColorRing from 'react-loader-spinner/dist/loader/ColorRing';
import { ErrorMessage, Field, Form, Formik } from "formik";

const Login = () => {
  const nav=useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [errMessage, setErrMessage] = useState<string|undefined>(undefined)
  const {isLoggedIn,login}=useContext(AuthContext)

  const initialValues={
    email:"",
    password:""
  }

  const validationSchema=Yup.object({
    email:Yup.string().email("must be a valid address").required(),
    password:Yup.string().min(8,"password too short")
  })

  const handlelogin=(formValues:LoginFormType)=>{
  setIsLoading(true);
    const {email,password}=formValues;
    authService
    .login(email,password)
    .then((res)=>{
      const token=res.accessToken;
      const email=res.email;
      const username=res.username;
      login(username,email,token)
      nav("/")
    })
    .catch((e)=>{
      console.log(e);
      alert(e)
      setErrMessage(JSON.stringify(e.response.data))
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  if(isLoggedIn){
    return <Navigate to="/"/>
  }
  return (
    <div>
      {errMessage&& <div>${errMessage}</div>}
         <div className="mx-auto w-25">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{ margin: "0 auto" }}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      
      <Formik
      initialValues={initialValues}
      onSubmit={handlelogin}
      validationSchema={validationSchema}
      >
        <Form className='w-50 mx-auto'>
          <div>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <Field 
            name="email"
            type="email"
            className="form-control"
            id="email"
            />
            <ErrorMessage
            name="email"
            component="div"
            className='alert alert-danger'
            />
          </div>          
          <div>
            <label htmlFor='password' className='form-label'>
              password
            </label>
            <Field 
            name="password"
            type="password"
            className="form-control"
            id="password"
            />
            <ErrorMessage
            name="password"
            component="div"
            className='alert alert-danger'
            />
          </div>
          <div className='col-12'>
            <button
            disabled={isLoading}
            className="btn btn-primary"
            type='submit'
            >
              login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login