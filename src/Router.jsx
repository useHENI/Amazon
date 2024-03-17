import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Auth from './Pages/Auth/Auth';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Footer from './components/footer/Footer';

const stripePromise = loadStripe('pk_test_51OogfMJwTTQ4EtLbBNBaQ8n4BN8nT9Jzcc34c53bgWg56fjPG88AWFFu2N0mYXCZ9Pfac071GpC5hVLhos8bvzOA00wMzMZXAZ');

function Routing() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<><Landing /> <Footer /> </>} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/payments' element={
            <ProtectedRoute msg={"you must log in to pay !"} redirect={"/payments"}>
            <Elements stripe={stripePromise} >
            <Payment />
            </Elements>
            </ProtectedRoute>
          } />
            
            <Route path='/orders' element={
            <ProtectedRoute msg={"you must log in to access your order"} redirect={"/orders"}>
            <Orders />
            </ProtectedRoute> } />
            <Route path='/category/:categoryName' element={<Results />} />
            <Route path='/products/:productId' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
        </Routes>
    </Router>
  )
}

export default Routing;