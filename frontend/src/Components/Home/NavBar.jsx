import React, { useState } from 'react';
import { GoPerson } from "react-icons/go";
import { CgShoppingCart } from "react-icons/cg";
import { SiSaucelabs } from "react-icons/si";
import { MdMenu } from "react-icons/md"
import ResponsiveMenu from './ResponsiveMenu';

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

  return (
    <> 
      <nav className='bg-black text-white'>
        <div className='container flex items-center justify-between py-6'>
          
          {/*Logo section*/}
          <div className='flex items-center text-2xl font-cursive'>
            <a href='#' className='flex cursor-pointer gap-2'>
              <SiSaucelabs />
              Shawamra
            </a>
          </div>

          {/*Menu Section*/}
          <div className='hidden lg:block'>
              <ul className='flex items-center gap-4'>
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
          
          
            {/*Mobile Hamburger Menu Section*/}
            <div className='lg:hidden' onClick={() => setShowMenu(!showMenu)}>
              <MdMenu className="text-4xl cursor-pointer" />
            </div>
          </div>
      </div>
    </nav>

        {/*Mobile Nav Menu*/}
          <ResponsiveMenu open={showMenu} />
    </>
  )
}

export default NavBar;