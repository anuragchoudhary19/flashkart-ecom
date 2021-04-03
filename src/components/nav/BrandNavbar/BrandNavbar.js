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
    getBrands().then((res) => {
      setBrands(res.data);
    });
  };

  const handleDropdownOnMouseEnter = (id) => {
    setKey(id);
  };
  const handleDropdownOnMouseLeave = () => {
    setKey('');
  };
  const handleBrandSearch = (brand) => {
    history.push(`/search?brandId=${brand._id}&brand=${brand.slug}`);
  };
  const handleProductSearch = (product) => {
    history.push(`/search?productId=${product._id}&product=${product.slug}`);
  };

  return (
    brands && (
      <div className={classes.brandNavbar}>
        <div className={classes.Menu}>
          {brands.map((brand) => (
            <div
              className={classes.Submenu}
              key={brand._id}
              onMouseOver={() => handleDropdownOnMouseEnter(brand._id)}
              onMouseLeave={() => handleDropdownOnMouseLeave()}>
              <div onClick={() => handleBrandSearch(brand)}>{brand.name}</div>
              <Dropdown dropdown={key === brand._id}>
                {brand.products.map((product) => (
                  <div key={product._id} onClick={() => handleProductSearch(product)}>
                    {product.name}
                  </div>
                ))}
              </Dropdown>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default BrandNavbar;
