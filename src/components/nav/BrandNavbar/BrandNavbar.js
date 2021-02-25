import React, { useState, useEffect } from 'react';
//components
import Dropdown from '../../Dropdown/Dropdown';

//functions
import { getBrands } from '../../../axiosFunctions/brand';
//css
import classes from './BrandNavbar.module.css';
import '../../../antdesign.css';
//antd
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;

const BrandNavbar = () => {
  const [current, setCurrent] = useState('');
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    loadBrands();
    return () => loadBrands();
  }, []);
  
  const loadBrands = () => {
    getBrands().then((res) => {
      console.log(res.data);
      setBrands([...res.data]);
    });
  };

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent({ current: e.key });
  };

  return (
    brands && (
      <div className={classes.brandNavbar}>
        <div className={classes.Menu}>
          {brands.length > 0 &&
            brands.map((brand) => (
              <div className={classes.Submenu} key={brand._id}>
                <div>{brand.name}</div>
                <Dropdown>
                  <div className={classes.options}>
                    {brand.products.map((product) => (
                      <div key={product._id}>
                        <Link to={`/product/${product.slug}`}>{product.name}</Link>
                      </div>
                    ))}
                  </div>
                </Dropdown>
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default BrandNavbar;
