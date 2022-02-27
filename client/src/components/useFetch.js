import {useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = (url) =>
{
    const [data,setData] = useState(null);
    const [isLoading, setIsLoading]= useState(true);
    const [error,setError] = useState(null);
    useEffect(()=>{
        const abortCont = new AbortController();
        
        setTimeout(()=>{
            axios.get(url)
            .then(res=>{
                
               if(res.status!==200)
               {
                   throw Error('Could not fetch data from that resource');
               }
                
                return res.data;
            })
            .then(data=>{
               setData(data);
               setIsLoading(false);
               setError(null);
            
            }).catch(err=>{

                if(err.name==='AbortError')
                {
                    console.log('Fetch Aborted');
                }
                else
                {
                    setIsLoading(false);
                    setError(err.message);
                }
            })
           
        },1000)
    
        return ()=> abortCont.abort();
          
               
        },[url]);

        return { data, isLoading, error };
}
export default useFetch;