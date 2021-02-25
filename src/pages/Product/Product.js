import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//dependency
import _ from 'lodash';
//components
import Button from './../../components/Elements/Button/Button';
//functons
import { getProductProfile } from '../../axiosFunctions/productProfile';
import { addToCart } from '../../axiosFunctions/cart';
//css
import classes from './Product.module.css';
import { Carousel, Select, Badge, Tooltip } from 'antd';
import { StarFilled, HeartTwoTone } from '@ant-design/icons';
import Specifications from './Specifications';
import CartContent from '../Cart/CartProducts';
import { addToWishlist } from '../../axiosFunctions/user';

const Product = ({ match, history }) => {
  const [product, setProduct] = useState({});
  const [color, setColor] = useState('');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const { user, localCart, savedForLater } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    loadProductProfile();
    return loadProductProfile;
  }, []);
  const loadProductProfile = async () => {
    setLoading(true);
    await getProductProfile(match.params.slug)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const calculate = (array) => {
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;
    array.forEach((item) => {
      totalPrice += item.price;
      totalDiscountedPrice += item.price * (1 - item.discount / 100) * item.count;
      totalItems += 1;
    });
    return { totalPrice, totalDiscountedPrice, totalItems };
  };

  const addToCartHandle = async () => {
    if (color === '') {
      setError('Please select color');
      return;
    }
    let products = [];
    let uniqueArray = [];
    let orderSummary;
    let cart;
    let addedToCart = false;
    let addedToCartDB = false;
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('localCart')) {
        cart = JSON.parse(localStorage.getItem('localCart'));
        products = cart.products;
      }
      products.push({
        ...product,
        color: color,
        count: 1,
      });
      uniqueArray = _.uniqWith(products, _.isEqual);
      orderSummary = calculate(uniqueArray);
      localStorage.setItem('localCart', JSON.stringify({ products: uniqueArray, ...orderSummary }));
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: { products: uniqueArray, ...orderSummary },
    });
    addedToCart = true;
    if (user) {
      await addToCart(user.idToken, uniqueArray)
        .then((res) => {
          addedToCartDB = res.data.successful;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return Promise.resolve(addedToCart || addedToCartDB);
  };
  const proceedToBuy = async () => {
    await addToCartHandle().then((res) => {
      if (res) {
        history.push('/cart');
      }
    });
  };
  const slider = useRef();
  const selectImage = (j) => {
    slider.current.goTo(j);
  };
  const handleAddToWishlist = () => {
    console.log(product._id);
    addToWishlist(user.idToken, product._id).then((res) => {
      setAddedToWishlist(res.data.ok);
      console.log(res.data);
    });
  };
  return (
    !loading && (
      <div className={classes.product}>
        <div className={classes.productProfile}>
          <div className={classes.carousel}>
            <Carousel autoplay dots ref={(ref) => (slider.current = ref)}>
              {product.images && product.images.map((i) => <img key={i.public_id} alt='img' src={i.url} />)}
            </Carousel>
            <div className={classes.thumnail}>
              {product.images &&
                product.images.map((i, j) => (
                  <img key={i.public_id} alt='img' src={i.url} onClick={() => selectImage(j)} />
                ))}
            </div>
          </div>
          <div className={classes.profile}>
            <div className={classes.title}>
              <span>{product.title}</span>
              <div onClick={handleAddToWishlist}>
                <Tooltip title={addedToWishlist ? 'Added To Wishlist' : 'Add To Wishlist'}>
                  <HeartTwoTone twoToneColor={addedToWishlist ? '#eb2f96' : '#342ead'} />
                </Tooltip>
              </div>
            </div>
            <div className={classes.rating}>
              {product.rating > 0 && (
                <span>
                  {product.rating}
                  <StarFilled />
                </span>
              )}
              <span>
                {product.reviews && product.reviews.length > 0 ? product.reviews.length : 'Be the first one to review'}
              </span>
            </div>
            <div className={classes.price}>
              <h2>
                <b>&#8377; {product.price * (1 - product.discount / 100)}</b>
              </h2>
              <s>
                <b>&#8377; {product.price}</b>
              </s>
              <span>
                <b>{product && product.discount}%Off</b>
              </span>
            </div>
            <div className={classes.availability}>
              <span style={{ color: 'green' }}>{product.quantity > 100 ? 'Available' : ''}</span>
              <span style={{ color: 'red' }}>
                {product.quantity < 100 && product.quantity > 0 ? `Only few left in stock` : ''}
              </span>
              <span style={{ color: '#c7cfb7' }}>{product.quantity === 0 ? `Out of Stock` : ''}</span>
            </div>
            {/* <div className={classes.ram}>
            <div>
              <b>RAM</b>
            </div>
            <Button style={selectRAMStyle}>8 GB</Button>
            <Button style={selectRAMStyle}>16 GB</Button>
          </div>
          <div className={classes.ram}>
            <div>
              <b>Internal storage</b>
            </div>
            <Button style={selectRAMStyle}>8 GB</Button>
            <Button style={selectRAMStyle}>16 GB</Button>
          </div> */}
            <div className={classes.color}>
              <span>
                <b>Colors</b>
              </span>
              <div>
                {product.specification &&
                  product.specification.colors.map((c) => (
                    <Button
                      key={c}
                      style={{
                        backgroundImage: 'none',
                        backgroundColor: c,
                        width: '40px',
                        height: '40px',
                        border: color === c ? '4px solid #fdb827' : '1px solid #ccc',
                      }}
                      click={() => {
                        setColor(c);
                        setError('');
                      }}
                    />
                  ))}
              </div>
              {<span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>}
            </div>
            <div className={classes.buttons}>
              <Button
                style={{
                  width: '30%',
                  height: '3rem',
                }}
                disabled={product.quantity === 0 ? true : false}
                click={addToCartHandle}>
                Add to Cart
              </Button>
              <Button
                style={{
                  width: '30%',
                  height: '3rem',
                }}
                disabled={product.quantity === 0 ? true : false}
                click={proceedToBuy}>
                Proceed to Buy
              </Button>
            </div>
            <Specifications product={product} />
          </div>
        </div>
        <div className={classes.related}>Related Products</div>
        {confirmation && localCart.length && (
          <div className={classes.confirmation}>
            <span onClick={() => setConfirmation(false)}>CLOSE</span>
            <CartContent localCart={localCart} user={user} savedForLater={savedForLater} />
          </div>
        )}
        {/* <pre>{JSON.stringify(product, null, '\t')}</pre> */}
      </div>
    )
  );
};

export default Product;
