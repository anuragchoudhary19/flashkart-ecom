import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
//components
import Sidebar from '../../../../components/nav/Sidebar/Sidebar';
import Input from '../../../../components/Elements/Input/Input';
import Button from '../../../../components/Elements/Button/Button';
//function
import { getBrands } from '../../../../axiosFunctions/brand';
import { createProduct, getProducts, removeProduct, updateProduct } from '../../../../axiosFunctions/product';
import { validate } from '../../../../functions/validateString';
//css
import classes from './CreateProduct.module.css';
//antd
import { message } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

const ProductName = () => {
  const [product, setProduct] = useState({ name: '', brand: 'Select' });
  const [updatedProduct, setUpdatedProduct] = useState({ name: '', brand: '' });
  const [error, setError] = useState('');
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  //step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadBrands();
    loadProducts();
  }, []);

  const loadBrands = () => {
    getBrands().then((res) => setBrands(res.data));
  };
  const loadProducts = () => {
    getProducts().then((res) => {
      setProducts(res.data);
    });
  };

  const brandHandle = (e) => {
    setError('');
    if (!edit) {
      setProduct({ ...product, brand: e });
    }
    if (edit) {
      setUpdatedProduct({ ...updatedProduct, brand: e });
    }
  };
  const inputHandle = (e) => {
    setError('');
    if (!edit) {
      setProduct({ ...product, name: e.target.value });
    }
    if (edit) {
      setUpdatedProduct({ ...updatedProduct, name: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.brand === 'Select') {
      window.alert('Please Select Brand');
      return;
    }
    const check = validate(product.name);
    if (check !== 'valid') {
      setError('Product name is not valid');
      return;
    }
    createProduct(product, user.token)
      .then((res) => {
        message.success('PRODUCT CREATED');
        loadBrands();
        loadProducts();
        setProduct({ ...product, name: '', brand: 'Select' });
      })
      .catch((err) => {
        message.success('PRODUCT CREATE FAILED');
        console.log(err);
      });
  };
  const editHandle = (product) => {
    setEdit(true);
    setSelectedProduct(product.slug);
    setUpdatedProduct({ ...updatedProduct, name: product.name, brand: product.brand._id });
  };

  const deleteHandle = (slug) => {
    if (window.confirm('Delete this product?')) {
      removeProduct(slug, user.token)
        .then(() => {
          message.success('PRODUCT DELETED');
          loadBrands();
          loadProducts();
        })
        .catch((err) => {
          message.error('PRODUCT DELETE FAILED');
          console.log(err);
        });
    }
  };
  const updateHandle = (e) => {
    e.preventDefault();
    updateProduct(selectedProduct, updatedProduct, user.token)
      .then((res) => {
        message.success('UPDATED SUCCESSFULLY');
        setEdit(false);
        loadBrands();
        loadProducts();
      })
      .catch((err) => {
        console.log(err);
        message.error('UPDATE FAILED');
        setEdit(false);
        loadBrands();
        loadProducts();
      });
  };
  //step 3
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  const filterBrand = (p) => (product.brand !== 'Select' ? p.brand._id === product.brand : true);
  // const selectedCategory = (cat) => (category !== 'Select' ? cat._id === category : true);
  //step 4

  return (
    <div className={classes.page}>
      <Sidebar />
      <div className={classes.content}>
        <h2>Create Product</h2>
        <div className={classes.inputFields}>
          <form onSubmit={handleSubmit}>
            <label>Brand</label>
            <label>Product</label>
            <Select defaultValue={[product.brand]} size='large' style={{ width: 150 }} onChange={(e) => brandHandle(e)}>
              <Option value='Select'>Select</Option>
              {brands.length > 0 &&
                brands.map((brand) => (
                  <Option key={brand._id} value={brand._id}>
                    {brand.name}
                  </Option>
                ))}
            </Select>
            <Input
              label='Product Name'
              type='text'
              name='product'
              value={product.name}
              error={error}
              change={inputHandle}
            />
            <Button type='submit'>Save</Button>
          </form>
          <form>
            <label>Search</label>
            <Input
              type='search'
              placeholder='Search'
              value={keyword}
              error=''
              change={(e) => setKeyword(e.target.value.toLowerCase())}
            />
          </form>
        </div>
        <div className={classes.list}>
          {products.length > 0 &&
            products
              .filter(filterBrand)
              .filter(searched(keyword))
              .map((product) => {
                return (
                  <div className={classes.card} key={product._id}>
                    <p>
                      <b>{product.name}</b>
                    </p>
                    <div className={classes.actions}>
                      <div onClick={() => editHandle(product)}>
                        <b>Edit</b>
                      </div>
                      <div onClick={() => deleteHandle(product.slug)}>
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
                <label>New Product</label>
                <Select
                  defaultValue={[updatedProduct.brand]}
                  size='large'
                  style={{ width: 150 }}
                  onChange={(e) => brandHandle(e)}>
                  {brands.length > 0 &&
                    brands.map((brand) => (
                      <Option key={brand._id} value={brand._id}>
                        {brand.name}
                      </Option>
                    ))}
                </Select>
                <Input type='text' name='brand' value={updatedProduct.name} error={error} change={inputHandle} />
                <Button type='submit'>Submit</Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductName;
