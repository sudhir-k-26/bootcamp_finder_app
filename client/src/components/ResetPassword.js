import React, {useState } from 'react'
import { Link } from 'react-router-dom';
import validator from 'validator';

const ResetPassword = () => {

	const [email,setEmail]= useState("");
	const [error, setError] = useState(false);
	const [message,setMessage] = useState(null);

	const handleSubmit = (e) => {

		e.preventDefault();
		if(email==="")
		{
			setError("Please provide an emai id");
		}
		else if(email!=="" && !validator.isEmail(email))
		{
			setError("Please enter a valid email id")
		}
		else if(email!=="" && validator.isEmail(email))
		{
			
            const data = {email};
			
			fetch("/api/v1/auth/forgotpassword",{
            method:"POST",
            headers:{"Content-Type":"application/json", "Accept":"application/json"},
            body:JSON.stringify(data)
        }).then((res)=>{

			if(res.status===200)
			{
				setMessage("Please check your email inbox for password reset link");
			} 
        }).catch(err=>console.log(err));
		}


	}



    return (
        <section className="container mt-5">
			<div className="row mt-5">
				<div className="col-md-8 mt-5 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<Link to="/login">Back to login</Link>
							<h1 className="mb-2">Reset Password</h1>
							<p>	Use this form to reset your password using the registered email address.</p>
							{error && <div className='text-danger'>{error}</div>}
							{message && <div className='text-success'>{message}</div>}
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label>Enter Email</label>
									<input
										type="text"
										name="email"
										value={email}
										onChange={(e)=>setEmail(e.target.value)}
										className="form-control"
										placeholder="Email address"/>
								</div>			
								<div className="d-grid gap-2 mt-2">
											<input
												type="submit"
												value="Reset Password"
												className="btn btn-dark btn-block" />
									</div>
								
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>

    )
}
export default ResetPassword