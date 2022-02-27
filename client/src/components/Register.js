import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa'
import validator from 'validator';
import axios from 'axios';
const Register = () => {

    const navigate = useNavigate();

   
    const [user, setUser] = useState({
        name:"", 
        email:"",
        password:"",
        cpassword:"",
        role:"user"
        }) 
     const [error,setError] = useState("");
     
     const handleInputs = (e) => {

        
        setUser({...user,[e.target.name]:e.target.value})

     }
    
     const handleSubmit = (e) =>{

       e.preventDefault();

        
        

       if(!validator.isEmail(user.email))
        {
            
            setError("Please provide a valid email format");
        }
        else if(user.password!==user.cpassword)
        {
            
            setError("confirm password must be same as password");
        }
        else if(user.password===user.cpassword && validator.isEmail(user.email) && user.name!=='' && user.email!=='' && user.password!=='' && user.cpassword!=='')
        {
            setError("");

            const userData = {name:user.name, email:user.email, password:user.password, role:user.role, cpassword:user.cpassword}
            axios.post("/api/v1/auth/register",userData).then((res)=>{
                
                if(res.status===200){
                   
                    return navigate({pathname: '/login'});
                }
                else
                {
                    console.log(res);
                }
                
            }).catch(err=>console.log(err));

        }
     }
  return (
    <section className="form mt-5">
        <div className="container">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="card bg-white p-4 mb-4 mt-5">
                        <div className="card-body">
                            <h1><FaUserPlus /> Register</h1>
                            <p>
                                Register to list your bootcamp or rate, review and favorite
                                bootcamps
                            </p>
                            {error && <div>{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={handleInputs}
                                        className="form-control"
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={handleInputs}
                                        className="form-control"
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleInputs}
                                        className="form-control"
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="cpassword"
                                        onChange={handleInputs}
                                        className="form-control"
                                        placeholder="Confirm password"
                                        required
                                    />
                                </div>

                                <div className="card card-body mb-3">
                                    <h5>User Role</h5>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="role"
                                            value="user"
                                            checked={user.role==="user"?true:false}
                                            onChange={handleInputs}
                                        />
                                        <label className="form-check-label">
                                            Regular User (Browse, Write reviews, etc)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="role"
                                            value="publisher"
                                            checked={user.role==="publisher"?true:false}
                                            onChange={handleInputs}
                                        />
                                        <label className="form-check-label">
                                            Bootcamp Publisher
                                        </label>
                                    </div>
                                </div>
                                <p className="text-danger">
                                    * You must be affiliated with the bootcamp in some way in
                                    order to add it to DevCamper.
                                </p>
                                <div className="d-grid gap-2 mt-2">
                                    <input
                                        type="submit"
                                        value="Register"
                                        className="btn btn-primary btn-block"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
export default Register