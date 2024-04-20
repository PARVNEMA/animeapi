
import React, {  useEffect, useState } from "react";
const useFetch=()=> {
    const [data, setData] = useState([]);

    const handleclick = async () => {
        try {
          const response = await fetch(`https://api.jikan.moe/v4/anime?&order_by=popularity&sort=asc&limit=25&page=1`);
          const apiData = await response.json();
          const animeList = apiData.data; // Assuming the array is named "data"
      setData(animeList);
          console.log(animeList);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };



      useEffect(()=>{
        handleclick();
     },[])

    return(
   {data})

}

export default useFetch
