import React from 'react'
import { Link } from 'react-router-dom'
function DemoCard({item}) {
  return (
    <>
    <Link to={`/anime/${item.mal_id}`}>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">

  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{item.title_english}</div>
    <div>
    <img className="w-full" src={item.images.jpg.large_image_url} alt="Sunset in the mountains"/>
    </div>

  </div>
  <div className="px-6 pt-4 pb-2">
     {
        item.genres.map((ind,id)=>(
            <span   key={id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{ind.name}</span>
        ))
     }
  </div>
</div>
  </Link>
    </>
  )
}

export default DemoCard