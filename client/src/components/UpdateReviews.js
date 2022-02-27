import React, { useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useAuth } from '../contexts/auth/AuthState';
import axios from 'axios';


const UpdateReview = () => {


	const [authState] = useAuth();
    const { isAuthenticated, loading, user} = authState;
	const {slug} = useParams();
    const [review,setReview] = useState(null);
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();

	const redirect = () => {
		navigate('/bootcamps/manage-reviews');
	}

	useEffect(()=>{

         axios.get(`/api/v1/reviews/${slug}`)
         .then(res=>{

			
			if(res.data.data.user===user.data._id)
			{
				setReview(res.data.data);
			}
             
         })
         .catch(err=>{console.log(err)})



    },[slug, user])

	

    
	


	
		
	  	
     const [error,setError] = useState("");


	 const handleInput = (e) => {

        
        setReview({...review,[e.target.name]:e.target.value})

     }

	 const handleSubmit = (e) => 
	 {
       e.preventDefault();

	   if(review.title==='')
	   {
            setError('Please enter the review title');
	   }
	   else if(review.text==='')
	   {
            setError('Please add some text in review');
	   }

	   else if(review.title!=='' && review.text!=='')
	   {
		 

		  if(true)
		  {
			  

			 const reviewData={title:review.title, text:review.text, rating:review.rating}
		     axios.put(`/api/v1/reviews/${review._id}`,reviewData)
			  .then(res=>{
				  if(res.status===200)
				  {
                    setMessage('Review Updated Successfully');
					setTimeout(redirect,5000);

				  }
				  
				  
				
				})
			  .catch(err=>{console.log(err)});
		  }

		  
	   }
	 }

    return (
        <div className='mt-5'>
			{isAuthenticated  && !loading && user.data.role==='publisher' && <div className='container mt-5'><div className='row pt-5'><h2 className="text-center text-secondary">Opps! Publishers Are Not Allowed To Write A Review</h2></div></div>}
           {isAuthenticated && !loading && user.data.role==='user' && review && <section className="container mt-5">
			<div className="row pt-5">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<Link to={`/bootcamps/${slug}`} className="btn btn-link text-secondary my-3"
								><FaChevronLeft/> Bootcamp Info</Link>
							<h1 className="mb-2 text-capitalize">{review.bootcamp.name}</h1>
							<h3 className="text-primary mb-4">Update a review</h3>
							<p>
								You must have attended and graduated this bootcamp to review
							</p>
							{message && <div className='text-success'>{message}</div>}
							{error && <div className="text-danger">{error}</div>}
							<form onSubmit={handleSubmit} >
								<div className="form-group mb-3">
                                <label  className="form-label">Rating</label>
                                <input type="range" className="form-range" value={review.rating} onChange={handleInput}  min="1" max="10" step="1" name="rating" />
								</div>
								<div className="form-group mb-3">
									<input
										type="text"
										name="title"
										value={review.title}
										onChange={handleInput}
										className="form-control"
										placeholder="Review title"
									/>
								</div>
								<div className="form-group mb-3">
									<textarea
										name="text"
										rows="10"
										onChange={handleInput}
										value={review.text}
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

export default UpdateReview
