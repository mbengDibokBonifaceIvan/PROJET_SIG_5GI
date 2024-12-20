import React from 'react'

import './ProductCard.css';

import { useNavigate } from 'react-router-dom';




const ProductCard = (props) => {

  const navigate = useNavigate();

  const handleViewMore = () => {
      navigate(props.url); // Redirige vers la page Region
  };
  return (
    <div className='product_box'>
      
      <div className='description'>
      <h2>{props.name}</h2>
      <p className='Value'>{props.value} </p>
      
      <button className='btn' onClick={handleViewMore}>Voir Plus</button>


      </div>


    </div>
  )
}

export default ProductCard

