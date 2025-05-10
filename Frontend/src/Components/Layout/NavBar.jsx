import React, { useState } from 'react';
import { GoPerson } from "react-icons/go";
import { CgShoppingCart } from "react-icons/cg";
import { SiSaucelabs } from "react-icons/si";
import { FaBoxOpen, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from './ResponsiveMenu';
import { motion } from "framer-motion";

const Menus = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "About Us", link: "/#about-us" },
  { id: 3, name: "Services", link: "/#services" },
  { id: 4, name: "Blog", link: "/#blog" },
  { id: 5, name: "Contact Us", link: "/#contact" },
];

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [activeMenu, setActiveMenu] = useState("Home");
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className='bg-black text-white fixed top-0 shadow-md z-10 w-full'>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='container mx-auto flex items-center justify-between py-6 px-6 lg:py-8'
        >
          {/* Logo */}
          <div className='flex items-center text-2xl font-cursive'>
            <a href="/" className='flex cursor-pointer gap-2'>
              <SiSaucelabs />
              Shawamra
            </a>
          </div>

          {/* Desktop Menu */}
          <div className='hidden lg:block'>
            <ul className='flex items-center gap-4'>
              {Menus.map((data, index) => (
                <li key={index}>
                  <a 
                    href={data.link} 
                    className={`inline-block text-xl py-1 px-3 text-white/70 transition-all hover:text-green-400 ${data.name === activeMenu ? 'underline underline-offset-[10px]' : 'hover:underline hover:underline-offset-[10px]'}`}
                  >
                    {data.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Icons Section */}
          <div className='flex items-center gap-6'>

            {/* Account Dropdown */}
            <div className='relative'>
              <div 
                onClick={() => setAccountDropdownOpen(prev => ({ ...prev, account: !prev?.account }))}
                className='flex items-center gap-1 text-white cursor-pointer hover:text-brand'
              >
                <GoPerson className='text-2xl' /> 
                <span className="flex items-center gap-1">
                  {user?.username || 'Sign In'}
                  <FaChevronDown 
                    className={`transition-transform duration-300 ${accountDropdownOpen?.account ? 'rotate-180' : ''}`} 
                  />
                </span>
              </div>

              {/* Dropdown Content */}
              {accountDropdownOpen?.account && (
                <div className='absolute left-1/2 transform -translate-x-1/2 mt-3 w-48 bg-white rounded-md shadow-md z-20 overflow-hidden text-sm'>
                  {!user ? (
                    <div className="flex justify-center items-center px-4 py-4">
                      <a
                        href="/login"
                        className="bg-brand text-white font-semibold px-6 py-2 rounded-md w-full text-center hover:opacity-90 transition"
                      >
                        Sign In
                      </a>
                    </div>
                  ) : (
                    <>
                      <a href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-800">
                        <GoPerson className='text-xl' />
                        My Profile
                      </a>
                      <a href="/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-800">
                        <FaBoxOpen className='text-lg' />
                        Orders
                      </a>
                      <button 
                        onClick={() => {
                          localStorage.removeItem('user');
                          window.location.href = '/login';
                        }} 
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-800"
                      >
                        <FaSignOutAlt className='text-lg' />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <a href='/cart' className='relative flex items-center gap-2 text-white text-xl cursor-pointer hover:text-brand'>
              <div className='relative'>
                <CgShoppingCart className='text-2xl' />
                <span className='absolute -top-1 -right-1 bg-brand text-white text-xs font-bold px-1 py-[0.02rem] rounded-full'>
                  3
                </span>
              </div>
              <span>Cart</span>
            </a>

            {/* Mobile Menu Icon */}
            <div className='lg:hidden' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <MdMenu className="text-4xl cursor-pointer" />
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      <ResponsiveMenu open={mobileMenuOpen} />
    </>
  );
};

export default NavBar;
