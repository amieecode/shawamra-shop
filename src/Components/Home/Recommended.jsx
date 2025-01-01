import React from 'react';
import RecomImage from "../../assets/best.png";
import Leaf from "../../assets/green-leaf.png";

const Recommended = () => {
  return (
    <>
    <span id="about-us"></span>
    <div className='py-10 bg-gradient-to-r from-black to-gray-600/30 text-white px-4 overflow-hidden relative'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold uppercase mb-2 text-gray-300' data-aos="zoom-out">Our Recommended Shawarma</h2>
        
        <div className='flex flex-col md:flex-row items-center'>
          {/*Image Section*/}
          <div className='flex justify-center w-full md:w-1/2' data-aos="zoom-in">
            <img src={RecomImage} className=' cursor-pointer' />
          </div>

          {/*Text section*/}
          <div className='w-full md:w-1/2'>
            <h2 className='text-3xl font-bold mb-4 text-gray-300' data-aos="fade-up">Beef Shawarma Wrap</h2>
            <p className='text-gray-300 leading-relaxed' data-aos="fade-up">
              Indulge in our signature beef Shawarma, marinated with a unique blend of traditional 
              Middle Eastern spices, slow-cooked to perfection, and served in a warm pita wrap. 
              Topped with fresh vegetables, pickles, and your choice of our signature garlic or 
              tahini sauce, this dish is a delightful explosion of flavors. 
              Enjoy it alongside crispy fries and a refreshing drink for the ultimate meal to 
              satisfy your cravings. Whether you're dining in or on the go, this offer is too good to miss!   
            </p>
            <button className='mt-8 brand-btn' data-aos="slide-left">Add to Cart</button>
          </div>
        </div>

        {/*leaf*/}
        <div className='w-[100px] h-[100px] md:w-[300px] md:h-[300px] absolute -top-8 md:-top-16 right-0 pointer-events-none'>
          <img src={Leaf} alt="" className='transform rotate-[140deg]' />
        </div>
      </div>
    </div>
    </>
  )
}

export default Recommended;
