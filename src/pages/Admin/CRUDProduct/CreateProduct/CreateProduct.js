import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//components
import Sidebar from '../../../../components/nav/Sidebar/Sidebar';
import Input from '../../../../components/Elements/Input/Input';
import Button from '../../../../components/Elements/Button/Button';
//function
import { getBrands } from '../../../../axiosFunctions/brand';
import { createProduct, getProducts, removeProduct } from '../../../../axiosFunctions/product';
//css
import classes from './CreateProduct.module.css';
//antd
import { Select } from 'antd';
const { Option } = Select;

const ProductName = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Select');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [brandError, setCategoryError] = useState('');
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  //step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    load();
  }, [loading]);

  const load = () => {
    getBrands().then((res) => setBrands(res.data));
    getProducts().then((res) => {
      setProducts(res.data);
      console.log(res.data);
    });
  };
  const brandHandle = (e) => {
    setBrand(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (brand === 'Select') {
    }
    setLoading(true);
    console.log(name);
    createProduct({ name, brand }, user.idToken)
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
    setLoading(true);
    if (window.confirm('Delete this product?')) {
      removeProduct(slug, user.idToken).then(() => {
        setLoading(false);
      });
    }
  };
  //step 3
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  const selectedbrand = (product) => (brand !== 'Select' ? product.brand._id === brand : true);
  // const selectedCategory = (cat) => (category !== 'Select' ? cat._id === category : true);
  //step 4
  return (
    <div className={classes.subs}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.workspace}>
        <div>
          <h1>Create Product</h1>
        </div>
        <div>
          <div>
            <label style={{ marginRight: '20px' }}>Brand</label>
            <Select defaultValue={[brand]} style={{ width: 150 }} onChange={brandHandle}>
              <Option value='Select'>Select</Option>
              {brands.length > 0 &&
                brands.map((brand) => (
                  <Option key={brand._id} value={brand._id}>
                    {brand.name}
                  </Option>
                ))}
            </Select>
            <span>{brandError}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label='Product Name'
              type='text'
              name='product'
              value={name}
              error=''
              change={(e) => setName(e.target.value)}
            />
            <Button>Submit</Button>
          </form>
          <Input
            type='search'
            placeholder='Search'
            value={keyword}
            error=''
            change={(e) => setKeyword(e.target.value.toLowerCase())}
          />
        </div>
        {/* {JSON.stringify(products)} */}
        {/* <div className={classes.list}>        
          <div>
            {products.filter(searched(keyword)).map((s) => (
              <div key={s._id}>
                <ul>
                  <li>
                    <span>Brand :</span> {s.brand.name}
                  </li>
                  <li>
                    <span>Product :</span> {s.name}
                  </li>
                </ul>
                <div>
                  <Link to={`/admin/product/${s.slug}`}>Update</Link>
                  <button onClick={() => deleteHandle(s.slug)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className={classes.list}>
          <div>
            {products.length > 0 &&
              products
                .filter(selectedbrand)
                .filter(searched(keyword))
                .map((product) => {
                  return (
                    <div key={product._id}>
                      <p>
                        <span>Brand : </span>
                        {product.brand.name}
                      </p>
                      <p>
                        <span>Product : </span>
                        {product.name}
                      </p>
                      <p>
                        <span>Discount : </span>
                        {product.discount}
                      </p>
                      <div className={classes.options}>
                        <Link
                          to={{
                            pathname: `/admin/product/update`,
                            search: `?brand=${product.brand.slug}&product=${product.slug}`,
                          }}>
                          <div>
                            <button>Edit</button>
                          </div>
                        </Link>
                        <div onClick={() => deleteHandle(product.slug)}>
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

export default ProductName;
