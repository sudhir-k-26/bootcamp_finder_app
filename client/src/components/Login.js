import React, {useState, useEffect}  from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import { Link , useNavigate} from 'react-router-dom';
import validator from 'validator';
import { useAuth, clearErrors, login } from '../contexts/auth/AuthState';


const Login = () => {

const [authState, authDispatch] = useAuth();
const { error, isAuthenticated} = authState;

const navigate = useNavigate();

useEffect(() => {        

	if (error === 'Invalid Credentials') {
	  
	  clearErrors(authDispatch);
	}
  }, [error, isAuthenticated, authDispatch]);
	
  const [user, setUser] = useState({
      "email":"",
      "password":""
  });

  const [alertError, setAlertError] = useState();
   
	
	const handleInputs = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.email==='')
        {
            setAlertError('Please provide email');
        }
        else if(user.email!=='' && !validator.isEmail(user.email))
        {
            setAlertError('Please enter a valid email id');
        }
        else if(user.password==='')
        {
            setAlertError('Please provide password');

        }
        else if(user.email!=='' && validator.isEmail(user.email) && user.password!=='')
        {
			setAlertError("");
			try{
	
				const loginData = {email:user.email, password:user.password}
	
				login(authDispatch, loginData);
				
				if (isAuthenticated) {
				
					return navigate({
						pathname:'bootcamps'
						
					})
				}
			}
			catch(err){
				console.error(err);
			}
        }
        
    }
     
	
    return (
        
           <section className="form mt-5">
			<div className="container">
				<div className="row">
					<div className="col-md-6 m-auto">
						<div className="card bg-white p-4 mb-4 mt-5">
							<div className="card-body">
								<h1><FaSignInAlt/> Login</h1>
								<p>
								  	 Log in to list your bootcamp or rate, review and favorite bootcamps 
								</p>
								{alertError && <div className="text-danger">{alertError}</div>}
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label>Email Address</label>
										<input
											type="text"
											name="email"
											className="form-control"
											placeholder="Enter email"
											onChange={handleInputs}
											value={user.email}
											
										/>
									</div>
									<div className="form-group mb-4">
										<label>Password</label>
										<input
											type="password"
											name="password"
											className="form-control"
											placeholder="Enter password"
											onChange={handleInputs}
											value={user.password}
											
										/>
									</div>
									<div className="d-grid gap-2 mt-2">
										<input
											type="submit"
											value="Login"
											className="btn btn-primary btn-block"
										/>
									</div>
								</form>
								<p>	Forgot Password? <Link to="/reset-password">Reset Password</Link></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section> 
        
    )
}

export default Login
