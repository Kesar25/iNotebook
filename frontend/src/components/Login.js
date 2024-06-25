import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials]= useState({email:"", password:""});
    const navigate=useNavigate();

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    const host="http://localhost:8000"
    const handleSubmit= async (e)=>{
        e.preventDefault()
        const response = await fetch(`${host}/api/v1/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
          });

        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            props.showAlert("User logged in successfully" , "success")
            navigate("/")     
        }
        else{
          props.showAlert("Invalid Credentials", "danger")
        }
        
    }   
  return (
    <div className='mt-3'>
      <h2>Please Login to start using iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={credentials.password} onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary mt-3" >Submit</button>
</form>
    </div>
  )
}

export default Login
