import React from 'react';
import LoadingCard from '../Card/LoadingCard';
import ProductCard from '../Card/ProductCard';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './Carousel.module.css';

const Carousel = ({ carouselName, loading, products, page, setPage, lastPage }) => {
  return (
    <div className={styles.carousel}>
      <header>{carouselName}</header>
      <div className={styles.products}>
        <div className={styles.back}>
          {page > 1 && (
            <button onClick={() => setPage((currentPage) => --currentPage)}>
              <LeftOutlined style={{ fontSize: '2em' }} />
            </button>
          )}
        </div>
        <div className={styles.list}>
          {loading ? (
            <div className={styles.card}>
              <LoadingCard count={4} />
            </div>
          ) : (
            products?.map((product) => (
              <div className={styles.card} key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
        <div className={styles.next}>
          {!lastPage && (
            <button onClick={() => setPage((currentPage) => ++currentPage)}>
              <RightOutlined style={{ fontSize: '2em' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
