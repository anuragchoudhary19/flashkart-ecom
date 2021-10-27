import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '../../components/Elements/Input/Input';
import Button from '../../components/Elements/Button/Button';
import styles from './Checkout.module.css';
import TextArea from '../../components/Elements/Textarea/TextArea';
import { addAddress } from '../../axiosFunctions/user';
import csc from 'country-state-city';
import { Select } from 'antd';
const { Option } = Select;
const initialState = {
  name: '',
  mobile: '',
  address: '',
  city: '',
  pincode: '',
  state: '',
};
const AddAddress = ({ getAddress }) => {
  const [form, setAddressForm] = useState(initialState);
  const { name, mobile, address, city, pincode } = form;
  const [states, setStates] = useState([]);
  const [error, setError] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    setStates(csc.getStatesOfCountry('IN'));
  }, []);
  const changeHandle = (e) => {
    setAddressForm({ ...form, [e.target.name]: e.target.value });
  };
  const selectHandle = (_, e) => {
    setAddressForm({ ...form, [e.title]: e.value });
  };
  const save = (e) => {
    e.preventDefault();
    console.log('click');

    for (let key in form) {
      console.log(key);
      if (form[key] === '') {
        setError({ ...error, [key]: `${key} is required` });
        return;
      }
    }
    addAddress(user.token, form).then((res) => {
      if (res.data.saved) {
        setAddressForm(initialState);
        getAddress();
      }
    });
  };
  return (
    <div className={styles.form}>
      <form onSubmit={save}>
        <label>
          Name <span>*</span>
        </label>
        <Input label='Name' type='text' name='name' value={name} error={error.name} change={changeHandle} />
        <label>
          Mobile<span>*</span>
        </label>
        <Input label='Mobile' type='number' name='mobile' value={mobile} error={error.mobile} change={changeHandle} />
        <label>
          Address<span>*</span>
        </label>
        <TextArea type='text' name='address' error={error.address} value={address} change={changeHandle} />
        <label>
          City/Town/District <span>*</span>
        </label>
        <Input
          label='City/District/Town'
          type='text'
          name='city'
          value={city}
          change={changeHandle}
          error={error.address}
        />
        <label>
          Pincode <span>*</span>
        </label>
        <Input
          label='Pincode'
          type='number'
          name='pincode'
          value={pincode}
          change={changeHandle}
          error={error.pincode}
        />
        <div>
          <label>
            State <span>*</span>
          </label>
          <Select defaultValue='Select' style={{ width: '100%' }} onChange={selectHandle}>
            {states.map((state) => (
              <Option title='state' key={state.name} value={state.name}>
                {state.name}
              </Option>
            ))}
          </Select>
          {error.state && `${error.state}`}
        </div>
        <Button style={{ width: '100%' }} type='submit'>
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddAddress;
