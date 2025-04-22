import React, { useEffect } from 'react';
import BeefImg from "../../assets/beef-wrap.png";
//import ChickenImg from "../../assets/Chicken-wrap.png";
//import KechupImg from "../../assets/kechup-wrap.png";
import { getAllProducts } from '../../api/cart';
import ProductCard from '../ProductCard';


const Specialties = () => {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data.results);
      } catch (err) {
        console.error("Error fetching specialties:", err);
      }
    };

    fetchSpecialties();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  return (
    <>
      <span id="services"></span>
        <div className='py-10 overflow-hidden'>
          <div className='container shadow-2xl'>
            {/*Header Title*/}
            <h2 className='font-bold text-3xl sm:text-3xl mb-10'>
              Our Shawarma Specialties
            </h2>

            {/*Specialties card Section*/}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 place-items-center'>
              {products.map((product, index) => (
                <div
                  data-aos="fade-up" 
                  data-aos-delay={index * 200}
                  key={product.id}
                  className='w-full max-w-[300px] rounded-b-[60px] rounded-t-[60px] border-2 border-white px-4 py-6 group relative'
                >

                  {/*Image Section*/}
                  <div className='h-[200px] flex justify-center items-center'>
                    <img 
                      src={product.image || BeefImg }
                      alt={product.name}
                      className='max-w-[180px] items-center mx-auto spin  cursor-pointer transform group-hover:scale-110 group-hover:rotate-6 duration-300'
                    />
                  </div>

                  {/*Text Section*/}
                  <div className='px-4 text-center'>
                    <h2 className='text-lg font-bold'>{product.name}</h2>
                    <p className='mb-2'>${product.price}</p>
                    <button 
                      className='brand-btn'
                      onClick={() => handleAddToCart(product.id)}
                    >
                        Add to Cart
                    </button>
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
