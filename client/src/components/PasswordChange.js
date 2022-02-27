import React, {useState } from 'react'
import { useParams } from 'react-router-dom'

const PasswordChange = () => {
    const [password,setPassword]= useState("");
	const [error, setError] = useState(false);
	const [message,setMessage] = useState(null);
    const { slug }= useParams();
	const handleSubmit = (e) => {

		e.preventDefault();
       
		if(password==="")
		{
			setError("Please provide an password");
		}
		else if(password!=="" && password.length<6)
		{
			setError("Please enter a password with atleast 6 characters")
		}
		else if(password!=="" && password.length>=6)
		{
			
            const data = {password};
			
			fetch(`/api/v1/auth/resetpassword/${slug}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json", "Accept":"application/json"},
            body:JSON.stringify(data)
        }).then((res)=>{

			if(res.status===200)
			{
                setPassword("");
				setMessage("Password Reset Successfully");
                
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
                        
                        <h1 className="mb-2">Reset Password</h1>                      
                        {error && <div className='text-danger'>{error}</div>}
                        {message && <div className='text-success'>{message}</div>}
                       <form onSubmit={handleSubmit}>
                            <div className="form-group">
                               
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Password"/>
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
export default PasswordChange