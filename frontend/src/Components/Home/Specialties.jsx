import React from 'react';
import BeefImg from "../../assets/beef-wrap.png";
import ChickenImg from "../../assets/Chicken-wrap.png";
import KechupImg from "../../assets/kechup-wrap.png";

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
        <div className='bg-black/95 text-white'>
          <div className='container py-6 sm:py-4'>
            {/*Header Title*/}
            <h2 className='font-bold text-2xl snm:text-3xl mb-8'>Our Shawarma Specialties </h2>

            {/*Specialties card Section*/}
            <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 place-items-center'>
              {SpecialtiesData.map((data, index) => (
                <div
                  data-aos="fade-up" 
                  data-aos-delay={data.aosDelay}
                  key={index}
                  className='rounded-b-[50px] rounded-t-[50px] border-2 border-white px-6 py-8 max-w-[300px] group relative'
                >

                  {/*Image Section*/}
                  <div className='h-[200px] justify-center items-center'>
                    <img 
                      src={data.img}
                      alt={data.name}
                      className='max-w-[180px] block mx-auto transform translate-x-14 group-hover:scale-110 group-hover:rotate-6 duration-300'
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
