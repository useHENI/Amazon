import React, { useContext } from "react";

import { FaSearch } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { BiCartDownload } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{user, basket}, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount,item) => {
    return item.amount + amount
  }, 0);

  return (
    <section className={classes.fixed}>
    <section>
      <div className={classes.header__container}>
      <div className={classes.logo__container}>
        {/* {logo} */}
        <Link to={'/'}>
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="amazon logo"
          />
        </Link>
        <div className={classes.delivery}>
          
          <span>
          <LuMapPin />
          </span>
          
        <div>
          <p>Delivered to</p>
          <span>Ethiopia</span>
        </div>
        </div>
      </div>

      {/* {search} */}

      <div className={classes.search}>
        <select name="" id="">
          <option value="">All</option>
        </select>
        <input type="text" />
        <FaSearch size={25} />
      </div>

      {/* {right side link} */}
      <div className={classes.order__container}>
        <Link to="" className={classes.language}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20151118161041"
            alt="amercan flag"
          />
          <section>
            <option value="">EN</option>
          </section>
        </Link>
        {/* {three components } */}
        <Link to={!user && "/auth"}>
          <div>
            <div>
              {
                user ? <>
                <p>Hello {user?.email?.split("@")[0]}</p>
                <span onClick={()=>auth.signOut()}>Sign Out</span>
                </> 
                : 
                <>
                <p>Hello Sign-in</p>
                <span>Account & Lists</span>
                </>
              }

            </div>
             
            
          </div>
        </Link>

        <Link to="/orders">
          <p>Returns</p>
          <span>& Orders</span>
        </Link>

        <Link to="/cart" className={classes.cart}>
          <BiCartDownload size={45} />
          <span>{totalItem}</span>
        </Link>
      </div>
      </div>
    </section>
    <LowerHeader />
    </section>
  );
}

export default Header;
