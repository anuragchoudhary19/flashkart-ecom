import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
//
import LoadingPage from './components/LoadingPage/LoadingPage';
//
import { useUnsubscribe } from './Hooks/useUnsubscribe';
import '@stripe/stripe-js';
//
import classes from './App.module.css';
import 'antd/dist/antd.less';
// import Search from './components/Search/Search';
// import Sidebar from './components/Sidebar/Sidebar';
// import SearchBar from './components/SearchBar/SearchBar';

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
const SignUpComplete = lazy(() => import('./pages/auth/SignupComplete/SignupComplete'));
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

const Header = lazy(() => import('./components/Header/Header'));
const Footer = lazy(() => import('./components/nav/Footer/Footer'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const BrandNavbar = lazy(() => import('./components/nav/BrandNavbar/BrandNavbar'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const Payment = lazy(() => import('./pages/Payment/Payment'));
const PaymentSuccessful = lazy(() => import('./pages/Payment/PaymentSuccessful'));
const Orders = lazy(() => import('./pages/Orders/Orders'));
const OrdersByUsers = lazy(() => import('./pages/Orders/OrdersByUsers'));
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'));
const SearchResults = lazy(() => import('./pages/SearchResults/SearchResults'));

function App() {
  useUnsubscribe();
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
        <div className={classes.main}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup/complete' component={SignUpComplete} />
            <Route exact path='/product/:slug' component={Product} />
            <Route exact path='/search' component={SearchResults} />
            <Route exact path='/products' component={SearchResults} />
            <Route exact path='/cart' component={Cart} />

            <UserRoute exact path='/checkout' component={Checkout} />
            <UserRoute exact path='/payment' component={Payment} />
            <UserRoute exact path='/payment/success' component={PaymentSuccessful} />
            <UserRoute exact path='/user/orders' component={Orders} />
            <UserRoute exact path='/user/wishlist' component={Wishlist} />

            <AdminRoute exact path='/admin/orders' component={OrdersByUsers} />
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
