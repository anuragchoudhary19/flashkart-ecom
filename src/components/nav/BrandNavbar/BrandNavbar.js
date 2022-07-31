import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//components
import Dropdown from '../../Dropdown/Dropdown';
//functions
import { getBrands } from '../../../axiosFunctions/brand';
//css
import classes from './BrandNavbar.module.css';
import '../../../antdesign.css';

const BrandNavbar = () => {
  const [brands, setBrands] = useState([]);
  const [key, setKey] = useState('');
  const history = useHistory();
  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = () => {
    getBrands()
      .then((res) => {
        setBrands(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBrandSearch = (brand) => {
    history.push(`/search?brandId=${brand._id}&brand=${brand.slug}`);
  };
  const handleProductSearch = (product) => {
    history.push(`/search?productId=${product._id}&product=${product.slug}`);
  };
  if (brands.length === 0) return null;
  return (
    <div className={classes.nav}>
      <div className={classes.brands}>
        {brands.map((brand) => (
          <div
            className={classes.list}
            key={brand._id}
            onMouseOver={() => setKey(brand._id)}
            onMouseLeave={() => setKey('')}>
            <span onClick={() => handleBrandSearch(brand)} className={classes.brand}>
              {brand.name}
            </span>
            {brand.products.length > 0 && (
              <Dropdown dropdown={key === brand._id}>
                {brand.products.map((product) => (
                  <span key={product._id} onClick={() => handleProductSearch(product)}>
                    {product.name}
                  </span>
                ))}
              </Dropdown>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandNavbar;
