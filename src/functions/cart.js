import _ from 'lodash';
import { addToCart } from '../axiosFunctions/cart';

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

export const addToCartHandle = async (product, dispatch, user) => {
  let cartItems = [];
  let uniqueItems = [];
  let orderSummary;
  let cart;
  let addedToCart = false;
  let addedToCartDB = false;
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
      cartItems = cart.products;
    }
    cartItems.push({
      ...product,
      count: 1,
    });
    uniqueItems = _.uniqWith(cartItems, _.isEqual);
    orderSummary = calculate(uniqueItems);
    localStorage.setItem('cart', JSON.stringify({ products: uniqueItems, ...orderSummary }));
  }
  dispatch({
    type: 'ADD_TO_CART',
    payload: { products: uniqueItems, ...orderSummary },
  });
  addedToCart = true;
  if (user?.token) {
    await addToCart(user.token, uniqueItems)
      .then((res) => {
        addedToCartDB = res.data.successful;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return Promise.resolve(addedToCart || addedToCartDB);
};
