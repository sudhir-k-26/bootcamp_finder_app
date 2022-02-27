import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

const BootcampDetails = ({bootcamp}) => {

    
    return (
        <div>
            <div className="col-md-8">
            <h1>{bootcamp.name}</h1>
						
						<p>{bootcamp.description}</p>
						
						<p className="lead mb-4">Average Course Cost: <span className="text-primary">${bootcamp.averageCost}</span></p>
						{bootcamp.courses.map(course=>(<div className="card mb-3" key={course._id}>
							<h5 className="card-header bg-warning text-white">{course.title}</h5>
							<div className="card-body">
								<h5 className="card-title">Duration: {course.weeks} weeks</h5>
								<p className="card-text">{course.description}</p>
								<ul className="list-group mb-3">
									<li className="list-group-item">Cost: ${course.tuition} USD</li>
									<li className="list-group-item">Skill Required: {course.minimumSkill}</li>
									<li className="list-group-item">Scholarship Available: { course.scholarshipAvailable ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" /> } </li>
								</ul>
							</div>
						</div>))}
						

						
					 </div>
        </div>
    )
}

export default BootcampDetails
