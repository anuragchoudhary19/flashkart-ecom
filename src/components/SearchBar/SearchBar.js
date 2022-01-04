import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//
import Input from '../Elements/Input/Input';
//
import { SearchOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './SearchBar.module.css';

const SearchBar = ({ submit, change }) => {
  const { search, cart } = useSelector((state) => ({ ...state }));
  const { text } = search;

  let dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?text=${text}`);
  };
  const style = { cursor: 'pointer', fontSize: '28px', position: 'absolute', right: '0.5rem', left: 'auto' };
  return (
    <div className={styles.searchBar}>
      <div className={styles.home}>
        <Link to='/'>FlashKart</Link>
      </div>
      <div className={styles.cart}>
        <Link to={'/cart'}>
          <Badge count={cart?.products?.length} style={{ backgroundColor: 'red', color: '#e6e6e6' }}>
            <ShoppingCartOutlined style={{ fontSize: '2rem' }} />
          </Badge>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input type='text' value={text} placeholder='Search' change={handleChange} />
        <SearchOutlined onClick={handleSubmit} style={style} />
      </form>
    </div>
  );
};

export default SearchBar;
