import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//components
import Input from '../../../components/Elements/Input/Input';
import Button from '../../../components/Elements/Button/Button';
import Sidebar from '../../../components/nav/Sidebar/Sidebar';
//functions
import { createCategory, getCategories, removeCategory, updateCategory } from '../../../functions/category';
//css
import classes from './CreateCategory.module.css';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  //step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
  }, [loading]);

  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(name);
    createCategory({ name }, user.idToken)
      .then((res) => {
        if (res.data.code === 11000) {
          window.alert('Category already exist');
        }
        setName('');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteHandle = (slug) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      removeCategory(slug, user.idToken)
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      console.log(window.location.href);
    }
  };
  //step 3
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  //step 4
  return (
    <div className={classes.category}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.workspace}>
        <div>
          <h1>Create Category</h1>
        </div>
        <div className={classes.form}>
          <div>
            <form onSubmit={handleSubmit}>
              <Input
                label='Category Name'
                type='text'
                name='category'
                value={name}
                change={(e) => setName(e.target.value)}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </div>
          <div>
            {/* //step 2 */}
            <Input
              label='Search'
              type='search'
              placeholder='Search'
              value={keyword}
              change={(e) => setKeyword(e.target.value.toLowerCase())}
            />
          </div>
          <hr />
        </div>
        <div className={classes.list}>
          <div>
            {categories.filter(searched(keyword)).map((c) => (
              <div key={c._id}>
                <p>{c.name}</p>
                <div>
                  <Link to={`/admin/category/${c.slug}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => deleteHandle(c.slug)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
