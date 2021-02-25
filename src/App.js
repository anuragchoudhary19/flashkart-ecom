import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { currentUser } from './axiosFunctions/auth';
import { auth } from './firebase';
import 'antd/dist/antd.less';
import classes from './App.module.css';
//auth component
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/auth/Login/Login'));
const SignUp = lazy(() => import('./pages/auth/Signup/Signup'));
const SignupComplete = lazy(() => import('./pages/auth/SignupComplete/SignupComplete'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword/ForgotPassword'));
const Password = lazy(() => import('./pages/user/Password'));

//admin component
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const CreateBrand = lazy(() => import('./pages/Admin/CRUDBrand/CreateBrand/CreateBrand'));
const UpdateBrand = lazy(() => import('./pages/Admin/CRUDBrand/UpdateBrand/UpdateBrand'));
const CreateProduct = lazy(() => import('./pages/Admin/CRUDProduct/CreateProduct/CreateProduct'));
const UpdateProduct = lazy(() => import('./pages/Admin/CRUDProduct/UpdateProduct/UpdateProduct'));
const CreateProductProfile = lazy(() =>
  import('./pages/Admin/CRUDProductProfile/CreateProductProfile/CreateProductProfile')
);
const UpdateProductProfile = lazy(() =>
  import('./pages/Admin/CRUDProductProfile/UpdateProductProfile/UpdateProductProfile')
);
const ListProducts = lazy(() => import('./pages/Admin/ListProducts/ListProducts'));
const Product = lazy(() => import('./pages/Product/Product'));

const Header = lazy(() => import('./components/nav/Header/Header'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const BrandNavbar = lazy(() => import('./components/nav/BrandNavbar/BrandNavbar'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const Payment = lazy(() => import('./pages/Payment/Payment'));
const Orders = lazy(() => import('./pages/Orders/Orders'));
const OrdersByUser = lazy(() => import('./pages/Admin/Orders/Orders'));
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'));
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log(idTokenResult);
        currentUser(idTokenResult.token)
          .then((res) => {
            window.localStorage.setItem(
              'user',
              JSON.stringify({
                name: res.data.name,
                email: res.data.email,
                idToken: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              })
            );
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                idToken: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return !loading ? (
    <Suspense fallback={<div>Loading</div>}>
      <div className={classes.App}>
        <Header />
        <BrandNavbar />
        <Login />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/product/:slug' component={Product} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signup/complete' component={SignupComplete} />
          <Route exact path='/forgot/password' component={ForgotPassword} />

          <UserRoute exact path='/checkout' component={Checkout} />
          <UserRoute exact path='/payment' component={Payment} />

          <UserRoute exact path='/user/orders' component={Orders} />
          <UserRoute exact path='/user/password' component={Password} />
          <UserRoute exact path='/user/wishlist' component={Wishlist} />
          <AdminRoute exact path='/admin/orders' component={OrdersByUser} />

          <AdminRoute exact path='/admin/dashboard' component={Dashboard} />
          <AdminRoute exact path='/admin/brand' component={CreateBrand} />
          <AdminRoute exact path='/admin/brand/:update' component={UpdateBrand} />
          <AdminRoute exact path='/admin/product' component={CreateProduct} />
          <AdminRoute exact path='/admin/product/:slug' component={UpdateProduct} />
          <AdminRoute exact path='/admin/product-profile' component={CreateProductProfile} />
          <AdminRoute exact path='/admin/productProfile/update/:slug' component={UpdateProductProfile} />
          <AdminRoute exact path='/admin/products' component={ListProducts} />
        </Switch>
      </div>
    </Suspense>
  ) : null;
}

export default App;
