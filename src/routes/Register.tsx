import { useContext, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import * as Yup from "yup"
import { RegisterFormType } from "../@types"
import { Form,Formik } from "formik"
import { Field } from "formik/dist/Field"
import { ErrorMessage } from "formik/dist/ErrorMessage"
import authService from "../services/Auth.service"
import { ColorRing } from "react-loader-spinner"
const Register = () => {
  const nav=useNavigate()
  const [errMessage, setErrMessage] = useState<string|undefined>(undefined)
  const formlabel="form-label"
  const formcontrol="form-control"
  const usernamestr="username"
  const emailstr="email"
  const passwordstr="password"
  const fieldsize="w-50 mx-auto"
  const alertdanger="alert alert-danger"
  const text="text"
  const div="div"
  const home="/"

  const [isLoading, setIsLoading] = useState(false)

  const {isLoggedIn}=useContext(AuthContext)
  const initialValues={
    username:"",
    email:"",
    password:"",
  }
  
  const validationSchema=Yup.object({
    username:Yup.string().min(3,"Name too short").required(),
    email:Yup.string().email("Must be a valid email").required(),
    passwrod:Yup.string().min(8,"Password too short").required()
  })

  const handleRegister=(formValues:RegisterFormType)=>{
    setIsLoading(true);
    const {username,email,password}=formValues;
    authService
    .register(username,email,password)
    .then((res)=>{
      console.log(res.data);
      nav("/login")
    })
    .catch((e)=>{
      console.log(e);
      alert(e);
      setErrMessage(JSON.stringify(e.response.data))
    })
    .finally(()=>{
      setIsLoading(false)
    })
    
  }

  if(isLoggedIn){
    return <Navigate to={home} />
  }
  return (
    <div>
      {errMessage && <div>${errMessage}</div>}
      {isLoading && (
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
      )}      
      <Formik
      initialValues={initialValues}
      onSubmit={handleRegister}
      validationSchema={validationSchema}
      >
        <Form className={fieldsize}>
          <div>
            <label htmlFor={usernamestr} className={formlabel}>
              User Name
            </label>
            <Field 
            name={usernamestr}
            type={text}
            className={formcontrol}
            id={usernamestr}
            />
            <ErrorMessage 
            name={usernamestr}
            component={div}
            className={alertdanger}
            />
          </div>
          <div>
            <label htmlFor={emailstr} className={formlabel}>
              Email
            </label>
            <Field 
            name={emailstr}
            type={text}
            className={formcontrol}
            id={emailstr}
            />
            <ErrorMessage 
            name={emailstr}
            component={div}
            className={alertdanger}
            />
          </div>
          <div>
            <label htmlFor={passwordstr} className={formlabel}>
              password
            </label>
            <Field 
            name={passwordstr}
            type={text}
            className={formcontrol}
            id={passwordstr}
            />
            <ErrorMessage 
            name={passwordstr}
            component={div}
            className={alertdanger}
            />
          </div>
          <div className="col-12">
            <button disabled={isLoading} className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Register