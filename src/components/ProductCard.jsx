import React from 'react'

import './ProductCard.css';
const ProductCard = (props) => {
  return (
    <div className='product_box'>
      
      <div className='description'>
      <h2>{props.name}</h2>
      <p className='Value'>{props.value} </p>
      
      <button className='btn'>View More</button>


      </div>


    </div>
  )
}

export default ProductCard

