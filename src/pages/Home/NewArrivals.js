import React, { useEffect, useState, useReducer } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { getProfiles } from '../../axiosFunctions/productProfile';
import { productsReducer, INITIAL_STATE } from './productsReducer';
import styles from './Home.module.css';

const NewArrivals = () => {
  const [state, dispatch] = useReducer(productsReducer, INITIAL_STATE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) dispatch({ type: 'FECTHING' });
    getProfiles('createdAt', 'desc', page)
      .then((res) => {
        if (isMounted)
          dispatch({
            type: 'FECTHED',
            payload: {
              loading: true,
              products: res.data.profiles,
              isLastPage: res.data.isLastPage,
            },
          });
      })
      .catch((err) => {
        if (isMounted)
          dispatch({
            type: 'ERROR',
            payload: {
              loading: false,
            },
          });
      });
    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div className={styles.carousel}>
      <Carousel
        carouselName='New Arrivals'
        lastPage={state.isLastPage}
        loading={state.loading}
        products={state.products}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default NewArrivals;
