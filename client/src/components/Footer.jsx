import React from 'react'
import {assets} from '../assets/assets' 
export const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 t-20'>
<img src={assets.logo}  alt="logo" width={150} />
<p className='flex-1 broder-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @GreatStack.dev |All right reserved. </p>
<div className='flex gap-2.5'>

    <img    src={assets.facebook_icon} alt="facebook" width={35}/>
    <img    src={assets.twitter_icon} alt="facebook" width={35}/>
    <img    src={assets.instagram_icon} alt="facebook" width={35}/>
</div>
    </div>
  )
}
