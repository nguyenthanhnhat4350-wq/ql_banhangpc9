import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header'; 
import Footer from './components/Footer/Footer'; 
import Banner from './components/Banner/Banner'; 
import ProductList from './components/Products/ProductList';
import DetailProduct from './components/Products/DetailProduct';
import Cart from './components/Pages/Cart';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';

function App() {
  const location = useLocation();

  const hideChrome = 
    location.pathname === '/login' || 
    location.pathname === '/signup' || 
    location.pathname === '/admin';

  return (
    <>
      {/* Nếu KHÔNG PHẢI 3 trang trên thì mới hiện Header */}
      {!hideChrome && <Header />}
      
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Banner />
              <ProductList />
            </>
          } 
        />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {/* Nếu KHÔNG PHẢI 3 trang trên thì mới hiện Footer */}
      {!hideChrome && <Footer />}
    </>
  );
}

export default App;