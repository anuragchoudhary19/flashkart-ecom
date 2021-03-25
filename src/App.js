import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { unsubscribe } from './functions/user';
import 'antd/dist/antd.less';
import classes from './App.module.css';
//auth component
import Home from './pages/Home/Home';

//admin component
import CreateBrand from './pages/Admin/CRUDBrand/CreateBrand/CreateBrand';
import CreateProduct from './pages/Admin/CRUDProduct/CreateProduct/CreateProduct';
import CreateProductProfile from './pages/Admin/CRUDProductProfile/CreateProductProfile/CreateProductProfile';
import CreateCoupon from './pages/Admin/CRUDCoupon/CreateCoupon';
import UpdateProductProfile from './pages/Admin/CRUDProductProfile/UpdateProductProfile/UpdateProductProfile';
import ListProducts from './pages/Admin/ListProducts/ListProducts';
import Product from './pages/Product/Product';

import Header from './components/nav/Header/Header';
import Footer from './components/nav/Footer/Footer';
import AuthModal from './components/AuthModal/AuthModal';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import BrandNavbar from './components/nav/BrandNavbar/BrandNavbar';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders';
import OrdersByUser from './pages/Admin/Orders/Orders';
import Wishlist from './pages/Wishlist/Wishlist';
import FilteredProducts from './pages/FilteredProducts/FilteredProducts';

function App() {
  const dispatch = useDispatch();

  //to check firebase auth state
  useEffect(() => {
    unsubscribe(dispatch);
    return () => unsubscribe;
  }, []);

  return (
    <div className={classes.App}>
      <Header />
      <BrandNavbar />
      <AuthModal />
      <div className={classes.content}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/product/:slug' component={Product} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/products' component={FilteredProducts} />
          <Route exact path='/search' component={FilteredProducts} />

          <UserRoute exact path='/checkout' component={Checkout} />
          <UserRoute exact path='/payment' component={Payment} />

          <UserRoute exact path='/user/orders' component={Orders} />
          {/* <UserRoute exact path='/user/password' component={Password} /> */}
          <UserRoute exact path='/user/wishlist' component={Wishlist} />
          <AdminRoute exact path='/admin/orders' component={OrdersByUser} />

          <AdminRoute exact path='/admin/brand' component={CreateBrand} />
          <AdminRoute exact path='/admin/product' component={CreateProduct} />
          <AdminRoute exact path='/admin/product-profile' component={CreateProductProfile} />
          <AdminRoute exact path='/admin/coupon' component={CreateCoupon} />
          <AdminRoute exact path='/admin/productProfile/update/:slug' component={UpdateProductProfile} />
          <AdminRoute exact path='/admin/products' component={ListProducts} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
