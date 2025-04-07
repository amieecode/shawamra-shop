import {motion, AnimatePresence } from 'framer-motion';
import React from 'react'

const ResponsiveData = [
    { id: 1, name: "Home", link: "/#" },
    { id: 2, name: "About Us", link: "/#about-us" },
    { id: 3, name: "Services", link: "/#services" },
    { id: 4, name: "Blog", link: "/#blog" },
    { id: 5, name: "Contact Us", link: "/#contact-us" },
];

const ResponsiveMenu = ({ open }) => {
  return (
    <AnimatePresence mode='wait'>
      {
        open && (
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate= {{ opacity: 1, y: 0 }}
                transition={{ duration:0.3 }}
                exit={{ opacity: 0, y: -100 }}
                className="fixed top-20 left-0 w-full h-screen z-[99] lg:hidden"
            
            >
                <div className='text-xl bg-black/90 text-white py-10 m-6 rounded-3xl'>
                    <ul className='flex flex-col justify-center items-center gap-10'>
                       {ResponsiveData.map((data, index) => (
                           <li key={index}>
                                <a href={data.link} className=' text-white/70 transition-all hover:text-brand hover:underline hover:underline-offset-[10px]'>
                                    {data.name}
                                </a>
                           </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default ResponsiveMenu;
