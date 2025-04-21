import React from 'react'
import { addToCart } from '../api/cart'
import greenLeaf from '../assets/green-leaf.png';

const ProductCard = ({ product }) => {
    const handleAddToCart = async (productId) =>{
        try {
            await addToCart(productId, 1);
            alert("Added to cart!");
        } catch(err){
            console.error(err);
            alert("Failed to add to cart");
        }
    };

const imageSrc = product.image ? product.image : greenLeaf; 

  return (
    <div className='bg-white text-black p-4 rounded-lg shadow-lg w-full sm:w-[300px]'>
      <img 
        src={imageSrc} 
        alt={product.name} 
        className='w-full h-40 object-cover rounded-md' 
      />
      <h3 className='text-xl font-bold mt-2'>{product.name}</h3>
        <p className='text-sm'>{product.description}</p>
        <p className='font-semibold mt-2'>${product.price}</p>
        <button
            onClick={() => handleAddToCart(product.id)}
            className='brand-btn w-full'
        >
            Add to Cart
        </button>
    </div>
  )
}

export default ProductCard
