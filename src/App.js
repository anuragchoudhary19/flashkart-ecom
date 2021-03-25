import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { unsubscribe } from './functions/user';

import LoadingPage from './components/LoadingPage/LoadingPage';

import classes from './App.module.css';
import 'antd/dist/antd.less';

//auth component
// import Home from './pages/Home/Home';

//admin component
// import CreateBrand from './pages/Admin/CRUDBrand/CreateBrand/CreateBrand';
// import CreateProduct from './pages/Admin/CRUDProduct/CreateProduct/CreateProduct';
// import CreateProductProfile from './pages/Admin/CRUDProductProfile/CreateProductProfile/CreateProductProfile';
// import CreateCoupon from './pages/Admin/CRUDCoupon/CreateCoupon';
// import UpdateProductProfile from './pages/Admin/CRUDProductProfile/UpdateProductProfile/UpdateProductProfile';
// import ListProducts from './pages/Admin/ListProducts/ListProducts';
// import Product from './pages/Product/Product';

// import Header from './components/nav/Header/Header';
// import Footer from './components/nav/Footer/Footer';
// import AuthModal from './components/AuthModal/AuthModal';
// import UserRoute from './components/routes/UserRoute';
// import AdminRoute from './components/routes/AdminRoute';
// import BrandNavbar from './components/nav/BrandNavbar/BrandNavbar';
// import Cart from './pages/Cart/Cart';
// import Checkout from './pages/Checkout/Checkout';
// import Payment from './pages/Payment/Payment';
// import Orders from './pages/Orders/Orders';
// import OrdersByUser from './pages/Admin/Orders/Orders';
// import Wishlist from './pages/Wishlist/Wishlist';
// import FilteredProducts from './pages/FilteredProducts/FilteredProducts';

//auth component
const Home = lazy(() => import('./pages/Home/Home'));
//admin component
const CreateBrand = lazy(() => import('./pages/Admin/CRUDBrand/CreateBrand/CreateBrand'));
const CreateProduct = lazy(() => import('./pages/Admin/CRUDProduct/CreateProduct/CreateProduct'));
const CreateProductProfile = lazy(() =>
  import('./pages/Admin/CRUDProductProfile/CreateProductProfile/CreateProductProfile')
);
const CreateCoupon = lazy(() => import('./pages/Admin/CRUDCoupon/CreateCoupon'));
const UpdateProductProfile = lazy(() =>
  import('./pages/Admin/CRUDProductProfile/UpdateProductProfile/UpdateProductProfile')
);
const ListProducts = lazy(() => import('./pages/Admin/ListProducts/ListProducts'));
const Product = lazy(() => import('./pages/Product/Product'));

const Header = lazy(() => import('./components/nav/Header/Header'));
const Footer = lazy(() => import('./components/nav/Footer/Footer'));
const AuthModal = lazy(() => import('./components/AuthModal/AuthModal'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const BrandNavbar = lazy(() => import('./components/nav/BrandNavbar/BrandNavbar'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const Payment = lazy(() => import('./pages/Payment/Payment'));
const Orders = lazy(() => import('./pages/Orders/Orders'));
const OrdersByUser = lazy(() => import('./pages/Admin/Orders/Orders'));
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'));
const FilteredProducts = lazy(() => import('./pages/FilteredProducts/FilteredProducts'));

function App() {
  const dispatch = useDispatch();

  //to check firebase auth state
  useEffect(() => {
    unsubscribe(dispatch);
    return () => unsubscribe;
  }, []);

  return (
    <Suspense
      fallback={
        <div>
          <LoadingPage />
        </div>
      }>
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
    </Suspense>
  );
}

export default App;
