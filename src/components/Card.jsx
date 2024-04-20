import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../GlobalContext';
import { Link } from 'react-router-dom';
function Card() {
  const [data, setData] = useState(null)
  const [chardata, setChardata] = useState([])
  const [pics, setpics] = useState([])
  const {id}=useParams();
  // const {fetchbyId}=useGlobalContext();

  const fetchbyId = async (id) => {
    try {
  const res=await fetch(`https://api.jikan.moe/v4/anime/${id}`)
  const d=await res.json()

   setData(d.data);
   console.log(d);
    } catch (error) {
throw new Error(error)
    }
  }
  const fetchCharbyId = async (id) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime/${id}/characters`
    ).then((res) => res.json());

    let sortedData = temp?.data.sort((a, b) =>
      a.favorites < b.favorites ? 1 : -1
    );
    setChardata(sortedData?.slice(0, 15));
    console.log('characters',chardata);
  }
  const fetchpics = async (id) => {
    try {
      const res=await fetch(`https://api.jikan.moe/v4/anime/${id}/pictures`)
      const d=await res.json()

       setpics(d.data);
       console.log(d);
        }
        catch (error) {
    throw new Error(error)
        }
  }
  useEffect(()=>{
    fetchbyId(id)
    fetchCharbyId(id);
    fetchpics(id)
  },[id])
  return (
    <div className="w-full h-[100%] bg-gray-700 ">
    {data && (
        <>
        <div className='flex justify-center flex-col items-center'>
          <h1 className='text-3xl font-semibold mb-5'>{data.title_english}</h1>
          <div className={`w-full  flex justify-evenly mb-5   ` } >
          <img className="w-[250px] h-full" src={data.images.jpg.large_image_url} alt="Sunset in the mountains"/>

          <div className='flex items-center'>

          <iframe src={data.trailer.embed_url} title="W3Schools Free Online Web Tutorials" height={300} width={500}>
</iframe>
          </div>
          </div>
          {/* hello */}
          <div className='flex justify-center items-center  gap-2  mb-5'>
            <div>
            <p className='text-xl font-semibold'>Rating</p>
            {data.rating}</div>

              <div className='px-4'>
            <p className='text-xl font-semibold'>Episodes</p>
      {data.episodes}

            </div>
            <div className='px-4'><p className='text-xl font-semibold'>duration</p>
      {data.duration}</div>
            <div className="flex items-center ">
     {
        data.genres.map((ind,id)=>(
            <span   key={id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-200">{ind.name}</span>
        ))
     }
  </div>
  <div>
  <span   key={id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-200">
    <Link to={data.url} target="_blank">View Details</Link>
  </span>
  </div>

          </div>
          <div className="flex flex-wrap w-full justify-center">
      {pics.map((pic, index) => (
        <div key={index} className="p-2">
          <img className="rounded-lg" src={pic.jpg.image_url} alt="" />
        </div>
      ))}
    </div>
          <div className='flex w-full '>
          {chardata?.length > 0 && (
        <div className="character-section w-full flex flex-col justify-center items-center ">
          <h1 className="text-2xl font-semibold">Characters</h1>
          <div className="character w-full flex items-center justify-center ">
            {chardata?.map((item) => {
              return (
                <div className=" w-full p-2 items-center justify-center  ">
                  <span className='font-semibold text-lg'>{item.character.name}</span>
                  <div className='items-center justify-center '>
                    <img
                      width="150"
                      height="200"
                      className='rounded-lg'
                      src={item.character.images.jpg.image_url}
                      alt=""
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
          </div>

            
          <div className='px-6 text-lg font-semibold bg-gray-600 '>
            {data.synopsis}</div>
          <div className='w-15 h-15 bg-blue-500 rounded-lg p-3'>
            <Link to='/' >Home</Link>
          </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Card