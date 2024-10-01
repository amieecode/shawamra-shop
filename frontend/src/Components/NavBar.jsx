import React from 'react';

const NavBar = () => {
  return (
    <div className='bg-black text-white'> 
      <div className='container py-2'>
        <div className='flex justify-between items-center gap-4'>
          
          {/*Logo section*/}
          <div className='flex items-center'>
              <a href="#" className=' font-light text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive'>
                  Shawamra
              </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
