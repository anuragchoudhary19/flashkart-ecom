import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
//components
import Button from './../../components/Elements/Button/Button';
import RatingAndReviews from './RatingAndReviews';
import StarRating from '../../components/StarRating/StarRating';
import RelatedProducts from './RelatedProducts';
//functons
import { getProductProfile } from '../../axiosFunctions/productProfile';
import { useAddToCart } from '../../Hooks/useAddToCart';
//css
import classes from './Product.module.css';
import { Carousel, Tooltip, message } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import Specifications from './Specifications';
import { addToWishlist, removeFromWishlist } from '../../axiosFunctions/user';
import LoadingPage from './../../components/LoadingPage/LoadingPage';

const Product = ({ match }) => {
  const { params } = match;
  const { slug } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [addToCartLoading, addItemToCart] = useAddToCart();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const loadProductProfile = async () => {
      try {
        setLoading(true);
        const { data } = await getProductProfile(slug);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    loadProductProfile();
  }, [slug, user]);
  useEffect(() => {
    const isInWishlist = () => {
      user?.wishlist?.forEach((item) => {
        if (item === product?._id) {
          setWishlist(true);
        }
      });
    };
    isInWishlist();
  }, [product, user]);

  const addToCart = () => {
    addItemToCart({ item: product, buy: false });
  };

  const proceedToBuy = () => {
    addItemToCart({ item: product, buy: true });
  };
  const slider = useRef();
  const selectImage = (j) => {
    slider.current.goTo(j);
  };

  const handleAddToWishlist = () => {
    if (!user?.token) {
      message.error('Log In to add to wishlist');
      return;
    }
    if (wishlist) {
      removeFromWishlist(user?.token, product._id).then((res) => {
        message.success('REMOVED FROM WISHLIST');
        setWishlist(false);
      });
    }
    if (!wishlist) {
      addToWishlist(user?.token, product._id).then((res) => {
        message.success('ADDED TO WISHLIST');
        setWishlist(res.data.ok);
      });
    }
  };
  if (loading)
    return (
      <div className={classes.product}>
        <LoadingPage />;
      </div>
    );
  if (product === null) return null;
  return (
    <div className={classes.product}>
      <div className={classes.description}>
        <div className={classes.carousel}>
          <div className={classes.displayImage}>
            <Carousel autoplay dots ref={(ref) => (slider.current = ref)}>
              {product.images.map((i) => (
                <img key={i.public_id} alt={product.slug} src={i.url} />
              ))}
            </Carousel>
          </div>
          <div className={classes.thumnail}>
            {product.images.map((i, j) => (
              <img key={i.public_id} alt={product.slug} src={i.url} onClick={() => selectImage(j)} />
            ))}
          </div>
          <div className={classes.buttons}>
            <Button
              style={{
                minWidth: '40%',
                width: '200px',
              }}
              loading={addToCartLoading}
              disabled={product.quantity === 0 ? true : false}
              click={addToCart}>
              {product.quantity === 0 ? 'Out Of Stock' : 'Add to Cart'}
            </Button>
            {product.quantity > 0 && (
              <Button
                style={{
                  minWidth: '40%',
                  width: '200px',
                }}
                disabled={product.quantity === 0 ? true : false}
                click={proceedToBuy}>
                Proceed to Buy
              </Button>
            )}
          </div>
        </div>
        <div className={classes.profile}>
          <div className={classes.title}>
            <span>{product.title}</span>
            <div onClick={handleAddToWishlist}>
              <Tooltip title={wishlist ? 'Wishlisted' : 'Add To Wishlist'}>
                <HeartTwoTone twoToneColor={wishlist ? '#d62828' : 'grey'} />
              </Tooltip>
            </div>
          </div>
          <div className={classes.stars}>
            {product.ratings?.length > 0 && (
              <span>
                <StarRating ratings={product.ratings} />
                <span>{`${product.ratings.length} ${product.ratings.length > 1 ? 'Ratings' : 'Rating'}`}</span>
              </span>
            )}
            {product.reviews?.length > 0 && (
              <span>{`${product.reviews.length} ${product.reviews.length > 1 ? 'Reviews' : 'Review'}`}</span>
            )}
          </div>
          <div className={classes.price}>
            <h3>
              <b>
                {(product.price * (1 - product.discount / 100)).toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                })}
              </b>
            </h3>
            <s>
              <b>&#8377; {product.price}</b>
            </s>
            <span>
              <b>{product && product.discount}%Off</b>
            </span>
          </div>
          <div className={classes.availability}>
            <span style={{ color: 'green' }}>{product.quantity > 100 ? 'In Stock' : ''}</span>
            <span style={{ color: 'red' }}>
              {product.quantity < 100 && product.quantity > 0 ? `Only few left in stock` : ''}
            </span>
            <span style={{ color: '#c7cfb7' }}>{product.quantity === 0 ? `Out of Stock` : ''}</span>
          </div>
          <Specifications product={product} />
          <RatingAndReviews product={product} ratings={product.ratings} />
        </div>
      </div>
      <div className={classes.related}>
        <RelatedProducts brand={product.brand} />
      </div>
    </div>
  );
};

export default Product;
