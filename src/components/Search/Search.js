import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../Elements/Input/Input';
import { SearchOutlined } from '@ant-design/icons';

import styles from './Search.module.css';

const Search = () => {
  const { search } = useSelector((state) => ({ ...state }));
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
  const style = { cursor: 'pointer', fontSize: '28px', position: 'absolute', right: '0', left: 'auto' };
  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <Input type='text' value={text} placeholder='Search' change={handleChange} />
      <SearchOutlined onClick={handleSubmit} style={style} />
    </form>
  );
};

export default Search;
