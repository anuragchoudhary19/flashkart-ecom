import React from 'react';

import LoadingCard from '../Card/LoadingCard';
import ProductCard from '../Card/ProductCard';

import styles from './ProductsCarousel.module.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const ProductsCarousel = ({ loading, products, page, setPage }) => {
  return (
    <div className={styles.carousel}>
      {page > 1 && (
        <button className={styles.back} onClick={() => setPage((currentPage) => --currentPage)} disabled={page === 1}>
          <LeftOutlined style={{ fontSize: '2rem' }} />
        </button>
      )}
      <div>
        {loading ? (
          <LoadingCard count={4} />
        ) : (
          products.map((product) => (
            <div className={styles.card} key={product._id}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
      {!(page === 3 || products.length <= 3) && (
        <button className={styles.next} onClick={() => setPage((currentPage) => ++currentPage)}>
          <RightOutlined style={{ fontSize: '2rem' }} />
        </button>
      )}
    </div>
  );
};

export default ProductsCarousel;
