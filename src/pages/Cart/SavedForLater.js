// import React from 'react';
// import { useDispatch } from 'react-redux';
// import styles from './Cart.module.css';
// import { useSelector } from 'react-redux';
// import { saveForLater } from '../../axiosFunctions/cart';
// import { addToCartHandle } from '../../functions/cart';
// import Button from '../../components/Elements/Button/Button';

// const Saved = ({ setLoading }) => {
//   const { user, savedForLater } = useSelector((state) => ({ ...state }));
//   const dispatch = useDispatch();

//   const moveToCart = async (item) => {
//     setLoading(true);
//     const ok = await addToCartHandle(item, dispatch, user);
//     if (ok) {
//       removeFromSave(item._id);
//     }
//     setLoading(false);
//   };

//   const removeFromSave = (id) => {
//     setLoading(true);
//     let saved = [...savedForLater];
//     if (typeof window !== 'undefined') {
//       for (let i = 0; i < saved.length; i++) {
//         if (saved[i]._id === id) {
//           saved.splice(i, 1);
//         }
//       }
//       if (user?.token) {
//         saveForLater(user.token, saved)
//           .then((res) => {
//             localStorage.setItem('savedForLater', JSON.stringify(saved));
//             dispatch({
//               type: 'SAVE_FOR_LATER',
//               payload: saved,
//             });
//             console.log(res.data);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       } else {
//         localStorage.setItem('savedForLater', JSON.stringify(saved));
//         dispatch({
//           type: 'SAVE_FOR_LATER',
//           payload: saved,
//         });
//       }
//     }
//     setLoading(false);
//   };

//   return savedForLater?.length ? (
//     <div className={styles.cart}>
//       <header>Saved For Later</header>
//       {savedForLater?.map((item, i) => (
//         <div className={styles.tableRow} key={i}>
//           <div className={styles.product}>
//             <div>
//               <img alt='img' src={item?.product.images[0]?.url} width='150px' height='200px' />
//             </div>
//             <div>
//               <b>{item.product.title}</b>
//               <b>
//                 &#8377;
//                 {item.product.price * (1 - item.product.discount / 100) * item.count}
//               </b>
//               <span>
//                 <s>
//                   &#8377;
//                   {item.product.price * item.count}
//                 </s>
//                 <b style={{ marginLeft: '5px', color: 'green' }}>
//                   {item.product.discount}
//                   %off
//                 </b>
//               </span>
//             </div>
//           </div>
//           <div className={styles.controls}>
//             <div>
//               <Button disabled>+</Button>
//               <div style={{ width: 'fit-content', padding: '0.5rem', height: '100%', border: '1px solid #ccc' }}>
//                 {item.count.toString()}
//               </div>
//               <Button disabled>-</Button>
//             </div>
//             <div style={{ justifyContent: 'flex-end' }}>
//               <Button click={() => moveToCart(item)}>Move to Cart</Button>
//               <Button click={() => removeFromSave(item._id)}>Remove</Button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   ) : null;
// };

// export default Saved;
