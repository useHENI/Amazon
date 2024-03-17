import React, { useContext } from 'react';
import classes from './Cart.module.css';
import LayOut from '../../components/LayOut/LayOut';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard'
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
function Cart() {
  const [{basket, user}, dispatch] = useContext(DataContext);
  
  const total = basket.reduce((amount, item) => {
      return  item.price * item.amount + amount
      
  }, 0)
    // console.log(basket)
    const increment = (item) => {
      dispatch({
        type:Type.ADD_TO_BASKET,
        item
      })
    }

    const decrement = (id) => {
      dispatch({
        type :Type.REMOVE_FROM_BASKET,
        id
      })
    }
  
  
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3> You shopping basket </h3>
          <hr />

          {
            basket.length==0 ? (<p>Oppo ! No item in your cart </p>) : (basket?.map((item, i) => { 
            return <section className={classes.cart_product}>
             <ProductCard
            key={i}
            product={item} 
            flex={true}
            renderDesc={true}
            renderAdd={false}
            />
            <div className={classes.btn_container}>
            <IoIosArrowUp size={20} className={classes.btn} onClick={()=>increment(item)}/>
            <span>{item.amount}</span>

            <IoIosArrowDown size={20} className={classes.btn} onClick={()=>decrement(item.id)}/>
            </div>
            </section> 
          }
            ))
          }
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p> subtotal ({basket?.length} items )</p>
              <CurrencyFormat amount={total} />
              </div>
              <span>
                <input type='Checkbox' />
                <small>This order contians a gift</small>
              </span>
              <Link to='/payments'>Continue to checkout</Link>
          </div>
        )}
        
      </section>
    </LayOut>
  )
}

export default Cart;