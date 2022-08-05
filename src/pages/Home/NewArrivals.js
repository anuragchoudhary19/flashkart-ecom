import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { getProfiles } from '../../axiosFunctions/productProfile';
import styles from './Home.module.css';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProfiles('createdAt', 'desc', page)
      .then((res) => {
        setProducts([...res.data?.profiles]);
        setIsLastPage(res.data?.isLastPage);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return () => {
      setLoading(false);
      setProducts([]);
    };
  }, [page]);

  return (
    <div className={styles.carousel}>
      <Carousel
        carouselName='New Arrivals'
        lastPage={isLastPage}
        loading={loading}
        products={products}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default NewArrivals;
