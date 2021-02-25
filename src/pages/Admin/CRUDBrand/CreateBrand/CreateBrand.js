import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//components
import Input from '../../../../components/Elements/Input/Input';
import Button from '../../../../components/Elements/Button/Button';
import Sidebar from '../../../../components/nav/Sidebar/Sidebar';
//functions
import { createBrand, getBrands, removeBrand } from '../../../../axiosFunctions/brand';
//css
import classes from './CreateBrand.module.css';
//antd
// import { Select } from 'antd';
// const { Option } = Select;

const Brand = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  //step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadBrands();
  }, [loading]);

  const loadBrands = () => {
    getBrands().then((res) => setBrands(res.data));
  };

  // const loadCategoryBrands = (e) => {
  //   setCategoryError('');
  //   console.log(e);
  //   if (e === 'Select') {
  //     setBrands([]);
  //     setCategory(e);
  //     loadBrands();
  //     console.log(category);
  //     return;
  //   }
  //   setBrands([]);
  //   setCategory(e);
  //   getCategoryBrands(e).then((res) => {
  //     console.log(res.data);
  //     setBrands(res.data);
  //   });
  // };

  const inputHandle = (e) => {
    setName(e.target.value);
    setError('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || /^\s+$/.test(name)) {
      console.log(e.target);
      setError('Name cannot be empty');
      return;
    }
    if (/^[0-9]+$/.test(name)) {
      console.log(e.target);
      setError('Name cannot start with number');
      return;
    }
    if (name.length > 32) {
      setError('Name cannot be longer than 32 characters');
      return;
    }
    setLoading(true);
    console.log(name);
    createBrand({ name }, user.idToken)
      .then((res) => {
        console.log(res);
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
      removeBrand(slug, user.idToken)
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  //step 3
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  // const selectedCategory = (cat) => (category !== 'Select' ? cat._id === category : true);

  //step 4
  return (
    <div className={classes.category}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.workspace}>
        <div>
          <h1>Create Brand</h1>
        </div>
        <div className={classes.form}>
          {/* <div>
            <label>Category</label>
            <Select defaultValue='Select' style={{ width: 180 }} onChange={(e) => loadCategoryBrands(e)}>
              <Option value='Select'>Select</Option>
              {categories.length > 0 &&
                categories.filter(searched(keyword)).map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
            </Select>
            <span style={{ color: '#ef4f4f', fontSize: '12px' }}>{categoryError}</span>
          </div> */}
          <div>
            <form onSubmit={handleSubmit}>
              <Input label='Brand Name' type='text' name='brand' value={name} error={error} change={inputHandle} />
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
              error=''
              change={(e) => setKeyword(e.target.value.toLowerCase())}
            />
          </div>
          <hr />
        </div>
        <div className={classes.list}>
          <div>
            {brands.filter(searched(keyword)).map((brand) => {
              return (
                <div key={brand._id}>
                  <p>
                    <span>Brand : </span>
                    {brand.name}
                  </p>
                  <div className={classes.options}>
                    <Link to={{ pathname: `/admin/brand/update`, search: `?brand=${brand.slug}` }}>
                      <div>
                        <button>Edit</button>
                      </div>
                    </Link>
                    <div onClick={() => deleteHandle(brand.slug)}>
                      <button>Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
