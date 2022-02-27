import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaPencilAlt, FaTimes } from 'react-icons/fa';


const ManageCourses = () => {

    
    
    const [bootcamp, setBootcamp] = useState(null);
    const [courses, setCourses]   = useState(null);

    

    useEffect(() => {
        axios.get('/api/v1/bootcamps/publisher/bootcamp')
     .then(res=>{
         if(res.status===200){

            

        setBootcamp(res.data.data);
        setCourses(res.data.data.courses);
        //console.log(res.data.data.averageRating)

     }}).catch(err=>{console.log(err)});
    },[])

    const handleDelete = (id) =>{

        axios.delete(`/api/v1/courses/${id}`)
        .then(res=>{if(res.status===200){
            
            window.location.reload(false);
        }})
        .catch(err=>{console.log(err)})
    }
    return (
        <div className='mt-5'>
          {bootcamp &&  <section className="container mt-5 pt-5">
			<div className='row'>
                <div className='col-md-8 m-auto'>
                <div className="card bg-white py-2 px-4">
                    <div className='card-body'>
                    <Link to="/bootcamps/manage-bootcamp" className="btn btn-link text-secondary my-3">
                        <FaChevronLeft /> Manage Bootcamp
                    </Link>
                    <h1 className="mb-4 text-secondary">Manage Courses</h1>
                    <div className="card mb-3 p-3">
								<div className="row no-gutters">
									<div className="col-md-4">
										<img src={`/uploads/${bootcamp.photo}`} className="card-img" alt="..." />
									</div>
									<div className="col-md-8">
										<div className="card-body">
											<h5 className="card-title">
												<Link  to={`/bootcamps/${bootcamp.slug}`} >{bootcamp.name}
													<span className="float-end badge bg-success">{bootcamp.averageRating}
                                                    </span></Link>
											</h5>
											<span className="badge bg-dark mb-2 p-1">{bootcamp.location.city}, {bootcamp.location.state}</span>
											<p className="card-text">
												{bootcamp.careers.join(',')}
											</p>
										</div>
									</div>
								</div>
							</div>
                            <div className="d-grid gap-2 mt-2">
                            <Link to="/bootcamps/add-course" className='btn btn-secondary btn-block my-4'>Add Bootcamp Course</Link>
					</div>
                    
                    {courses && <table className="table table-striped table-borderless">
								<thead>
									<tr>
										<th scope="col">Title</th>
										<th scope="col"></th>
									</tr>
								</thead>
                                <tbody>
                                {courses.map(course=>(
                                 <tr key={course._id}>
                                     <td>{course.title}</td>
                                     <td><Link  className='btn btn-secondary text-white' to={`/bootcamps/course/${course._id}/update`}>
                                         <FaPencilAlt />
                                         </Link>
                                         <button className='btn btn-danger mx-2' onClick={()=>handleDelete(`${course._id}`)}>
                                             <FaTimes />
                                         </button>
                                         </td>
                                         
                                 </tr>))}
                                </tbody>
                                </table>}  
                    </div>

                </div>
                </div>
            </div>
            </section>}
        </div>
    )
}

export default ManageCourses
