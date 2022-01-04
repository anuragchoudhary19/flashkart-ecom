import React from 'react';
import LoadingCard from '../Card/LoadingCard';
import ProductCard from '../Card/ProductCard';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './Carousel.module.css';

const Carousel = ({ carouselName, loading, products, page, setPage }) => {
  return (
    <div className={styles.carousel}>
      <header>{carouselName}</header>
      {page > 1 && (
        <button className={styles.back} onClick={() => setPage((currentPage) => --currentPage)}>
          <LeftOutlined style={{ fontSize: '2rem' }} />
        </button>
      )}
      <div className={styles.products}>
        {loading ? (
          <div className={styles.card}>
            <LoadingCard count={4} />
          </div>
        ) : (
          products.map((product) => (
            <div className={styles.card} key={product._id}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
      {!(page === 4 || products.length <= 3) && (
        <button className={styles.next} onClick={() => setPage((currentPage) => ++currentPage)}>
          <RightOutlined style={{ fontSize: '2rem' }} />
        </button>
      )}
    </div>
  );
};

export default Carousel;
