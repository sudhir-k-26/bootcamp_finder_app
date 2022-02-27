import React, {useState} from 'react';
import '../css/main.css';
import {useNavigate, createSearchParams } from 'react-router-dom';

const Home = () => {

	const [miles,setMiles]      = useState('')
	const [zipcode, setZipcode] = useState('')
	const navigate = useNavigate();
	const handleSubmit = (e) =>{
		
		e.preventDefault();
		return navigate({
			pathname:'bootcamps',
			search:`?${createSearchParams({
				zipcode:`${zipcode}`,
				   miles: `${miles}`
			})}`
		})
		
	}
    return (
        <div>
         <section className="showcase">
			<div className="dark-overlay">
				<div className="showcase-inner container">
					<h1 className="display-4">Find a Code Bootcamp</h1>
					<p className="lead">
						Find, rate and read reviews on coding bootcamps
					</p>
					<form onSubmit={handleSubmit}>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<input
										type="text"
										className="form-control"
										name="miles"
										value={miles}
                                        onChange={(e)=>{setMiles(e.target.value)}}
										placeholder="Miles From"
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<input
										type="text"
										className="form-control"
										name="zipcode"
										value={zipcode}
										onChange={(e)=>{setZipcode(e.target.value)}}
										placeholder="Enter Zipcode"
									/>
								</div>
							</div>
						</div>
                        <div className="d-grid gap-2 mt-2">
						<input type="submit" value="Find Bootcamps" className="btn btn-warning btn-block" />
					    </div>
                    </form>
				</div>
			</div>
		</section>  
        </div>
    )
}

export default Home