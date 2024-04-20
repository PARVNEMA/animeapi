import React, { useEffect } from 'react'
import {  useState } from "react";
import Error from './Error'
import DemoCard from './DemoCard'

import { useGlobalContext } from '../GlobalContext'
import { useNavigate } from 'react-router-dom';
function Home() {
 const navigate=useNavigate();
    // const {data}=useGlobalContext()
  const [search, setSearch] = useState("");
  const [searchdata, setsearchdata] = useState({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);



  const pageclick = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?&order_by=popularity&sort=asc&limit=25&page=${page}&sfw`);
      const apiData = await response.json();
      const animeList = apiData.data;
      setData(animeList);
      console.log(animeList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
  const handleClick = async(e) => {
    e.preventDefault();
    const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`).then((res) => res.json());
    console.log(temp.data[0].mal_id);
    setsearchdata(temp.data[0]);
  }

  useEffect(() => {
    if (searchdata && searchdata.mal_id) {
      navigate(`/anime/${searchdata.mal_id}`)
    } else {
      // navigate(`*`)
      console.log("no data found");
    }
  }, [searchdata]); // Depend on searchdata
  useEffect(() => {
    pageclick();
  }, [page]);

    return (
  <>
   <div className='flex justify-center pt-4' >
    <form  onSubmit={handleClick}>
      <input type="text" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}
      className='bg-gray-300 rounded-lg p-2 mr-3'
      />
      <input type="submit" value="Submit" className='bg-gray-300 rounded-lg p-2' />
    </form>
    <div className='flex gap-2'>
      {/* Render your data here */}
      <button onClick={() => setPage(page -1)} className='bg-gray-300 rounded-lg p-2 ml-2'>prev Page </button>
      <button onClick={() => setPage(page + 1)} className='bg-gray-300 rounded-lg p-2 ml-2'>Next Page </button>
     <div>
     <button  className='bg-gray-300 rounded-lg p-2 ml-2' onClick={() => setPage(1)}>Refresh</button>
     <button  className='bg-gray-300 rounded-lg p-2 ml-2' >Current page:{page}</button>
     </div>
    </div>
   </div>
      <div className="flex flex-wrap  w-full h-full justify-evenly ">
        {data.map((item) => (
          <div key={item.id} className='bg-gray-700 flex  text-white mt-4 w-[30%]'>
          <DemoCard item={item}/>
          </div>

        ))}
      </div>
      </>
  )
}

export default Home