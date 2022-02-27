import React from 'react';
import BootcampList from './BootcampList';
import useFetch from './useFetch';

const Search = ({search, url}) => {

    

    const {data,error,isLoading} = useFetch(url);


    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {data && <BootcampList bootcamps={data} />}
            

        </div>
    )
}

export default Search
