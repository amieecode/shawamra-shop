import React, { useState } from 'react';
import { GoPerson } from "react-icons/go";
import { CgShoppingCart } from "react-icons/cg";
import { SiSaucelabs } from "react-icons/si";
import { MdMenu } from "react-icons/md"
import ResponsiveMenu from './ResponsiveMenu';
import { motion } from "framer-motion";

const Menus = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "About Us",
    link: "/#about-us",
  },
  {
    id: 3,
    name: "Services",
    link: "/#services",
  },
  {
    id: 4,
    name: "Blog",
    link: "/#blog",
  },
  {
    id: 5,
    name: "Contact Us",
    link: "/#contact",
  },
]
const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [activeMenu, setActiveMenu] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <> 
      <nav className='bg-black text-white fixed top-0 shadow-md z-10 w-full'>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='container mx-auto flex items-center justify-between py-6 px-6 lg:py-8'
        >
          {/*Logo section*/}
          <div className='flex items-center text-2xl font-cursive'>
            <a href="/" className='flex cursor-pointer gap-2'>
              <SiSaucelabs />
              Shawamra
            </a>
          </div>

          {/*Menu Section*/}
          <div className='hidden lg:block'>
              <ul className='flex items-center gap-4'>
                {Menus.map((data, index) => (
                  <li key={index}>
                    <a 
                      href={data.link} 
                      className={`inline-block text-xl py-1 px-3 text-white/70 transition-all hover:text-green-400  ${data.name === activeMenu ? 'underline underline-offset-[10px]' : 'hover:underline hover:underline-offset-[10px]'} `}
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
          </div>

          {/*Icons section*/}
          <div className='flex items-center gap-8'>
           {/* Account Dropdown */}
<div className='relative'>
  <div 
    onClick={() => setShowMenu(prev => ({ ...prev, account: !prev?.account }))}
    className='flex items-center gap-2 text-white cursor-pointer'
  >
    <GoPerson className='text-2xl hover:text-brand' /> 
    <span>Account</span>
  </div>

  {/* Dropdown */}
  {showMenu?.account && (
    <div className='absolute right-0 mt-3 w-48 bg-white rounded-md shadow-md z-20 overflow-hidden text-sm'>
      {/* Sign In Header */}
      <div className='bg-brand text-white px-4 py-2 font-semibold'>
        Sign In
      </div>
      <hr className='border-gray-200' />

      <a href="/profile" className="block px-4 py-2 hover:bg-gray-100 text-gray-800">
        My Profile
      </a>
      <a href="/orders" className="block px-4 py-2 hover:bg-gray-100 text-gray-800">
        Orders
      </a>
      <button 
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }} 
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
      >
        Logout
      </button>
    </div>
  )}
</div>


            {/* Cart Season*/}
            <a href='/cart' className='relative flex items-center gap-2 text-white text-xl cursor-pointer'>
              {/* Cart Icon with Badge */}
              <div className='relative'>
                <CgShoppingCart className='text-2xl' />

                {/* Badge */}
                <span className='absolute -top-1 -right-1 bg-brand text-white text-xs font-bold px-1 py-[0.02rem] rounded-full'>
                  3
                </span>
              </div>
              <span>Cart</span>
            </a>
          
          
            {/*Mobile Hamburger Menu Section*/}
            <div className='lg:hidden' onClick={() => setShowMenu(!showMenu)}>
              <MdMenu className="text-4xl cursor-pointer" />
            </div>
          </div>
      </motion.div>
    </nav>

        {/*Mobile Nav Menu*/}
          <ResponsiveMenu open={showMenu} />
    </>
  )
}

export default NavBar;
