import React, {useState, useEffect} from 'react'
import axios  from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'



const AddCourse = () => {

   
   const [bootcamp,setBootcamp] = useState(null)
   const [loading, setLoading] = useState(true)
   const [message,setMessage]  = useState("");
   const navigate = useNavigate();

   const [course,setCourse] = useState({
       "title":"",
       "weeks":"",
       "tuition":"",
       "minimumSkill":"beginner",
       "description":"",
       "scholarshipsAvailable":false
   })

   const handleInputs = (e) => {

        
    setCourse({...course,[e.target.name]:e.target.value})

 }

const navigateToBootcamp = () => {
	navigate(`/bootcamps/${bootcamp.slug}`);
}
    useEffect(() => {

     axios.get('/api/v1/bootcamps/publisher/bootcamp')
     .then(res=>{
         if(res.status===200){

        setLoading(false);    

        setBootcamp(res.data.data);

     }})
     .catch(err=>{console.log(err)})
    },[])
    const handleSubmit = (e) =>{

		e.preventDefault();
		
        axios.post(`/api/v1/bootcamps/${bootcamp._id}/courses`,course)
		.then(res=>{
			setMessage('Course successfully added to bootcamp.')
			setTimeout(navigateToBootcamp,5000);

	}).catch(err=>{console.log(err)})

        
    }
    return (
        <div className='mt-5'>
           {bootcamp && !loading && <section className="container mt-5">
			<div className="row mt-5 pt-5">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<Link
								to="/bootcamps/manage-courses"
								className="btn btn-link text-secondary my-3"
								><FaChevronLeft /> Manage Courses
                                </Link>
							<h1 className="mb-2">{bootcamp.name}</h1>
							<h3 className="text-warning mb-4">Add Course</h3>
							{message && <div><span className='text-success'>{message}</span></div>}
							<form onSubmit={handleSubmit}>
								<div className="form-group mb-2">
									<label>Course Title</label>
									<input
										type="text"
										name="title"
										className="form-control"
                                        value={course.title}
                                        onChange={handleInputs}
										placeholder="Title"
									/>
								</div>
								<div className="form-group mb-2">
									<label>Duration</label>
									<input
										type="number"
										name="weeks"
                                        value={course.weeks}
                                        onChange={handleInputs}
										placeholder="Duration"
										className="form-control"
									/>
									<small className="form-text text-muted">
                                        Enter number of weeks course lasts</small>
								</div>
								<div className="form-group mb-2">
									<label>Course Tuition</label>
									<input
										type="number"
										name="tuition"
                                        value={course.tuition}
                                        onChange={handleInputs}
										placeholder="Tuition"
										className="form-control"
									/>
									<small className="form-text text-muted">USD Currency</small>
								</div>
								<div className="form-group mb-2">
									<label>Minimum Skill Required</label>
									<select name="minimumSkill" onChange={handleInputs} className="form-control">
										<option value="beginner">Beginner (Any)</option>
										<option value="intermediate">Intermediate</option>
										<option value="advanced">Advanced</option>
									</select>
								</div>
								<div className="form-group mb-2">
									<textarea
										name="description"
										rows="5"
                                        value={course.description}
                                        onChange={handleInputs}
										className="form-control"
										placeholder="Course description summary"
										maxLength="500"
									></textarea>
									<small className="form-text text-muted"
										>No more than 500 characters
                                        </small>
								</div>
								<div className="form-check mb-2">
									<input
										className="form-check-input"
										type="checkbox"
                                        value={course.scholarshipsAvailable}
                                        onChange={handleInputs}
										name="scholarshipsAvailable"
										id="scholarshipAvailable"
									/>
									<label className="form-check-label">
										Scholarship Available
									</label>
								</div>
								<div className="d-grid gap-2 mt-2">
					<input
						type="submit"
						value="Add Course"
						className="btn btn-secondary btn-block my-4"
					/></div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>}
        {bootcamp===null && !loading && <div>You have not added a bootcamp. Please add a bootcamp first to add a course</div>}
           
        </div>
    )
}

export default AddCourse
