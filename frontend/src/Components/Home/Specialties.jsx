import React from 'react';
import BeefImg from "../../assets/beef-wrap.png";
import ChickenImg from "../../assets/Chicken-wrap.png";
import KechupImg from "../../assets/kechup-wrap.png";
import { color } from 'framer-motion';

const SpecialtiesData =[
  {
    id: 1,
    img: ChickenImg,
    name: "Chicken Shawarma Wrap",
    price: "$3.00" ,
    aosDelay: "100",
  },
  {
    id: 2,
    img: BeefImg,
    name: "Beef Shawarma Wrap",
    price: "$3.00" ,
    aosDelay: "300",
  },
  {
    id: 3,
    img: KechupImg,
    name: "Kechup Shawarma Wrap",
    price: "$2.50" ,
    aosDelay: "600",
  },
];

const Specialties = () => {
  return (
    <>
      <span id="services"></span>
        <div className='py-10 overflow-hidden'>
          <div className='container'>
            {/*Header Title*/}
            <h2 className='font-bold text-2xl sm:text-3xl mb-8'>
              Our Shawarma Specialties
            </h2>

            {/*Specialties card Section*/}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 place-items-center'>
              {SpecialtiesData.map((data, index) => (
                <div
                  data-aos="fade-up" 
                  data-aos-delay={data.aosDelay}
                  key={index}
                  className='w-full max-w-[300px] rounded-b-[60px] rounded-t-[60px] border-2 border-white px-4 py-6 group relative'
                >

                  {/*Image Section*/}
                  <div className='h-[200px] flex justify-center items-center'>
                    <img 
                      src={data.img}
                      alt={data.name}
                      className='max-w-[180px] items-center mx-auto transform group-hover:scale-110 group-hover:rotate-6 duration-300'
                    />
                  </div>

                  {/*Text Section*/}
                  <div className='px-4 text-center'>
                    <h2 className='text-lg font-bold'>{data.name}</h2>
                    <p className='mb-2'>{data.price}</p>
                    <button className='brand-btn'>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  )
}

export default Specialties;
