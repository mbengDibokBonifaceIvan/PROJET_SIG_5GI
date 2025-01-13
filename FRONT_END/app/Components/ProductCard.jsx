import React from 'react'

import './ProductCard.css';

import { useNavigate } from 'react-router-dom';




const ProductCard = (props) => {

  const navigate = useNavigate();

  const handleViewMore = () => {
      navigate(props.url); // Redirige vers la page Region
  };
  return (
    // <div className='product_box'>
         <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4 shadow-md m-2 transition-transform hover:scale-105">
      {/* <div className='description'> */}
      <div className="text-center">
      <h2>{props.name}</h2>
      {/* <p className='Value'>{props.value} </p> */}
      <p className="text-gray-700 dark:text-gray-200">{props.value} </p>
      <button className='btn' onClick={handleViewMore}>Voir Plus</button>


      </div>


    </div>
  )
}

export default ProductCard

