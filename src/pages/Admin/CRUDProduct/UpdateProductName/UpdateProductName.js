import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
//component
import Sidebar from '../../../../components/nav/Sidebar/Sidebar';
import Input from '../../../../components/Elements/Input/Input';
import Button from '../../../../components/Elements/Button/Button';
//function
import { getBrands, getBrand } from '../../../../functions/brand';
import { updateSub, getSub } from '../../../../functions/product';
//css
import classes from './SubUpdate.module.css';
//antd
import { Select } from 'antd';
const { Option } = Select;

const SubUpdate = ({ history, match }) => {
  const [productName, setProductName] = useState('');
  const [oldBrand, setOldBrand] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getBrands().then((res) => {
      setBrands(res.data);
      console.log(typeof res.data[0]._id);
    });
    getSub(match.params.slug).then((res) => {
      setProductName(res.data.name);
      setOldBrand(res.data.parent._id);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateSub(match.params.slug, { name: productName, parent: newBrand ? newBrand : oldBrand }, user.idToken)
      .then((res) => {
        console.log(res);
        setProductName('');
        setLoading(false);
        if (window.confirm('Product was updated successfully')) {
          history.goBack();
        }
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
                value={productName}
                change={(e) => setProductName(e.target.value)}
              />
              <Button>Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
