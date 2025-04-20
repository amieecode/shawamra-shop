import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import api from '../axios';

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await api.get("/products/");
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <h2 className='text-3xl font-bold mb-6'>Our Shawarma Menu</h2>
      <div className='grid grid-col=-21 sm;grid-cols-2 lg:grid-col-3 gap-6'>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
