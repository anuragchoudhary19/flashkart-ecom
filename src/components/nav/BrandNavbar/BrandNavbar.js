import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = () => {
    getBrands().then((res) => {
      console.log(res.data);
      setBrands(res.data);
    });
  };

  const handleDropdownOnMouseEnter = (id) => {
    setKey(id);
  };
  const handleDropdownOnMouseLeave = () => {
    setKey('');
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
              <div>{brand.name}</div>
              <Dropdown dropdown={key === brand._id}>
                {brand.products.map((product) => (
                  <div key={product._id}>
                    <Link to={`/product/${product.slug}`}>{product.name}</Link>
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
