import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingCard from '../../components/Card/LoadingCard';
//functions
import { getProfiles } from '../../axiosFunctions/productProfile';
import classes from './Home.module.css';

import { Card, Pagination } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import Button from './../../components/Elements/Button/Button';

const { Meta } = Card;
const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
    return () => loadAllProducts();
  }, [page]);

  const loadAllProducts = async () => {
    setLoading(true);
    await getProfiles('createdAt', 'desc', page)
      .then((result) => {
        setProducts(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className={classes.arrivals}>
      <header>Latest Arrivals</header>
      <hr />
      <div className={classes.carousel}>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          products.map((product) => (
            <div className={classes.card} key={product._id}>
              <Link to={`/product/${product.slug}`}>
                <Card
                  bordered
                  hoverable
                  style={{ position: 'static', width: '250px', height: '300px' }}
                  cover={
                    <img
                      width='100%'
                      height='200px'
                      alt='example'
                      src={product.images[0] ? product.images[0].url : ''}
                    />
                  }>
                  <Meta title={product.title} description={product ? 'Rs ' + product.price : ''} />
                </Card>
              </Link>
              <Button>
                <span>Add to Cart</span>
                <ShoppingCartOutlined style={{ marginLeft: '10px', fontSize: '1.5rem' }} key='edit' />
              </Button>
            </div>
          ))
        )}
      </div>
      <div className={classes.pagination}>
        <Pagination
          defaultCurrent={page}
          defaultPageSize={1}
          total={3}
          onChange={(e) => setPage(e)}
          responsive
          size='medium'
        />
      </div>
    </div>
  );
};

export default NewArrivals;
