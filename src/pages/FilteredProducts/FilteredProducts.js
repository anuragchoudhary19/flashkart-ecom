import React, { useEffect, useState } from 'react';
import { fetchProductsByFilter } from '../../axiosFunctions/productProfile';
import { getBrands } from '../../axiosFunctions/brand';
import { useDispatch, useSelector } from 'react-redux';
import LoadingCard from '../../components/Card/LoadingCard';
import ProductCard from '../../components/Card/ProductCard';
import styles from './FilteredProducts.module.css';
import { Menu, Slider, Checkbox } from 'antd';
import { Rate } from 'antd';
const { SubMenu } = Menu;

const FilteredProducts = () => {
  const [results, setResults] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [stars, setStars] = useState('');
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  let { text } = search;
  const dispatch = useDispatch();

  useEffect(() => {
    getBrands().then((res) => {
      setBrands(res.data);
    });
  }, []);

  // const loadResults = () => {
  //   getProductProfilesByCount(6)
  //     .then((res) => {
  //       setResults(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  //1. load products on query
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  //2.Load products on price change
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ price });
    }, 300);
    return () => clearTimeout(delayed);
  }, [ok]);
  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setSelectedBrands([]);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  const handleCheckbox = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    let inTheState = [...selectedBrands];
    let justChecked = e.target.value;
    let foundInState = inTheState.indexOf(justChecked);
    if (foundInState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInState, 1);
    }
    setSelectedBrands(inTheState);
    fetchProducts({ brand: inTheState });
    console.log(inTheState);
  };
  const handleStars = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setSelectedBrands([]);
    setStars(value);
    fetchProducts({ stars: value });
    console.log(value);
  };
  return (
    <div className={styles.searchPage}>
      <div className={styles.layout}>
        <div>
          <header>Filter</header>
          <Menu defaultOpenKeys={['1', '2']} mode='inline'>
            <SubMenu key='1' title={<h5>Price</h5>}>
              <Slider tipFormatter={(v) => `Rs ${v}`} range value={price} onChange={handleSlider} max='99999' />
            </SubMenu>
            <SubMenu key='2' title={<h5>Brand</h5>}>
              {brands.map((b) => (
                <div key={b._id} style={{ marginBottom: '10px' }}>
                  <Checkbox onChange={handleCheckbox} value={b._id} checked={selectedBrands.includes(b._id)}>
                    {b.name}
                  </Checkbox>
                </div>
              ))}
            </SubMenu>
            <SubMenu key='3' title={<h5>Ratings</h5>}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Rate key='1' count={5} value={5} onFocus={() => handleStars(5)} />
                <Rate key='2' count={4} value={4} onFocus={() => handleStars(4)} />
                <Rate key='3' count={3} value={3} onFocus={() => handleStars(3)} />
                <Rate key='4' count={2} value={2} onFocus={() => handleStars(2)} />
                <Rate key='5' count={1} value={1} onFocus={() => handleStars(1)} />
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div>
          {loading ? (
            <LoadingCard count={4} />
          ) : (
            results.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredProducts;
