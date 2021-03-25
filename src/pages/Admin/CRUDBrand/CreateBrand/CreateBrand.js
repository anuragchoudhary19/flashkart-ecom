import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
//components
import Input from '../../../../components/Elements/Input/Input';
import Button from '../../../../components/Elements/Button/Button';
import Sidebar from '../../../../components/nav/Sidebar/Sidebar';
//functions
import { createBrand, getBrands, removeBrand, updateBrand } from '../../../../axiosFunctions/brand';
//css
import classes from './CreateBrand.module.css';
import { validate } from './../../../../functions/validateString';
import { message } from 'antd';
const Brand = () => {
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  const [keyword, setKeyword] = useState('');

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

  const inputHandle = (e) => {
    setError('');
    if (!edit) {
      setName(e.target.value);
    }
    if (edit) {
      setNewName(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const checked = validate(name);
    if (checked !== 'valid') {
      message.error('Brand name is not valid');
      setError(checked);
      return;
    }
    createBrand({ name }, user.token)
      .then((res) => {
        message.success('SAVED SUCCESSFULLY');
        setName('');
        loadBrands();
      })
      .catch((err) => {
        message.error('SAVE FAILED');
        loadBrands();
      });
  };

  const updateHandle = (e) => {
    e.preventDefault();
    updateBrand(selectedBrand, { name: newName }, user.token)
      .then((res) => {
        console.log(res.data);
        message.success('UPDATED SUCCESSFULLY');
        setEdit(false);
        loadBrands();
      })
      .catch((err) => {
        console.log(err);
        message.error('UPDATE FAILED');
        setEdit(false);
        loadBrands();
      });
  };
  const editHandle = (brand) => {
    setSelectedBrand(brand.slug);
    setEdit(true);
    setNewName(brand.name);
  };
  const deleteHandle = (slug) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      removeBrand(slug, user.token)
        .then((res) => {
          message.success('DELETED SUCCESSFULLY ');
          loadBrands();
        })
        .catch((err) => {
          message.error('DELETE FAILED');
          loadBrands();
        });
    }
  };
  //step 3
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  // const selectedCategory = (cat) => (category !== 'Select' ? cat._id === category : true);

  //step 4
  return (
    <div className={classes.page}>
      <Sidebar />
      <div className={classes.content}>
        <h2>Create Brand</h2>
        <div className={classes.inputFields}>
          <form onSubmit={handleSubmit}>
            <label>Brand</label>
            <Input type='text' name='brand' value={name} error={error} change={inputHandle} />
            <Button type='submit'>Submit</Button>
          </form>
          <form>
            <label>Search</label>
            <Input
              type='text'
              placeholder='Search'
              value={keyword}
              change={(e) => setKeyword(e.target.value.toLowerCase())}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </div>
        <div className={classes.list}>
          {brands.filter(searched(keyword)).map((brand) => {
            return (
              <div className={classes.card} key={brand._id}>
                <p>
                  <b>{brand.name}</b>
                </p>
                <div className={classes.actions}>
                  <div onClick={() => editHandle(brand)}>
                    <b>Edit</b>
                  </div>
                  <div onClick={() => deleteHandle(brand.slug)}>
                    <b>Delete</b>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {edit && (
        <div className={classes.editModal}>
          <div>
            <span onClick={() => setEdit(false)}>X</span>
            <div className={classes.inputFields}>
              <form onSubmit={updateHandle}>
                <label>New Brand</label>
                <Input type='text' name='brand' value={newName} error={error} change={inputHandle} />
                <Button type='submit'>Submit</Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brand;
