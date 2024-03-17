import React, { useContext, useEffect, useState } from 'react';
import classes from './Orders.module.css';
import LayOut from '../../components/LayOut/LayOut';
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard"

function Orders() {
  const [{user}, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).collection("orders").orderBy("created", "desc").onSnapshot((snapshot) => {
        console.log(snapshot);

        setOrders(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
        )

      })

    }else {
      setOrders([]);
    }
  }, [])





  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && <div style={{padding: "20px"}}>you don't have orders yet.</div>}
          {/* {ORDERS items} */}
          <div>
            {
              orders?.map((eachOrder) => {

                return (
                  <div>
                    
                    <p>Order Id: {eachOrder?.id}</p>
                    {
                      eachOrder?.data?.basket?.map(order => {
                        return ( <ProductCard flex={true} product={order} key={order?.id} /> )
                      })
                    }
                    <hr/>
                  </div>
                )
              })

            }
          </div>
        </div>
      </section>
      
    </LayOut>
  )
}

export default Orders;