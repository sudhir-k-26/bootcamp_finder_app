import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthState';
import axios from 'axios';
const ManageReviews = () => {


    const [authState] = useAuth();
	const { isAuthenticated, loading, user} = authState;
	const [reviews,setReviews] = useState(null);
    

    useEffect(()=>{
		
       axios.get(`/api/v1/reviews?user=${user.data._id}`).then(res=>{
        // console.log(res.data.data)
		// console.log(res.data.data);
		//console.log(user);
	     setReviews(res.data.data);

	   }).catch(err=>{console.log(err)})



	},[user])

	const handleDelete = (id) =>{

        axios.delete(`/api/v1/reviews/${id}`)
        .then(res=>{if(res.status===200){
            
            window.location.reload(false);
        }})
        .catch(err=>{console.log(err)})
    }

  return <div>
      <section className="container mt-5">
			<div className="row pt-5">
				<div className="col-md-8 m-auto">
                    {isAuthenticated && user.data.role==='publisher' && !loading && <div className='text-secondary text-center'><h4>Publishers Are Not Allowed To Manage Reviews</h4></div>}
					{isAuthenticated && user.data.role==='user' && !loading && <div className="card bg-white py-2 px-4">
						<div className="card-body">
							<h1 className="mb-4">Manage Reviews</h1>
							<table className="table table-striped">
								<thead>
									<tr>
										<th scope="col">Bootcamp</th>
										<th scope="col">Rating</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									{reviews && reviews.map(review => (<tr key={review._id}>
										<td>{review.bootcamp.name}</td>
										<td>{review.rating}</td>
										<td>
											<Link to={`/bootcamps/reviews/${review._id}/update`} className="btn btn-secondary"
												><FaPencilAlt /></Link>
											<button className="btn btn-danger mx-2" onClick={()=>handleDelete(`${review._id}`)}>
												<FaTimes />
											</button>
										</td>
									</tr>))}
									
								</tbody>
							</table>
						</div>
					</div>}
				</div>
			</div>
		</section>
  </div>;
};

export default ManageReviews;