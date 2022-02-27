import React, { useState } from 'react';
import  { useNavigate, useLocation, createSearchParams } from 'react-router-dom'
import ShowBootcamps from  './ShowBootcamps';
import Search from './Search';
const Bootcamps = () => {

  const search = useLocation().search;
	const get_zipcode = new URLSearchParams(search).get('zipcode');
  const get_miles   = new URLSearchParams(search).get('miles');
	const get_budget  = new URLSearchParams(search).get('budget'); 
  const navigate = useNavigate();
	const [zipcode,setZipcode] =  useState('')
	const [miles,setMiles]     =  useState('')
	const [budget,setBudget]   =  useState('any');

  let url = "/api/v1/bootcamps";

	if(get_miles && get_zipcode)
	{
		url = url + `/radius/${get_zipcode}/${get_miles}`;
	}
	if(get_budget===budget && get_budget!=='any')
	{
		url = url + `?averageCost[lte]=${get_budget}&sort=-averageCost`;
	}

  const handleSubmit = (e) => {

		e.preventDefault();
		return navigate({
			pathname:'/bootcamps',
			search:`?${createSearchParams({
				zipcode:`${zipcode}`,
				   miles: `${miles}`
			})}`
		})
		
	}

  const handleFilter = (e) => {

		e.preventDefault();

		return navigate({
			pathname:'/bootcamps',
			search:`?${createSearchParams({
				budget:`${budget}`,
				   
			})}`
		})
		

		
	}


  return (<div style={{marginTop:"6rem"}}>
  <section className="browse my-5">
<div className="container">
<div className="row">
 
 <div className="col-md-4">
   <div className="card card-body mb-4">
     <h4 className="mb-3">By Location</h4>
     <form onSubmit={handleSubmit}>
       <div className="row">
         <div className="col-md-6">
           <div className="form-group">
             <input
               type="text"
               className="form-control"
               name="miles"
               value={get_miles ? get_miles : miles}
               onChange={(e)=>setMiles(e.target.value)}
               placeholder="Miles From"
                  required
             />
           </div>
         </div>
         <div className="col-md-6">
           <div className="form-group">
             <input
               type="text"
               className="form-control"
               name="zipcode"
               value={get_zipcode ? get_zipcode : zipcode}
               onChange={(e)=>setZipcode(e.target.value)}
               placeholder="Enter Zipcode"
               required
             />
           </div>
         </div>
       </div>
       <div className="d-grid gap-2 mt-2">
       <input
           
         type="submit"
         value="Find Bootcamps"
         className="btn btn-warning btn-block"
       />
       </div>
     </form>
   </div>

   <h4>Filter</h4>
   <form onSubmit={handleFilter}>
       <div className="form-group">
       <label> Rating</label>
       <select className="form-select mb-2">
         <option value="any">Any</option>
         <option value="9">9+</option>
         <option value="8">8+</option>
         <option value="7">7+</option>
         <option value="6">6+</option>
         <option value="5">5+</option>
         <option value="4">4+</option>
         <option value="3">3+</option>
         <option value="2">2+</option>
       </select>
     </div>

     <div className="form-group">
       <label> Budget</label>
       <select onChange={(e)=>{setBudget(e.target.value)}} className="form-select mb-2">
         <option value="any" >Any</option>
         <option value="20000"  >$20,000</option>
         <option value="15000" >$15,000</option>
         <option value="10000" >$10,000</option>
         <option value="8000"  >$8,000</option>
         <option value="6000"  >$6,000</option>
         <option value="4000"  >$4,000</option>
         <option value="2000"  >$2,000</option>
       </select>
     </div>
     <div className="d-grid gap-2 mt-2">
     <input
       type="submit"
       value="Find Bootcamps"
       className="btn btn-warning btn-block"
     />
     </div>
   </form>
 </div>

 <div className="col-md-8">	

 {search && <Search  url={url} search={search} />}
 {!search && <ShowBootcamps url={url} />}
           
   
 </div>
</div>
</div>
</section>
</div>)
};

export default Bootcamps;
