import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Elements/Button/Button';
import { addRating, addReview } from '../../axiosFunctions/productProfile';
import styles from './Product.module.css';
import { Rate, Badge, Input } from 'antd';
const { TextArea } = Input;

const RatingAndReviews = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');
  const [count, setCount] = useState(3);
  let history = useHistory();

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  useEffect(() => {
    if (product.ratings && user) {
      let existingRating = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString());
      console.log(existingRating);
      existingRating && setStars(existingRating.stars);
    }
    if (product.reviews && user) {
      let existingReview = product.reviews.find((ele) => ele.postedBy.toString() === user._id.toString());
      console.log(existingReview);
      existingReview && setReview(existingReview.review);
    }
  }, []);
  const ratingHandle = (e) => {
    setStars(e);
    console.log(e);
  };
  const addRatingToProduct = () => {
    if (stars) {
      addRating(product._id, stars, user.token).then((res) => {
        console.log(res.data);
        setStars(0);
      });
    }
    if (review.length) {
      addReview(product._id, review, user.token).then((res) => {
        console.log(res.data);
        setReview('');
      });
    }
    setShowModal(false);
  };

  const handleModal = () => {
    console.log(history);
    if (user && user.token) {
      setShowModal(true);
    } else {
      history.push({ state: { from: `/product/${product.slug}` } });
      dispatch({
        type: 'SHOW_MODAL',
        payload: true,
      });
    }
  };

  return (
    <div className={styles.rating}>
      <div>
        <header>Reviews</header>
        <Button click={handleModal}>{user && user.token ? 'Leave a review' : 'Login to review'}</Button>
      </div>
      <div>
        {product.reviews &&
          product.reviews.map((r) => (
            <div>
              <div>
                <b>Reviewd By : {r.postedBy.name}</b>
              </div>
              <div>{r.review}</div>
            </div>
          ))}
      </div>

      {showModal && (
        <>
          <div className={styles.backdrop} onClick={() => setShowModal(false)}></div>
          <div className={styles.ratingModal}>
            <h4>Please leave a rating...</h4>
            <Rate onChange={ratingHandle} count={5} value={stars} />
            <TextArea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
            <div>
              <button style={{ color: 'red' }} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button onClick={addRatingToProduct}>OK</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RatingAndReviews;