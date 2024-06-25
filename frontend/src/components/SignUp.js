import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const [credentials, setCredentials]= useState({name:"",email:"", password:""});
    const navigate=useNavigate();

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    const host="http://localhost:8000"
    const handleSubmit= async (e)=>{
        e.preventDefault()
        const {name,email,password}=credentials
        const response = await fetch(`${host}/api/v1/user/createUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
          });

        const json = await response.json();
        console.log(json);
        if(json.success){
            navigate("/")
            props.showAlert("User created successfully" , "success")
        }
        else{
          props.showAlert("Invalid details", "danger")
        }
        
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter your name" name="name" value={credentials.name} onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted"></small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={credentials.password} onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default SignUp
