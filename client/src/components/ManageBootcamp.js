import React, {useState, useEffect} from 'react'
import { Link, Navigate} from 'react-router-dom'
import useFetch from './useFetch'
import { useAuth } from '../contexts/auth/AuthState';
import axios from 'axios';

const ManageBootcamp = () => {

	const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [authState] = useAuth();
    const {isAuthenticated, loading, user} = authState;
   
	

	
	   const {data:bootcamp,error,isLoading} = useFetch("/api/v1/bootcamps/publisher/bootcamp/");
	useEffect(() => {

		if(bootcamp)
		{
			
			if(bootcamp.data.user!==user.data._id && user.data.role==='publisher')
			{
               return <Navigate to={'/bootcamps'} />;
			}
		}
		
	}, [bootcamp, user])
	
	
	const onSubmit = (e) =>
	{
       e.preventDefault();
	   const formData = new FormData();
	   formData.append('file',file);
	   if(bootcamp && isAuthenticated && !loading)
	   {
		axios.put(`/api/v1/bootcamps/${bootcamp.data._id}/photo`,{body:formData})
		.then((data)=>{if(data.status===200){console.log('success')}})
		.catch(err=>{console.log(err)})
	   } 

	}
    return (
        <div>
            
			
            <section className="pt-5 container mt-5">
				
			{isLoading && <div>Loading...</div>}
			{error && <div>{error}</div>}

			{bootcamp && <div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<h1 className="mb-4">Manage Bootcamp</h1>
							<div className="card mb-3">
								<div className="row no-gutters">
									<div className="col-md-4">
										<img src={`/uploads/${bootcamp.data.photo}`} className="card-img" alt="..." />
									</div>
									<div className="col-md-8">
										<div className="card-body">
											<h5 className="card-title">
												<Link to={`/bootcamps/${bootcamp.data.slug}`}>{bootcamp.data.name}</Link>
												<span className="badge bg-secondary bg-success  float-end">8.8</span>
											</h5>
											<span className="mb-2 badge bg-secondary">{bootcamp.data.location.city}, {bootcamp.data.location.state}</span>
											<p className="card-text">
												{bootcamp.data.careers.join(', ')}
											</p>
										</div>
									</div>
								</div>
							</div>
							<form className="mb-4" onSubmit={onSubmit} >
								<div className="form-group">
									<div className="custom-file">
										<input
											type="file"
											name="photo"
											className="form-control form-control-sm"
											id="photo" onChange={(e)=>{setFile(e.target.files[0]);setFilename(e.target.files[0].name)}} placeholder="Add Bootcamp Image" />
										   <label>{filename}</label>
									</div>
								</div>
								<div className="d-grid mt-2">
								<input type="submit" className="btn btn-light btn-block" value="Upload Image" />
							    </div>
							</form>
							<div className="d-grid gap-2 mt-2">
							<Link to="/add-bootcamp" className="mx-2 btn btn-primary btn-block">Edit Bootcamp Details</Link>
							</div><div className="d-grid gap-2 mt-2">
							<Link to="/bootcamps/manage-courses" className="mx-2 btn btn-secondary btn-block">Manage Courses</Link>
							</div>
							<div className="d-grid gap-2 mt-2">
							<Link to="/" className="mx-2 btn btn-danger btn-block">Remove Bootcamp</Link>
							</div>
							<p className="text-muted mt-5">
								* You can only add one bootcamp per account.
							</p>
							<p className="text-muted">
								* You must be affiliated with the bootcamp in some way in order
								to add it to DevCamper.
							</p>
						</div>
					</div>
				</div>
			</div>}
		</section>
        </div>
    )
}

export default ManageBootcamp