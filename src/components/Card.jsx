import React from 'react'
import ProductCard from './ProductCard'



const Card = () => {
  return (
    <div className='product'>
      <ProductCard
      value='300'
      name="Total Candidat"
      url="/candidats" 
      
    />
      <ProductCard
    
      name="Total Arrondissement"
value='200'
url="/arrondissement"
     
       />
      <ProductCard
     
      name="Total Region"
      value='555'
      url="/region"
      
    />
      <ProductCard
     
      name="Total Departement"
      value='70'
     url="/departement"
    />
      <ProductCard
       
      name="Total Bureaux De Vote"
      value='150'
      url="/bureauvote"
      
   />
      
      <ProductCard
      
      name="Total Centre De Vote"
      value='150'
      url="/centrevote"
/>
      
<ProductCard
      
      name="Total Electeur"
      value='190'
      url="/electeur"
/>

<ProductCard
      
      name="Total Structateur"
      value='150'
      url="/strutateurs"
/>

<ProductCard
      
      name="Total Administrateur"
      value='2000'
      url="/strutateurs"
/>
    </div>
  )
}

export default Card
