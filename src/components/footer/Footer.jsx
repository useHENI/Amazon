import React from 'react';
import classes from './Footer.module.css'


function Footer() {
  return (
    
    <section className={classes.container}>
        <div className={classes.footer}>
        <div className={classes.left}>
        <div>
            <h3>Get to Know Us</h3>
            <p>Careers</p>
            <p>Blog</p>
            <p>About Amazon</p>
            <p>Investor Relations</p>
            <p>Amazon Devices</p>
            <p>Amazon Science</p>
        </div>
        <div>
            <h3>Make Money with Us</h3>
            <p>Sell products on Amazon</p>
            <p>Sell on Amazon Business</p>
            <p>Sell apps on Amazon</p>
            <p>Become an Affiliate</p>
            <p>Advertise Your Products</p>
            <p>Self-Publish with Us</p>
            <p>Host an Amazon Hub</p>
            <p>›See More Make Money with Us</p>
        </div>
        </div>
        <div className={classes.right}>
        <div>
            <h3>Amazon Payment Products</h3>
            <p>Amazon Business Card</p>
            <p>Shop with Points</p>
            <p>Reload Your Balance</p>
            <p>Amazon Currency Converter</p>
        </div>
        <div>
            <h3>Let Us Help You</h3>
            <p>Amazon and COVID-19</p>
            <p>Your Account</p>
            <p>Your Orders</p>
            <p>Shipping Rates & Policies</p>
            <p>Returns & Replacements</p>
            <p>Manage Your Content and Devices</p>
            <p>Amazon Assistant</p>
            <p>Help</p>
        </div>
        </div>
        </div>
        <h4 style={{color: "white", fontWeight:"100", textAlign:"center", padding: "5px" }}>
				Built By: Henok Shumi 
			</h4>
    </section>
    
  )
}

export default Footer;