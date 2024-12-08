import React from 'react'
import ProductCard from './ProductCard'



const Card = () => {
  return (
    <div className='product'>
      <ProductCard
      value='300'
      name="Total Candidat"
      
    />
      <ProductCard
    
      name="Total Arrondissement"
value='200'
     
       />
      <ProductCard
     
      name="Total Region"
      value='555'
      
    />
      <ProductCard
     
      name="Total Departement"
      value='70'
     
    />
      <ProductCard
       
      name="Total Bureux De Vote"
      value='150'
      
   />
      
      <ProductCard
      
      name="Total Centre De Vote"
      value='150'
/>
      
<ProductCard
      
      name="Total Electeur"
      value='190'
/>

<ProductCard
      
      name="Total Structateur"
      value='150'
/>

<ProductCard
      
      name="Total Administrateur"
      value='2000'
/>
    </div>
  )
}

export default Card
