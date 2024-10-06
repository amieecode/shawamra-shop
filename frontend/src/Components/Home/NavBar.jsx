import React, { useState } from 'react';
import { GoPerson } from "react-icons/go";
import { CgShoppingCart } from "react-icons/cg";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { SiSaucelabs } from "react-icons/si";

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
    link: "/#contact-us",
  },
]
const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <> 
      <nav className='bg-black text-white'>
        <div className='container flex items-center justify-between py-6'>
          
          {/*Logo section*/}
          <div className='flex items-center text-2xl font-cursive gap-2'>
            <SiSaucelabs />  
            <p>Shawamra</p>  
          </div>

          {/*Menu Section*/}
          <div className='hidden md:block'>
              <ul className='flex items-center gap-6'>
                {Menus.map((data, index) => (
                  <li key={index}>
                    <a href={data.link} className={`inline-block text-xl py-1 px-3 text-white/70 transition-all hover:text-white  ${data.name === activeMenu ? 'underline underline-offset-[10px]' : 'hover:underline hover:underline-offset-[10px]'} `}>
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
          </div>

          {/*Icons*/}
          <div className='flex items-center gap-6'>
            <button className='text-white text-2xl cursor-pointer'>
              <GoPerson />
            </button> 
            <button className='text-white text-2xl cursor-pointer'>
              <CgShoppingCart />
            </button> 
          </div>
          
          {/*Mobile Hamburger Menu Section*/}
          <div className='md:hidden' onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? (
                <HiMenuAlt1 
                  onClick ={toggleMenu}
                  className="cursor-pointer"
                  size={30}
                />
                ):(
                <HiMenuAlt3
                  onClick ={toggleMenu}
                  className="cursor-pointer"
                  size={30}
                />
              )}
          </div>
      </div>
    </nav>

        {/*Mobile Nav Menu*/}
        <div className={`${showMenu ? "block": "hidden"} z-10 w-full flex-col justify-between px-4 py-4 top-0 left-0 bg-black transition-all lg:hidden`}>
            <ul className='space-y-2 text-xl'>
              {Menus.map((data, index) => (
                <li key={index}>
                  <a href={data.link} className={`inline-block text-xl py-4 px-4 text-white/70 transition-all hover:text-brand  ${data.name === activeMenu ? 'underline underline-offset-[10px]' : 'hover:underline hover:underline-offset-[10px]'} `}>
                      {data.name}
                    </a>
                </li>
              ))}
            </ul>
        </div>

     
    </>
  )
}

export default NavBar;
