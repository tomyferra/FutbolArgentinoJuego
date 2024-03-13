import React from 'react'


function Footer() {
  return (
    <div id='Contact' className=' max-w-[1240px] mx-auto p-4 text-gray border-gray-600 m-10'>
      <div className='flex justify-center items-center'>
        <a className=" text-white" href='https://cafecito.app/tomyferra' rel='noopener' target='_blank'>
          <img srcset='https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_5.png' alt='Invitame un café en cafecito.app' />
        </a>
      </div>
    </div>

  )
}

export default Footer;