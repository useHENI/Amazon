import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loader from '../Loader/Loader';

function Product() {
    const [Products, setProducts] = useState();
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
        .then((res) => {
            setProducts(res.data);
            setIsLoader(false);
        }).catch((err) => {
            console.log(err);
            setIsLoader(false);
        })
    }, [])


  return (
    <>
    {isLoader ? (<Loader/>) : (<section className={classes.product__container}>
        {
            Products?.map((singleProduct) => {
            return  <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
            })
        }
    </section>)}
    
    </>
  )
}

export default Product;