import React from 'react'
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdMarkEmailUnread } from 'react-icons/md';

const FooterLinks =[
    {
      title: "Home",
      link: "/#",
    },
    {
      title: "About Us",
      link: "/#about-us",
    },
    {
      title: "Services",
      link: "/#services",
    },
    {
      title: "Blog",
      link: "/#blog",
    },
    {
      title: "Contact Us",
      link: "/#contact-us",
    }
];

const Footer = () => {
  return (
    <div className=''>
      <div data-aos='fade-up' className='container mx-auto text-white px-6 py-6 lg:py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between overflow-hidden'>
        {/*Brand Name*/}
          <div className='font-cursive text-2xl sm:text-3xl font-semibold mb-8 lg:mb-0 lg:text-center text-left'>
            <a href="/#">Shawamra</a>
          </div>
            {/*Navigation Links*/}
            <ul className='flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-6 lg:text-center text-left mb-4 lg:mb-0'>
              {FooterLinks.map((data, index) => (
                <li key={index} className='w-full lg:w-auto'>
                  <a 
                    href={data.link}
                    className='hover:text-green-500 duration-200'
                  >
                    {data.title}
                  </a>
                </li>
              ))}
            </ul>

            {/*Quick links*/}
            <div className='flex lg:justify-end lg:text-center text-left space-x-8 mt-4 lg:mt-0'>
              <a href="#">
                <FaInstagram className='text-3xl hover:scale-125 duration-300'/>
              </a>
              <a href="#">
                <FaFacebook className='text-3xl hover:scale-125 duration-300' />
              </a>
              <a href="#">
                <FaTiktok className='text-3xl hover:scale-125 duration-300'/>
              </a>
            </div>        
      </div>
      <span className="block w-full border-[1px] border-slate-800"></span>
        
      <section className='flex flex-col lg:flex-row justify-center w-full'>
        <section className='flex flex-col justify-center my-[2rem] w-full lg:w-[20%] h-[20rem]'>
          {/*Phone Number*/}
          <div data-aos='zoom-in' data-aos-duration='1000' className='flex w-[90%] p-4 bg-white rounded-[10px] space-x-6'>
            <span className='w-12 h-12 flex justify-center items-center rounded-full bg-slate-200'>
              <FaPhone className='text-green-600 block' />
            </span>
            <span className='capitalize block'>
              <h2 className='font-semibold text-slate-900'>Phone Number</h2>
              <h2 className='text-slate-900 text-[14px]'>+44 70568109</h2>
            </span>
          </div>

          {/*Email*/}
          <div data-aos='zoom-in' data-aos-duration='1000' className='flex w-[90%] p-4 bg-white rounded-[10px] my-8 space-x-6'>
            <span className='w-12 h-12 flex justify-center items-center rounded-full bg-slate-200'>
              <MdMarkEmailUnread className='text-green-600 block' />
            </span>
            <span className=' block'>
              <h2 className='font-semibold text-slate-900 capitalize'>Email</h2>
              <h2 className='text-slate-900 text-[14px]'>shop@shawamra.com</h2>
            </span>
          </div>

          {/*Location*/}
          <div data-aos='zoom-in' data-aos-duration='1000' className='flex w-[90%] p-4 bg-white rounded-[10px] space-x-6'>
            <span className='w-20 h-12 flex justify-center items-center rounded-full bg-slate-200'>
              <FaLocationDot className='text-green-600 block' />
            </span>
            <span className=' block'>
              <h2 className='font-semibold text-slate-900 capitalize'>Location</h2>
              <h2 className='text-slate-900 text-[14px]'>498 Queen St W, Toronto, ON M6J 1E3, Canada</h2>
            </span>
          </div>

          {/*Map Section*/}

        </section>
      </section>

      {/*Reserved section*/}
      <section className='bg-gray-600/30 text-white flex justify-center mt-8 lg:mt-0 py-4'>
        <p>&copy; 2024 Shawarma. All Rights Reserved.</p>
      </section>
     
    </div>

  )
}

export default Footer
