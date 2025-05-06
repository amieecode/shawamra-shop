import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroImg from '../../assets/hero.png';


const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='min-h-[550px] sm:min-h-[600px] bg-black text-white flex justify-center items-center mt-8'>
        <div className='container pb-8 sm:pb-0'>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
              {/*Text content section*/}
                <div className='order-2 sm:order-1 flex flex-col justify-center gap-6'>
                  <h2
                    data-aos="fade-up"
                    data-aos-once="true" 
                    className='text-5xl sm:text-6xl lg:text-7xl font-bold'
                  >
                    Experience the<br /> 
                    Best Shawarma<br />
                    in Town!
                  </h2>
                  <p
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    Delicious, Juicy, and Packed with Flavor <br/> Your Perfect Shawarma Awaits!
                  </p>
                
                  <div data-aos="fade-up" data-aos-delay="700" className='flex gap-4'>
                    <button onClick={() => navigate('/#')} className='brand-btn'>Order now</button>
                    {" "}
                    <button onClick={() => navigate('/#')} className='brand-btn'>View Menu</button>
                  </div>
                </div>
                {/*Image Section*/}
                <div data-aos="zoom-in" className='min-h-[450px] flex justify-center items-center relative order-1 sm:order-2'>
                  <img 
                    src={HeroImg} 
                    alt=''
                    className='w-[400px] sm:w-[450px] m-auto  cursor-pointer'
                  />
                </div>
            </div>
        </div>
      </div>
    </>

  )
}

export default Hero;
