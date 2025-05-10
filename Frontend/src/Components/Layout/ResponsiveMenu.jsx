import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';

const ResponsiveData = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "About Us", link: "/#about-us" },
  { id: 3, name: "Services", link: "/#services" },
  { id: 4, name: "Blog", link: "/#blog" },
  { id: 5, name: "Contact Us", link: "/#contact-us" },
];

const ResponsiveMenu = ({ open, onClose }) => {
  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <AnimatePresence mode='wait'>
      {open && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-screen z-[99] bg-black/90 text-white lg:hidden"
        >
          <div className='pt-24 px-6'>
            <ul className='flex flex-col justify-center items-center gap-10 text-xl'>
              {ResponsiveData.map((data) => (
                <li key={data.id}>
                  <a
                    href={data.link}
                    onClick={onClose} // Close menu on click
                    className='text-white/70 transition-all hover:text-brand hover:underline hover:underline-offset-[10px]'
                  >
                    {data.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
