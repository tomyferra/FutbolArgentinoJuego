import React from 'react'
import { IoMailOpenOutline } from "react-icons/io5";



function Footer() {
  return (
    <div id='Contact' className=' max-w-[1240px] mx-auto p-4 text-gray border-gray-600 m-10'>
      <div className='flex justify-center items-center'>
        <a className=" text-white" href='mailto:ferra.tomy@gmail.com' rel='noopener' target='_blank'>
          <div className='flex p-2'>
            <IoMailOpenOutline className="text-white flex justify-center object-center items-center my-auto" size={30}/>
            <p className='p-2'>Contactame!</p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Footer;