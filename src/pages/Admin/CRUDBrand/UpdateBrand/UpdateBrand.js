import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//components
import Sidebar from '../../../../components/nav/Sidebar/Sidebar';
import Input from '../../../../components/Elements/Input/Input';
import Button from '../../../../components/Elements/Button/Button';
//functions
import { updateBrand, getBrand } from '../../../../axiosFunctions/brand';
//css
import classes from './UpdateBrand.module.css';

const Update = ({ history, location }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);
  const { user } = useSelector((state) => ({ ...state }));
  let query = new URLSearchParams(location.search);

  const load = async () => {
    console.log(query);
    await getBrand(String(query.get('brand'))).then((res) => {
      console.log(res.data);
      setName(res.data.name);
    });
    // getCategories().then((res) => {
    //   setCategories(res.data);
    //   setOldCategory(query.get('category'));
    //   setNewCategory(query.get('category'));
    // });
  };

  const inputHandle = (e) => {
    setName(e.target.value);
    if (name.length <= 32) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //setLoading(true);
    if (name === '' || /^\s+$/.test(name)) {
      setError('Name cannot be empty');
      return;
    }
    if (/^[0-9\s]+$/.test(name)) {
      setError('Name cannot start with number');
      return;
    }
    if (name.length > 32) {
      setError('Name cannot be longer than 32 characters');
      return;
    }

    updateBrand(query.get('brand'), { name }, user.idToken)
      .then((res) => {
        console.log(res);
        if (window.confirm('Brand was updated successfully')) {
          history.replace('/admin/brand');
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert('Category update failed');
      });
  };

  return (
    <div className={classes.update}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.workspace}>
        <div>
          <h1>Update Brand</h1>
        </div>
        <div className={classes.form}>
          <div>
            <form onSubmit={handleSubmit}>
              <Input
                label='New Category Name'
                type='text'
                name='category'
                value={name}
                error={error}
                change={inputHandle}
              />
              <Button type='submit'>Update</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
