import React, { useEffect, useState } from 'react';
import classes from './Results.module.css'
import LayOut from '../../components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/Product/ProductCard';
import Loader from '../../components/Loader/Loader';


function Results() {
  const [results, setResults] = useState([])
  const {categoryName} = useParams();
  const [isLoader, setIsLoader] = useState(true)


  useEffect(() => {
  axios.get(`${productUrl}/products/category/${categoryName}`)
  .then((res) => {
    setResults(res.data);
    setIsLoader(false)
  }).catch((err)=> {
    console.log(err);
    setIsLoader(false);
  });

  }, [])
  
  return (
    <LayOut>
      {isLoader ? (<Loader/>) : (<section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category / {categoryName}</p>
        <hr />
          <div className={classes.products__container}>
            {results?.map((product) => (
              <ProductCard 
              key={product.id}
              renderAdd={true}
              product={product}
              />
            ))}
          </div>
      </section>)}
      
    </LayOut>
  )
}

export default Results;