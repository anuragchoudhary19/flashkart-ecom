import _ from 'lodash';
import { addToCart } from '../axiosFunctions/cart';
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

export const addToCartHandle = async (product, dispatch, user) => {
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
    await addToCart(user.token, uniqueArray)
      .then((res) => {
        addedToCartDB = res.data.successful;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return Promise.resolve(addedToCart || addedToCartDB);
};
