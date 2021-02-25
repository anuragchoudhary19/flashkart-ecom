import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
//component
import Sidebar from '../../../../components/nav/Sidebar/Sidebar';
import Input from '../../../../components/Elements/Input/Input';
import Button from '../../../../components/Elements/Button/Button';
//function
import { getBrands, getBrand } from '../../../../functions/brand';
import { updateProduct, getProduct } from '../../../../functions/product';
//css
import classes from './UpdateProduct.module.css';
//antd
import { Select } from 'antd';
const { Option } = Select;

const SubUpdate = ({ history, match, location }) => {
  const [name, setName] = useState('');
  const [oldBrand, setOldBrand] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setOldBrand(query.get('brand'));
    setNewBrand(query.get('brand'));
    //setNewBrand(res.data.brand._id);
    getBrands().then((res) => {
      setBrands(res.data);
      console.log(typeof res.data[0]._id);
    });
    getProduct(query.get('product')).then((res) => {
      setName(res.data.name);
    });
  };

  const inputHandle = (e) => {
    setError('');
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (name === '' || /^\s+$/.test(name)) {
      setError('Name cannot be empty');
      return;
    }
    if (/^[0-9]+$/.test(name)) {
      setError('Name cannot start with number');
      return;
    }

    updateProduct(query.get('product'), { name, brand: newBrand }, user.idToken)
      .then((res) => {
        if (window.confirm('Product was updated successfully')) {
          history.goBack();
        }
        console.log(res);
        setName('');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        window.alert('Error in updating product');
        setLoading(false);
      });
  };

  return (
    <div className={classes.ProductNameUpdate}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.workspace}>
        <div className={classes.header}>
          <h1>Edit Product</h1>
        </div>
        <div className={classes.edit}>
          {oldBrand && (
            <div>
              <label>Select Brand</label>
              <Select defaultValue={oldBrand} style={{ width: 120 }} onSelect={(e) => setNewBrand(e)}>
                {brands.map((c) => (
                  <Option key={c._id} value={c._id} selected={c._id === oldBrand}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
          )}
          <div>
            <form onSubmit={handleSubmit}>
              <Input
                label='Product Name'
                type='text'
                placeholder='Enter Product Name'
                value={name}
                error={error}
                change={inputHandle}
                button={<Button>Submit</Button>}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
