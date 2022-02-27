import React, { useState} from 'react'
import { useParams, Link, Navigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useAuth } from '../contexts/auth/AuthState';
import useFetch from './useFetch'
import axios from 'axios';


const AddReview = () => {


	const [authState] = useAuth();
    const { isAuthenticated, loading, user} = authState;
	const {slug} = useParams();

	const {data:bootcamp, error1, isLoading} = useFetch(`/api/v1/bootcamps/bootcamp/${slug}`);

	const [input, setInput] = useState({
        title:"", 
        review:"",
        rating:1        
        });
		
	  	
     const [error,setError] = useState("");


	 const handleInput = (e) => {

        
        setInput({...input,[e.target.name]:e.target.value})

     }

	 const handleSubmit = (e) => 
	 {
       e.preventDefault();

	   if(input.title==='')
	   {
            setError('Please enter the review title');
	   }
	   else if(input.review==='')
	   {
            setError('Please add some text in review');
	   }

	   else if(input.title!=='' && input.review!=='')
	   {
		 

		  if(bootcamp.success===true && !error1 && !isLoading)
		  {
			  
			  const reviewData={title:input.title, text:input.review, rating:input.rating}
		     axios.post(`/api/v1/bootcamps/${bootcamp.data._id}/reviews`,reviewData)
			  .then(res=>{
				  console.log(res);
				  
				
				})
			  .catch(err=>{console.log(err)});
		  }

		  
	   }
	 }

    return (
        <div className='mt-5'>
			{isAuthenticated  && !loading && user.data.role==='publisher' && <div className='container mt-5'><div className='row pt-5'><h2 className="text-center text-secondary">Opps! Publishers Are Not Allowed To Write A Review</h2></div></div>}
           {isAuthenticated && !loading && user.data.role==='user' && <section className="container mt-5">
			<div className="row pt-5">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<Link to={`/bootcamps/${slug}`} className="btn btn-link text-secondary my-3"
								><FaChevronLeft/> Bootcamp Info</Link>
							<h1 className="mb-2 text-capitalize">{slug.replace('-',' ')}</h1>
							<h3 className="text-primary mb-4">Write a Review</h3>
							<p>
								You must have attended and graduated this bootcamp to review
							</p>
							{error && <div className="text-danger">{error}</div>}
							<form onSubmit={handleSubmit} >
								<div className="form-group mb-3">
                                <label  className="form-label">Rating</label>
                                <input type="range" className="form-range" value={input.rating} onChange={handleInput}  min="1" max="10" step="1" name="rating" />
								</div>
								<div className="form-group mb-3">
									<input
										type="text"
										name="title"
										value={input.title}
										onChange={handleInput}
										className="form-control"
										placeholder="Review title"
									/>
								</div>
								<div className="form-group mb-3">
									<textarea
										name="review"
										rows="10"
										onChange={handleInput}
										value={input.review}
										className="form-control"
										placeholder="Your review"
									></textarea>
								</div>
								<div className="form-group">
									<input
										type="submit"
										value="Submit Review"
										className="btn btn-dark btn-block"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>}
        </div>
    )
}

export default AddReview
