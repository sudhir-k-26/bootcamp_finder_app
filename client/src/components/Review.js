import React, {useEffect, useState} from 'react'
import { Link, useParams} from 'react-router-dom'
import { FaChevronLeft, FaPencilAlt } from 'react-icons/fa';
import useFetch from './useFetch'
import axios from 'axios';

const Review = () => {


	const {slug} = useParams();

	const [reviews, setReviews] = useState(null);
	const [loading,setLoading] = useState(true);

    const {data:bootcamp, error1, isLoading} = useFetch(`/api/v1/bootcamps/bootcamp/${slug}`);

	const setReviewsData = (reviewsData) =>{

        setReviews(reviewsData);
		setLoading(false);

	} 


    useEffect(() => {
		


		if(bootcamp && !error1 && !isLoading)
		{
			axios.get(`/api/v1/bootcamps/${bootcamp.data._id}/reviews`)
			.then(res=>{setReviewsData(res.data.data);})
			.catch(err=>{console.log(err)})
		   
		}
		
	},[bootcamp,error1, isLoading])



    return (
        <div className='mt-5'>
         <section className="bootcamp mt-5">
			<div className="container mt-5">
				<div className="row pt-5">
					
					<div className="col-md-8">
						<Link to={`/bootcamps/${slug}`} className="btn btn-secondary my-3"><FaChevronLeft /> Bootcamp Info</Link>
						<h1 className="mb-4"><span className='text-capitalize'>{slug.replace('-',' ')}</span> Reviews</h1>
						{loading && <div><h2 className='text-secondary'>Loading...</h2></div>}
						{reviews && reviews.map(review=>(<div className="card mb-3" key={review._id}>
							<h5 className="card-header bg-dark text-white">{review.title}</h5>
							<div className="card-body">
								<h5 className="card-title">
									Rating: <span className="text-success">{review.rating}</span>
								</h5>
								<p className="card-text">
									{review.text}
								</p>
								<p className="text-muted">Writtern By {review.user.name}</p>
							</div>
						</div>))}

					
					</div>
					
					<div className="col-md-4">
                        <h1 className="text-center my-4"><span className="badge bg-secondary bg-success rounded-circle p-3">{bootcamp && bootcamp.data.averageRating.toFixed(1)}</span>Rating</h1>
						<div className='d-grid gap-2'>
                        <Link to={`/bootcamps/${slug}/add-review`} className="btn btn-primary btn-block my-3"><FaPencilAlt /> Review This Bootcamp</Link>
                        </div>
					</div>
				</div>
			</div>
		</section>   
        </div>
    )
}

export default Review