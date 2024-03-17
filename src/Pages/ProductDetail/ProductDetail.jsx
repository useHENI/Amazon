import React, { useEffect, useState } from 'react'
import LayOut from '../../components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/Product/ProductCard';
import Loader from '../../components/Loader/Loader';
import classes from './ProductDetail.module.css';

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const {productId} = useParams();
  // console.log(productId)
  useEffect(() => {
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=> {
      setProduct(res.data);
      setIsLoader(false);
    }).catch((err)=>{
      console.log(err);
      setIsLoader(false)
    })
  }, [])

  // console.log(product);
  return (
    <LayOut>
      <section className={classes.productDetail}>
      {isLoader ? (<Loader/>) : (<ProductCard 
      product={product}
      flex={true}
      renderDesc={true}
      renderAdd={true}
      />)}
      </section>
    </LayOut>
  )
}

export default ProductDetail;