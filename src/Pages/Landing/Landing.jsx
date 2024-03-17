import React from 'react'
import Category from '../../components/Category/Category';
import CarouselEffect from '../../components/Carousel/CarouselEffect';
import LayOut from '../../components/LayOut/LayOut';
import Product from '../../components/Product/Product';


function Landing() {
  return (
    <LayOut>
        <CarouselEffect />
        <Category />
        <Product />
        
    </LayOut>
  )
}

export default Landing;
