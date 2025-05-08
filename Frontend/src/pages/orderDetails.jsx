import React from 'react';
import OrderPage from '..pages/OrderPage';

const orderDetails = {
  orderItems: [
    {
      id: 1,
      productName: 'Product 1',
      productDescription: 'Description of Product 1',
      productImage: 'https://via.placeholder.com/100',
      quantity: 2,
      totalPrice: 40.00,
    },
    {
      id: 2,
      productName: 'Product 2',
      productDescription: 'Description of Product 2',
      productImage: 'https://via.placeholder.com/100',
      quantity: 1,
      totalPrice: 20.00,
    }
  ],
  totalItems: 3,
  totalPrice: 60.00,
};

const App = () => {
  return <OrderPage orderDetails={orderDetails} />;
};

export default App;
