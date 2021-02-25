import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '../../components/Elements/Input/Input';
import Button from '../../components/Elements/Button/Button';
import styles from './Checkout.module.css';
import TextArea from '../../components/Elements/Textarea/TextArea';
import { addAddress } from '../../axiosFunctions/user';
import csc from 'country-state-city';
import { CheckCircleOutlined } from '@ant-design/icons';
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
const CheckoutForm = () => {
  const [addressForm, setAddressForm] = useState(initialState);
  const { name, mobile, address, city, pincode, state } = addressForm;
  const [states, setStates] = useState([]);
  const [saved, setSaved] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    setStates(csc.getStatesOfCountry('IN'));
  }, []);
  const changeHandle = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };
  const selectHandle = (_, e) => {
    setAddressForm({ ...addressForm, [e.title]: e.value });
  };
  const save = (e) => {
    e.preventDefault();
    addAddress(user.idToken, addressForm).then((res) => {
      if (res.data.saved) {
        setSaved(true);
      }
    });
  };
  return (
    <div className={styles.checkoutForm}>      
      <div>
        <form onSubmit={save}>
          <Input label='Name' type='text' name='name' value={name} change={changeHandle} error='' />
          <Input label='Mobile' type='number' name='mobile' value={mobile} change={changeHandle} error='' />
          <TextArea label='Address' type='text' name='address' value={address} change={changeHandle} />
          <Input label='City/District/Town' type='text' name='city' value={city} change={changeHandle} error='' />
          <Input label='Pincode' type='number' name='pincode' value={pincode} change={changeHandle} error='' />
          <div>
            <label>State</label>
            <Select defaultValue='Select' style={{ width: '300px', minWidth: '120px' }} onChange={selectHandle}>
              {states.map((state) => (
                <Option title='state' key={state.name} value={state.name}>
                  {state.name}
                </Option>
              ))}
            </Select>
          </div>
          <Button type='submit'>Save</Button>
        </form>
      </div>
      {/* {states.forEach(state=>div>)} */}      
    </div>
  );
};

export default CheckoutForm;
