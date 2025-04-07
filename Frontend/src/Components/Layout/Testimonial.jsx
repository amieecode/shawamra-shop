import React,{useState} from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Leaf from "../../assets/green-leaf.png";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; 

const TestimonialData =[
    {
        id: 1,
        name:"Stan Smith",
        text: "The beef shawarma wrap was absolutely delicious! The flavors were incredible, and it was the perfect size for a quick lunch. I'll definitely be back for more!",
        img: "https://picsum.photos/101/101",
        rating: 4.5,
    },

    {
        id: 2,
        name: "Sabir ali",
        text: "The service was quick, and the staff was super friendly! I enjoyed my meal and couldn't believe how affordable it was for such high quality. Will be bringing my friends next time!",
        img: "https://picsum.photos/102/102",
        rating: 5,
    },

    {
        id: 3,
        name: "James K",
        text: "I’ve tried shawarma from many places, but this one is by far the best! The spices and the freshness of the ingredients really make a difference. Highly recommend!",
        img: "https://picsum.photos/104/104",
        rating: 3.5,
    },

    {
        id: 4,
        name: "Fatima A.",
        text: "I love the variety of options available! The chicken shawarma was flavorful and juicy, and the sauces added the perfect touch. A must-try for shawarma lovers!",
        img: "https://picsum.photos/102/102",
        rating: 4,
    },

    {
        id: 5,
        name: "Olivia ali",
        text: "Absolutely fantastic! The beef shawarma had the perfect amount of spices, and the pita was soft and warm. It's the best I've had in town!",
        img: "https://picsum.photos/101/101",
        rating: 3.7,
    },

    {
        id: 6,
        name: "Dilshed David",
        text: "Every bite of the shawarma is bursting with flavor! I can’t get enough of the garlic sauce. A great place for a satisfying meal!",
        img: "https://picsum.photos/101/101",
        rating: 4,
    },
]
const Testimonial = () => {
    const [activeSlide, setActiveSlide] = useState(0); // Track active slide index

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        beforeChange: (current, next) => setActiveSlide(next), // Update activeSlide before each transition
        customPaging: (i) => (
            <div
                className={`w-3 h-3 rounded-full ${i === activeSlide ? 'bg-white' : 'bg-gray-500'}`} // White for active, gray for inactive
            ></div>
        ),
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            
        ]
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStar = 5 - fullStars - (hasHalfStar ? 1 : 0) 
      return (
        <>
            {Array(fullStars).fill().map((_, index) => (
                <FaStar key={`full-${index}`} className='w-4 h-4 text-yellow-400' />
            ))}
            {hasHalfStar && <FaStarHalfAlt className='w-4 h-4 text-yellow-400'/>}
            {Array(emptyStar).fill().map((_, index) => (
               <FaStar key={`empty-${index}`} className='w-4 h-4 text-gray-400'/> 
            ))}
        </>
      );
    };

  return (
    <div className='py-14 mb-10 bg-[#0d0d0d] text-white overflow-hidden relative'>
      <div className='container'>
        {/*Header Section*/}
        <div data-aos='fade-up' className='text-center mb-10'>
            <h1 className='font-bold text-gray-300 text-4xl font-cursive'>
                Testimonials
            </h1>
        </div>

        {/*Testimonial*/}
        <div>
            <Slider {...settings}>
                {TestimonialData.map((data) => (
                     <div className='my-6' key={data.id}>
                        <div className='flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-gray-600/30 relative'>
                            {/*Image Section*/}
                            <div className='mb-4'>
                                <img 
                                    src={data.img} 
                                    alt="" 
                                    className='rounded-full w-20 h-20' 
                                />
                            </div>

                            {/*Content Section*/}
                            <div className='flex flex-col items-center gap-4'>
                                <div className='space-y-3'>
                                    <p className='text-xs text-white'>{data.text}</p>
                                    <h1 className='text-xl text-gray-400 font-bold font-cursive'>{data.name}</h1>
                                </div>
                                {/*Rating system*/}
                                <div className='flex'>
                                    {renderStars(data.rating)}
                                </div>
                            </div>
                            <p className='text-gray-600 text-9xl font-serif absolute top-0 right-0'>,,</p>
                        </div>
                     </div>
                    )
                )}
            </Slider>
        </div>

        {/*leaf*/}
        <div className='w-[100px] h-[100px] md:w-[250px] md:h-[250px] absolute -top-5 md:-top-10 -right-28 pointer-events-none'>
          <img src={Leaf} alt="" className='transform rotate-5' />
        </div>

      </div>
    </div>
  )
}

export default Testimonial
