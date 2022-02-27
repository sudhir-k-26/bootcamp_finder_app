import React from 'react'
import {Link} from 'react-router-dom';


const BootcampList = ({bootcamps}) => {

    
    return (
        <div>
           <h1>Bootcamps</h1> 
           {bootcamps.data.map(bootcamp=>(

<div className="card mb-3" key={bootcamp._id}>
<div className="row no-gutters">
    <div className="col-md-4">
        <img src={`/uploads/${bootcamp.photo}`} className="card-img" alt="..." />
    </div>
    <div className="col-md-8">
        <div className="card-body">
            <h5 className="card-title">
                <Link to={`/bootcamps/${bootcamp.slug}`}>
                 {bootcamp.name}
                    </Link>
            </h5>
            <span className="badge bg-secondary mb-2">{bootcamp.location.city}, {bootcamp.location.state}</span>
            <p className="card-text">{bootcamp.careers.join(',')}</p>
        </div>
    </div>
</div>
</div>
           ))}
        </div>
    )
}

export default BootcampList
