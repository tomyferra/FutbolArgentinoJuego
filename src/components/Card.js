import React from 'react'
import errorImg from "../images/NotFound.webp";

function Card({ data }) {
  return (
    <div class="max-w-sm bg-slate-800 rounded overflow-hidden shadow-lg">
      <img class="w-full object-cover h-52" src={data.StadiumImg || errorImg } alt={data.Name} />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{data.Name}</div>
        <p class="text-gray-300 text-base">{data.City}</p>
      </div>
    </div>
  )
}

export default Card;