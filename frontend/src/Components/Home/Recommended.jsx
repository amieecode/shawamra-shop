import React from 'react';
import RecomImage from "../../assets/best.png";

const Recommended = () => {
  return (
    <div className='py-10'>
      <div className='container'>
        <h2 className='text-2xl font-bold uppercase text-gray-300'>Our Recommended Shawarma</h2>
        <div className='flex items-center'>
          {/*Image Section*/}
          <div className=''>
            <img src={RecomImage} />
          </div>

          {/*Text section*/}
          <div>
            <h2>Beef Shawarma Wrap</h2>
            <p>Indulge in our signature beef Shawarma, marinated with a unique blend of traditional 
              Middle Eastern spices, slow-cooked to perfection, and served in a warm pita wrap. 
              Topped with fresh vegetables, pickles, and your choice of our signature garlic or 
              tahini sauce, this dish is a delightful explosion of flavors. 
              Enjoy it alongside crispy fries and a refreshing drink for the ultimate meal to 
              satisfy your cravings. Whether you're dining in or on the go, this offer is too good to miss!   
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommended;
