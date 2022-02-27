import React, {useState, useEffect} from 'react'
import { FaCheck, FaComments, FaGlobe, FaPencilAlt, FaTimes } from 'react-icons/fa';
import {Link, useParams} from 'react-router-dom';
import BootcampDetails from './BootcampDetails';
import useFetch from './useFetch';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';


const Bootcamp = () => {

	const {slug} = useParams();
    const [markerData, setMarkerData] = useState(null);
	const {data:bootcamp,error,isLoading} = useFetch(`/api/v1/bootcamps/bootcamp/${slug}`);
    useEffect(()=>{
		
		if(bootcamp)
		{
		setMarkerData(bootcamp.data.location.coordinates);
		
		}
		
	},[bootcamp, markerData])
  const [position, setPosition] = useState({lat:42.3557, lng:-71.0572});
  const markerIcon = new L.Icon({
    iconUrl: '/marker.png',
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });
  
  
      return (

    
        <div className="mt-4 pt-5">
            <section className="bootcamp mt-5">
       <div className="container">
         <div className="row">
			{isLoading && <div>Loading...</div>}
			{error && <div>{error}</div>} 
			<div className="col-md-8">
             {bootcamp && <div><input type="hidden" id="bootcamp-title" value={bootcamp.data.name} /><input type="hidden" id="x-coordinate" value={bootcamp.data.location.coordinates[0]} /><input type="hidden" id="y-coordinate" value={bootcamp.data.location.coordinates[1]}/></div>}		 
             { bootcamp && <BootcampDetails bootcamp={bootcamp.data}/>}
			 
		   </div>
			            
						
					 
           <div className="col-md-4">
						 
						{bootcamp && <img src={`/uploads/${bootcamp.data.photo}`} className="img-thumbnail" alt="" />}
						 
						 <h1 className="text-center my-4"><span className="badge bg-secondary bg-success rounded-circle p-3">8.8</span> Rating</h1>
						 <div className="d-grid gap-2">
						 <Link to={`/bootcamps/${slug}/reviews`} className="btn btn-dark btn-block my-3"><FaComments />  Read Reviews</Link>
						 </div>
						 <div className="d-grid gap-2">
						 <Link to={`/bootcamps/${slug}/add-review`} className="btn btn-light btn-block my-3"><FaPencilAlt />  Write a Review</Link>
						 </div>
						 <div className="d-grid gap-2">
						 <Link to="/" target="_blank" className="btn btn-secondary btn-block my-3"><FaGlobe />  Visit Website</Link>
						 </div>
						 {bootcamp && 
             <MapContainer style={{width:'100%',height:'300px'}} center={{lat:bootcamp.data.location.coordinates[1], lng:bootcamp.data.location.coordinates[0]}} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=1KanEAHXzpyyE3Rimezz"
      />
      {markerData && <Marker position={[markerData[1], markerData[0]]} icon={markerIcon}>
        
        <Popup>
         {bootcamp.data.location.formattedAddress}
        </Popup>
      </Marker>}
    </MapContainer>}
						 
            {bootcamp && <ul className="list-group list-group-flush mt-4">
                <li className="list-group-item">{ bootcamp.data.housing ?  <FaCheck className="text-success"/>:<FaTimes className="text-danger"/> } Housing</li>
                <li className="list-group-item">{ bootcamp.data.jobAssistance ? <FaCheck className="text-success"/>:<FaTimes className="text-danger"/>} Job Assistance</li>
                <li className="list-group-item">{ bootcamp.data.jobGuarantee ? <FaCheck className="text-success"/>:<FaTimes className="text-danger"/>} Job Guarantee</li>
                <li className="list-group-item">{ bootcamp.data.acceptGi ? <FaCheck className="text-success"/>:<FaTimes className="text-danger"/>} Accepts GI Bill</li>
              </ul>} 
           </div>
         </div>
       </div>
    </section>
        </div>
    )
}

export default Bootcamp