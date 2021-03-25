import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
//components
import Input from '../../../components/Elements/Input/Input';
import Button from '../../../components/Elements/Button/Button';
import Sidebar from '../../../components/nav/Sidebar/Sidebar';
//functions
import { createCoupon, getCoupons, removeCoupon, updateCoupon } from '../../../axiosFunctions/coupon';
//css
import classes from './Coupon.module.css';
import { validate } from './../../../functions/validateString';

const Coupon = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [newName, setNewName] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newDiscount, setNewDiscount] = useState('');

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  //step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCoupons();
  }, [loading]);

  const loadCoupons = () => {
    getCoupons().then((res) => setCoupons(res.data));
  };

  const nameHandle = (e) => {
    setError('');
    if (!id) {
      setName(e.target.value);
    }
    if (id) {
      setNewName(e.target.value);
    }
  };
  const expiryHandle = (e) => {
    setError('');
    if (!id) {
      setExpiry(e.target.value);
    }
    if (id) {
      setNewExpiry(e.target.value);
    }
  };
  const discountHandle = (e) => {
    setError('');
    if (!id) {
      setDiscount(e.target.value);
    }
    if (id) {
      setNewDiscount(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(name);
    createCoupon({ name, expiry, discount }, user.token)
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

  const updateHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCoupon(id, { newName, newExpiry, newDiscount }, user.token)
      .then((res) => {
        setLoading(false);
        setId('');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setId('');
      });
  };
  const editHandle = (c) => {
    setId(c._id);
    setNewName(c.name);
    console.log(new Date(c.expiry).toLocaleDateString('en-ZA'));
    setNewExpiry(new Date(c.expiry).toLocaleDateString('en-CA'));
    setNewDiscount(c.discount);
  };
  const deleteHandle = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      removeCoupon(id, user.token)
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
    <div className={classes.page}>
      <Sidebar />
      <div className={classes.content}>
        <h2>Create Coupon</h2>
        <div className={classes.inputFields}>
          <form onSubmit={handleSubmit}>
            <label>Coupon Name</label>
            <label>Expiry Date</label>
            <label>Discount</label>
            <Input type='text' name='name' value={name} error={error} change={nameHandle} />
            <Input type='date' name='expiry' value={expiry} error={error} change={expiryHandle} />
            <Input type='number' name='discount' value={discount} error={error} change={discountHandle} />
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
        {coupons.length > 0 && (
          <div className={classes.list}>
            {coupons.filter(searched(keyword)).map((c) => {
              return (
                <div className={classes.card} key={c._id}>
                  <p>
                    <b>Code : {c.name}</b>
                  </p>
                  <p>
                    <b>Discount : {c.discount}%</b>
                  </p>
                  <p>
                    <b>Expires on : {new Date(c.expiry).toLocaleDateString()}</b>
                  </p>
                  <div className={classes.buttons}>
                    <div onClick={() => editHandle(c)}>
                      <b>Edit</b>
                    </div>
                    <div onClick={() => deleteHandle(c._id)}>
                      <b>Delete</b>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {id && (
        <div className={classes.editModal}>
          <div>
            <span onClick={() => setId(false)}>X</span>
            <div className={classes.inputFields}>
              <form onSubmit={updateHandle}>
                <label>Coupon Name</label>
                <label>Expiry Date</label>
                <label>Discount</label>
                <Input type='text' name='name' value={newName} error={error} change={nameHandle} />
                <Input type='date' name='expiry' value={newExpiry} error={error} change={expiryHandle} />
                <Input type='number' name='discount' value={newDiscount} error={error} change={discountHandle} />
                <Button type='submit'>Submit</Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupon;
