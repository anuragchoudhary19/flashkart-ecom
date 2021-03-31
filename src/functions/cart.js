import _ from 'lodash';
import { addToCart } from '../axiosFunctions/cart';
import { message } from 'antd';

const calculate = (items) => {
  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalSaved = 0;
  let totalItems = 0;
  let deliveryCharges = 0;
  items.forEach((item) => {
    let discount = item.discount ? item.discount : 0;
    totalPrice += item.price;
    totalDiscountedPrice += item.price * (1 - discount / 100) * item.count;
    totalItems += 1;
  });
  totalSaved = totalPrice - totalDiscountedPrice;
  deliveryCharges = 10 * totalItems;
  return { totalPrice, totalDiscountedPrice, totalItems, totalSaved, deliveryCharges };
};

export const addToCartHandle = (item, dispatch, user) => {
  let products = [];
  let uniqueProducts = [];
  let orderSummary;
  let cart;
  let addedToCart = false;
  let addedToCartDB = false;
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
      products = cart.products;
    }
    products.push({
      ...item,
      count: 1,
    });
    uniqueProducts = _.uniqWith(products, _.isEqual);
    addedToCart = true;
    if (user?.token) {
      addToCart(user.token, uniqueProducts)
        .then((res) => {
          orderSummary = calculate(uniqueProducts);
          localStorage.setItem('cart', JSON.stringify({ products: uniqueProducts, ...orderSummary }));
          dispatch({
            type: 'ADD_TO_CART',
            payload: { products: uniqueProducts, ...orderSummary },
          });
          message.success('Added To Cart');
          addedToCartDB = res.data.successful;
        })
        .catch((err) => {
          message.success('Add To Cart Failed');
          console.log(err);
        });
    } else {
      orderSummary = calculate(uniqueProducts);
      localStorage.setItem('cart', JSON.stringify({ products: uniqueProducts, ...orderSummary }));
      dispatch({
        type: 'ADD_TO_CART',
        payload: { products: uniqueProducts, ...orderSummary },
      });
    }
  }

  return Promise.resolve(addedToCart || addedToCartDB);
};
