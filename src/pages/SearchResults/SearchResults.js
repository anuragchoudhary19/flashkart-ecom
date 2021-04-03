import React, { useEffect, useState, useMemo, useRef } from 'react';
import { fetchProductsByFilter } from '../../axiosFunctions/productProfile';
import { getBrands } from '../../axiosFunctions/brand';
import { useDispatch, useSelector } from 'react-redux';
import LoadingCard from '../../components/Card/LoadingCard';
import ProductCard from '../../components/Card/ProductCard';
import styles from './SearchResults.module.css';
import { Menu, Slider, Checkbox } from 'antd';
import { Rate } from 'antd';
const { SubMenu } = Menu;

const FilteredProducts = () => {
  const [brands, setBrands] = useState([]);
  const results = useRef([]);
  const [filterResults, setFilterResults] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [priceFilter, setPrice] = useState([0, 0]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const rate = [5, 4, 3, 2, 1];
  let params = useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);
  let { search } = useSelector((state) => ({ ...state }));
  let { text } = search;
  const dispatch = useDispatch();

  useEffect(() => {
    getBrands().then((res) => {
      setBrands(res.data);
    });
  }, []);

  useEffect(() => {
    if (params.get('text')) {
      fetchProducts({ query: params.get('text') });
    }
    if (params.get('brand')) {
      fetchProducts({ brand: params.get('brandId') });
    }
    if (params.get('product')) {
      fetchProducts({ product: params.get('productId') });
    }
  }, [params]);

  const fetchProducts = (arg) => {
    setLoading(true);
    fetchProductsByFilter(arg)
      .then((res) => {
        results.current = res.data;
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const applyFilter = (arg) => {
    setLoading(true);
    fetchProductsByFilter(arg)
      .then((res) => {
        setFilterResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      if (text) {
        applyFilter({ query: text });
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  //2.Load products on price change
  useEffect(() => {
    const delayed = setTimeout(() => {
      if (priceFilter[1] > 0) applyFilter({ price: priceFilter });
    }, 300);
    return () => clearTimeout(delayed);
  }, [priceFilter]);

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setBrandFilter([]);
    setTimeout(() => {
      setPrice(value);
      setOk(!ok);
    }, 300);
  };
  const handleBrandFilter = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    let inTheState = [...brandFilter];
    let justChecked = e.target.value;
    let foundInState = inTheState.indexOf(justChecked);
    if (foundInState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInState, 1);
    }
    setBrandFilter(inTheState);
    applyFilter({ brand: inTheState });
  };
  const handleStars = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setBrandFilter([]);
    applyFilter({ stars: value });
  };
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div>
          <header>Filter</header>
          <Menu defaultOpenKeys={['1', '2', '3']} mode='inline'>
            <SubMenu key='1' title={<header>Price</header>}>
              <Slider tipFormatter={(v) => `Rs ${v}`} range value={priceFilter} onChange={handleSlider} max='99999' />
            </SubMenu>
            <SubMenu key='2' title={<header>Brand</header>}>
              {brands.map((b) => (
                <div key={b._id} style={{ padding: '10px' }}>
                  <Checkbox onChange={handleBrandFilter} value={b._id} checked={brandFilter.includes(b._id)}>
                    {b.name}
                  </Checkbox>
                </div>
              ))}
            </SubMenu>
            <SubMenu key='3' title={<header>Ratings</header>}>
              <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                {rate.map((val, i) => (
                  <div style={{ padding: '4px' }} key={i}>
                    <Rate key={val} count={val} value={val} onFocus={() => handleStars(val)} />
                  </div>
                ))}
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div>
          <header>Products({results.current.length})</header>
          <div>
            {loading ? (
              <LoadingCard count={3} />
            ) : filterResults.length ? (
              filterResults?.map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              results.current.map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredProducts;
