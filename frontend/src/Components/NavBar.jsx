import React, { useState } from 'react';
import { GoPerson } from "react-icons/go";
import { CgShoppingCart } from "react-icons/cg";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";

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
    <div className='z-10 bg-black text-white'> 
      <div className='container py-4 md:py-2'>
        <div className='flex justify-between items-center gap-2 md:gap-4'>
          
          {/*Logo section*/}
          <div className='flex items-center'>
            <a href="#" className='text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive'>
              Shawamra
            </a>
          </div>

          {/*Nav Menu for Desktop*/}
          <div className='hidden md:block'>
            <div>
              <ul className='flex justify-between items-center gap-6'>
                {Menus.map((data, index) => (
                  <li key={index}>
                    <a href={data.link} className={`inline-block text-xl py-4 px-4 text-white/70 transition-all hover:text-white  ${data.name === activeMenu ? 'underline underline-offset-[10px]' : 'hover:underline hover:underline-offset-[10px]'} `}>
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/*Icons*/}
          <div className='hidden md:block'>
            <div className='flex items-center gap-6'>
              <GoPerson className='text-white text-2xl' />
              <CgShoppingCart className='text-white text-2xl' />
            </div>
          </div>
          
          {/*Mobile Icons + Menu Toggle*/}
          <div className='md:hidden flex items-center gap-6'>
            {/* Profile and Cart Icons */}
              <GoPerson className='text-white text-2xl' />
              <CgShoppingCart className='text-white text-2xl' />

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

        {/*Mobile Nav Menu*/}
        <div className={`${showMenu ? "block": "hidden"} z-10 h-screen w-full flex-col justify-between px-8 py-12 top-0 left-0 bg-black pt-8 transition-all md:hidden`}>
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

      </div>
    </div>
  )
}

export default NavBar;
