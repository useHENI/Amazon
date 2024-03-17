import React, { useContext, useState } from 'react';
import classes from './Payment.module.css'
import LayOut from '../../components/LayOut/LayOut';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard';
import {useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

function Payment() {
  const [{basket, user}, dispatch] = useContext(DataContext);
  const [err , setErr] = useState("");
  const [processing, setProcessing] = useState(false)

  const navigate = useNavigate();


  // // price 
  const total = basket.reduce((amount, item) => {
    return  item.price * item.amount + amount
    
}, 0);

// // items number
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount
  }, 0);

  const stripe = useStripe();
  const elements = useElements();

  const handelChange = (e) => {
    setErr(e?.error?.message);
  };
  ////handlepayment
  const handlepayment = async(e) => {
    e.preventDefault();
    
    try {
      setProcessing(true);
      // 1. backend || function ----> contact client secret
      const respons = await axiosInstance({
        method:"post",
        url: `/payment/create?total=${total * 100}`,
      })
      // console.log(respons.data);
      const clientSecret = respons.data?.clientSecret ;

      // 2.clint side (react side confirmation)
      const { paymentIntent }  = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method:{
            card: elements.getElement(CardElement)
          }
        });
        // console.log(paymentIntent);

        // 3.after the confirmation ---> order firestor data base save, clear from basket
        await db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent?.id).set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        // empty the basket 
        dispatch({type:Type.EMPTY_BASKET});

        navigate("/orders", {state:{msg:"you have placed new order"}});
        setProcessing(false);
    } catch (error) {
      // console.log(error);
      setProcessing(false);
    }


  }


  return (
    <LayOut>
      <div className={classes.payment__header}>CheckOut ({totalItem}) items </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery address</h3>
          <div>
            
            <div>{user?.email}</div>
            <div>123 react lane</div>
            <div>chicago, IL</div>
          </div>
          </div>  
        <hr/>      
        <div className={classes.flex}>
          <h3>Review items end delivery</h3>
          <div>
            {
              basket?.map((item) => 
                <ProductCard  product={item} flex={true} />
              )
            }
          </div>
          </div> 
        <hr/>   


        <div className={classes.flex}>
          <h3>payment methods</h3>
          <div className={classes.payment__card}>
            <div className={classes.payment__details}>
              <form onSubmit={handlepayment}>
                {/* {card error } */}
                {err && <small style={{ color: "red" }}>{err}</small>}
                {/* {card} */}
                <CardElement onChange={handelChange} />

                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px"}}>
                      <p>Total order</p> <CurrencyFormat amount={total} />
                    </span>
                    
                  </div>
                  <button type='submit'>
                    { 
                      processing === true ? (
                      <div className={classes.loader}>
                        <ClipLoader color="grey" size={12}/>
                        <div>please wait...</div>
                      </div>) : ("Pay Now")
                    }
                    
                    </button>
                   
                </div>


              </form>
            </div>
            
          </div>
          </div>                
      </section>
        
      </LayOut>
  )
}

export default Payment;